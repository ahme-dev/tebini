<script lang="ts" setup>
import { ref } from "vue";
import { useNotesStore } from "../stores/notes";
import { computed } from "@vue/reactivity";
import type { Page } from "../stores/types";
import PageListItem from "./PageListItem.vue";
import PageListGroup from "./PageListGroup.vue";

const showTrash = ref(false);
const showBookAdd = ref(false);
const bookTitle = ref("");

const store = useNotesStore();

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
	<div class="flex flex-col gap-2 text-sm md:(w-[15vw])">
		<!-- pages title -->
		<div class="flex flex-row gap-2 justify-between items-center">
			<p class="text-base font-bold">Pages</p>
			<div
				class="cursor-pointer transition-all"
				:class="[showBookAdd ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down']"
				@click="() => (showBookAdd = !showBookAdd)"
			></div>
		</div>

		<!-- book addition bar -->
		<div
			v-if="showBookAdd"
			class="flex flex-row items-center justify-between py-1 px-2 gap-1 focus-within:(bg-amber-3 text-neutral-9) transition-all group/bookadd"
		>
			<input
				v-model="bookTitle"
				class="w-22 bg-transparent focus:(outline-none) transition-all group-focus-within/bookadd:(placeholder:text-neutral-7)"
				type="text"
				placeholder="New book title"
				@keyup="
					(evt) => {
						if (evt.key !== 'Enter') return;
						store.addPage(bookTitle);
						showBookAdd = false;
					}
				"
			/>
			<div
				class="i-mdi-plus-circle cursor-pointer"
				@click="
					() => {
						showBookAdd = false;
						store.addPage(bookTitle);
					}
				"
			></div>
		</div>
		<!-- book addition bar end -->

		<!-- the list -->
		<div>
			<div v-for="book in books" :key="book[0].book" class="flex flex-row">
				<!-- pages book -->
				<PageListGroup
					:bookTitle="book[0].book"
					:handleIconClick="(evt:Event) => {
						evt.stopPropagation();
						store.addPage(book[0].book)
					}"
					:isSelected="store.getCurrent!.book === book[0].book"
				/>

				<!-- pages -->
				<div class="grow flex flex-col">
					<PageListItem
						v-for="page in book"
						:key="page.id"
						:handleClick="() => store.setCurrent(page.id)"
						:handleIconClick="(evt:Event) => {
              evt.stopPropagation();
              store.trashPage(page.id)}"
						:isSelected="store.current === page.id"
						:title="page.title"
						icon="i-mdi-trash-can"
					/>
				</div>
				<!-- pages end -->
			</div>
		</div>
		<!-- the list end -->

		<!-- trash switch -->
		<div
			class="self-center cursor-pointer"
			:class="[showTrash ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down']"
			@click="() => (showTrash = !showTrash)"
		/>

		<!-- trashed pages -->
		<div class="flex flex-col" v-if="showTrash">
			<PageListItem
				v-for="page in store.pages.filter((el) => el.inTrash)"
				:key="page.id"
				:handleClick="() => {}"
				:handleIconClick="(evt:Event) => {
          evt.stopPropagation();
          store.restorePage(page.id);
        }"
				:title="page.title"
				icon="i-mdi-restore"
			/>
		</div>
		<!-- trashed pages end -->
	</div>
</template>
