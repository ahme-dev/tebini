<script lang="ts" setup>
import { useNotesStore } from "../stores/notes";

const store = useNotesStore();
const buttonStyle =
	"bg-amber-3 text-neutral-9 rounded-lg px-1 transition-opacity opacity-0 group-hover:opacity-100";
</script>

<template>
	<div class="flex flex-col text-sm font-bold">
		<div
			v-for="page in store.pages"
			:key="page.id"
			class="cursor-pointer px-2 py-1 flex flex-row justify-between gap-2 border-l-2 transition-all group"
			:class="[page.id === store.current ? 'border-l-amber-3' : 'border-l-zinc-7']"
			@click="() => store.setCurrent(page.id)"
		>
			<h1>{{ page.title }}</h1>
			<button :class="buttonStyle" @click="store.trashPage(page.id)" v-if="!page.inTrash">T</button>
			<button :class="buttonStyle" @click="store.restorePage(page.id)" v-else>R</button>
		</div>
	</div>
</template>
