export function NoteInput(props: { isMultiline?: boolean }) {
	if (props.isMultiline) {
		return (
			<textarea
				class="grow bg-transparent focus:outline-none"
				placeholder="Content"
			/>
		);
	}

	return (
		<input
			type="text"
			class="bg-transparent text-xl font-bold focus:outline-none"
			placeholder="Title"
		/>
	);
}
