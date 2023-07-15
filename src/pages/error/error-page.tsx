import { useRouteError } from 'react-router-dom';
import './error.scss';

interface ErrorType {
	statusText?: string;
	message?: string;
}

export default function ErrorPage() {
	const error = useRouteError() as ErrorType;
	console.error(error);

	return (
		<div className='error'>
			<h1 className='error_title'>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error?.statusText || error?.message}</i>
			</p>
		</div>
	);
}
