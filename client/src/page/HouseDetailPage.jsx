import BaseLayout from "../layout/BaseLayout";
import { Select, Button, Table, Space, Tag, message } from "antd";
import { getHouseOfUser, getRoomsOfHouse, deleteRoom } from "../services/house.service";
import { useEffect, useState } from "react";
import { CreateRoomModal } from '../components/CreateRoomModal';
import { useParams } from 'react-router-dom';

export const HouseDetailPage = () => {
	const { id } = useParams();
    const [selectedHouseId, setSelectedHouseId] = useState(id);
    const [selectedHouseTitle, setSelectedHouseTitle] = useState('');
    const [houses, setHouses] = useState([]);
    const [rooms, setRooms] = useState([]);
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

	const handleSelectionChange = (option) => {
		setSelectedHouseId(option.value);
		setSelectedHouseTitle(option.label);
	};

    useEffect(() => {
		// get all rooms belong to a house (call when selectedHouseId is changed)
		async function getRoomData() {
			const rooms = await getRoomsOfHouse(selectedHouseId);
			const roomsData = [];
			for (let i = 0; i < rooms.length; i++) {
				roomsData.push({
					key: i.toString(),
					title: rooms[i]?.title,
					price: rooms[i]?.price,
					area: rooms[i]?.area,
					numberOfPeople: 2,
					contract: "contract",
					tags: ["Đã thanh toán"],
					createdAt: rooms[i]?.createdAt,
					roomId: rooms[i]?.id,
				});
			}
			setRooms(roomsData);
		}

		getRoomData();
	}, [selectedHouseId, refresh]);

	useEffect(() => {
		// get all houses belong to user (only call once when component is mounted)
		async function getHouseData() {
			const housesOfUser = await getHouseOfUser();
            const housesData = [];
            for (let i = 0; i < housesOfUser.length; i++) {
                housesData.push({
                    value: housesOfUser[i]?.id,
                    label: housesOfUser[i]?.title,
                })

				if (housesOfUser[i]?.id == id) {
					setSelectedHouseTitle(housesOfUser[i].title);
				}
            }
            setHouses(housesData);
		}

		getHouseData();
	}, []);

	const [messageApi, contextHolder] = message.useMessage();
	const showSuccessPopup = (msg) => {
		messageApi.open({
			type: "success",
			content: msg,
		});
	};

	const deleteRoomById = async (roomId) => {
		await deleteRoom(roomId);
		showSuccessPopup('Xoá phòng thành công.');
		setRefresh(!refresh);
	};
	
	const columns = [
		{
			title: "Giá",
			dataIndex: "price",
			key: "price",
			render: (text) => <a>{text}</a>,
		},
		{
			title: "Diện tích",
			dataIndex: "area",
			key: "area",
		},
		{
			title: "Số người ở",
			dataIndex: "numberOfPeople",
			key: "numberOfPeople",
		},
		{
			title: "Hợp đồng",
			dataIndex: "contract",
			key: "contract",
			render: (text) => <a className="text-blue-500">{text}</a>,
		},
		{
			title: "Tiền nhà",
			key: "tags",
			dataIndex: "tags",
			render: (_, { tags }) => (
				<>
					{tags.map((tag) => {
						let color = "";
						if (tag === "Chưa thanh toán") {
							color = "volcano";
						} else if (tag === "Đã thanh toán") {
							color = "green";
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: "Action",
			key: "action",
			render: (roomData) => (
				<Space size="middle">
					<Button onClick={() => deleteRoomById(roomData.roomId)}>Delete</Button>
				</Space>
			),
		},
	];

	return (
		<BaseLayout
			content={
				<div className="h-screen">
					{contextHolder}

					<div className="flex justify-between bg-slate-200 p-5 m-5 rounded-[4px]">
						<Select
							labelInValue
							value={selectedHouseTitle}
							style={{
								width: 320,
							}}
							onChange={handleSelectionChange}
							options={houses}
						/>
						<Button type="primary" className="bg-[#1677ff]" onClick={showModal}>
							Thêm phòng
						</Button>
					</div>

					<CreateRoomModal
						showModal={open}
						handleOk={handleOk}
						handleCancel={handleCancel}
						confirmLoading={confirmLoading}
						houseId={selectedHouseId}
					/>

					{rooms.map((room, index) => {
						return (
							<div className="bg-slate-200 p-5 m-5 rounded-[4px]" key={index}>
								<div className="bg-blue-400 text-white p-5 rounded-[4px] ">
									{room.title}
								</div>
								<Table
									columns={columns}
									dataSource={[room]}
									pagination={{
										position: ['none', 'none'],
									}}
								/>
							</div>
						);
						})
					}
				</div>
			}
		/>
	);
};

export default HouseDetailPage;
