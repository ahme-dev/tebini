import { FiFile, FiFilePlus, FiFolder, FiTrash2 } from "solid-icons/fi";
import { Show } from "solid-js";
import { produce } from "solid-js/store";
import { setNotes } from "../store";

export function ExplorerItem(props: {
	title: string;
	isBook?: boolean;
	bookIndex?: number;
	pageIndex?: number;
	isSelected?: boolean;
	handleClick?: () => void;
}) {
	// functions to run on click

	function addPage(): any {
		setNotes(
			produce((notes) =>
				notes.books[props.bookIndex || 0].pages.push({
					title: "New note",
					content: "",
				})
			)
		);
	}

	function deletePage(): any {
		setNotes(
			produce(
				(notes) =>
					(notes.books[props.bookIndex || 0].pages = notes.books[
						props.bookIndex || 0
					].pages.filter((_, i: number) => i !== props.pageIndex))
			)
		);
	}

	return (
		<div
			onclick={props.handleClick}
			class={`group/dir flex h-fit flex-col gap-2 px-4 py-1 hover:bg-zinc-600/40
				${
					props.isSelected
						? "border border-zinc-500 bg-zinc-600/40"
						: "border border-transparent"
				}
				${!props.isBook && "pl-8 hover:cursor-pointer"}
			`}
		>
			<div class="flex items-center justify-between gap-2 text-sm font-bold">
				{/* icon and title of item */}
				<div class="flex items-center gap-2">
					<Show when={props.isBook} fallback={<FiFile />}>
						<FiFolder />
					</Show>
					<p>
						{props.title.length > 10
							? props.title.slice(0, 10) + "..."
							: props.title}
					</p>
				</div>
				{/* icon and title of item end */}
				<div
					class="opacity-0 transition-all hover:cursor-pointer group-hover/dir:opacity-100"
					onclick={props.isBook ? addPage : deletePage}
				>
					<Show when={props.isBook} fallback={<FiTrash2 />}>
						<FiFilePlus />
					</Show>
				</div>
			</div>
		</div>
	);
}
