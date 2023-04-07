import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useNotesStore = defineStore("notes", () => {
	const pages = ref([
		{
			id: "abcdef",
			title: "VueJS",
			content: "",
			parent: "Code",
			inTrash: false,
		},
		{
			id: "adin",
			title: "React",
			content: "",
			parent: "Code",
			inTrash: false,
		},
	]);

	const current = ref("abcdef");

	const getCurrent = computed(() => pages.value.find((p) => p.id === current.value));

	const setCurrent = (pageID: string) => {
		current.value = pageID;
	};

	const changeCurrent = (title: string, content: string) => {
		const index = pages.value.findIndex((p) => p.id === current.value);

		if (title) pages.value[index].title = title;
		if (content) pages.value[index].content = content;
	};

	const trashPage = (pageID: string) => {
		const index = pages.value.findIndex((p) => p.id === pageID);

		pages.value[index].inTrash = true;
	};

	const restorePage = (pageID: string) => {
		const index = pages.value.findIndex((p) => p.id === pageID);

		pages.value[index].inTrash = false;
	};

	const deletePage = (pageID: string) => {
		const index = pages.value.findIndex((p) => p.id === pageID);

		pages.value.splice(index, 1);
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
