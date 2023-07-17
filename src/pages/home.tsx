import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const HomePage = () => {
	const [booksData, setBooksData] = useState('');
	const [options, setOptions] = useState();
	const [options2, setOptions2] = useState();
	const [reload, setReload] = useState(false);

	useEffect(() => {
		const bookNames = [];
		const dataPages = [];
		const charactersPerBook = [];
		const dataPrep = [];

		const fetchBooks = async () => {
			const booksRes = await fetch(`https://www.anapioficeandfire.com/api/books?page=1&pageSize=50`);
			const books = await booksRes.json();
			setBooksData(books);

			books.map((book) => {
				bookNames.push(book.name);
				charactersPerBook.push(book.characters.length);
				dataPrep.push({ value: book.characters.length, name: book.name });
				dataPages.push(book.numberOfPages);
			});

			dataPrep.sort((a, b) => {
				return b.value - a.value;
			});

			// Characters per book
			setOptions({
				tooltip: {
					trigger: 'item'
				},
				toolbox: {
					show: true,
					feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: true },
						saveAsImage: { show: true }
					}
				},
				series: [
					{
						name: 'Characters per book',
						type: 'pie',
						radius: [75, 200],
						center: ['50%', '50%'],
						roseType: 'area',
						itemStyle: {
							borderRadius: 3
						},
						data: dataPrep
					}
				]
			});

			// Number of pages per book
			setOptions2({
				tooltip: {
					trigger: 'item'
				},
				toolbox: {
					show: true,
					feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: true },
						saveAsImage: { show: true }
					}
				},
				xAxis: {
					type: 'value'
				},

				yAxis: {
					type: 'category',
					data: bookNames
				},
				series: {
					name: 'Number of pages per book',
					type: 'bar',
					data: dataPages
				}
			});
		};

		fetchBooks();
	}, [reload]);

	return (
		<div className='home'>
			<h1>Game Of Thrones</h1>
			<div className='stats'>
				<h2>Statistiques🤓</h2>
				{options && (
					<div className='persoperbook'>
						<h3>Personnages par livre</h3>
						<ReactECharts
							option={options}
							style={{ width: '100%', height: '600px', padding: '1rem' }}
						></ReactECharts>
					</div>
				)}
				{options2 && (
					<div className='persoperbook'>
						<h3>Pages par livres</h3>
						<ReactECharts
							option={options2}
							style={{ width: '100%', height: '1000px', padding: '1rem' }}
						></ReactECharts>
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
