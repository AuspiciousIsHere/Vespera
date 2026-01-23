import type { DeleteTagResponse, CreateTagInputs, CreateTagResponse, GetUserTagsResponse } from "@/types/tag";
import { TAG_URL } from "@/constant/constants";
import { apiClient } from "@/utils/apiClient";

export const createTag = async (data: CreateTagInputs): Promise<CreateTagResponse> => {
  return apiClient<CreateTagResponse>(`${TAG_URL}`, { method: "POST", data });
};

export const getUserTags = async (userID: string): Promise<GetUserTagsResponse> => {
  return apiClient<GetUserTagsResponse>(`${TAG_URL}/user-tags/${userID}`);
};

export const deleteTag = async (tagID: string): Promise<DeleteTagResponse> => {
  return apiClient<DeleteTagResponse>(`${TAG_URL}/${tagID}`, { method: "DELETE" });
};
