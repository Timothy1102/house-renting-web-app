import { Modal, Button, Form, Input, message } from "antd";
import { createRoom } from '../services/house.service';

export const CreateRoomModal = ({
	showModal,
	handleOk,
	handleCancel,
	confirmLoading,
    houseId,
}) => {
	const onFinish = async (values) => {
        const payload = {
            ...values,
            houseId: houseId,
        }
        await createRoom(payload);
        showSuccessPopup('Lưu phòng thành công. Tải lại trang để xem kết quả.');
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
				title="Thêm phòng"
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
								message: "Nhập tiêu đề phong tại đây",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Giá phòng"
						name="price"
						rules={[
							{
								required: true,
								message: "Nhập giá phòng tại đây",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Diện tích"
						name="area"
						rules={[
							{
								required: true,
								message: "Nhập diện tích phòng tại đây",
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
