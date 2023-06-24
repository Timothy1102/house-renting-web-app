import BaseLayout from "../layout/BaseLayout";
import { Table, Button } from "antd";
import { getHouseOfUser, deleteHouse } from "../services/house.service";
import { useEffect, useState } from "react";
import { CreateHouseModal } from '../components/modal/CreateHouseModal';
import { Link } from 'react-router-dom';

export const LandlordHousePage = () => {
	const [houses, setHouses] = useState([]);
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const showModal = () => {
		setOpen(true);
	};
	const handleOk = () => {
		setConfirmLoading(true);
		setTimeout(() => {
		setOpen(false);
		setConfirmLoading(false);
		}, 2000);
		setRefresh(!refresh);
	};
	const handleCancel = () => {
		setOpen(false);
	};

	const handleDelete = async (id) => {
		await deleteHouse(id);
		setRefresh(!refresh);
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
			render: (house) => <Button className="text-blue-500" onClick={() => handleDelete(house.houseId)}>Xoá</Button>,
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
					houseId: housesOfUser[i]?.id,
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
	}, [refresh]);

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
						dataSource={houses}
					/>
				</div>
			}
		/>
	);
};

export default LandlordHousePage;
