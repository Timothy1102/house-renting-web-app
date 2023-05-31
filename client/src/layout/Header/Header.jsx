import { useState } from "react";
import { Layout, Menu } from "antd";
const { Header } = Layout;
import NAVS from "../../provider/header-navs.provider";

export const PublicHeader = () => {
	const [current, setCurrent] = useState(1);
	const onClick = (e) => {
		setCurrent(e.key);
	};

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
				onClick={onClick}
				selectedKeys={[current]}
				items={NAVS.map((nav, index) => {
					return {
						key: index,
						label: (
							<a href={nav.path}>
								{nav.name}
							</a>
						),
						path: nav.path,
					};
				})}
			/>
		</Header>
	);
};
