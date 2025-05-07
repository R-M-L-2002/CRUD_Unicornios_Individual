import axios from "axios";

//para facilitar el uso de api

const api = axios.create({
    baseURL: "https://crudcrud.com/api/6a2a6973bd0c4382a0083bbbaf889c95/unicorns",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api