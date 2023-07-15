import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
	AppBar,
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	Toolbar
} from '@mui/material';
import { AlignJustify } from 'lucide-react';
import Logo from '../logo/logo';
import './navbar.scss';

interface NavbarProps {
	window?: () => Window;
}

const drawerWidth = 300;
const navItems = [
	{ id: 1, title: 'Home', url: '/', icon: 'home.svg' },
	{ id: 2, title: 'Characters', url: '/characters', icon: 'home.svg' }
];

const Navbar = ({ window }: NavbarProps) => {
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Toolbar sx={{ marginBottom: '20px' }}>
				<Logo />
			</Toolbar>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item.title} disablePadding>
						<ListItemButton sx={{ textAlign: 'center' }}>
							<Link to={item.url}>{item.title}</Link>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box component='header' sx={{ display: 'flex' }}>
			<AppBar component='nav' sx={{ backgroundColor: 'hsl(240, 10%, 4%)' }}>
				<Toolbar>
					<Box component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
						<Logo />
					</Box>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<AlignJustify />
					</IconButton>
					<Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '1rem' }}>
						{navItems.map((item) => (
							<NavLink
								key={item.title}
								to={item.url}
								className={({ isActive }) => (isActive ? 'navbar_link active' : 'navbar_link')}
							>
								{item.title}
							</NavLink>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component='nav'>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};

export default Navbar;
