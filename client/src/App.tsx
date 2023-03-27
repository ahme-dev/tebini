import type { Component } from "solid-js";
import { Explorer } from "./components/Explorer";
import { Note } from "./components/Note";
import { Status } from "./components/Status";

const App: Component = () => {
	return (
		<div class="flex h-screen flex-row gap-2 bg-zinc-800 p-2 text-zinc-100 selection:bg-zinc-300 selection:text-zinc-900 md:p-8">
			<div class="flex grow flex-col">
				<main class="flex grow flex-row gap-4">
					<Note></Note>
					<Explorer></Explorer>
				</main>

				<Status></Status>
			</div>
		</div>
	);
};

export default App;
