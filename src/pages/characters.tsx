import { useEffect } from 'react';
import useCharacters from '@/hook/store/useCharacters';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/charactersList/columns';
import Pager from '@/components/pagination/pager';
import FilterBar from '@/components/filter/filter-bar';

const CharactersPage = () => {
	const { characters, fetch } = useCharacters();

	useEffect(() => {
		const fetchData = async () => {
			await fetch();
		};

		void fetchData();
	}, []);

	return (
		<div>
			<h1 className='title'>List of characters</h1>
			<FilterBar />
			<DataTable columns={columns} data={characters} />
			<Pager />
		</div>
	);
};

export default CharactersPage;
