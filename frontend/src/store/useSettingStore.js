import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSettingStore = create((set,get) => ({
  quality: [],
  agent: [],
  firm: [],
  transport: [],
  loading: false,
  error: null,
  

  fetchSettingsData: async () => {
    set({ loading: true, error: null });
    try {
      const [qualityRes, agentsRes, firmsRes, transportRes] = await Promise.all(
        [
          axiosInstance.get("/quality"),
          axiosInstance.get("/agent"),
          axiosInstance.get("/firm"),
          axiosInstance.get("/transport"),
        ]
      );

      set({
        quality: qualityRes.data,
        agent: agentsRes.data,
        firm: firmsRes.data,
        transport: transportRes.data,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  

  addEntry: async (type, inputData) => {
    set({ error: null });
    
    try {
      const response = await axiosInstance.post(`/${type}`, inputData);
      set((state) => {
        const updatedData = [...state[type], response.data]; 
        return { [type]: updatedData };
      });
      return response.data;
    } catch (error) {
      throw error; 
    }
    
  },
  

  deleteEntry: async (type, id) => {
    set({  error: null });
    try {
      const response = await axiosInstance.delete(`/${type}/${id}`);
      set((state) => {
        const updatedData = state[type].filter(item => item._id !== id); 
        return { [type]: updatedData }; 
      });
      
      return response.data;
    } catch (error) {
      throw error; 
    } 
  },

  editEntry: async (type, id, updatedData) => {
    set({ error: null });
    try {
      const response = await axiosInstance.put(`/${type}/${id}`, updatedData);
      set((state) => {
        const updatedDataArray = state[type].map((item) =>
          item._id === id ? { ...item, ...updatedData } : item
        );
        return { [type]: updatedDataArray };
      });
  
      return response.data; 
    } catch (error) {
      throw error;
    }
  },
  
}));
