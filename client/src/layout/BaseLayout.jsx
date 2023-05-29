import { Breadcrumb, Layout } from "antd";
const { Content } = Layout;
import { PublicHeader } from "./Header/Header";
import { PublicFooter } from "./Footer/Footer";

const BaseLayout = ({content}) => {

	return (
		<Layout className="layout">
            <PublicHeader/>

			<Content
				style={{
					padding: "0 50px",
				}}
			>
				<Breadcrumb
					style={{
						margin: "16px 0",
					}}
				>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				{content}
			</Content>

			<PublicFooter/>
		</Layout>
	);
};

export default BaseLayout;
