import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./page/HomePage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import LandlordHousePage from "./page/LandlordHousePage.jsx";
import HouseDetailPage from "./page/HouseDetailPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import ROUTES from "./provider/routes.provider.js";
import { UserProvider } from "./contexts/UserProvider.jsx";

function App() {

	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.LOGIN} element={<LoginPage/>} />
					<Route path={ROUTES.REGISTER} element={<RegisterPage/>} />
					<Route path={ROUTES.HOUSE} element={<LandlordHousePage/>} />
					<Route path={ROUTES.HOUSE_DETAIL} element={<HouseDetailPage/>} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
