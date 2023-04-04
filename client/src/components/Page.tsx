import { changeCurrent, notes } from "../stores/notes";
import { PageInput } from "./PageInput";
import { PageStats } from "./PageStats";

export function Page() {
	return (
		<div class="flex grow flex-col gap-4 p-2">
			<PageInput
				content={notes.books[notes.current[0]].pages[notes.current[1]].title}
				handleInput={(e) => changeCurrent({ title: e.target.value })}
			></PageInput>
			<PageStats />
			<PageInput
				content={notes.books[notes.current[0]].pages[notes.current[1]].content}
				handleInput={(e) => changeCurrent({ content: e.target.value })}
				isMultiline
			></PageInput>
		</div>
	);
}
