<script lang="ts" setup>
import { useNotesStore } from "@/stores/notes";
import PageEditorItem from "./PageEditorItem.vue";

const store = useNotesStore();

const inputStyles =
	"bg-transparent py-2 border-l-2 border-l-transparent focus:(outline-none ring-none px-4 border-l-amber-3) transition-border transition-padding";
</script>

<template>
	<div class="grow flex flex-col gap-2">
		<input
			:class="inputStyles"
			v-model="store.getCurrent!.title"
			class="font-bold text-xl caret-amber-3 selection:bg-amber-3/20"
			type="text"
			placeholder="title"
		/>

		<!-- status items -->
		<div class="flex flex-row gap-2 text-sm">
			<PageEditorItem
				label="creation"
				icon="i-mdi-clock-check-outline"
				:value="store.getCurrent!.createdAt"
			/>
			<PageEditorItem
				label="words"
				icon="i-mdi-format-line-height"
				:value="store.getCurrent!.content.trim().split(' ').length.toString()"
			/>
			<PageEditorItem
				label="lines"
				icon="i-mdi-format-line-weight"
				:value="store.getCurrent!.content.trim().split('\n').length.toString()"
			/>
		</div>
		<!-- status items end -->

		<textarea
			:class="inputStyles"
			v-model="store.getCurrent!.content"
			class="grow resize-none caret-amber-3 selection:bg-amber-3/20"
			placeholder="content"
		/>
	</div>
</template>
