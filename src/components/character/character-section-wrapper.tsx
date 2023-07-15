import { ReactNode, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

interface CharacterSectionWrapperProps {
	title: string;
	children: ReactNode;
	hasButton?: boolean;
	onClick?: () => void;
}

const CharacterSectionWrapper = ({
	title,
	hasButton,
	onClick,
	children
}: CharacterSectionWrapperProps) => {
	const handleClick = useCallback(() => {
		if (!onClick) return;
		onClick();
	}, []);

	return (
		<section className='character_section'>
			<div className='character_section_header'>
				<h2 className='character_section_title'>{title}</h2>
				{hasButton && (
					<Button variant='ghost' onClick={handleClick}>
						<span>Voir plus</span>
						<ArrowUpRight />
					</Button>
				)}
			</div>
			{children}
		</section>
	);
};

export default CharacterSectionWrapper;
