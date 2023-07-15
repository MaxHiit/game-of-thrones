import { Outlet } from 'react-router-dom';
import Navbar from './navbar/navbar';
import { Box, Toolbar } from '@mui/material';

const Layout = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Navbar />
			<Box
				component='main'
				sx={{
					p: 3,
					backgroundColor: 'hsl(240, 10%, 4%)'
				}}
			>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;
