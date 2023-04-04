import { createStore } from "solid-js/store";
import { setTrash, trash } from "./trash";
import { NoteBook, NotePage } from "./types";
import { findNearestPage } from "./utils";

export const [notes, setNotes] = createStore<{
	current: [number, number];
	books: NoteBook[];
}>({
	current: [0, 0],
	books: [
		{
			title: "Examples",
			pages: [
				{
					title: "Write something",
					content: "This is an example note, containing nothing.",
					createdAt: "2023",
				},
				{
					title: "One",
					content: "",
					createdAt: "2023",
				},
				{
					title: "Two",
					content: "",
					createdAt: "2023",
				},
				{
					title: "Three",
					content: "",
					createdAt: "2023",
				},
				{
					title: "Four",
					content: "",
					createdAt: "2023",
				},
				{
					title: "Five",
					content: "",
					createdAt: "2023",
				},
			],
		},
		{
			title: "Dev",
			pages: [],
		},
	],
});

export const getCurrent = (): NotePage => {
	return notes.books[notes.current[0]].pages[notes.current[1]];
};

export const changeCurrent = (page: { title?: string; content?: string }) => {
	notes.books[notes.current[0]].pages[notes.current[1]] = {
		title: page.title || getCurrent().title,
		content: page.content || getCurrent().content,
		createdAt: getCurrent().createdAt,
	};
};

export const addPage = (bookIndex: number) => {
	setNotes("books", bookIndex, "pages", [
		...notes.books[bookIndex].pages,
		{
			title: "",
			content: "",
			createdAt: new Date().toUTCString(),
		},
	]);
};

export const trashPage = (bookIndex: number, pageIndex: number) => {
	// find nearest page to selected
	const nearest = findNearestPage(bookIndex, pageIndex);

	// if nothing found don't return and don't delete the selected page
	if (nearest == null) return;

	// set current to nearest page
	setNotes("current", nearest);

	// find the page data
	const page = notes.books[bookIndex].pages[pageIndex];

	// add to trash
	setTrash("pages", [...trash.pages, page]);

	// remove the selected page from notes
	setNotes(
		"books",
		bookIndex,
		"pages",
		notes.books[bookIndex].pages.filter((_, i: number) => i !== pageIndex)
	);
};

export const addBook = (title: string) => {
	setNotes("books", [
		...notes.books,
		{
			title,
			pages: [],
		},
	]);
};
