import type { DesignFormInput, DeleteDesignResponse, DesignSuccessResponse, DesignList } from "@/types/design";
import { apiClient } from "@/utils/apiClient";

const DESIGN_URL = "/designs";

export const createDesign = async (data: DesignFormInput | FormData): Promise<DesignSuccessResponse> => {
  return apiClient<DesignSuccessResponse>(`${DESIGN_URL}`, { method: "POST", data, headers: { "Content-Type": "multipart/form-data" } });
};

export const getDesigns = async (): Promise<DesignList> => {
  return apiClient<DesignList>(`${DESIGN_URL}`, { method: "GET" });
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
