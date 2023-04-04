import { createStore } from "solid-js/store";
import { NotePage } from "./types";

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
