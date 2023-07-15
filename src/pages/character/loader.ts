import { CharacterType } from '@/types';
import type { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';

const getCharacter = async (id: string): Promise<CharacterType> => {
	const res = await fetch(`https://www.anapioficeandfire.com/api/characters/${id}`);
	const data: CharacterType = await res.json();

	return data;
};

export const characterLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
	const { characterId } = params as { characterId: string };
	const character = await getCharacter(characterId);

	if (!character) {
		throw new Response('', {
			status: 404,
			statusText: 'Not Found'
		});
	}

	return { character };
};
