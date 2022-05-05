import axios from "axios";


const axiosBackend = axios.create({
    baseURL: process.env.REACT_APP_AXIOS === 'development' ? '/api': '/api',
    timeout: 50000,
    headers:{
        authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
    },
});

export default axiosBackend;
