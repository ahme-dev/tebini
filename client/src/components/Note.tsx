import { NoteInput } from "./NoteInput";

export function Note() {
	return (
		<div class="flex grow flex-col gap-4 p-2">
			<NoteInput></NoteInput>
			<NoteInput isMultiline></NoteInput>
		</div>
	);
}
