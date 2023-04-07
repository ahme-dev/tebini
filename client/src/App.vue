<script setup lang="ts">
import { useNotesStore } from "./stores/notes";

const store = useNotesStore();
</script>

<template>
	<div class="p-4 flex flex-col gap-2 bg-gray-9 h-screen text-gray-3">
		<p>Current: {{ store.current }}</p>
		<div
			v-for="page in store.pages"
			:key="page.id"
			class="bg-blue-9 cursor-pointer p-2 rounded-4"
			:class="[page.id === store.current ? 'border-red-5' : 'border-transparent', 'border-2']"
			@click="() => store.setCurrent(page.id)"
		>
			<h1>{{ page.title }}</h1>
			<p>{{ page.parent }}</p>
			<button class="border" @click="store.trashPage(page.id)" v-if="!page.inTrash">
				Trash it
			</button>
			<button class="border" @click="store.restorePage(page.id)" v-else>Restore</button>
		</div>
	</div>
</template>
