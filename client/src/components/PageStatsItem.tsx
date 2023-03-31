export function PageStatsItem(props: {
	title: string;
	value?: number | string;
}) {
	return (
		<div class="cursor-default bg-zinc-700/40 px-2 py-1 hover:bg-zinc-600/40">
			<p class="text-xs">
				<span classList={{ "font-bold": !props.value }}>{props.title}</span>
				<span class="font-bold">: {props.value}</span>
			</p>
		</div>
	);
}
