import { FiFile, FiFilePlus, FiFolder } from "solid-icons/fi";

export function FilesItem(props: {
	title: string;
	isDir?: boolean;
	isSelected?: boolean;
	handleClick?: () => void;
}) {
	return (
		<div
			onclick={props.handleClick}
			class={`group/dir flex h-fit flex-col gap-2 px-4 py-1 hover:bg-zinc-600/40
				${props.isSelected && "border border-zinc-500 bg-zinc-600/40"}
				${!props.isDir && "pl-8 hover:cursor-pointer"}
			`}
		>
			<div class="flex items-center justify-between gap-2 text-sm font-bold">
				<div class="flex items-center gap-2">
					{props.isDir ? <FiFolder /> : <FiFile />}
					<p>{props.title}</p>
				</div>
				{props.isDir && (
					<div class="opacity-0 transition-all hover:cursor-pointer group-hover/dir:opacity-100">
						<FiFilePlus />
					</div>
				)}
			</div>
		</div>
	);
}
