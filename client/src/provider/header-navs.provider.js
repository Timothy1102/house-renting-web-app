import ROUTES from "./routes.provider";

const NAVS = [
    {
        path: ROUTES.HOME,
        name: 'Trang chủ',
        requireAuth: false,
    },
    {
        path: ROUTES.HOUSE,
        name: 'Quản lí nhà',
        requireAuth: true,
    },
];

export default NAVS;
