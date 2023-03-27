import { produce } from "solid-js/store";
import { notes, setNotes } from "../store";
import { FilesItem } from "./FilesItem";

export function Files() {
	return (
		<div class="flex h-fit flex-col bg-zinc-700/40">
			<p class="px-4 py-2">Files</p>
			{notes.books.map((book, bookIndex) => {
				return (
					<>
						<FilesItem isDir title={book.title} />
						{book.pages.map((page, pageIndex) => {
							return (
								<FilesItem
									handleClick={() =>
										setNotes(
											produce(
												(notes) => (notes.current = [bookIndex, pageIndex])
											)
										)
									}
									title={page.title}
									isSelected={
										bookIndex == notes.current[0] &&
										pageIndex == notes.current[1]
									}
								/>
							);
						})}
					</>
				);
			})}
		</div>
	);
}
