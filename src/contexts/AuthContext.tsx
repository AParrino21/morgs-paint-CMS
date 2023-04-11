import React from "react";
import { auth } from "../firebase";
import axios from "axios";

interface OilsData {
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

interface MixedMediaData {
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

interface NewOilsData {
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

interface NewMixedMediaData {
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

interface AuthProviderProps {
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
}

interface childrenProps {
  children: React.ReactNode;
}

export const AuthContext = React.createContext({} as AuthProviderProps);

export const AuthProvider = ({ children }: childrenProps) => {
  const [currentUser, setCurrentUser] = React.useState<any | null>();
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertStatus, setAlertStatus] = React.useState<string>("");
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [oils, setOils] = React.useState<OilsData[]>();
  const [oneOil, setOneOil] = React.useState<OilsData | undefined>(undefined);
  const [mixedmedia, setMixedMedia] = React.useState<MixedMediaData[]>();
  const [oneMixedMedia, setOneMixedMedia] = React.useState<
    MixedMediaData | undefined
  >(undefined);

  const URL = import.meta.env.VITE_APP_SERVER_URL;

  function setAlert(aStatus: string, aMessage: string) {
    setOpenAlert(true);
    setAlertStatus(aStatus);
    setAlertMessage(aMessage);
  }

  function login(email: string, password: string) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        console.log(error.message);
        setAlert("failed", "Wrong Email or password Bahbee");
      });
  }

  function logout() {
    return auth.signOut();
  }

  const getAllOils = async () => {
    try {
      const response = await axios.get(URL + "/api/paintings/oils");
      setOils(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneOil = async (id: string) => {
    try {
      const response = await axios.get(URL + "/api/paintings/oils/" + id);
      setOneOil(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMixedMedia = async () => {
    try {
      const response = await axios.get(URL + "/api/paintings/mixedmedia");
      setMixedMedia(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneMixedMedia = async (id: string) => {
    try {
      const response = await axios.get(URL + "/api/paintings/mixedmedia/" + id);
      setOneMixedMedia(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewPainting = async (data: NewOilsData) => {
    try {
      const response = await axios.post(URL + "/api/paintings/cms/oils", data);
      getAllOils()
    } catch (error) {
      console.log(error);
    }
  };

  const updatePainting = async (id: string, data: NewOilsData) => {
    try {
      const response = await axios.put(
        URL + "/api/paintings/cms/oils/" + id,
        data
      );
      getAllOils()
    } catch (error) {
      console.log(error);
    }
  };

  const deletePainting = async (id: string) => {
    try {
      const response = await axios.delete(
        URL + "/api/paintings/cms/oils/" + id
      );
      getAllOils()
    } catch (error) {
      console.log(error);
    }
  };

  const createNewMixedMedia = async (data: NewMixedMediaData) => {
    try {
      const response = await axios.post(URL + "/api/paintings/cms/mixed", data);
      getAllMixedMedia()
    } catch (error) {
      console.log(error);
    }
  };

  const updateMixedMedia = async (id: string, data: NewMixedMediaData) => {
    try {
      const response = await axios.put(
        URL + "/api/paintings/cms/mixed/" + id,
        data
      );
      getAllMixedMedia()
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMixedMedia = async (id: string) => {
    try {
      const response = await axios.delete(
        URL + "/api/paintings/cms/mixed/" + id
      );
      getAllMixedMedia()
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user?.updateProfile({
        displayName: "Bahbee",
      });
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        alertMessage,
        alertStatus,
        setAlert,
        openAlert,
        setOpenAlert,
        getAllOils,
        getOneOil,
        getAllMixedMedia,
        getOneMixedMedia,
        oils,
        oneOil,
        mixedmedia,
        oneMixedMedia,
        setOneOil,
        setOneMixedMedia,
        createNewPainting,
        createNewMixedMedia,
        updatePainting,
        updateMixedMedia,
        deletePainting,
        deleteMixedMedia,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
