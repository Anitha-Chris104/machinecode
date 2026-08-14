import api from "./api";

export const getInquiries = async () => {
  const response = await api.get("/inquiries");
  return response.data;
};

export const getInquiryById = async (id) => {
  const response = await api.get(`/inquiries/${id}`);
  return response.data;
};

export const updateInquiryStatus = async (id, status) => {
  const response = await api.put(`/inquiries/${id}/status`, {
    status,
  });

  return response.data;
};

export const deleteInquiry = async (id) => {
  const response = await api.delete(`/inquiries/${id}`);
  return response.data;
};

export const getRecentInquiries = async () => {
  const response = await api.get("/inquiries/recent");
  return response.data;
};
