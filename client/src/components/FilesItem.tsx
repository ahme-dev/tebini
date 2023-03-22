import { FiFile, FiFolder } from "solid-icons/fi";

export function FilesItem(props: {
	title: string;
	isDir?: boolean;
	isSelected?: boolean;
}) {
	return (
		<div
			class={`flex h-fit flex-col gap-2 px-4 py-1 hover:cursor-pointer hover:bg-zinc-600/40
				${props.isSelected && "border border-zinc-500 bg-zinc-600/40"}
				${!props.isDir && "pl-8"}
			`}
		>
			<div class="flex items-center gap-2 text-sm font-bold">
				{props.isDir ? <FiFolder /> : <FiFile />}
				<p>{props.title}</p>
			</div>
		</div>
	);
}
