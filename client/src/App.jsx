import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import BaseLayout from "./layout/BaseLayout.jsx";
import { Home } from "./page/Home.jsx";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/test" element={<BaseLayout/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
