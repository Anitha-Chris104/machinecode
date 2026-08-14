import api from "./api";

// Get all products
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Get single product
export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/${slug}`);
  return response.data.data;
};

// Get related products
export const getRelatedProducts = async (category, slug) => {
  const response = await api.get("/products/related", {
    params: {
      category,
      slug,
    },
  });

  return response.data.data;
};

// Add product
export const addProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

// Update product
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Submit product inquiry
export const submitInquiry = async (inquiryData) => {
  const response = await api.post("/inquiries", inquiryData);
  return response.data;
};

// Get all products for admin
export const getAdminProducts = async (params = {}) => {
  const response = await api.get("/products/admin/list", {
    params,
  });

  return response.data;
};

// Get single product for admin editing
export const getProductById = async (id) => {
  const response = await api.get(`/products/admin/${id}`);

  return response.data.data;
};
// Get product for admin edit
export const getAdminProductById = async (id) => {
  const response = await api.get(`/products/admin/${id}`);

  return response.data;
};
