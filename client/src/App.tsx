import type { Component } from "solid-js";
import { Explorer } from "./components/Explorer";
import { Page } from "./components/Page";

const App: Component = () => {
	return (
		<div class="flex min-h-screen flex-row gap-2 bg-zinc-800 p-2 text-zinc-100 selection:bg-zinc-300 selection:text-zinc-900 md:p-8">
			<div class="flex grow flex-col gap-4">
				<main class="flex grow flex-col-reverse gap-4 md:flex-row">
					<Page></Page>
					<Explorer></Explorer>
				</main>

				<footer class="flex flex-row items-center justify-end gap-2 text-sm font-bold">
					<a
						href="https://github.com/ahmeddots/tebini"
						target="_blank"
						class="cursor-pointer bg-zinc-700/40 py-1 px-2 hover:bg-zinc-600/40"
					>
						Tebini
					</a>
				</footer>
			</div>
		</div>
	);
};

export default App;
