// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import { AuthContext } from 'contexts/AuthContext';
import { SidebarContext } from 'contexts/SidebarContext';
import { useState, useEffect, useContext } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import routes from 'routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkAuth } from 'services';
// Custom Chakra theme
export default function Dashboard(props: { [x: string]: any }) {
	const history = useHistory();
	const { ...rest } = props;
	// states and functions
	const [fixed] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [toggleSidebar, setToggleSidebar] = useState(false);
	// functions for changing the states from components
	const getRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};
	const getActiveRoute = (routes: RoutesType[]): string => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].name;
			}
		}
		return activeRoute;
	};
	const getActiveNavbar = (routes: RoutesType[]): boolean => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].secondary;
			}
		}
		return activeNavbar;
	};
	const getActiveNavbarText = (routes: RoutesType[]): string | boolean => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].name;
			}
		}
		return activeNavbar;
	};
	const getRoutes = (routes: RoutesType[]): any => {
		return routes.map((route: RoutesType, key: any) => {
			if (route.layout === '/admin') {
				return <Route path={route.layout + route.path} component={route.component} key={key} />;
			} else {
				return null;
			}
		});
	};
	document.documentElement.dir = 'ltr';
	const { onOpen } = useDisclosure();

	useEffect(() => {
		const checkLogged = async () => {
			try {
				const userInfo = await AsyncStorage.getItem('userInfo');
				if (userInfo) {
					const check = await checkAuth(JSON.parse(userInfo).token);
					if (check.status == 200) {
						setUser(JSON.parse(userInfo))
						setToken(JSON.parse(userInfo).token)
					} else {
						AsyncStorage.removeItem('userInfo')
						AsyncStorage.removeItem('token')
						setUser(null);
						history.push('/auth/sign-in');
					}
				} else {
					setUser(null);
					history.push('/auth/sign-in')
				}

			} catch (e) {
				console.log(e);
			}
		}
		checkLogged();
	}, [])

	return (
		<Box>
			<AuthContext.Provider
				value={{
					user,
					token,
					setUser
				}}
			>
				<SidebarContext.Provider
					value={{
						toggleSidebar,
						setToggleSidebar
					}}>
					<Sidebar routes={routes} display='none' {...rest} />
					<Box
						float='right'
						minHeight='100vh'
						height='100%'
						overflow='auto'
						position='relative'
						maxHeight='100%'
						w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
						maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
						transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
						transitionDuration='.2s, .2s, .35s'
						transitionProperty='top, bottom, width'
						transitionTimingFunction='linear, linear, ease'>
						<Portal>
							<Box>
								<Navbar
									onOpen={onOpen}
									logoText={'Horizon UI Dashboard PRO'}
									brandText={getActiveRoute(routes)}
									secondary={getActiveNavbar(routes)}
									message={getActiveNavbarText(routes)}
									fixed={fixed}
									{...rest}
								/>
							</Box>
						</Portal>

						{getRoute() ? (
							<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
								<Switch>
									{getRoutes(routes)}
									<Redirect from='/' to='/admin/default' />
								</Switch>
							</Box>
						) : null}
						<Box>
							<Footer />
						</Box>
					</Box>
				</SidebarContext.Provider>
			</AuthContext.Provider>
		</Box>
	);
}