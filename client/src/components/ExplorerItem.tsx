import { FiFile, FiFilePlus, FiFolder, FiTrash2 } from "solid-icons/fi";
import { Show } from "solid-js";
import { addPage, deletePage } from "../store";

export function ExplorerItem(props: {
	title: string;
	isBook?: boolean;
	bookIndex?: number;
	pageIndex?: number;
	isSelected?: boolean;
	handleClick?: () => void;
}) {
	function getTitle() {
		// if longer than 10 characters return cut
		if (props.title.length > 10) return props.title.slice(0, 10) + "...";

		// if there is no title return Untitled
		if (props.title.length === 0) return "Untitled";

		// otherwise return title
		return props.title;
	}

	function handleAction() {
		if (props.isBook) addPage(props.bookIndex || 0);
		else deletePage(props.bookIndex || 0, props.pageIndex || 0);
	}

	// render

	return (
		<div
			onclick={props.handleClick}
			class={`group/dir flex h-fit flex-col gap-2 border border-transparent px-4 py-1 hover:bg-zinc-600/40
				${props.isSelected && "border-zinc-500 bg-zinc-600/40"}
				${!props.isBook && "pl-8 hover:cursor-pointer"}
			`}
		>
			<div class="flex items-center justify-between gap-2 text-sm font-bold">
				{/* item icon & title */}
				<div class="flex items-center gap-2">
					<Show when={props.isBook} fallback={<FiFile />}>
						<FiFolder />
					</Show>
					<p>{getTitle()}</p>
				</div>
				{/* item icon & title end */}
				{/* item action button */}
				<div
					class="transition-all hover:cursor-pointer md:opacity-0 md:group-hover/dir:opacity-100"
					onclick={handleAction}
				>
					<Show when={props.isBook} fallback={<FiTrash2 />}>
						<FiFilePlus />
					</Show>
				</div>
				{/* item action button end */}
			</div>
		</div>
	);
}
