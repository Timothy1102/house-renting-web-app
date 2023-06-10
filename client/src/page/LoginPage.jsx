import { Form, Input, Button, Checkbox } from "antd";
import BaseLayout from "../layout/BaseLayout";
import { login } from "../services/auth.service";
import ROUTES from "../provider/routes.provider";

const LoginPage = () => {
	const onFinish = async (values) => {
		await login({
			email: values.email,
			password: values.password
		});
		window.location.href = ROUTES.HOME;
	};

	return (
		<BaseLayout
			content={
				<div className="flex justify-center items-center h-screen">
					<Form
						name="login-form"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						className="bg-white p-8 shadow-md rounded w-[500px]"
					>
						<h2 className="text-2xl font-bold mb-6">Login</h2>
						<Form.Item
							name="email"
							rules={[
								{
									required: true,
									message: "Please enter your email!",
								},
							]}
						>
							<Input placeholder="Email" />
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: "Please enter your password!",
								},
							]}
						>
							<Input.Password placeholder="Password" />
						</Form.Item>
						<Form.Item name="remember" valuePropName="checked">
							<Checkbox>Remember me</Checkbox>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="w-full bg-[#1677ff] hover:bg-[#0e5bff]"
							>
								Log in
							</Button>
						</Form.Item>

						<div>
							<a href="http://localhost:3332/register">Đăng kí</a>
						</div>
					</Form>
				</div>
			}
		/>
	);
};

export default LoginPage;
