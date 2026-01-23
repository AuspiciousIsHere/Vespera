import type { DesignFormInput, DeleteDesignResponse, DesignSuccessResponse, DesignList, GetPopularDesignsResponse } from "@/types/design";
import { DESIGN_URL } from "@/constant/constants";
import { apiClient } from "@/utils/apiClient";

export const createDesign = async (data: DesignFormInput | FormData): Promise<DesignSuccessResponse> => {
  return apiClient<DesignSuccessResponse>(`${DESIGN_URL}`, { method: "POST", data, headers: { "Content-Type": "multipart/form-data" } });
};

export const getDesigns = async (params: Record<string, any>): Promise<DesignList> => {
  const queryString = new URLSearchParams(params).toString();
  return apiClient<DesignList>(`${DESIGN_URL}/?${queryString}`, { method: "GET" });
};

export const getUserDesigns = async (userID: string | undefined): Promise<DesignList> => {
  return apiClient<DesignList>(`${DESIGN_URL}/?userID=${userID}`, { method: "GET" });
};

export const getDesign = async (DesignID: string): Promise<DesignSuccessResponse> => {
  return apiClient<DesignSuccessResponse>(`${DESIGN_URL}/${DesignID}`, { method: "GET" });
};

export const updateDesign = async (DesignID: string, data: Partial<DesignFormInput>): Promise<DesignSuccessResponse> => {
  return apiClient<DesignSuccessResponse>(`${DESIGN_URL}/${DesignID}`, { method: "PATCH", data });
};

export const deleteDesign = async (designID: string): Promise<DeleteDesignResponse> => {
  return apiClient<DeleteDesignResponse>(`${DESIGN_URL}/${designID}`, { method: "DELETE" });
};

export const deleteDesigns = async (designIDs: string[]): Promise<DeleteDesignResponse> => {
  return apiClient<DeleteDesignResponse>(`${DESIGN_URL}`, { method: "DELETE", data: { designIDs } });
};

export const updateDesignLikes = async (designID: string): Promise<DesignSuccessResponse> => {
  return apiClient<DesignSuccessResponse>(`${DESIGN_URL}/design-likes/${designID}`, { method: "POST" });
};

export const getPopularDesigns = async (): Promise<GetPopularDesignsResponse> => {
  return apiClient<GetPopularDesignsResponse>(`${DESIGN_URL}/popular`, { method: "GET" });
};
