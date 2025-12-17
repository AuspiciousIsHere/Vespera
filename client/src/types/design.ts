interface ColorDetail {
  hex: string;
  rgb: string;
  hsl: string;
}

export interface DesignColorInput {
  value: string;
  format: "hex" | "rgb";
}

export interface Design {
  _id: string;
  ownerID: string;
  name: string;
  description: string;
  images: string[];
  colors: ColorDetail[];
  gradientCss: string[];
  tags: string[];
  likes: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DesignFormInput {
  // Note: Use File or FileList for the actual form input
  images: File[];
  name: string;
  description: string;
  colors: string[];
  gradients?: string[];
  tags: string[];
}

export interface DesignList {
  status: string;
  total: number;
  data: Design[];
}

export interface DesignSuccessResponse {
  status: string;
  data: Design;
}

export interface DeleteDesignResponse {
  message: string;
}
