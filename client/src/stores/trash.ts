import { createStore } from "solid-js/store";
import { NotePage } from "./types";
import { notes, setNotes } from "./notes";

export const [trash, setTrash] = createStore<{
	pages: NotePage[];
}>({
	pages: [],
});

export const permanentlyDeletePage = (pageIndex: number) => {
	setTrash(
		"pages",
		trash.pages.filter((_, id) => id !== pageIndex)
	);
};

export const restorePage = (pageIndex: number) => {
	setNotes("books", 0, "pages", [
		...notes.books[0].pages,
		trash.pages[pageIndex],
	]);

	setTrash(
		"pages",
		trash.pages.filter((_, id) => id !== pageIndex)
	);
};
