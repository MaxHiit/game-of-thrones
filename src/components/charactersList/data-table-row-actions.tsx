import { Link } from 'react-router-dom';
import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { getCharacterDetailUrl } from '@/lib/utils';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
	const character = row.original as { url: string };

	if (!character.url) return <span>No link</span>;

	return (
		<div className='w-[100px]'>
			<Button variant='outline'>
				<Link to={getCharacterDetailUrl(character.url)}>Voir plus</Link>
			</Button>
		</div>
	);
}
