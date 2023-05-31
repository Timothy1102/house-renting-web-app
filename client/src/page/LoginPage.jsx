import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import BaseLayout from "../layout/BaseLayout";

const LoginPage = () => {
	const onFinish = (values) => {
		console.log("Received values:", values);
		// Perform login logic here
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
					</Form>
				</div>
			}
		/>
	);
};

export default LoginPage;
