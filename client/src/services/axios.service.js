import axios from 'axios';

export const axiosService = ({url, ...props}) => {
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    return axios({
        baseURL: VITE_API_BASE_URL,
        url: url,
        ...props
    })
};
