import { FiPlusCircle } from "solid-icons/fi";
import { For } from "solid-js";
import { produce } from "solid-js/store";
import { notes, setNotes } from "../store";
import { FilesItem } from "./FilesItem";

export function Files() {
	return (
		<div class="group flex h-fit flex-col bg-zinc-700/40">
			<div class="flex flex-row items-center justify-between px-4 py-2">
				<p>Files</p>
				<div class="opacity-0 transition-all hover:cursor-pointer group-hover:opacity-100">
					<FiPlusCircle />
				</div>
			</div>
			{/* list of books */}
			<For each={notes.books}>
				{(book, bookIndex) => (
					<>
						{/* a book */}
						<FilesItem bookIndex={bookIndex()} isBook title={book.title} />

						{/* a book's pages */}
						<For each={book.pages}>
							{(page, pageIndex) => (
								<FilesItem
									bookIndex={bookIndex()}
									pageIndex={pageIndex()}
									handleClick={() =>
										setNotes(
											produce(
												(notes) => (notes.current = [bookIndex(), pageIndex()])
											)
										)
									}
									title={page.title}
									isSelected={
										bookIndex() == notes.current[0] &&
										pageIndex() == notes.current[1]
									}
								/>
							)}
						</For>
						{/* a book's pages end */}
					</>
				)}
			</For>
			{/* list of books end */}
		</div>
	);
}
