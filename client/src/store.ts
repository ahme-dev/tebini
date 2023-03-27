import { createStore } from "solid-js/store";

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
