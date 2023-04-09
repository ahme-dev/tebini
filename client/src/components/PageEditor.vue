<script lang="ts" setup>
import { useNotesStore } from "@/stores/notes";

const store = useNotesStore();

const inputStyles =
	"bg-transparent py-2 border-l-2 border-l-transparent focus:(outline-none ring-none px-4 border-l-amber-3) transition-border transition-padding";
</script>

<template>
	<div class="grow flex flex-col gap-2">
		<input
			:class="inputStyles"
			v-model="store.getCurrent!.title"
			class="font-bold text-xl"
			type="text"
			placeholder="title"
		/>
		<div class="flex flex-row gap-2 text-sm">
			<p class="bg-amber-3 text-neutral-9 px-1">
				<span class="font-bold">
					{{ store.getCurrent?.createdAt }}
				</span>
			</p>
			<p class="bg-amber-3 text-neutral-9 px-1">
				<span class="font-bold">
					{{ store.getCurrent!.content.trim().split(" ").length }}
				</span>
				words
			</p>
			<p class="bg-amber-3 text-neutral-9 px-1">
				<span class="font-bold">
					{{ store.getCurrent!.content.trim().split("\n").length }}
				</span>

				lines
			</p>
		</div>
		<textarea
			:class="inputStyles"
			v-model="store.getCurrent!.content"
			class="grow resize-none"
			placeholder="content"
		/>
	</div>
</template>
