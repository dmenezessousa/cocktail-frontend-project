import axios from "axios";


const axiosBackend = axios.create({
    baseURL: process.env.REACT_APP_AXIOS === 'development' ? 'http://localhost:3001/api' : '/api',
});

axiosBackend.interceptors.request.use(function(config){
    let token = localStorage.getItem("jwtToken");
    config.headers["Authorization"] = 'Bearer ' + token;
    return config;
});

export default axiosBackend;
