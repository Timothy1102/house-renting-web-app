import {
	Modal,
	Button,
	Form,
	Input,
	message,
	Checkbox,
	Col,
	Row,
	Upload,
} from "antd";
import { createRoom } from "../../services/house.service";
import HOUSE_UTILITIES from "../../provider/house-utilities.provider";
import { UploadOutlined } from "@ant-design/icons";

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
		};
		await createRoom(payload);
		showSuccessPopup("Lưu phòng thành công.");
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
				title="Thêm phòng"
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
						label="Giá điện (VNĐ/số điện)"
						name="electricPrice"
						rules={[
							{
								required: true,
								message: "Nhập giá điện tại đây",
							},
						]}
					>
						<Input type="number" step="0.1" />
					</Form.Item>
					<Form.Item
						label="Giá nước (VNĐ/số nước)"
						name="waterPrice"
						rules={[
							{
								required: true,
								message: "Nhập giá nước tại đây",
							},
						]}
					>
						<Input type="number" step="0.1" />
					</Form.Item>

					<Form.Item name="utilities" label="Tiện ích">
						<Checkbox.Group
							style={{
								width: "100%",
							}}
						>
							<Row>
								{HOUSE_UTILITIES.map((item, index) => (
									<Col span={8} key={index}>
										<Checkbox value={item.value}>
											{item.value}
										</Checkbox>
									</Col>
								))}
							</Row>
						</Checkbox.Group>
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
