import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CharacterPage from './pages/character/character-page';
import { characterLoader } from './pages/character/loader';
import HomePage from './pages/home';
import CharactersPage from './pages/characters';
import Layout from './components/layout';
import ErrorPage from './pages/error/error-page';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						path: '/',
						element: <HomePage />
					},
					{
						path: '/characters',
						element: <CharactersPage />
					},
					{
						path: '/characters/:characterId',
						element: <CharacterPage />,
						loader: characterLoader
					}
				]
			}
		]
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
