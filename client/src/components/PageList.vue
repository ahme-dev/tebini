<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { useNotesStore } from "../stores/notes";

const showTrash = ref(false);

const store = useNotesStore();
const buttonStyle = "rounded-lg px-1 transition-opacity opacity-0 group-hover:opacity-100";
</script>

<template>
	<div class="flex flex-col font-bold gap-2">
		<p class="text-md">Pages</p>
		<div class="flex flex-col text-sm">
			<div
				v-for="page in store.pages.filter((el) => !el.inTrash)"
				:key="page.id"
				class="cursor-pointer px-2 py-1 flex flex-row justify-between gap-4 border-l-2 border-transparent transition-all group"
				:class="[page.id === store.current ? 'bg-amber-3 text-neutral-9' : '']"
				@click="() => store.setCurrent(page.id)"
			>
				<h1>{{ page.title }}</h1>
				<button
					:class="buttonStyle"
					@click="
						(evt) => {
							evt.stopPropagation();
							store.trashPage(page.id);
						}
					"
					v-if="!page.inTrash"
				>
					T
				</button>
				<button
					:class="buttonStyle"
					@click="
						(evt) => {
							evt.stopPropagation();
							store.restorePage(page.id);
						}
					"
					v-else
				>
					R
				</button>
			</div>
		</div>
		<button class="self-center" @click="showTrash = !showTrash">S</button>
		<div class="flex flex-col text-sm" v-if="showTrash">
			<div
				v-for="page in store.pages.filter((el) => el.inTrash)"
				:key="page.id"
				class="cursor-pointer px-2 py-1 flex flex-row justify-between gap-4 border-l-2 border-transparent transition-all group"
				:class="[page.id === store.current ? 'bg-amber-3 text-neutral-9' : '']"
			>
				<h1>{{ page.title }}</h1>
				<button :class="buttonStyle" @click="store.trashPage(page.id)" v-if="!page.inTrash">
					T
				</button>
				<button :class="buttonStyle" @click="store.restorePage(page.id)" v-else>R</button>
			</div>
		</div>
	</div>
</template>
