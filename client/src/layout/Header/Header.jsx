import { useState, useContext } from "react";
import { Layout, Menu, Button } from "antd";
const { Header } = Layout;
import NAVS from "../../provider/header-navs.provider";
import { UserContext } from "../../contexts/UserProvider";
import { logout } from "../../services/auth.service";
import ROUTES from "../../provider/routes.provider"

export const PublicHeader = () => {
	const [current, setCurrent] = useState(1);
	const { isLoggedIn } = useContext(UserContext);

	const handleMenuOnClick = (e) => {
		setCurrent(e.key);
	};

	const handleButtonOnclick = (e) => {
		if (isLoggedIn) { //if user is logged in
			logout();
			window.location.href = ROUTES.HOME;
		} else { //if user is not logged in
			window.location.href = ROUTES.LOGIN;
		}
	}

	return (
		<Header
			style={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<div className="demo-logo" />
			<Menu
				theme="dark"
				mode="horizontal"
				onClick={handleMenuOnClick}
				selectedKeys={[current]}
				items={NAVS.map((nav, index) => {
					return {
						key: index,
						label: <a href={nav.path}>{nav.name}</a>,
						path: nav.path,
					};
				})}
			/>
			<Button onClick={handleButtonOnclick} type="primary" className="bg-[#1677ff]">
				{isLoggedIn ? 'Logout' : 'Login'}
			</Button>
		</Header>
	);
};
