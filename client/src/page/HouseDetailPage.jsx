import BaseLayout from "../layout/BaseLayout";
import { Select, Button, Table, Space, Tag } from "antd";
import { getHouseOfUser, getRoomsOfHouse } from "../services/house.service";
import { useEffect, useState } from "react";
import { CreateRoomModal } from '../components/CreateRoomModal';
import { useParams } from 'react-router-dom';

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
		render: () => (
			<Space size="middle">
				<a>Delete</a>
			</Space>
		),
	},
];

export const HouseDetailPage = () => {
	const { id } = useParams();
    const [houses, setHouses] = useState([]);
    const [rooms, setRooms] = useState([]);
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

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

    useEffect(() => {
		// get all houses belong to user
		async function getHouse() {
			const housesOfUser = await getHouseOfUser();
			// console.log("🚀 ~ file: HouseDetailPage.jsx:110 ~ getHouse ~ housesOfUser:", housesOfUser)
			const rooms = await getRoomsOfHouse();
            // console.log("🚀 ~ file: HouseDetailPage.jsx:111 ~ getHouse ~ rooms:", rooms)

            const housesData = [];
            for (let i = 0; i < housesOfUser.length; i++) {
                housesData.push({
                    value: housesOfUser[i]?.title,
                    label: housesOfUser[i]?.title,
                })
            }
            setHouses(housesData);

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
				});
			}
			setRooms(roomsData);
		}

		getHouse();
	}, []);

	return (
		<BaseLayout
			content={
				<div className="h-screen">
					<div className="flex justify-between bg-slate-200 p-5 m-5 rounded-[4px]">
						<Select
							defaultValue={'nhaf'}
							style={{
								width: 320,
							}}
							onChange={handleChange}
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
						houseId={id}
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
