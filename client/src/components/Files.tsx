import { FilesItem } from "./FilesItem";

export function Files() {
	return (
		<div class="flex h-fit flex-col bg-zinc-700/40">
			<p class="px-4 py-2">Files</p>
			<FilesItem isDir title="Code" />
			<FilesItem title="Solid" />
			<FilesItem isSelected title="React" />
		</div>
	);
}
