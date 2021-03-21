import IPage from "./page"

import HomeIcon from "@material-ui/icons/Home";
import BusinessIcon from "@material-ui/icons/Business";

import HomePage from "../components/pages/homepage";
import OrganizationsPage from "../components/pages/organizationspage";
import OrganizationPage from "../components/pages/organizationpage";

const Routes: IPage[] =
[
	{
		id: 0,
		name: "Home",
		icon: <HomeIcon />,
		component: <HomePage />,
		subpages: []
	},
	{
		id: 1,
		name: "Organizations",
		icon: <BusinessIcon />,
		component: <OrganizationsPage />,
		subpages:
		[
			{
				id: 0,
				name: "Organization",
				icon: <BusinessIcon />,
				component: <OrganizationPage />,
				subpages: []
			}
		]
	}
]

export default Routes;
