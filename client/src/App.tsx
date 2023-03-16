import type { Component } from "solid-js";
import { FiMoon, FiFolder, FiFile } from "solid-icons/fi";

const App: Component = () => {
	return (
		<div class="flex h-screen flex-row gap-2 bg-zinc-800 p-2 text-zinc-100">
			<aside class="bg-p-rounded flex flex-col gap-2">
				<div class="flex flex-row items-center justify-center gap-2">
					<p class="text-lg font-bold">Tebini</p>
				</div>
				<div class="grow gap-2 p-2 text-sm font-bold">
					<div class="flex items-center gap-2">
						<FiFolder />
						<p>Code</p>
					</div>
					<div class="flex items-center gap-2 pl-2">
						<FiFile></FiFile>
						<p>Solid</p>
					</div>
				</div>
			</aside>

			<main class="flex grow flex-col justify-between px-4">
				<div class="flex grow flex-col gap-4 py-2">
					<input
						type="text"
						class="bg-transparent text-xl font-bold focus:outline-none"
						placeholder="Title"
					/>
					<textarea
						class="grow bg-transparent focus:outline-none"
						placeholder="Content"
					/>
				</div>
				<div class="flex flex-row items-center gap-4">
					<FiMoon class="bg-p-rounded" size={36}></FiMoon>
					<p class="bg-p-rounded text-sm">Words</p>
				</div>
			</main>
		</div>
	);
};

export default App;
