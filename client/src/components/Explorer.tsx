import { FiChevronUp, FiPenTool, FiPlus } from "solid-icons/fi";
import { createSignal, For, Show } from "solid-js";
import { produce } from "solid-js/store";
import { Transition, TransitionGroup } from "solid-transition-group";
import { addBook, notes, setNotes } from "../store";
import { ExplorerItem } from "./ExplorerItem";

export function Explorer() {
	const [nameInput, setNameInput] = createSignal({
		isVisible: false,
		title: "",
	});

	function handleAdd() {
		addBook(nameInput().title);
		setNameInput((_) => ({ isVisible: false, title: "" }));
	}

	function handleTopButton() {
		if (nameInput().isVisible)
			setNameInput((_) => ({ title: "", isVisible: false }));
		else setNameInput((prev) => ({ ...prev, isVisible: true }));
	}

	return (
		<div
			oncontextmenu={(e) => {
				e.preventDefault();
			}}
			class="group flex h-fit flex-col bg-zinc-700/40"
		>
			{/* title of explorer */}
			<div class="flex flex-row items-center justify-between px-4 py-2">
				<p>Explorer</p>
				<div
					class="transition-all hover:cursor-pointer md:opacity-0 md:group-hover:opacity-100"
					onclick={handleTopButton}
				>
					<Show when={nameInput().isVisible} fallback={<FiPlus />}>
						<FiChevronUp />
					</Show>
				</div>
			</div>
			{/* title of explorer end */}

			{/* book adding bar */}
			<Transition
				name="slide"
				onEnter={(el, done) => {
					const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
						duration: 300,
					});
					a.finished.then(done);
				}}
				onExit={(el, done) => {
					const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
						duration: 200,
					});
					a.finished.then(done);
				}}
			>
				<Show when={nameInput().isVisible}>
					<div class="mb-2 flex flex-row items-center justify-between gap-2 px-4 py-1 text-sm focus-within:bg-zinc-600/40">
						<input
							type="text"
							class="w-auto max-w-[7.5rem] bg-transparent  focus:outline-none"
							placeholder="new book title"
							value={nameInput().title}
							onkeyup={(e) => {
								if (e.key == "Enter") handleAdd();
							}}
							oninput={(e: any) => {
								setNameInput((prev) => ({
									isVisible: prev.isVisible,
									title: e.target.value,
								}));
							}}
						/>
						<div class="cursor-pointer" onclick={() => handleAdd()}>
							<FiPenTool />
						</div>
					</div>
				</Show>
			</Transition>
			{/* book adding bar end */}

			{/* list of books */}
			<div class="flex max-h-[15vh] flex-col overflow-scroll md:max-h-[60vh]">
				<For each={notes.books}>
					{(book, bookIndex) => (
						<>
							{/* a book */}
							<ExplorerItem bookIndex={bookIndex()} title={book.title} />

							{/* a book's pages */}
							<TransitionGroup
								name="slide"
								onEnter={(el, done) => {
									const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
										duration: 400,
									});
									a.finished.then(done);
								}}
								onExit={(el, done) => {
									const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
										duration: 200,
									});
									a.finished.then(done);
								}}
							>
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
							</TransitionGroup>
							{/* a book's pages end */}
						</>
					)}
				</For>
			</div>
			{/* list of books end */}
		</div>
	);
}
