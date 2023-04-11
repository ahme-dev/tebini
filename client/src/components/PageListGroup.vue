<script setup lang="ts">
const props = defineProps<{
	bookTitle: string;
	handleIconClick: (evt: Event) => void;
	isSelected: boolean;
}>();
</script>

<template>
	<div
		class="px-1 py-2 flex flex-row gap-2 items-center justify-between transition-all [writing-mode:vertical-lr] group"
		:class="[props.isSelected ? 'bg-amber-3 text-neutral-9' : '']"
	>
		<div class="gap-1 flex flex-row items-center">
			<div class="i-mdi-folder rotate-90 transiton-all" />
			<p>
				{{ props.bookTitle }}
			</p>
		</div>

		<div
			@click="props.handleIconClick"
			class="rotate-90 opacity-0 group-hover:(opacity-100) i-mdi-plus transition-all cursor-pointer"
		/>
	</div>
</template>
