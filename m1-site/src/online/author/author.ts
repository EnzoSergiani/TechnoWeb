import axiosApi from "@/online/axios/axiosApi";
import { AuthorInterface } from "@/export/interface";

export const fetchAllAuthors = async (): Promise<AuthorInterface[]> => {
    try {
      const response = await axiosApi.get('/authors');
      console.log("Fetched authors:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching authors:", error);
      throw error;
    }
};

export const fetchAuthorById = async (id: number): Promise<AuthorInterface> => {
    try {
      const response = await axiosApi.get(`/authors/${id}`);
      console.log("Fetched author:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching author:", error);
      throw error;
    }
};

export const createAuthor = async (authorData: Omit<AuthorInterface, 'id'>): Promise<AuthorInterface> => {
    try {
      const response = await axiosApi.post('/authors', authorData);
      console.log("Author created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating author:", error);
      throw error;
    }
};

export const updateAuthor = async (authorData: AuthorInterface): Promise<AuthorInterface> => {
    try {
      const response = await axiosApi.put(`/authors/${authorData.id}`, authorData);
      console.log("Author updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating author:", error);
      throw error;
    }
};
  
export const deleteAuthorById = async (id: number): Promise<void> => {
    try {
      await axiosApi.delete(`/authors/${id}`);
      console.log("Author deleted:", id);
    } catch (error) {
      console.error("Error deleting author:", error);
      throw error;
    }
};

export const unassignAuthorFromBook = async (authorId: number, bookId: number): Promise<void> => {
  try{
    if (!authorId || !bookId) {
      throw new Error("Author or book id not provided");
    }
    const getAuthor = await fetchAuthorById(authorId);
    if (!getAuthor) {
      throw new Error("Author not found");
    }
    const updatedBooks = getAuthor.books ? getAuthor.books.filter((book) => book.id !== bookId) : [];
    const updatedAuthor = { ...getAuthor, books: updatedBooks };
    await axiosApi.put(`/authors/${authorId}`, updatedAuthor);
    console.log("Author updated:", updatedAuthor);
  }
  catch(error){
    console.error("Error unassigning author from book:", error);
    throw error;
  }
}; 