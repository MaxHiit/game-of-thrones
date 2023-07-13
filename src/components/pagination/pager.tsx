import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import useCharacters from '@/hook/store/useCharacters';
import { Button } from '@/components/ui/button';
import './pager.scss';

const Pager = () => {
	const { pagerLinks, fetch } = useCharacters();

	const handlePageChange = (url: string | undefined) => {
		if (!url || undefined) return;
		void fetch(url);
	};

	return (
		<div className='pager'>
			<div className='pager_actions'>
				<Button
					className='pager_actions_button'
					variant='outline'
					size='icon'
					onClick={() => handlePageChange(pagerLinks.first)}
					disabled={!pagerLinks.first}
				>
					<ChevronsLeft className='h-6 w-6' />
				</Button>
				<Button
					className='pager_actions_button'
					variant='outline'
					size='icon'
					onClick={() => handlePageChange(pagerLinks.prev)}
					disabled={!pagerLinks.prev}
				>
					<ChevronLeft className='h-6 w-6' />
				</Button>
				<Button
					className='pager_actions_button'
					variant='outline'
					size='icon'
					onClick={() => handlePageChange(pagerLinks.next)}
					disabled={!pagerLinks.next}
				>
					<ChevronRight className='h-6 w-6' />
				</Button>
				<Button
					className='pager_actions_button'
					variant='outline'
					size='icon'
					onClick={() => handlePageChange(pagerLinks.last)}
					disabled={!pagerLinks.last}
				>
					<ChevronsRight className='h-6 w-6' />
				</Button>
			</div>
		</div>
	);
};

export default Pager;
