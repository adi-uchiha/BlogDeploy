import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://aditya-blogs.herokuapp.com/api/"
})