import { createStore, produce } from "solid-js/store";

interface NoteBook {
	title: string;
	pages: NotePage[];
}

interface NotePage {
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
				},
				{
					title: "One",
					content: "",
				},
				{
					title: "Two",
					content: "",
				},
				{
					title: "Three",
					content: "",
				},
				{
					title: "Four",
					content: "",
				},
				{
					title: "Five",
					content: "",
				},
			],
		},
		{
			title: "Dev",
			pages: [],
		},
	],
});

export const addPage = (bookIndex: number) => {
	setNotes(
		produce((notes) =>
			notes.books[bookIndex].pages.push({
				title: "",
				content: "",
			})
		)
	);
};

export const deletePage = (bookIndex: number, pageIndex: number) => {
	// delete the page
	setNotes(
		produce(
			(notes) =>
				(notes.books[bookIndex].pages = notes.books[bookIndex].pages.filter(
					(_, i: number) => i !== pageIndex
				))
		)
	);

	const nearest = findNearestPage(bookIndex, pageIndex);
	if (nearest == null) return;

	setNotes(produce((notes) => (notes.current = nearest)));
};

export const addBook = (title: string) => {
	setNotes(
		produce((notes) =>
			notes.books.push({
				title,
				pages: [],
			})
		)
	);
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
