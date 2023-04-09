<script setup lang="ts">
import PageEditorVue from "./components/PageEditor.vue";
import { useNotesStore } from "./stores/notes";

const store = useNotesStore();
("bg-transparent py-2 border-l-2 border-l-transparent focus:(outline-none ring-none px-4 border-l-amber-3) transition-border transition-padding");
</script>

<template>
	<div class="min-h-screen bg-zinc-9 text-neutral-1 flex flex-col-reverse p-4 md:(flex-row p-8)">
		<!-- left section -->
		<div class="grow flex flex-col">
			<PageEditorVue></PageEditorVue>
		</div>
		<!-- left section end -->

		<!-- right section -->
		<div>
			<!-- explorer -->
			<div class="flex flex-col gap-2 text-gray-3">
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

			<!-- icons -->
			<div></div>
		</div>
		<!-- right section end -->
	</div>
</template>
