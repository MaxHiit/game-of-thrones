import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import qs from 'query-string';
import { FilterOptionType, FilterType } from '@/types';
import { statuses, genders } from '@/data/data';
import useCharacters from '@/hook/store/useCharacters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFilter } from './data-table-filter';
import './filter.scss';

const FilterBar = () => {
	const [filters, setFilters] = useState<FilterType>({
		status: null,
		gender: null,
		name: ''
	});
	const [apiUrl, setApiUrl] = useState('https://anapioficeandfire.com/api/characters');

	const { fetch } = useCharacters();

	const updateQueryParams = (queryParams: object, path: string) => {
		let currentQuery = {};
		const parsedUrl = qs.parseUrl(path);

		if (parsedUrl.query) {
			currentQuery = qs.parseUrl(path).query;
		}

		const updatedQuery = {
			...currentQuery,
			...queryParams
		};

		const url = qs.stringifyUrl(
			{
				url: path,
				query: updatedQuery
			},
			{ skipNull: true }
		);

		setApiUrl(url);
	};

	const handleSelectFilter = (filterName: string, filterValue: FilterOptionType | string | null) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterName]: filterValue
		}));
	};

	const handleResetFilters = () => {
		setFilters({
			status: null,
			gender: null,
			name: ''
		});
		setApiUrl('https://anapioficeandfire.com/api/characters');
	};

	useEffect(() => {
		const queryParams = {
			isAlive: filters.status ? filters.status.value : undefined,
			gender: filters.gender ? filters.gender.value : undefined,
			name: filters.name.trim() || undefined
		};

		updateQueryParams(queryParams, apiUrl);
	}, [filters]);

	useEffect(() => {
		const fetchData = async () => {
			await fetch(apiUrl);
		};
		fetchData();
	}, [apiUrl]);

	const isFiltered =
		filters.status !== null || filters.gender !== null || filters.name.trim() !== '';

	return (
		<div className='filter'>
			<Input
				placeholder='Search by name'
				value={filters.name ?? ''}
				type='text'
				onChange={(event) => handleSelectFilter('name', event.target.value)}
				className='filter_input h-10 w-full lg:w-[250px]'
			/>
			<div className='filter_wrapper'>
				<DataTableFilter
					title='Status'
					options={statuses}
					selectedOption={filters.status}
					onSelectOption={(option) => handleSelectFilter('status', option)}
				/>
			</div>
			<div className='filter_wrapper'>
				<DataTableFilter
					title='Gender'
					options={genders}
					selectedOption={filters.gender}
					onSelectOption={(option) => handleSelectFilter('gender', option)}
				/>
			</div>
			{isFiltered && (
				<div className='filter_wrapper filter_wrapper--reset'>
					<Button variant='ghost' onClick={handleResetFilters} className='filter_button'>
						Reset
						<X className='ml-2 h-4 w-4' />
					</Button>
				</div>
			)}
		</div>
	);
};

export default FilterBar;
