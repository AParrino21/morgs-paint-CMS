import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";

interface AddPaintingModalProps {
  addNew: {
    open: boolean;
    oil: boolean;
    mixed: boolean;
  };
  setAddNew: (addNew: { open: boolean; oil: boolean; mixed: boolean }) => void;
}

const AddPaintingModal: React.FC<AddPaintingModalProps> = ({
  addNew,
  setAddNew,
}) => {
  const { createNewPainting, createNewMixedMedia, setAlert } =
    React.useContext(AuthContext);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLInputElement>(null);
  const imageRef = React.useRef<HTMLInputElement>(null);
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

  function savePainting() {
    if (addNew.oil) {
      let newPaintingData = {
        name: nameRef.current?.value,
        description: descriptionRef.current?.value,
        cat: "painting",
        image: imageRef.current?.value,
        inventory: parseInt(inventoryRef.current?.value),
        price: parseInt(priceRef.current?.value),
        price_id: priceIdRef.current?.value,
        size: sizeRef.current?.value,
      };
      if (
        newPaintingData.name === "" ||
        newPaintingData.description === "" ||
        newPaintingData.image === "" ||
        newPaintingData.inventory === null ||
        isNaN(newPaintingData.inventory) ||
        newPaintingData.price === null ||
        isNaN(newPaintingData.price) ||
        newPaintingData.price_id === "" ||
        newPaintingData.size === ""
      ) {
        setAlert(
          "failed",
          "Something is wrong with your input baby, might be missing something :("
        );
        return;
      }
      createNewPainting(newPaintingData);
      setAddNew({ open: false, oil: false, mixed: false });
      return setAlert("success", "Added New Painting!");
    }
    if (addNew.mixed) {
      let newMixedMediaData = {
        name: nameRef.current?.value,
        bio: descriptionRef.current?.value,
        cat: "mixed_media",
        src: imageRef.current?.value,
        inventory: parseInt(inventoryRef.current?.value),
        price: parseInt(priceRef.current?.value),
        price_id: priceIdRef.current?.value,
        size: sizeRef.current?.value,
      };
      if (
        newMixedMediaData.name === "" ||
        newMixedMediaData.bio === "" ||
        newMixedMediaData.src === "" ||
        newMixedMediaData.inventory === null ||
        isNaN(newMixedMediaData.inventory) ||
        newMixedMediaData.price === null ||
        isNaN(newMixedMediaData.price) ||
        newMixedMediaData.price_id === "" ||
        newMixedMediaData.size === ""
      ) {
        setAlert(
          "failed",
          "Something is wrong with your input baby, might be missing something :("
        );
        return;
      }
      createNewMixedMedia(newMixedMediaData);
      setAddNew({ open: false, oil: false, mixed: false });
      return setAlert("success", "Added New Mixed Media!");
    }
  }

  return (
    <div>
      <Modal
        open={addNew.open}
        onClose={() => setAddNew({ open: false, oil: false, mixed: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ textAlign: "center" }}>
            {addNew.oil && <h2>Add New Oil Painting</h2>}
            {addNew.mixed && <h2>Add New Mixed Media Painting</h2>}
          </div>
          <br />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Name"
            inputRef={nameRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Description"
            inputRef={descriptionRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Image Link"
            inputRef={imageRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Inventory"
            inputRef={inventoryRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Price"
            inputRef={priceRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Price ID"
            inputRef={priceIdRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Size"
            inputRef={sizeRef}
          />
          <div style={{ textAlign: "right" }}>
            <Button onClick={savePainting}>SAVE</Button>
            <Button
              onClick={() =>
                setAddNew({ open: false, oil: false, mixed: false })
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

export default AddPaintingModal;
