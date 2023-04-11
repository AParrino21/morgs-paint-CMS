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

interface OilPaintingData {
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

interface OilPaintingsProps {
  oils: OilPaintingData[] | undefined;
  setOpenOilModal: (open: boolean) => void;
  openOilModal: boolean;
  setAddNew: (addNew: { open: boolean; oil: boolean; mixed: boolean }) => void;
}

const OilPaintings: React.FC<OilPaintingsProps> = ({
  oils,
  setOpenOilModal,
  openOilModal,
  setAddNew,
}) => {
  const { getOneOil } = React.useContext(AuthContext);
  const [openAreYouSure, setOpenAreYouSure] = React.useState<{
    open: boolean;
    name: string;
    id: string;
    cat: string;
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
                    setAddNew({ open: true, oil: true, mixed: false })
                  }
                  variant="outlined"
                  color="success"
                >
                  Add New Painting
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {oils?.map((oil) => (
              <StyledTableRow key={oil._id}>
                <StyledTableCell>
                  <strong>{oil.name}</strong>
                  <br />
                  <img
                    style={{ width: "100px" }}
                    src={oil.image}
                    alt="painting"
                  />
                </StyledTableCell>
                <StyledTableCell>{oil.description}</StyledTableCell>
                <StyledTableCell>{oil.image}</StyledTableCell>
                <StyledTableCell>{oil.cat}</StyledTableCell>
                <StyledTableCell>{oil.inventory}</StyledTableCell>
                <StyledTableCell>{oil.price}</StyledTableCell>
                <StyledTableCell>{oil.price_id}</StyledTableCell>
                <StyledTableCell>{oil.size}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    onClick={() => {
                      getOneOil(oil._id);
                      setOpenOilModal(!openOilModal);
                    }}
                    id={oil._id}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      setOpenAreYouSure({
                        open: true,
                        name: oil.name,
                        id: oil._id,
                        cat: oil.cat
                      })
                    }
                    id={oil._id}
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

export default OilPaintings;
