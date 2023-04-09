import type { Page } from "./types";

export const findAnother = (pageList: Page[], current: string): string | null => {
	// loop over all elements
	for (let i = 0; i < pageList.length; i++) {
		if (pageList[i].inTrash) continue;

		// define conditions
		const isCurrent = pageList[i].id === current;
		const hasPrevious = i > 0;
		const lastWasCurrent = hasPrevious ? pageList[i - 1].id === current : false;
		const previousNotTrashed = hasPrevious ? !pageList[i - 1].inTrash : false;

		// if now on current and there is a previous return the previous
		if (isCurrent && hasPrevious && previousNotTrashed) return pageList[i - 1].id;

		// if last was current return this page
		if (lastWasCurrent) return pageList[i].id;
	}

	// if could not find anything using previous logic
	// return first element that is not current and is not trashed
	for (const page of pageList) {
		if (!page.inTrash && page.id !== current) return page.id;
	}

	// if nothing was found until the end return null
	return null;
};
