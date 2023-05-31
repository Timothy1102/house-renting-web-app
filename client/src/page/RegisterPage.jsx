import { Form, Input, Button } from "antd";
import BaseLayout from "../layout/BaseLayout";

const RegisterPage = () => {
	const onFinish = (values) => {
		console.log("Received values:", values);
		// Perform login logic here
	};

	return (
		<BaseLayout
			content={
				<div className="flex justify-center items-center h-screen">
					<Form
						name="register-form"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						className="bg-white p-8 shadow-md rounded w-[500px]"
					>
						<h2 className="text-2xl font-bold mb-6">Register</h2>
						<Form.Item
							name="username"
							rules={[
								{
									required: true,
									message: "Please enter your username!",
								},
							]}
						>
							<Input placeholder="Username" />
						</Form.Item>
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
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="w-full bg-[#1677ff] hover:bg-[#0e5bff]"
							>
								Register
							</Button>
						</Form.Item>
					</Form>
				</div>
			}
		/>
	);
};

export default RegisterPage;
