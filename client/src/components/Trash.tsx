import { FiChevronDown, FiChevronUp } from "solid-icons/fi";
import { For, Show, createSignal } from "solid-js";
import { trash } from "../stores/trash";
import { TrashItem } from "./TrashItem";

export function Trash() {
	const [showTrash, setShowTrash] = createSignal(false);

	return (
		<div
			oncontextmenu={(e) => {
				e.preventDefault();
			}}
			class="group flex h-fit flex-col bg-zinc-700/40"
		>
			<div class="flex flex-row items-center justify-between px-4 py-2">
				<p>Trash</p>
				<div
					class="transition-all hover:cursor-pointer md:opacity-0 md:group-hover:opacity-100"
					onclick={() => setShowTrash((prev) => !prev)}
				>
					<Show when={showTrash()} fallback={<FiChevronDown />}>
						<FiChevronUp />
					</Show>
				</div>
			</div>

			<Show when={showTrash()}>
				<Show
					when={trash.pages.length > 0}
					fallback={<p class="px-4 py-1 text-sm text-zinc-400">Empty</p>}
				>
					<For each={trash.pages}>
						{(page, index) => (
							<TrashItem title={page.title} index={index()}></TrashItem>
						)}
					</For>
				</Show>
			</Show>
		</div>
	);
}
