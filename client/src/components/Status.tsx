import { createEffect, createSignal } from "solid-js";
import { notes } from "../store";
import { StatusItem } from "./StatusItem";

export function Status() {
	// words and lines counters

	let [words, setWords] = createSignal(
		notes.books[notes.current[0]].pages[notes.current[1]].content.split(" ")
			.length
	);

	let [lines, setLines] = createSignal(
		notes.books[notes.current[0]].pages[notes.current[1]].content.split("\n")
			.length
	);

	// on current page change, update words and lines counters

	createEffect(() => {
		setWords(
			notes.books[notes.current[0]].pages[notes.current[1]].content.split(" ")
				.length
		);
		setLines(
			notes.books[notes.current[0]].pages[notes.current[1]].content.split("\n")
				.length
		);
	});

	return (
		<footer class="flex flex-row items-center justify-end gap-2">
			<StatusItem title="words" value={words()} />
			<StatusItem title="lines" value={lines()} />
			<StatusItem title="Tebini" />
		</footer>
	);
}
