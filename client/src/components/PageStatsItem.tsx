export function PageStatsItem(props: { title: string; value?: number }) {
	return (
		<div class="cursor-default bg-zinc-700/40 py-1 px-2 hover:bg-zinc-600/40">
			<p class="text-xs">
				<span classList={{ "font-bold": !props.value }}>{props.title}</span>
				{props.value && <span class="font-bold">: {props.value}</span>}
			</p>
		</div>
	);
}
