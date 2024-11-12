import { ReviewInterface } from "@/export/interface";
import axiosApi from "@/online/axios/axiosApi";

export const fetchReviewsByBookId = async (bookId: number, sort?: 'asc' | 'desc'): Promise<ReviewInterface[]> => {
    try {
      const response = await axiosApi.get(`/books/${bookId}/reviews`, {
        params: { sort },
      });
      console.log("Fetched reviews:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
};

export const createReview = async (bookId: number, reviewData: Omit<ReviewInterface, 'id' | 'createdAt' | 'book'>): Promise<ReviewInterface> => {
    try {
      const response = await axiosApi.post(`/books/${bookId}/reviews`, reviewData);
      console.log("Review created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
};