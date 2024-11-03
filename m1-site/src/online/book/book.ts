import { BookInterface } from "../../export/interface";
import axiosApi from "../axios/axiosApi";

export const fetchAllBooks = async () => {
    try {
        const response = await axiosApi.get("/books");
        console.log(response);
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}