<script lang="ts" setup>
import { ref } from "vue";
import { useNotesStore } from "../stores/notes";
import { computed } from "@vue/reactivity";
import type { Page } from "../stores/types";

const showTrash = ref(false);

const store = useNotesStore();
const buttonStyle = "rounded-lg px-1 transition-opacity opacity-0 group-hover:opacity-100";

const books = computed(() => {
	const groups: Page[][] = [];

	store.pages
		// filter out trashed pages
		.filter((el) => !el.inTrash)
		// loop through each page
		.forEach((page) => {
			// try to find group with same book title
			const groupIndex = groups.findIndex((el) => el[0].book === page.book);

			// if no group found, create it with the page
			if (groupIndex === -1) {
				groups.push([page]);
				return;
			}

			// otherwise push to found group
			groups[groupIndex].push(page);
		});

	// return groups
	return groups;
});
</script>

<template>
	<div class="flex flex-col font-bold gap-2 text-sm">
		<!-- pages title -->
		<p class="text-md">Pages</p>

		<div>
			<div v-for="book in books" :key="book[0].book" class="flex flex-row">
				<div
					class="cursor-pointer py-1 flex flex-row gap-1 items-center justify-center transition-all [writing-mode:vertical-lr]"
					:class="[store.getCurrent!.book === book[0].book? 'bg-amber-3 text-neutral-9': '']"
				>
					<div class="i-mdi-folder rotate-90"></div>
					<p>
						{{ book[0].book }}
					</p>
				</div>

				<!-- pages -->
				<div class="flex flex-col">
					<div
						v-for="page in book"
						:key="page.id"
						class="cursor-pointer px-2 py-1 flex flex-row justify-between items-center gap-4 border-l-2 border-transparent transition-all group"
						:class="[page.id === store.current ? 'bg-amber-3 text-neutral-9' : '']"
						@click="() => store.setCurrent(page.id)"
					>
						<div class="flex flex-row gap-1 items-center justify-center">
							<div class="i-mdi-file"></div>

							<h1>{{ page.title }}</h1>
						</div>

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
			</div>
		</div>

		<!-- trash switch -->
		<div
			class="self-center cursor-pointer"
			:class="[showTrash ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down']"
			@click="() => (showTrash = !showTrash)"
		/>

		<!-- trashed pages -->
		<div class="flex flex-col" v-if="showTrash">
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
