import type { Component } from "solid-js";
import { FiMoon, FiFolder, FiFile, FiDownloadCloud } from "solid-icons/fi";

const App: Component = () => {
	return (
		<div class="flex h-screen flex-row gap-2 bg-zinc-800 p-2 text-zinc-100">
			<main class="flex grow flex-col">
				<div class="flex grow flex-row gap-4">
					<div class="flex grow flex-col gap-4 p-2">
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

					<div class="flex flex-col gap-2">
						<div class="bg-p-rounded flex h-fit flex-col gap-2 text-sm font-bold">
							<div class="flex items-center gap-2">
								<FiFolder />
								<p>Code</p>
							</div>
						</div>

						<div class="bg-p-rounded flex h-fit flex-col gap-2 text-sm font-bold">
							<div class="flex items-center gap-2 pl-2">
								<FiFile></FiFile>
								<p>Solid</p>
							</div>
						</div>
					</div>
				</div>

				<div class="flex flex-row items-center justify-end gap-4 text-xs">
					<p class="bg-p-rounded">words: 230</p>
					<p class="bg-p-rounded">lines: 20</p>
				</div>
			</main>
		</div>
	);
};

export default App;
