import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { AuthContext } from "../../contexts/AuthContext";
import AreYouSure from "../AreYouSure/AreYouSure";

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

interface MixedMediaProps {
  mixedMedia: MixedMediaData[] | undefined;
  setOpenMixedModal: (open: boolean) => void;
  openMixedModal: boolean;
  setAddNew: (addNew: { open: boolean; oil: boolean; mixed: boolean }) => void;
}

const MixedMedia: React.FC<MixedMediaProps> = ({
  mixedMedia,
  setOpenMixedModal,
  openMixedModal,
  setAddNew,
}) => {
  const { getOneMixedMedia } = React.useContext(AuthContext);
  const [openAreYouSure, setOpenAreYouSure] = React.useState<{
    open: boolean;
    name: string;
    id: string;
    cat: string
  }>({ open: false, name: "", id: "", cat: "" });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      width: "300px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Painting</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Image Link</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Inventory</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Price ID</StyledTableCell>
              <StyledTableCell>Size</StyledTableCell>
              <StyledTableCell>
                <Button
                  onClick={() =>
                    setAddNew({ open: true, oil: false, mixed: true })
                  }
                  variant="outlined"
                  color="success"
                >
                  Add New Mixed
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mixedMedia?.map((mixed) => (
              <StyledTableRow key={mixed._id}>
                <StyledTableCell>
                  <strong>{mixed.name}</strong>
                  <br />
                  <img
                    style={{ width: "100px" }}
                    src={mixed.src}
                    alt="painting"
                  />
                </StyledTableCell>
                <StyledTableCell>{mixed.bio}</StyledTableCell>
                <StyledTableCell>{mixed.src}</StyledTableCell>
                <StyledTableCell>{mixed.cat}</StyledTableCell>
                <StyledTableCell>{mixed.inventory}</StyledTableCell>
                <StyledTableCell>{mixed.price}</StyledTableCell>
                <StyledTableCell>{mixed.price_id}</StyledTableCell>
                <StyledTableCell>{mixed.size}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    onClick={() => {
                      getOneMixedMedia(mixed._id);
                      setOpenMixedModal(!openMixedModal);
                    }}
                    id={mixed._id}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      setOpenAreYouSure({
                        open: true,
                        name: mixed.name,
                        id: mixed._id,
                        cat: mixed.cat
                      })
                    }
                    id={mixed._id}
                    color="error"
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AreYouSure
        openAreYouSure={openAreYouSure}
        setOpenAreYouSure={setOpenAreYouSure}
      />
    </div>
  );
};

export default MixedMedia;
