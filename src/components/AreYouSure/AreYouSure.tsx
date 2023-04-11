import React from "react";
import { Button, Box, Modal } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";

interface AreYouSureProps {
  openAreYouSure: {
    open: boolean;
    name: string;
    id: string;
    cat: string;
  };
  setOpenAreYouSure: (openAreYouSure: {
    open: boolean;
    name: string;
    id: string;
    cat: string;
  }) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: "800px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: "24",
  padding: "60px 30px",
  borderRadius: "10px",
};

const AreYouSure: React.FC<AreYouSureProps> = ({
  openAreYouSure,
  setOpenAreYouSure,
}) => {
  const { deletePainting, deleteMixedMedia, setAlert } =
    React.useContext(AuthContext);

  function handleDelete() {
    if (openAreYouSure.cat === "painting") {
      deletePainting(openAreYouSure.id);
      setOpenAreYouSure({ open: false, name: "", id: "", cat: "" });
      return setAlert("success", "Painting Delete!");
    }
    if (openAreYouSure.cat === "mixed_media") {
      deleteMixedMedia(openAreYouSure.id);
      setOpenAreYouSure({ open: false, name: "", id: "", cat: "" });
      return setAlert("success", "Mixed Media Delete!");
    }
  }

  return (
    <div>
      <Modal
        open={openAreYouSure.open}
        onClose={() =>
          setOpenAreYouSure({ open: false, name: "", id: "", cat: "" })
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>
            Mrs. Bahbowlini .... Are You Sure You Want To Delete{" "}
            {openAreYouSure.name}?
          </h1>
          <br />
          <div style={{ textAlign: "right" }}>
            <Button onClick={handleDelete} color="warning">
              DELETE
            </Button>
            <Button
              onClick={() =>
                setOpenAreYouSure({ open: false, name: "", id: "", cat: "" })
              }
            >
              CANCEL
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AreYouSure;
