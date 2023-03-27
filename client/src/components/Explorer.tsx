import { FiChevronUp, FiPenTool, FiPlus } from "solid-icons/fi";
import { createSignal, For, Show } from "solid-js";
import { produce } from "solid-js/store";
import { notes, setNotes } from "../store";
import { ExplorerItem } from "./ExplorerItem";

export function Explorer() {
	const [nameInput, setNameInput] = createSignal({
		isVisible: false,
		title: "",
	});

	function addBook() {
		setNotes(
			produce((notes) =>
				notes.books.push({
					title: nameInput().title,
					pages: [],
				})
			)
		);
		setNameInput((_) => ({ isVisible: false, title: "" }));
	}

	function handleTopButton() {
		if (nameInput().isVisible)
			setNameInput((_) => ({ title: "", isVisible: false }));
		else setNameInput((prev) => ({ ...prev, isVisible: true }));
	}

	return (
		<div class="group flex h-fit flex-col bg-zinc-700/40">
			{/* title of explorer */}
			<div class="flex flex-row items-center justify-between px-4 py-2">
				<p>Files</p>
				<div
					class="opacity-0 transition-all hover:cursor-pointer group-hover:opacity-100"
					onclick={handleTopButton}
				>
					<Show when={nameInput().isVisible} fallback={<FiPlus />}>
						<FiChevronUp />
					</Show>
				</div>
			</div>
			{/* title of explorer end */}

			{/* book adding bar */}
			<Show when={nameInput().isVisible}>
				<div class="mb-2 flex flex-row items-center justify-between gap-2 py-1 px-4 text-sm focus-within:bg-zinc-600/40">
					<input
						type="text"
						class="w-full bg-transparent  focus:outline-none"
						placeholder="name for new book"
						value={nameInput().title}
						onkeyup={(e) => {
							if (e.key == "Enter") addBook();
						}}
						oninput={(e: any) => {
							setNameInput((prev) => ({
								isVisible: prev.isVisible,
								title: e.target.value,
							}));
						}}
					/>
					<div class="cursor-pointer" onclick={() => addBook()}>
						<FiPenTool />
					</div>
				</div>
			</Show>
			{/* book adding bar end */}

			{/* list of books */}
			<div class="max-h-[60vh] overflow-scroll">
				<For each={notes.books}>
					{(book, bookIndex) => (
						<>
							{/* a book */}
							<ExplorerItem bookIndex={bookIndex()} isBook title={book.title} />

							{/* a book's pages */}
							<For each={book.pages}>
								{(page, pageIndex) => (
									<ExplorerItem
										bookIndex={bookIndex()}
										pageIndex={pageIndex()}
										handleClick={() =>
											setNotes(
												produce(
													(notes) =>
														(notes.current = [bookIndex(), pageIndex()])
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
			</div>
			{/* list of books end */}
		</div>
	);
}
