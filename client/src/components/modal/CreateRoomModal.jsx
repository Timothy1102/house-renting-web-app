import {
	Modal,
	Button,
	Form,
	Input,
	message,
	Checkbox,
	Col,
	Row,
} from "antd";
import { createRoom } from "../../services/house.service";
import HOUSE_UTILITIES from "../../provider/house-utilities.provider";
import './modal.css';
import { useState } from "react";
import UploadFile from '../input/UploadFile';

export const CreateRoomModal = ({
	showModal,
	handleOk,
	handleCancel,
	confirmLoading,
	houseId,
}) => {
	const [description, setDescription] = useState('');

	const onFinish = async (values) => {
		console.log("🚀 ~ file: CreateRoomModal.jsx:28 ~ onFinish ~ values:", values)
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
				className="flex justify-center"
			>
				<Form
					name="basic"
					labelCol={{
						span: 24,
					}}
					wrapperCol={{
						span: 24,
					}}
					style={{
						maxWidth: '80%',
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					layout="vertical"
				>
					<Form.Item
						label="Tiêu đề"
						name="title"
						rules={[
							{
								required: true,
								message: "Nhập tiêu đề phòng tại đây",
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
						<Input type="number" step="100000" />
					</Form.Item>

					<div className="flex justify-center gap-8">
						<Form.Item
							label="Tầng"
							name="floor"
							rules={[
								{
									required: false,
									message: "Nhập tầng tại đây",
								},
							]}
							className="w-full"
						>
							<Input type="number" step="1" />
						</Form.Item>
						<Form.Item
							label="Diện tích (m2)"
							name="area"
							rules={[
								{
									required: false,
									message: "Nhập diện tích phòng tại đây",
								},
							]}
							className="w-full"
						>
							<Input type="number" step="0.1" />
						</Form.Item>
					</div>

					<div className="flex justify-center gap-8">
						<Form.Item
							label="Giá điện (VNĐ/kwH)"
							name="electricPrice"
							rules={[
								{
									required: true,
									message: "Nhập giá điện tại đây",
								},
							]}
							className="w-full"
						>
							<Input type="number" step="0.1" />
						</Form.Item>
						<Form.Item
							label="Giá nước (VNĐ/khối)"
							name="waterPrice"
							rules={[
								{
									required: true,
									message: "Nhập giá nước tại đây",
								},
							]}
							className="w-full"
						>
							<Input type="number" step="0.1" />
						</Form.Item>
					</div>

					<Form.Item
						label="Mô tả"
						name="description"
						rules={[
							{
								required: false,
								message: "Nhập mô tả phòng tại đây",
							},
						]}
					>
						<Input.TextArea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Mô tả"
							autoSize={{
								minRows: 3,
								maxRows: 5,
							}}
						/>
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
						name="uploads"
						label="Hình ảnh"
						valuePropName="fileList"
						getValueFromEvent={normFile}
					>
						<UploadFile />
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
