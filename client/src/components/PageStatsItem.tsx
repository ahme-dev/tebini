export function PageStatsItem(props: {
	title: string;
	value?: number | string;
}) {
	return (
		<div class="cursor-default bg-zinc-700/40 px-2 py-1 hover:bg-zinc-600/40">
			<div class="flex flex-row gap-1 text-xs">
				<p classList={{ "font-bold": !props.value }}>{props.title}</p>
				<p>:</p>
				<p class="font-bold">{props.value}</p>
			</div>
		</div>
	);
}
