import { Modal, Box, TextField, Button } from "@mui/material";
import React from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface OilModalProps {
  openOilModal: boolean;
  setOpenOilModal: (open: boolean) => void;
}

const OilModal: React.FC<OilModalProps> = ({
  openOilModal,
  setOpenOilModal,
}) => {
  const { setOneOil, oneOil, updatePainting, setAlert } =
    React.useContext(AuthContext);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLInputElement>(null);
  const categoryRef = React.useRef<HTMLInputElement>(null);
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

  function updatePaintingData() {
    let updatedPaintingData = {
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
      updatedPaintingData.name === "" ||
      updatedPaintingData.description === "" ||
      updatedPaintingData.image === "" ||
      updatedPaintingData.inventory === null ||
      isNaN(updatedPaintingData.inventory) ||
      updatedPaintingData.price === null ||
      isNaN(updatedPaintingData.price) ||
      updatedPaintingData.price_id === "" ||
      updatedPaintingData.size === ""
    ) {
      setAlert(
        "failed",
        "Something is wrong with your input baby, might be missing something :("
      );
      return;
    }
    updatePainting(oneOil!._id, updatedPaintingData);
    setAlert("success", "Updated Oil Painting!");
    setOpenOilModal(false);
    setOneOil(undefined);
  }

  if (!oneOil) return <div></div>;
  return (
    <div>
      <Modal
        open={openOilModal}
        onClose={() => {
          setOpenOilModal(false);
          setOneOil(undefined);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ textAlign: "center" }}>
            <h2>Edit ~ {oneOil?.name}</h2>
          </div>
          <br />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Name"
            defaultValue={oneOil?.name}
            inputRef={nameRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Description"
            defaultValue={oneOil?.description}
            inputRef={descriptionRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Category"
            defaultValue={oneOil?.cat}
            inputRef={categoryRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Image Link"
            defaultValue={oneOil?.image}
            inputRef={imageRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Inventory"
            defaultValue={oneOil?.inventory}
            inputRef={inventoryRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Price"
            defaultValue={oneOil?.price}
            inputRef={priceRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Price ID"
            defaultValue={oneOil?.price_id}
            inputRef={priceIdRef}
          />
          <TextField
            style={{ width: "100%", marginBottom: "25px" }}
            label="Size"
            defaultValue={oneOil?.size}
            inputRef={sizeRef}
          />
          <div style={{ textAlign: "right" }}>
            <Button onClick={updatePaintingData}>SAVE</Button>
            <Button
              onClick={() => {
                setOpenOilModal(false);
                setOneOil(undefined);
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

export default OilModal;
