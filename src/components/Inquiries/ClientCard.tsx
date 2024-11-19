import React, { lazy } from "react";
import { tss } from "tss-react";
import { Button, Divider } from "@mui/material";
import { InquiriesData } from "../../types";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const useStyles = tss.create({
  clientCardRoot: {},
  cardContainer: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    margin: "50px auto",
    "& div p": {
      fontSize: "20px",
      padding: "5px",
      fontWeight: "600",
    },
  },
});

export interface ClientCardProps {
  currentPage: number | null;
  setCurrentPage: (page: number | null) => void;
  clickedUser: InquiriesData | null;
  setClickedUser: (user: any | null) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({
  currentPage,
  setCurrentPage,
  clickedUser,
  setClickedUser,
}) => {
  const { classes } = useStyles();
  const { commissionData, setCommissionData, imgUrl, getImageUrl, setImgUrl } =
    React.useContext(AuthContext);
  const URL = import.meta.env.VITE_APP_SERVER_URL;

  React.useEffect(() => {
    if (!imgUrl) {
      const hashValue = window.location.hash.substring(1);
      const currentCard = commissionData?.filter(
        (i: any) => i.id === hashValue.toString()
      );
      setClickedUser(currentCard[0]);
    }
  }, []);

  React.useEffect(() => {
    if (!imgUrl) {
      const client = {
        firstName: clickedUser?.firstName,
        lastName: clickedUser?.lastName,
      };
      getImageUrl(client as { firstName: string; lastName: string });
    }
  }, [clickedUser]);

  function handleBack() {
    const backUrl = window.location.href.split("#")[0];
    setCurrentPage(null);
    setClickedUser(null);
    setImgUrl(null);
    window.history.pushState({}, "", backUrl);
  }

  function updateTaskStatus(statusObj: { id: string; status: string }) {
    try {
      const response = axios.put(
        URL + "/api/paintings/cms/updateTaskStatus/",
        statusObj
      );
      if (statusObj.status === "open") {
        setClickedUser((prevState: any) => ({
          ...prevState,
          complete: false,
        }));
        setCommissionData((prevItems: any) =>
          prevItems.map((item: any) =>
            item.id === statusObj.id ? { ...item, complete: false } : item
          )
        );
      } else {
        setClickedUser((prevState: any) => ({
          ...prevState,
          complete: true,
        }));
        setCommissionData((prevItems: any) =>
          prevItems.map((item: any) =>
            item.id === statusObj.id ? { ...item, complete: true } : item
          )
        );
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.clientCardRoot}>
      <Divider />
      <div
        style={{
          textAlign: "center",
          padding: "20px 10px",
          backgroundColor: "black",
        }}
      >
        <p style={{ fontSize: "30px", color: "white" }}>
          {clickedUser?.firstName} {clickedUser?.lastName}
        </p>
      </div>
      <Divider />
      <div className={classes.cardContainer}>
        <div>
          <Button onClick={handleBack}>Back</Button>
          <br />
          <br />
          <p>Date: {clickedUser?.date}</p>
          <br />
          <p>Email: {clickedUser?.email}</p>
          <p>Phone: {clickedUser?.phoneNumber}</p>
          <p>
            Address: {clickedUser?.address} {clickedUser?.city}
          </p>
          <p>
            {clickedUser?.state} {clickedUser?.zipCode}
          </p>
          <p>Occasion: {clickedUser?.occasion}</p>
          <p>Price: {clickedUser?.price}</p>
          <br />
          <br />
          <p>
            {clickedUser?.complete ? (
              <Button
                onClick={() =>
                  updateTaskStatus({ id: clickedUser?.id, status: "open" })
                }
                variant="contained"
                color="success"
              >
                ReOpen-Task
              </Button>
            ) : (
              <Button
                onClick={() =>
                  updateTaskStatus({
                    id: clickedUser?.id as string,
                    status: "close",
                  })
                }
                variant="contained"
                color="error"
              >
                Close-Task
              </Button>
            )}
          </p>
        </div>
        <div>
          <img
            style={{ width: "85%", maxWidth: "600px" }}
            src={imgUrl}
            alt="reference"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ClientCard;
