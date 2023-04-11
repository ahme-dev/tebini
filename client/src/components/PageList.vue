<script lang="ts" setup>
import { ref } from "vue";
import { useNotesStore } from "../stores/notes";
import { computed } from "@vue/reactivity";
import type { Page } from "../stores/types";
import PageListItem from "./PageListItem.vue";
import PageListGroup from "./PageListGroup.vue";

const showTrash = ref(false);

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
	<div class="flex flex-col gap-2 text-sm">
		<!-- pages title -->
		<p class="text-base font-bold">Pages</p>

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
				<div class="flex flex-col">
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
