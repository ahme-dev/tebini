import { createStore } from "solid-js/store";

interface NoteBook {
	title: string;
	pages: NotePage[];
}

interface NotePage {
	createdAt: string;
	title: string;
	content: string;
}

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

export const deletePage = (bookIndex: number, pageIndex: number) => {
	// find nearest page to selected
	const nearest = findNearestPage(bookIndex, pageIndex);

	// if nothing found don't return and don't delete the selected page
	if (nearest == null) return;

	// set current to nearest page
	setNotes("current", nearest);

	// delete the selected page
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

const findNearestPage = (
	selectedBookIndex: number,
	selectedPageIndex: number
): [number, number] | null => {
	// list to store all pages
	let pages = [];

	// go through all books
	for (const [bookIndex, book] of notes.books.entries()) {
		// calculate book proximity to selected book
		const bookProximity = Math.abs(selectedBookIndex - bookIndex) * 10;

		// go through all pages of book
		for (const [pageIndex] of book.pages.entries()) {
			// calculate page proximity to selected page
			const pageProximity = Math.abs(selectedPageIndex - pageIndex);

			// skip the current selected page for the list
			if (selectedBookIndex === bookIndex && selectedPageIndex === pageIndex)
				continue;

			// add page index and proximity calculation to pages list
			pages.push({
				index: [bookIndex, pageIndex],
				proximity: bookProximity + pageProximity,
			});
		}
	}

	// if no pages were found return nothing
	if (pages.length === 0) return null;

	// sort by proximity and get top page
	const sorted = pages.sort((a, b) => a.proximity - b.proximity);
	const nearest = sorted[0];

	// return first page
	return [nearest.index[0], nearest.index[1]];
};
