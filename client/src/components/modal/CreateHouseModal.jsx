import { Modal, Button, Form, Input, message, Upload } from "antd";
import { createHouse } from "../../services/house.service";
import { UploadOutlined } from "@ant-design/icons";

export const CreateHouseModal = ({
	showModal,
	handleOk,
	handleCancel,
	confirmLoading,
}) => {
	const onFinish = async (values) => {
		console.log("🚀 ~ file: CreateHouseModal.jsx:13 ~ onFinish ~ values:", values)
		const payload = {
			...values,
			numberOfRooms: 8,
		};
		await createHouse(payload);
		showSuccessPopup("Lưu nhà thành công.");
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

	const normFile = (e) => {
		console.log("Upload event:", e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
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
				footer={[]}
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
						name="upload"
						label="Tải ảnh"
						valuePropName="fileList"
						getValueFromEvent={normFile}
					>
						<Upload
							name="logo"
							action="/upload.do"
							listType="picture"
						>
							<Button icon={<UploadOutlined />}>
								Tải ảnh lên
							</Button>
						</Upload>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button
							type="primary"
							htmlType="submit"
							className="bg-[#1677ff]"
						>
							Lưu
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
