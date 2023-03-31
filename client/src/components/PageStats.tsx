import { createEffect, createSignal } from "solid-js";
import { notes } from "../store";
import { PageStatsItem } from "./PageStatsItem";

// splitting text and getting count
const splitCurrent = (splitAt: string) =>
	notes.books[notes.current[0]].pages[notes.current[1]].content.split(splitAt)
		.length;

export function PageStats() {
	// words and lines counters
	let [words, setWords] = createSignal(splitCurrent(" "));
	let [lines, setLines] = createSignal(splitCurrent("\n"));

	// on current page change, update words and lines counters
	createEffect(() => {
		setWords(splitCurrent(" "));
		setLines(splitCurrent("\n"));
	});

	return (
		<footer class="flex flex-row items-center gap-2 py-4">
			<PageStatsItem
				title="createdAt"
				value={notes.books[notes.current[0]].pages[notes.current[1]].createdAt}
			/>
			<PageStatsItem title="words" value={words()} />
			<PageStatsItem title="lines" value={lines()} />
		</footer>
	);
}
