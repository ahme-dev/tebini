import { createStore } from "solid-js/store";
import { NoteBook } from "./types";

export const [trash, setTrash] = createStore<{ items: NoteBook[] }>({
	items: [],
});
