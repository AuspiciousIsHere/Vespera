export interface Tag {
  _id: string;
  name: string;
  user: string;
}

export interface CreateTagInputs {
  name: string;
}

export interface CreateTagResponse {
  status: string;
  data: Tag;
}

export interface GetUserTagsResponse {
  status: string;
  data: Tag[];
}

export interface DeleteTagResponse {
  status: string;
}
