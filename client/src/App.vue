<script setup lang="ts">
import PageEditor from "./components/PageEditor.vue";
import PageList from "./components/PageList.vue";
import { useNotesStore } from "./stores/notes";

const store = useNotesStore();
</script>

<template>
	<div
		class="min-h-screen bg-dark-9 text-neutral-1 flex flex-col-reverse p-4 md:(flex-row p-8) gap-4"
	>
		<!-- left section -->
		<div class="grow flex flex-col">
			<PageEditor></PageEditor>
		</div>
		<!-- left section end -->

		<!-- right section -->
		<div>
			<PageList></PageList>

			<!-- icons -->
			<div></div>
		</div>
		<!-- right section end -->
	</div>
</template>
