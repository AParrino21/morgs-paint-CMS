import { ReactNode } from "react";

export interface InquiriesData {
  id: string;
  date: any;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  occasion: string;
  image: string;
  price: string;
  complete: boolean;
  file: string;
}

export interface OilsData {
  _id: string;
  cat: string;
  description: string;
  image: string;
  inventory: number;
  name: string;
  price: number;
  price_id: string;
  size: string;
}

export interface MixedMediaData {
  _id: string;
  cat: string;
  bio: string;
  src: string;
  inventory: number;
  name: string;
  price: number;
  price_id: string;
  size: string;
}

export interface NewOilsData {
  _id?: string;
  cat: string | undefined;
  description: string | undefined;
  image: string | undefined;
  inventory: number | undefined;
  name: string | undefined;
  price: number | undefined;
  price_id: string | undefined;
  size: string | undefined;
}

export interface NewMixedMediaData {
  _id?: string;
  cat: string | undefined;
  bio: string | undefined;
  src: string | undefined;
  inventory: number | undefined;
  name: string | undefined;
  price: number | undefined;
  price_id: string | undefined;
  size: string | undefined;
}

export interface AuthProviderProps {
  currentUser: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  alertMessage: string;
  alertStatus: string;
  setAlert: (aStatus: string, aMessage: string) => void;
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
  getAllOils: () => void;
  getOneOil: (id: string) => void;
  getAllMixedMedia: () => void;
  getOneMixedMedia: (id: string) => void;
  oils: OilsData[] | undefined;
  oneOil: OilsData | undefined;
  mixedmedia: MixedMediaData[] | undefined;
  oneMixedMedia: MixedMediaData | undefined;
  setOneOil: (value: OilsData | undefined) => void;
  setOneMixedMedia: (value: MixedMediaData | undefined) => void;
  createNewPainting: (data: NewOilsData) => void;
  updatePainting: (id: string, data: NewOilsData) => void;
  createNewMixedMedia: (data: NewMixedMediaData) => void;
  updateMixedMedia: (id: string, data: NewMixedMediaData) => void;
  deleteMixedMedia: (id: string) => void;
  deletePainting: (id: string) => void;
  commissionData: any;
  setCommissionData: (data: any) => void;
  getImageUrl: (client: { firstName: string; lastName: string }) => void;
  imgUrl: string | undefined;
  openTab: string; 
  setOpenTab: (tab: string) => void;
  setImgUrl: (image:any | null) => void; 
}

export interface childrenProps {
  children: React.ReactNode;
}
