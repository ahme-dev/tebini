import type { Component } from "solid-js";
import { Explorer } from "./components/Explorer";
import { Page } from "./components/Page";
import { PageStats } from "./components/PageStats";

const App: Component = () => {
	return (
		<div class="flex min-h-screen flex-row gap-2 bg-zinc-800 p-2 text-zinc-100 selection:bg-zinc-300 selection:text-zinc-900 md:p-8">
			<div class="flex grow flex-col">
				<main class="flex grow flex-row gap-4">
					<Page></Page>
					<Explorer></Explorer>
				</main>

				<PageStats></PageStats>
			</div>
		</div>
	);
};

export default App;
