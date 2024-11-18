import React from "react";
import { auth } from "../firebase";
import axios from "axios";
import {
  AuthProviderProps,
  childrenProps,
  MixedMediaData,
  NewMixedMediaData,
  NewOilsData,
  OilsData,
} from "../types";

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
  const [commissionData, setCommissionData] = React.useState<any>();
  const [imgUrl, setImgUrl] = React.useState<string>();
  const [openTab, setOpenTab] = React.useState<string>("oils");

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
      getAllOils();
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
      getAllOils();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePainting = async (id: string) => {
    try {
      const response = await axios.delete(
        URL + "/api/paintings/cms/oils/" + id
      );
      getAllOils();
    } catch (error) {
      console.log(error);
    }
  };

  const createNewMixedMedia = async (data: NewMixedMediaData) => {
    try {
      const response = await axios.post(URL + "/api/paintings/cms/mixed", data);
      getAllMixedMedia();
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
      getAllMixedMedia();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMixedMedia = async (id: string) => {
    try {
      const response = await axios.delete(
        URL + "/api/paintings/cms/mixed/" + id
      );
      getAllMixedMedia();
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

  const getWeddingClientData = async () => {
    try {
      const response = await axios.get(
        URL + "/api/paintings/cms/getWeddingCommissions/"
      );
      setCommissionData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getWeddingClientData();
  }, []);

  const getImageUrl = async (client: {
    firstName: string | undefined;
    lastName: string | undefined;
  }) => {
    try {
      const response = await axios.post(
        URL + "/api/paintings/cms/getWeddingImg/",
        client
      );
      setImgUrl(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };

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
        commissionData,
        getImageUrl,
        imgUrl,
        openTab,
        setOpenTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
