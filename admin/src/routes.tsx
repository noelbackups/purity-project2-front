import { Icon } from '@chakra-ui/react';
import { MdFeedback, MdSupervisorAccount, MdProductionQuantityLimits, MdOutlineCategory, MdHome, MdLock, MdOutgoingMail } from 'react-icons/md';
import { BsFillTagsFill } from 'react-icons/bs';
import { BiHash } from 'react-icons/bi';
import { FaFileContract } from 'react-icons/fa';
// Admin Imports
import MainDashboard from 'views/admin/default';
import termsPage from 'views/admin/terms';
import productsTable from 'views/admin/dataTables/pages/productsTable';
import categoryTable from 'views/admin/dataTables/pages/categoryTable';
import salesTable from 'views/admin/dataTables/pages/salesTable';
import adminTable from 'views/admin/dataTables/pages/adminTable';
import cupomTable from 'views/admin/dataTables/pages/cupomTable';
import assessmentsTable from 'views/admin/dataTables/pages/assessmentsTable';
// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
	{
		name: 'Dashboard',
		layout: '/admin',
		path: '/default',
		visible: true,
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'Administradores',
		layout: '/admin',
		path: '/administrators',
		visible: true,
		icon: <Icon as={MdSupervisorAccount} width='20px' height='20px' color='inherit' />,
		component: adminTable
	},
	{
		name: 'Avaliações',
		layout: '/admin',
		path: '/assessments',
		visible: true,
		icon: <Icon as={MdFeedback} width='20px' height='20px' color='inherit' />,
		component: assessmentsTable
	},
	{
		name: 'Compras',
		layout: '/admin',
		path: '/sales',
		visible: true,
		icon: <Icon as={MdOutgoingMail} width='20px' height='20px' color='inherit' />,
		component: salesTable
	},
	{
		name: 'Categorias',
		layout: '/admin',
		icon: <Icon as={MdOutlineCategory} width='20px' height='20px' color='inherit' />,
		path: '/categories',
		visible: true,
		component: categoryTable
	},
	{
		name: 'Cupoms',
		layout: '/admin',
		icon: <Icon as={BiHash} width='20px' height='20px' color='inherit' />,
		path: '/cupom',
		visible: true,
		component: cupomTable
	},
	{
		name: 'Produtos',
		layout: '/admin',
		path: '/products',
		visible: true,
		icon: <Icon as={MdProductionQuantityLimits} width='20px' height='20px' color='inherit' />,
		component: productsTable
	},
	{
		name: 'Termos',
		layout: '/admin',
		path: '/terms',
		visible: true,
		icon: <Icon as={FaFileContract} width='20px' height='20px' color='inherit' />,
		component: termsPage
	},
	{
		name: 'Sign Inn',
		layout: '/auth',
		path: '/sign-in',
		visible: true,
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignInCentered
	},
];

export default routes;
