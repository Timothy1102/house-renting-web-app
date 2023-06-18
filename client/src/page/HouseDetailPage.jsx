import BaseLayout from "../layout/BaseLayout";
import { Select, Button, Table, Space, Tag } from "antd";
import { getHouseOfUser } from "../services/house.service";
import { useEffect, useState } from "react";

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
const data = [
	{
		key: "1",
		price: 1200000,
		area: "32m2",
		numberOfPeople: 1,
		contract: "contract",
		tags: ["Chưa thanh toán"],
	},
	{
		key: "2",
		price: 1200000,
		area: "32m2",
		numberOfPeople: 2,
		contract: "contract",
		tags: ["Đã thanh toán"],
	},
];

export const HouseDetailPage = () => {
    const [houses, setHouses] = useState([]);

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

    useEffect(() => {
		// get all houses belong to user
		async function getHouse() {
			const housesOfUser = await getHouseOfUser();
			console.log("🚀 ~ file: HouseDetailPage.jsx:91 ~ getHouse ~ housesOfUser:", housesOfUser)
            const data = [];
            for (let i = 0; i < housesOfUser.length; i++) {
                data.push({
                    value: housesOfUser[i]?.title,
                    label: housesOfUser[i]?.title,
                })
            }
            setHouses(data);
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
						<Button type="primary" className="bg-[#1677ff]">
							Thêm phòng
						</Button>
					</div>

					<div className="bg-slate-200 p-5 m-5 rounded-[4px]">
						<div className="bg-blue-400 text-white p-5 rounded-[4px] ">
							Phong 101
						</div>
						<Table
							columns={columns}
							dataSource={data}
							pagination={{
								position: ['none', 'none'],
							}}
						/>
					</div>
				</div>
			}
		/>
	);
};

export default HouseDetailPage;
