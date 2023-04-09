<script setup lang="ts">
const props = defineProps<{
	value: string;
	label: string;
	icon: string;
}>();
</script>

<template>
	<div class="text-neutral-9 flex flex-row items-center group/item cursor-default">
		<div class="bg-amber-3 flex flex-row items-center gap-1 px-1">
			<div :class="props.icon"></div>
			<span class="font-bold">
				{{ props.value }}
			</span>
		</div>

		<p
			class="bg-amber-3 overflow-hidden max-w-0 transition-all group-hover/item:(max-w-full opacity-100) opacity-0 pe-1"
		>
			{{ props.label }}
		</p>
	</div>
</template>
