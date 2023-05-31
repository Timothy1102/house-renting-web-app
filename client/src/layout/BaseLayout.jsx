import { Layout } from "antd";
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
				{content}
			</Content>

			<PublicFooter/>
		</Layout>
	);
};

export default BaseLayout;
