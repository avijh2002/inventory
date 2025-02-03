import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const usePackageStore = create((set, get) => ({
  quality: [],
  lastProduced:[],
  loading: false,
  error: null,

  getQuality:async ()=>{
    set({ loading: true, error: null });
    try {
      const qualityRes=await axiosInstance.get("/quality");
      set((state) => ({
        quality: [...qualityRes.data], 
      }));
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  newPackage: async (qualityId, quantity) => {
    set({ error: null });
  
    try {
      const response = await axiosInstance.patch(`/quality/${qualityId}`, { quantity });
      toast.success("new package created")
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred.';
      set({ error: errorMessage });
  
      return null;
    }
  },

  getLastProduced:async()=>{
    set({ error: null });
  
    try {
      const Res = await axiosInstance.get(`/quality/last-produced`);
      set({lastProduced:Res.data});
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred.';
      set({ error: errorMessage });
      return null;
    }
  }
  
  
}));
