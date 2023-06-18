import BaseLayout from "../layout/BaseLayout";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table, Button } from "antd";
import { getHouseOfUser } from "../services/house.service";
import { useEffect, useState } from "react";
import { CreateHouseModal } from '../components/CreateHouseModal';
import { Link } from 'react-router-dom';

const items = [
	{
		key: "1",
		label: "Action 1",
	},
	{
		key: "2",
		label: "Action 2",
	},
];

export const LandlordHousePage = () => {
	const [houses, setHouses] = useState([]);
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const showModal = () => {
		setOpen(true);
	};
	const handleOk = () => {
		setConfirmLoading(true);
		setTimeout(() => {
		setOpen(false);
		setConfirmLoading(false);
		}, 2000);
	};
	const handleCancel = () => {
		console.log('Clicked cancel button');
		setOpen(false);
	};

	const expandedRowRender = () => {
		const columns = [
			{
				title: "Phòng",
				dataIndex: "roomName",
				key: "roomName",
			},
			{
				title: "Còn Trống?",
				key: "availability",
				render: () => <Badge status="success" text="Yes" />,
			},
			{
				title: "Số người ở",
				dataIndex: "numberOfPeople",
				key: "numberOfPeople",
			},
			{
				title: "Đã thanh toán hoá đơn",
				dataIndex: "billingStatus",
				render: () => <Badge color="red" text="No" />,
			},
			{
				title: "Dư nợ",
				dataIndex: "OwingAmount",
				key: "OwingAmount",
			},
			{
				title: "Action",
				dataIndex: "operation",
				key: "operation",
				render: () => (
					<Space size="middle">
						<a className="text-blue-500">Chi Tiết</a>
						<a className="text-blue-500">Hoá đơn</a>
						<Dropdown
							menu={{
								items,
							}}
						>
							<a className="text-blue-500">
								Xem thêm <DownOutlined />
							</a>
						</Dropdown>
					</Space>
				),
			},
		];
		const data = [];
		for (let i = 0; i < 2; ++i) {
			data.push({
				key: i.toString(),
				roomName: "Phòng 101",
				numberOfPeople: 1,
				OwingAmount: 1200000,
			});
		}
		return <Table columns={columns} dataSource={data} pagination={false} />;
	};
	const columns = [
		{
			title: "Tên nhà",
			dataIndex: "houseName",
			key: "houseName",
		},
		{
			title: "Số phòng",
			dataIndex: "numberOfRooms",
			key: "numberOfRooms",
		},
		{
			title: "Số phòng trống",
			dataIndex: "numberOfAvailableRooms",
			key: "numberOfAvailableRooms",
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
		},
		{
			title: "Thao tác",
			key: "operation",
			render: () => <a className="text-blue-500">Xoá</a>,
		},
	];

	useEffect(() => {
		// get all houses belong to user to show in table
		async function getHouse() {
			const housesOfUser = await getHouseOfUser();
			const data = [];
			for (let i = 0; i < housesOfUser.length; i++) {
				data.push({
					key: i.toString(),
					houseName: <Link to={`/house/${housesOfUser[i]?.id}`} className="text-blue-500">{housesOfUser[i]?.title}</Link>,
					numberOfRooms: housesOfUser[i]?.numberOfRooms,
					numberOfAvailableRooms: 2,
					address: housesOfUser[i]?.address,
					createdAt: housesOfUser[i]?.createdAt,
				});
			}
			setHouses(data);
		}

		getHouse();
	}, []);

	return (
		<BaseLayout
			content={
				<div className="h-screen">
					<div className="flex justify-end items-center mt-10">
						<Button type="primary" className="bg-[#1677ff]" onClick={showModal}>Thêm nhà</Button>
					</div>

					<CreateHouseModal 
						showModal={open}
						handleOk={handleOk}
						handleCancel={handleCancel}
						confirmLoading={confirmLoading}
					/>

					<Table
						className="mt-5"
						columns={columns}
						expandable={{
							expandedRowRender,
						}}
						dataSource={houses}
					/>
				</div>
			}
		/>
	);
};

export default LandlordHousePage;
