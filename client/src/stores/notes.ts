import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Page } from "./types";
import { findNearest } from "./utils";

export const useNotesStore = defineStore(
	"notes",
	() => {
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

		function setCurrent(pageID: string) {
			current.value = pageID;
		}

		// function that adds a page to a book
		// it also creates a new book with name if it does not exist
		function addPage(bookID: string) {
			const newPage: Page = {
				book: bookID,
				inTrash: false,
				id: new Date().toLocaleString(),
				title: "New Page",
				content: "",
				createdAt: "2023/4/2",
			};

			pages.value.push(newPage);
		}

		function changeCurrent(title: string, content: string) {
			const index = pages.value.findIndex((p) => p.id === current.value);

			if (title) pages.value[index].title = title;
			if (content) pages.value[index].content = content;
		}

		function trashPage(pageID: string) {
			const pageIndex = pages.value.findIndex((p) => p.id === pageID);

			// change current to another one
			const nearestPageID = findNearest(pages.value, pageID);

			// if no other page was found do not remove page
			if (nearestPageID === null) return;

			// othewise set current to nearest
			current.value = nearestPageID;

			// and add trash flag to page
			pages.value[pageIndex].inTrash = true;
		}

		function restorePage(pageID: string) {
			const pageIndex = pages.value.findIndex((p) => p.id === pageID);

			// remove trash flag to page
			pages.value[pageIndex].inTrash = false;
		}

		function deletePage(pageID: string) {
			const pageIndex = pages.value.findIndex((p) => p.id === pageID);

			// remove page from list
			pages.value.splice(pageIndex, 1);
		}

		return {
			pages,
			current,
			getCurrent,
			setCurrent,
			changeCurrent,
			addPage,
			trashPage,
			restorePage,
			deletePage,
		};
	},
	{ persist: true },
);
