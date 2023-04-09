<script lang="ts" setup>
import { useNotesStore } from "@/stores/notes";

const store = useNotesStore();

const inputStyles =
	"bg-transparent py-2 border-l-2 border-l-transparent focus:(outline-none ring-none px-4 border-l-amber-3) transition-border transition-padding";
</script>

<template>
	<div class="grow flex flex-col">
		<input
			:class="inputStyles"
			v-model="store.getCurrent!.title"
			class="font-bold text-xl"
			type="text"
			placeholder="title"
		/>
		<textarea :class="inputStyles" class="grow" placeholder="content" />
	</div>
</template>
