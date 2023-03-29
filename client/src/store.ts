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
	setNotes(
		produce(
			(notes) =>
				(notes.books[bookIndex].pages = notes.books[bookIndex].pages.filter(
					(_, i: number) => i !== pageIndex
				))
		)
	);
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
