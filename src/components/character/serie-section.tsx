import { CharacterType } from '@/types';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import CharacterSectionWrapper from './character-section-wrapper';

interface SerieSectionProps {
	seriesProps: CharacterType['tvSeries'];
}

const SerieSection = ({ seriesProps }: SerieSectionProps) => {
	const ref = useRef<HTMLUListElement>(null) as React.MutableRefObject<HTMLUListElement>;
	const { events } = useDraggable(ref);

	console.log(seriesProps);
	console.log(seriesProps.length);
	console.log(seriesProps[0] === '');

	return (
		<CharacterSectionWrapper title='Serie'>
			<div className='character_season'>
				{seriesProps[0] !== '' ? (
					<ul {...events} ref={ref} className='character_season_list'>
						{seriesProps.map((serie, idx) => (
							<li key={idx} className='character_season_item'>
								<div className='character_season_image'></div>
								<p className='character_season_text'>{serie}</p>
							</li>
						))}
					</ul>
				) : (
					<p>No serie</p>
				)}
			</div>
		</CharacterSectionWrapper>
	);
};

export default SerieSection;
