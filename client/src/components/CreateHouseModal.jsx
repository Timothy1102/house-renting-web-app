import { Modal, Button, Form, Input, message } from "antd";
import { createHouse } from '../services/house.service';

export const CreateHouseModal = ({
	showModal,
	handleOk,
	handleCancel,
	confirmLoading,
}) => {
	const onFinish = async (values) => {
        const payload = {
            ...values,
            numberOfRooms: 8
        }
        await createHouse(payload);
        showSuccessPopup('Lưu nhà thành công.');
        handleOk();
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

    const [messageApi, contextHolder] = message.useMessage();

	const showSuccessPopup = (msg) => {
		messageApi.open({
			type: "success",
			content: msg,
		});
	};

	return (
		<>
            {contextHolder}
			<Modal
				title="Thêm nhà"
				width={1000}
				open={showModal}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Tiêu đề"
						name="title"
						rules={[
							{
								required: true,
								message: "Nhập tiêu đề nhà tại đây",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Địa chỉ"
						name="address"
						rules={[
							{
								required: true,
								message: "Nhập địa chỉ nhà tại đây",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" htmlType="submit" className="bg-[#1677ff]">
							Lưu
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
