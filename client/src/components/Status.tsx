import { StatusItem } from "./StatusItem";

export function Status() {
	return (
		<footer class="flex flex-row items-center justify-end gap-2">
			<StatusItem title="words" value="230"></StatusItem>
			<StatusItem title="lines" value="20"></StatusItem>
			<StatusItem title="Tebini"></StatusItem>
		</footer>
	);
}
