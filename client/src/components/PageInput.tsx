export function PageInput(props: {
	isMultiline?: boolean;
	content: string;
	handleInput: (e: any) => void;
}) {
	if (props.isMultiline) {
		return (
			<textarea
				class="grow resize-none bg-transparent focus:outline-none"
				placeholder="Content"
				value={props.content}
				oninput={props.handleInput}
			/>
		);
	}

	return (
		<input
			maxlength={35}
			type="text"
			class="bg-transparent text-xl font-bold focus:outline-none"
			placeholder="Title"
			value={props.content}
			oninput={props.handleInput}
		/>
	);
}
