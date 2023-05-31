import { useContext, useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import BaseLayout from "../layout/BaseLayout";
import { UserContext } from "../contexts/UserProvider";
import { useNavigate } from 'react-router-dom';
import ROUTES from "../provider/routes.provider";
import { register } from "../services/auth.service";

const RegisterPage = () => {
	const [showAlert, setShowAlert] = useState(false);
	const {isLoggedIn} = useContext(UserContext);
	const navigate = useNavigate();

	// redirect to home page if user is already logged in
	if (isLoggedIn) {
		navigate(ROUTES.HOME);
		return null;
	}

	const onFinish = async (values) => {
		await register({
			role: 'landlord', //default role
			name: values.username,
			email: values.email,
			password: values.password
		});
		setShowAlert(true);
		window.location.href = ROUTES.HOME;
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

					{showAlert ? <Alert message="🚀 Đăng kí thành công!" type="success" /> : null}
				</div>
			}
		/>
	);
};

export default RegisterPage;
