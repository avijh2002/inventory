import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useDispatchStore = create((set, get) => ({
  pendingOrders: [], 
  dispatchedOrders:[],
  pendingOrdersOfSelectedQualityId:[],
  pendingOrdersOfSelectedFirmId:[],
  weeklyDispatchSummary:[],
  selectedOrder:null,
  loading: false,
  error: null,

  
  getPendingOrders: async () => {
    set({ loading: true, error: null });

    try {
      const orderRes = await axiosInstance.get("/order/pending");
      set({ pendingOrders: orderRes.data });
    } catch (error) {
      set({ error: error.message });
      toast.error(`Failed to fetch orders: ${error.message}`);
    } finally {
      set({ loading: false }); 
    }
  },

  getPendingOrderById:async(id)=>{
    set({ loading: true, error: null });
    try {
      const orderRes = await axiosInstance.get(`/order/${id}`);
      set({ selectedOrder: orderRes.data });
    } catch (error) {
      set({ error: error.message });
      toast.error(`Failed to fetch orders: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },

  getDispatchedOrders:async ()=>{
    set({ loading: true, error: null });

    try {
      const orderRes = await axiosInstance.get("/order/dispatched");
      set({ dispatchedOrders: orderRes.data });
    } catch (error) {
      set({ error: error.message });
      toast.error(`Failed to fetch orders: ${error.message}`);
    } finally {
      set({ loading: false }); 
    }
  },

  getPendingOrdersOfSelectedQualityId: async (Id) => {
    set({ loading: true, error: null });

    try {
      const orderRes = await axiosInstance.get(`/order/quality/pending/${Id}`);
      set({ pendingOrdersOfSelectedQualityId: orderRes.data });
    } catch (error) {
      set({ error: error.message });
      toast.error(`Failed to fetch orders: ${error.message}`);
    } finally {
      set({ loading: false }); 
    }
  },

  getPendingOrdersOfSelectedFirmId: async (Id) => {
    set({ loading: true, error: null });

    try {
      const orderRes = await axiosInstance.get(`/order/firm/pending/${Id}`);
      set({ pendingOrdersOfSelectedFirmId: orderRes.data });
    } catch (error) {
      set({ error: error.message });
      toast.error(`Failed to fetch orders: ${error.message}`);
    } finally {
      set({ loading: false }); 
    }
  },

  dispatchOrder: async (Id, dispatchData) => {
    set({ loading: true, error: null });
  
    try {
      const orderRes = await axiosInstance.patch(`/order/dispatch/${Id}`, dispatchData);
      toast.success("Order successfully dispatched");
    } catch (error) {
      set({ error: error.message });
      toast.error(`Failed to dispatch order: ${error.response.data.error}`);
    } finally {
      set({ loading: false }); 
    }
  },
  
  getWeeklyDispatchSummary:async()=>{
    set({ loading: true, error: null });
    try {
      const Res = await axiosInstance.get(`/order/dispatch-summary`);
      set({ weeklyDispatchSummary: Res.data });
    } catch (error) {
      set({ error: error.message });
      toast.error(`Failed to fetch orders: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  }

}));
