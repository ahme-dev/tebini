import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Page } from "./types";
import { findNearest } from "./utils";

export const useNotesStore = defineStore("notes", () => {
	const blank: Page = {
		book: "blank",
		inTrash: false,
		id: "blank",
		title: "",
		content: "",
		createdAt: "0/0/0",
	};

	const pages = ref<Page[]>([
		{
			id: "abcdef",
			title: "VueJS",
			content: "",
			book: "Code",
			inTrash: false,
			createdAt: "2023/4/2",
		},
		{
			id: "adin",
			title: "React",
			content: "",
			book: "Code",
			inTrash: false,
			createdAt: "2023/4/2",
		},
	]);

	const current = ref("abcdef");

	const getCurrent = computed(() => {
		const page = pages.value.find((p) => p.id === current.value);
		if (!page) return blank;
		return page;
	});

	const setCurrent = (pageID: string) => {
		current.value = pageID;
	};

	const changeCurrent = (title: string, content: string) => {
		const index = pages.value.findIndex((p) => p.id === current.value);

		if (title) pages.value[index].title = title;
		if (content) pages.value[index].content = content;
	};

	const trashPage = (pageID: string) => {
		const pageIndex = pages.value.findIndex((p) => p.id === pageID);

		// change current to another one
		const nearestPageID = findNearest(pages.value, pageID);

		// if no other page was found do not remove page
		if (nearestPageID === null) return;

		// othewise set current to nearest
		current.value = nearestPageID;

		// and add trash flag to page
		pages.value[pageIndex].inTrash = true;
	};

	const restorePage = (pageID: string) => {
		const pageIndex = pages.value.findIndex((p) => p.id === pageID);

		// remove trash flag to page
		pages.value[pageIndex].inTrash = false;
	};

	const deletePage = (pageID: string) => {
		const pageIndex = pages.value.findIndex((p) => p.id === pageID);

		// remove page from list
		pages.value.splice(pageIndex, 1);
	};

	return {
		pages,
		current,
		getCurrent,
		setCurrent,
		changeCurrent,
		trashPage,
		restorePage,
		deletePage,
	};
});
