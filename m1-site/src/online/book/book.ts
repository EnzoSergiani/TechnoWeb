import { BookInterface } from "../../export/interface";
import axiosApi from "../axios/axiosApi";

export const fetchAllBooks = async () => {
    try {
        const response = await axiosApi.get("/books");
        //console.log(response);
        return response.data;
    }
    catch(error){
        console.error("Error fetching all books:", error);
    }
};

export const fetchBookById = async (id: number) => {
    try {
      const response = await axiosApi.get(`/books/${id}`);
      //console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching one book:", error);
    }
};

export const createBook = async (bookData: BookInterface) => {
    try {
      const response = await axiosApi.post("/books", bookData);
      //console.log("Book created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
    }
};

export const deleteBookById = async (id: number) => {
    try {
      const response = await axiosApi.delete(`/books/${id}`);
      //console.log("Book deleted:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting book:", error);
    }
};