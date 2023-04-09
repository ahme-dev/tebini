<script lang="ts" setup>
import { ref } from "vue";
import { useNotesStore } from "../stores/notes";

const showTrash = ref(false);

const store = useNotesStore();
const buttonStyle = "rounded-lg px-1 transition-opacity opacity-0 group-hover:opacity-100";
</script>

<template>
	<div class="flex flex-col font-bold gap-2">
		<!-- pages title -->
		<p class="text-md">Pages</p>

		<!-- pages -->
		<div class="flex flex-col text-sm">
			<div
				v-for="page in store.pages.filter((el) => !el.inTrash)"
				:key="page.id"
				class="cursor-pointer px-2 py-1 flex flex-row justify-between items-center gap-4 border-l-2 border-transparent transition-all group"
				:class="[page.id === store.current ? 'bg-amber-3 text-neutral-9' : '']"
				@click="() => store.setCurrent(page.id)"
			>
				<h1>{{ page.title }}</h1>

				<div
					:class="buttonStyle"
					class="i-mdi-trash-can"
					@click="
						(evt) => {
							evt.stopPropagation();
							store.trashPage(page.id);
						}
					"
				></div>
			</div>
		</div>
		<!-- pages end -->

		<!-- trash switch -->
		<div
			class="self-center cursor-pointer"
			:class="[showTrash ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down']"
			@click="() => (showTrash = !showTrash)"
		/>

		<!-- trashed pages -->
		<div class="flex flex-col text-sm" v-if="showTrash">
			<div
				v-for="page in store.pages.filter((el) => el.inTrash)"
				:key="page.id"
				class="cursor-pointer px-2 py-1 flex flex-row justify-between items-center gap-4 border-l-2 border-transparent transition-all group"
				:class="[page.id === store.current ? 'bg-amber-3 text-neutral-9' : '']"
			>
				<h1>{{ page.title }}</h1>

				<div
					:class="buttonStyle"
					class="i-mdi-restore"
					@click="
						(evt) => {
							evt.stopPropagation();
							store.restorePage(page.id);
						}
					"
				></div>
			</div>
		</div>
		<!-- trashed pages end -->
	</div>
</template>
