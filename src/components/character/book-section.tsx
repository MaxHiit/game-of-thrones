import { useEffect, useState } from 'react';
import { CharacterType, bookType } from '@/types';
import { formatDate } from '@/lib/utils';
import CharacterSectionWrapper from './character-section-wrapper';

interface BookSectionProps {
	booksProps: CharacterType['books'];
}

const BookSection = ({ booksProps }: BookSectionProps) => {
	const [books, setBooks] = useState<bookType[]>([]);
	const [displayedBooks, setDisplayedBooks] = useState<number>(5);

	const showLoadMoreButton = booksProps.length > displayedBooks;

	const fetchBooks = async (start: number) => {
		const booksToFetch = booksProps.slice(start, displayedBooks);

		const bookPromises = booksToFetch.map(async (bookUrl) => {
			try {
				const response = await fetch(bookUrl);
				const book = await response.json();
				return book;
			} catch (error) {
				console.error("Une erreur s'est produite", error);
				return null;
			}
		});

		const newBooks = await Promise.all(bookPromises);
		setBooks(newBooks);
	};

	const handleLoadMoreBooks = () => {
		setDisplayedBooks((prevDisplayedBooks) => prevDisplayedBooks + 5);
		fetchBooks(displayedBooks);
	};

	useEffect(() => {
		if (booksProps.length === 0) return;

		fetchBooks(0);
	}, [booksProps, displayedBooks]);

	if (booksProps.length === 0) {
		return null;
	}

	return (
		<CharacterSectionWrapper
			title='Book'
			hasButton={showLoadMoreButton}
			onClick={handleLoadMoreBooks}
		>
			<ul className='character_books'>
				{books.map((book: bookType, idx: number) => (
					<li key={idx} className='character_books_item'>
						<p className='character_books_author'>({book?.authors[0]})</p>
						<p className='character_books_name'>{book?.name}</p>
						<p className='character_books_date'>
							<span>release</span> {formatDate(book?.released)}
						</p>
					</li>
				))}
			</ul>
		</CharacterSectionWrapper>
	);
};

export default BookSection;
