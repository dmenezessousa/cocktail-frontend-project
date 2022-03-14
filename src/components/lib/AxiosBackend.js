import axios from "axios";
let url = "http://localhost:3001"

const axiosBackend = axios.create({
    baseURL: url,
    timeout: 50000,
    headers:{
        authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
    },
});

export default axiosBackend;