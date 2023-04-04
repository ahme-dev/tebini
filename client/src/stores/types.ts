export interface NoteBook {
	title: string;
	pages: NotePage[];
}

export interface NotePage {
	createdAt: string;
	title: string;
	content: string;
}
