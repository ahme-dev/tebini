<script setup lang="ts">
const props = defineProps<{
	icon: string;
	handleIconClick: (evt: Event) => void;
	handleClick: () => void;
	title: string;
	isSelected?: boolean;
}>();
</script>

<template>
	<div
		class="cursor-pointer px-2 py-1 flex flex-row justify-between items-center gap-4 border-l-2 border-transparent transition-all group"
		:class="[props.isSelected ? 'bg-amber-3 text-neutral-9' : '']"
		@click="props.handleClick"
	>
		<div class="flex flex-row gap-1 items-center justify-center">
			<div class="i-mdi-file"></div>
			<h1>{{ props.title }}</h1>
		</div>

		<div
			class="rounded-lg px-1 transition-opacity opacity-0 group-hover:opacity-100"
			:class="props.icon"
			@click="props.handleIconClick"
		></div>
	</div>
</template>
