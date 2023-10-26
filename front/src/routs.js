import { MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ADDCAR_ROUTE, CARPAGE_ROUTE,
    ADMIN_ROUTE, SEARCHPAGE_ROUTE, RULES_CON_ROUTE, POLICY_CON_ROUTE, USER_AGREEMENT_CON_ROUTE, CAR_DETAILS_ROUTE} from "./utils/consts"
import MainPage from './pages/mainPage';
import LoginPage from './pages/loginPage';
import RegistrationPage from './pages/registrationPage';
import AddCarPage from './pages/addCarPage';
import CarPage from './pages/carPage';
import searchCarPage from './pages/searchCarPage';
import PolicyCon from "./pages/policyCon";
import SiteRules from "./pages/siteRules";
import UserAgreement from "./pages/userAgreement";
import AdminPanelPage from "./pages/AdminPanelPage";
import CarDetailsPage from "./pages/CarDetailsPage";




export const authRouts = [
    {
        path: ADDCAR_ROUTE,
        Component: AddCarPage
    },
    {
        path: ADMIN_ROUTE,
        Component: AdminPanelPage
    },
    {
        path: CAR_DETAILS_ROUTE + "/:id",
        Component: CarDetailsPage
    },
]

export const publicRouts = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage
    },
    {
        path: CARPAGE_ROUTE + "/:id",
        Component: CarPage
    },
    {
        path: SEARCHPAGE_ROUTE,
        Component: searchCarPage
    },
    {
        path: POLICY_CON_ROUTE,
        Component: PolicyCon
    },
    {
        path: RULES_CON_ROUTE,
        Component: SiteRules
    },
    {
        path: USER_AGREEMENT_CON_ROUTE,
        Component: UserAgreement
    },
]