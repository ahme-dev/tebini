import { produce } from "solid-js/store";
import { notes, setNotes } from "../store";
import { NoteInput } from "./NoteInput";

export function Note() {
	return (
		<div class="flex w-8 grow flex-col gap-4 p-2">
			<NoteInput
				content={notes.books[notes.current[0]].pages[notes.current[1]].title}
				handleInput={(e) =>
					setNotes(
						produce(
							(notes) =>
								(notes.books[notes.current[0]].pages[notes.current[1]].title =
									e.target.value)
						)
					)
				}
			></NoteInput>
			<NoteInput
				content={notes.books[notes.current[0]].pages[notes.current[1]].content}
				handleInput={(e) =>
					setNotes(
						produce(
							(notes) =>
								(notes.books[notes.current[0]].pages[notes.current[1]].content =
									e.target.value)
						)
					)
				}
				isMultiline
			></NoteInput>
		</div>
	);
}
