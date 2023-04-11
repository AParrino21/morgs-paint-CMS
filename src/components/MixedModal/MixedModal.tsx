import { Modal, Box, TextField, Button } from "@mui/material";
import React from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface MixedModalProps {
  openMixedModal: boolean;
  setOpenMixedModal: (open: boolean) => void;
}

const MixedModal: React.FC<MixedModalProps> = ({
  openMixedModal,
  setOpenMixedModal,
}) => {
  const { setOneMixedMedia, oneMixedMedia, updateMixedMedia, setAlert } =
    React.useContext(AuthContext);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const bioRef = React.useRef<HTMLInputElement>(null);
  const categoryRef = React.useRef<HTMLInputElement>(null);
  const srcRef = React.useRef<HTMLInputElement>(null);
  const inventoryRef = React.useRef<any>(null);
  const priceRef = React.useRef<any>(null);
  const priceIdRef = React.useRef<HTMLInputElement>(null);
  const sizeRef = React.useRef<HTMLInputElement>(null);

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
    padding: "30px",
    borderRadius: "10px",
  };

  function updateMixedMediaData() {
    let updatedMixedData = {
      name: nameRef.current?.value,
      bio: bioRef.current?.value,
      cat: "mixed_media",
      src: srcRef.current?.value,
      inventory: parseInt(inventoryRef.current?.value),
      price: parseInt(priceRef.current?.value),
      price_id: priceIdRef.current?.value,
      size: sizeRef.current?.value,
    };
    if (
      updatedMixedData.name === "" ||
      updatedMixedData.bio === "" ||
      updatedMixedData.src === "" ||
      updatedMixedData.inventory === null ||
      isNaN(updatedMixedData.inventory) ||
      updatedMixedData.price === null ||
      isNaN(updatedMixedData.price) ||
      updatedMixedData.price_id === "" ||
      updatedMixedData.size === ""
    ) {
      setAlert(
        "failed",
        "Something is wrong with your input baby, might be missing something :("
      );
      return;
    }
    updateMixedMedia(oneMixedMedia!._id, updatedMixedData);
    setOpenMixedModal(false);
    setOneMixedMedia(undefined);
    setAlert("success", "Updated Mixed Media!");
  }

  if (!oneMixedMedia) return <div></div>;
  return (
    <div>
      <Modal
        open={openMixedModal}
        onClose={() => {
          setOpenMixedModal(false);
          setOneMixedMedia(undefined);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ textAlign: "center" }}>
            <h2>Edit ~ {oneMixedMedia?.name}</h2>
          </div>
          <br />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Name"
            defaultValue={oneMixedMedia?.name}
            inputRef={nameRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Description"
            defaultValue={oneMixedMedia?.bio}
            inputRef={bioRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Category"
            defaultValue={oneMixedMedia?.cat}
            inputRef={categoryRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Image Link"
            defaultValue={oneMixedMedia?.src}
            inputRef={srcRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Inventory"
            defaultValue={oneMixedMedia?.inventory}
            inputRef={inventoryRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Price"
            defaultValue={oneMixedMedia?.price}
            inputRef={priceRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Price ID"
            defaultValue={oneMixedMedia?.price_id}
            inputRef={priceIdRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Size"
            defaultValue={oneMixedMedia?.size}
            inputRef={sizeRef}
          />
          <div style={{ textAlign: "right" }}>
            <Button onClick={updateMixedMediaData}>SAVE</Button>
            <Button
              onClick={() => {
                setOpenMixedModal(false);
                setOneMixedMedia(undefined);
              }}
            >
              CANCEL
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MixedModal;
