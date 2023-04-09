import type { Page } from "./types";

export const findNearest = (pageList: Page[], clicked: string): string | null => {
	// loop over all elements
	for (let i = 0; i < pageList.length; i++) {
		if (pageList[i].inTrash) continue;

		// define conditions
		const isClicked = pageList[i].id === clicked;
		const hasPrevious = i > 0;
		const lastWasClicked = hasPrevious ? pageList[i - 1].id === clicked : false;
		const previousNotTrashed = hasPrevious ? !pageList[i - 1].inTrash : false;

		// if now on clicked element and there is a previous return the previous
		if (isClicked && hasPrevious && previousNotTrashed) return pageList[i - 1].id;

		// if last was clicked element return this page
		if (lastWasClicked) return pageList[i].id;
	}

	// if could not find anything using previous logic
	// return first element that is not the clicked item and is not trashed
	for (const page of pageList) {
		if (!page.inTrash && page.id !== clicked) return page.id;
	}

	// if nothing was found until the end return null
	return null;
};
