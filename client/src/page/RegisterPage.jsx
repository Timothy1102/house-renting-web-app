import { useContext } from "react";
import { Form, Input, Button, message } from "antd";
import BaseLayout from "../layout/BaseLayout";
import { UserContext } from "../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../provider/routes.provider";
import USER_ROLE from "../provider/user-roles.provider";
import { register } from "../services/auth.service";

const RegisterPage = () => {
	const { isLoggedIn } = useContext(UserContext);
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const showErrorPopup = (msg) => {
		messageApi.open({
			type: "error",
			content: msg,
		});
	};

	// redirect to home page if user is already logged in
	if (isLoggedIn) {
		navigate(ROUTES.HOME);
		return null;
	}

	const onFinish = async (values) => {
		try {
			await register({
				role: USER_ROLE.LANDLORD, //default role
				name: values.username,
				email: values.email,
				password: values.password,
			});
			window.location.href = ROUTES.HOME;
		} catch (error) {
			showErrorPopup(error.response.data.error.errors[0].type)
		}
	};

	return (
		<BaseLayout
			content={
				<div className="flex justify-center items-center h-screen">
					{contextHolder}
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

						<div>
							<a href="http://localhost:3332/login">Đăng nhập</a>
						</div>
					</Form>
				</div>
			}
		/>
	);
};

export default RegisterPage;
