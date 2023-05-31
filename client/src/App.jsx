import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import { Home } from "./page/HomePage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import ROUTES from "./provider/routes.provider.js";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path={ROUTES.HOME} element={<Home />} />
				<Route path={ROUTES.LOGIN} element={<LoginPage/>} />
				<Route path={ROUTES.REGISTER} element={<RegisterPage/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
