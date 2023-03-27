import { FiPlusCircle } from "solid-icons/fi";
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
