import { FiFile, FiRefreshCw, FiXCircle } from "solid-icons/fi";
import { permanentlyDeletePage, restorePage } from "../stores/trash";

export function TrashItem(props: { title: string; index: number }) {
	function getTitle() {
		// if longer than 10 characters return cut
		if (props.title.length > 10) return props.title.slice(0, 10) + "...";

		// if there is no title return Untitled
		if (props.title.length === 0) return "Untitled";

		// otherwise return title
		return props.title;
	}

	function handleDeleteClick(e: Event) {
		// don't activate onclick of the containing div
		e.stopPropagation();

		permanentlyDeletePage(props.index);
	}

	function handleRestoreClick(e: Event) {
		// don't activate onclick of the containing div
		e.stopPropagation();

		restorePage(props.index);
	}

	// render

	return (
		<div
			class={`group/dir flex h-fit flex-col gap-2 border border-transparent px-4 py-1 hover:bg-zinc-600/40`}
		>
			<div class="flex items-center justify-between gap-2 text-sm font-bold">
				{/* item icon & title */}
				<div class="flex items-center gap-2">
					<FiFile />
					<p>{getTitle()}</p>
				</div>
				{/* item icon & title end */}

				<div class="flex flex-row gap-2">
					{/* item action button */}
					<div
						class="transition-all hover:cursor-pointer md:opacity-0 md:group-hover/dir:opacity-100"
						onclick={handleRestoreClick}
					>
						<FiRefreshCw />
					</div>

					<div
						class="transition-all hover:cursor-pointer md:opacity-0 md:group-hover/dir:opacity-100"
						onclick={handleDeleteClick}
					>
						<FiXCircle />
					</div>
					{/* item action button end */}
				</div>
			</div>
		</div>
	);
}
