<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
</script>

<template>
	<h1 text-red-500 flex flex-col>
		{{ count }}
	</h1>
	<button @click="count++">INC+</button>
</template>
