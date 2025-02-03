import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useOrderStore = create((set, get) => ({
  quality: [],
  agent: [],
  firm: [],
  transport: [],
  pendingOrders: [],
  selectedOrder:[],
  allOrders:[],
  loading: false,
  error: null,
  
  fetchOrderData: async () => {
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
  fetchAgents: async () => {
    set({ loading: true, error: null });
    try {
      const agentsRes = await axiosInstance.get("/agent")
      set({
        agent: agentsRes.data,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false,error:null });
    }
  },
  
  fetchQuality: async () => {
    set({ loading: true, error: null });
    try {
      const agentsRes = await axiosInstance.get("/quality")
      set({
        quality: qualityRes.data,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false,error:null });
    }
  },

  fetchFirms: async (agentId) => {
    try {
        if (!agentId) {
            set({ firms: [], transports: [] });
            return;
        }
        const res = await axios.get(`/api/firms/${agentId}`);
        set({ firms: res.data, transports: [] });
    } catch (error) {
        set({ firms: [], transports: [] }); 
    }
},

fetchTransports: async (firmId) => {
    try {
        if (!firmId) {
            set({ transports: [] });
            return;
        }
        const res = await axios.get(`/api/transports/${firmId}`);
        set({ transports: res.data });
    } catch (error) {
        set({ transports: [] }); 
    }
},



  createOrder:async(orderData)=>{
    set({ loading: true, error: null });
    try {
      const res= await axiosInstance.post("/order",orderData)
      toast.success("order created successfully")
    } catch (error) {
      set({ error: error.message});
    } finally {
      set({ loading: false,error:null });
    }
  },

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

  getAllOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orderRes = await axiosInstance.get("/order");
      set({ allOrders: orderRes.data });
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
      return orderRes.data
    } catch (error) {
      set({ error: error.message });
      toast.error(`Failed to fetch orders: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },

  updateOrder:async(id,formData)=>{
    set({ loading: true, error: null });
    try {
      const orderRes = await axiosInstance.patch(`/order/update/${id}`,formData);
      set({ selectedOrder: orderRes.data });
      return orderRes.data
    } catch (error) {
      set({ error: error.message });
      toast.error(`Failed to fetch orders: ${error.message}`);
    } finally {
      set({ loading: false }); 
    }
  }
  
}));
