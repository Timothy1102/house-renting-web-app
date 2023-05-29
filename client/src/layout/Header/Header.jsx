import { Layout, Menu } from "antd";
const { Header } = Layout;

export const PublicHeader = () => {
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
				defaultSelectedKeys={["2"]}
				items={new Array(4).fill(null).map((_, index) => {
					const key = index + 1;
					return {
						key,
						label: `nav ${key}`,
					};
				})}
			/>
		</Header>
	);
};
