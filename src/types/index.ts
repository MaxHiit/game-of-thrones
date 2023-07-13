import { type LucideIcon } from 'lucide-react';

export interface CharacterType {
	url: string;
	name: string;
	gender: string;
	culture: string;
	born: string;
	died: string;
	titles: string[];
	aliases: string[];
	father: string;
	mother: string;
	spouse: string;
	allegiances: string[];
	books: string[];
	povBooks: string[];
	tvSeries: string[];
	playedBy: string[];
}

export interface PagersLinkType {
	next?: string;
	prev?: string;
	first?: string;
	last?: string;
}

export interface FilterType {
	status: FilterOptionType | null;
	gender: FilterOptionType | null;
	name: string;
}

export interface FilterOptionType {
	value: string;
	label: string;
	icon?: LucideIcon;
}
