import { createEffect, createSignal } from "solid-js";
import { notes } from "../store";
import { PageStatsItem } from "./PageStatsItem";

export function PageStats() {
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
		<footer class="flex flex-row items-center gap-2 py-4">
			<PageStatsItem title="words" value={words()} />
			<PageStatsItem title="lines" value={lines()} />
		</footer>
	);
}
