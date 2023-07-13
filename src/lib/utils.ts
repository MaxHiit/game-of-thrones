import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const extractLinkHeader = (header: string) => {
	const links: { [key: string]: string } = {};
	const linkHeader = header.split(',');

	linkHeader.forEach((link) => {
		const linkParts = link.split(';');

		if (linkParts.length < 2) return;

		const urlMatch = linkParts[0].match(/<(.+)>/);

		if (!urlMatch) return;

		const url = urlMatch[1].trim();

		const relMatch = linkParts[1].match(/rel="(.+)"/);

		if (!relMatch) return;

		const rel = relMatch[1].trim();

		links[rel] = url;
	});

	return links;
};

export const getCharacterDetailUrl = (originalUrl: string): string => {
	const id = originalUrl.split('/').pop()!;
	const newUrl = `/characters/${id}`;

	return newUrl;
};
