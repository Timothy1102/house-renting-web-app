import BaseLayout from "../layout/BaseLayout";
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';

const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];

export const LandlordHousePage = () => {
    const expandedRowRender = () => {
        const columns = [
          {
            title: 'Phòng',
            dataIndex: 'roomName',
            key: 'roomName',
          },
          {
            title: 'Còn Trống?',
            key: 'availability',
            render: () => <Badge status="success" text="Yes" />,
          },
          {
            title: 'Số người ở',
            dataIndex: 'numberOfPeople',
            key: 'numberOfPeople',
          },
          {
            title: 'Đã thanh toán hoá đơn',
            dataIndex: 'billingStatus',
            render: () => <Badge color="red" text="No" />,
          },
          {
            title: 'Dư nợ',
            dataIndex: 'OwingAmount',
            key: 'OwingAmount',
          },
          {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
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
            roomName: 'Phòng 101',
            numberOfPeople: 1,
            OwingAmount: 1200000,
          });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
      };
      const columns = [
        {
          title: 'Tên nhà',
          dataIndex: 'houseName',
          key: 'houseName',
        },
        {
          title: 'Số phòng',
          dataIndex: 'numberOfRooms',
          key: 'numberOfRooms',
        },
        {
          title: 'Số phòng trống',
          dataIndex: 'numberOfAvailableRooms',
          key: 'numberOfAvailableRooms',
        },
        {
          title: 'Địa chỉ',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Ngày tạo',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        {
          title: 'Thao tác',
          key: 'operation',
          render: () => <a className="text-blue-500">Xoá</a>,
        },
      ];
      const data = [];
      for (let i = 0; i < 2; ++i) {
        data.push({
          key: i.toString(),
          houseName: 'Nhà 1',
          numberOfRooms: 5,
          numberOfAvailableRooms: 2,
          address: 500,
          createdAt: '2014-12-24 23:12:00',
        });
      }

    return (
        <BaseLayout
            content={
                <Table className="mt-[50px]"
                    columns={columns}
                    expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ['0'],
                    }}
                    dataSource={data}
                />
            }
        />
    );
}

export default LandlordHousePage;
