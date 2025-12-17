import type { DesignFormInput, DeleteDesignResponse, DesignSuccessResponse, DesignList } from "@/types/design";
import { apiClient } from "@/utils/apiClient";

export const createDesign = async (data: DesignFormInput | FormData): Promise<DesignSuccessResponse> => {
  return apiClient<DesignSuccessResponse>("/designs", { method: "POST", data, headers: { "Content-Type": "multipart/form-data" } });
};

export const getDesigns = async (): Promise<DesignList> => {
  return apiClient<DesignList>("/designs", { method: "GET" });
};

export const getUserDesigns = async (userID: string | undefined): Promise<DesignList> => {
  return apiClient<DesignList>(`/designs/?userID=${userID}`, { method: "GET" });
};

export const getDesign = async (DesignID: string): Promise<DesignSuccessResponse> => {
  return apiClient<DesignSuccessResponse>(`/designs/${DesignID}`, { method: "GET" });
};

export const updateDesign = async (DesignID: string, data: Partial<DesignFormInput>): Promise<DesignSuccessResponse> => {
  return apiClient<DesignSuccessResponse>(`/designs/${DesignID}`, { method: "PATCH", data });
};

export const deleteDesign = async (designID: string): Promise<DeleteDesignResponse> => {
  return apiClient<DeleteDesignResponse>(`/designs/${designID}`, { method: "DELETE" });
};
