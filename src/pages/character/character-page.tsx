import { useLoaderData } from 'react-router-dom';
import { type CharacterType } from '../../types';
import { Separator } from '@/components/ui/separator';
import BookSection from '@/components/character/book-section';
import SerieSection from '@/components/character/serie-section';
import './character-style.scss';

const CharacterPage = () => {
	const { character } = useLoaderData() as { character: CharacterType };

	const titleHeader = character.name ? character.name : character.aliases[0];

	return (
		<div className='character'>
			<h1 className='character_title'>{titleHeader}</h1>
			<Separator orientation='horizontal' className='w-full ' />
			<BookSection booksProps={character.books} />
			<SerieSection seriesProps={character.tvSeries} />
		</div>
	);
};

export default CharacterPage;
