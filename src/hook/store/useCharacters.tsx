import { create } from 'zustand';
import type { CharacterType, PagersLinkType } from '@/types';
import { extractLinkHeader } from '@/lib/utils';

interface CharacterStore {
	characters: CharacterType[];
	pagerLinks: PagersLinkType;
	setCharacters: (characters: CharacterType[]) => void;
	setPagerLinks: (link: PagersLinkType) => void;
	fetch: (url?: string) => Promise<void>;
}

const useCharacters = create<CharacterStore>((set) => ({
	characters: [],
	pagerLinks: {},

	setCharacters: (characters) => set({ characters }),
	setPagerLinks: (links) => set({ pagerLinks: links }),
	fetch: async (url) => {
		const defaultUrl = 'https://www.anapioficeandfire.com/api/characters?page=1';
		const res = await fetch(url || defaultUrl);

		const linkHeader = res.headers.get('Link');
		const extractedLinks = linkHeader ? extractLinkHeader(linkHeader) : {};

		const newCharacters = (await res.json()) as CharacterType[];

		set({ characters: newCharacters, pagerLinks: extractedLinks });
	}
}));

export default useCharacters;
