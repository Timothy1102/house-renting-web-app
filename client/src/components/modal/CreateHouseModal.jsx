import { Modal, Button, Form, Input, message } from "antd";
import { createHouse } from "../../services/house.service";
import UploadFile from '../input/UploadFile';
import { useState } from "react";
import './modal.css';

export const CreateHouseModal = ({
	showModal,
	handleOk,
	handleCancel,
	confirmLoading,
}) => {
	const onFinish = async (values) => {
		const roomImages = fileList.map((file) => file.originFileObj);
		const payload = {
			...values,
			images: roomImages,
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

	const [fileList, setFileList] = useState([]);
	const handleUploadChange = (newFileList) => {
		setFileList(newFileList);
	}

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
						label="Hình ảnh"
						valuePropName="fileList"
					>
						<UploadFile handleOnchange={handleUploadChange} />
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
