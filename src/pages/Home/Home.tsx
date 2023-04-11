import React from "react";
import "./Home.css";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../firebase";

import OilPaintings from "../../components/OilPaintings/OilPaintings";
import MixedMedia from "../../components/MixedMedia/MixedMedia";
import { Button } from "@mui/material";
import OilModal from "../../components/OilModal/OilModal";
import MixedModal from "../../components/MixedModal/MixedModal";
import AddPaintingModal from "../../components/AddPaintingModal/AddPaintingModal";

const Home = () => {
  const { currentUser, getAllOils, oils, getAllMixedMedia, mixedmedia } =
    React.useContext(AuthContext);

  const [openTab, setOpenTab] = React.useState<string>("oils");
  const [focusOil, setFocusOil] = React.useState<{
    color: string;
    font: string;
  }>({ color: "black", font: "20px" });
  const [focusMixed, setFocusMixed] = React.useState<{
    color: string;
    font: string;
  }>({ color: "rgb(200, 200, 200)", font: "15px" });
  const [openOilModal, setOpenOilModal] = React.useState<boolean>(false);
  const [openMixedModal, setOpenMixedModal] = React.useState<boolean>(false);
  const [addNew, setAddNew] = React.useState<{
    open: boolean;
    oil: boolean;
    mixed: boolean;
  }>({
    open: false,
    oil: false,
    mixed: false,
  });

  React.useEffect(() => {
    getAllOils();
    getAllMixedMedia();
  }, []);

  if (!currentUser) return <Navigate to="/login" replace />;
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            setOpenTab("oils");
            setFocusOil({ color: "black", font: "20px" });
            setFocusMixed({ color: "rgb(200, 200, 200)", font: "15px" });
          }}
          style={{ color: focusOil.color, fontSize: focusOil.font }}
        >
          Oil Paintings
        </Button>
        <Button
          onClick={() => {
            setOpenTab("mixed");
            setFocusOil({ color: "rgb(200, 200, 200)", font: "15px" });
            setFocusMixed({ color: "black", font: "20px" });
          }}
          style={{ color: focusMixed.color, fontSize: focusMixed.font }}
        >
          Mixed Media
        </Button>
      </div>
      {openTab === "oils" && (
        <div>
          <OilPaintings
            oils={oils}
            setOpenOilModal={setOpenOilModal}
            openOilModal={openOilModal}
            setAddNew={setAddNew}
          />
        </div>
      )}

      {openTab === "mixed" && (
        <div>
          <MixedMedia
            mixedMedia={mixedmedia}
            openMixedModal={openMixedModal}
            setOpenMixedModal={setOpenMixedModal}
            setAddNew={setAddNew}
          />
        </div>
      )}
      <OilModal openOilModal={openOilModal} setOpenOilModal={setOpenOilModal} />
      <MixedModal
        openMixedModal={openMixedModal}
        setOpenMixedModal={setOpenMixedModal}
      />
      <AddPaintingModal addNew={addNew} setAddNew={setAddNew} />
    </div>
  );
};

export default Home;
