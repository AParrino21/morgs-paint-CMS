import React from "react";
import { tss } from "tss-react";
import ClientCard from "./ClientCard";
import { InquiriesData } from "../../types";

import { inquiries } from "../../../dummyData";
import { Button, Divider } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CircleIcon from "@mui/icons-material/Circle";

import { AuthContext } from "../../contexts/AuthContext";

const useStyles = tss.create({
  inquiriesRoot: {},
  inquiriesContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 50px",
    margin: "10px 0",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#ebebeb",
    },
  },
  nameColumn: {
    display: "flex",
    alignItems: "center",
  },
});

const Inquiries = () => {
  const { classes } = useStyles();
  const { commissionData, getImageUrl } = React.useContext(AuthContext);
  const [currentPage, setCurrentPage] = React.useState<number | null>(null);
  const [clickedUser, setClickedUser] = React.useState<InquiriesData | null>(
    null
  );

  React.useEffect(() => {
    getCurrentUrlId();
  }, []);

  function getCurrentUrlId() {
    const hashValue = window.location.hash.substring(1);
    const numberAfterHash = parseInt(hashValue, 10);
    const currentCard = commissionData?.filter(
      (i: any) => i.id === numberAfterHash.toString()
    );
    setClickedUser(currentCard[0]);
    if (isNaN(numberAfterHash) || !numberAfterHash) {
      setCurrentPage(null);
    } else {
      setCurrentPage(numberAfterHash);
    }
  }

  function openClient(id: string, firstName: string, lastName: string) {
    const currentCard = commissionData.filter((i: any) => i.id === id);
    setClickedUser(currentCard[0]);
    const origin = window.location.origin;
    setCurrentPage(parseInt(id));
    window.location.href = `${origin}/#${id}`;
    getImageUrl({ firstName, lastName });
  }

  return (
    <>
      {!currentPage ? (
        <div className={classes.inquiriesRoot}>
          <Divider />
          <div
            style={{
              textAlign: "center",
              padding: "20px 10px",
              backgroundColor: "black",
            }}
          >
            <p style={{ fontSize: "30px", color: "white" }}>Clients</p>
          </div>
          <Divider />
          {commissionData[0] === "No Clients" ? (
            <div style={{ textAlign: "center", padding: "30px" }}>
              <p style={{ fontSize: "25px" }}>{commissionData[0]}</p>
            </div>
          ) : (
            commissionData?.map((i: any) => (
              <div key={i.id}>
                <div
                  onClick={() => openClient(i.id, i.firstName, i.lastName)}
                  className={classes.inquiriesContainer}
                >
                  <div className={classes.nameColumn}>
                    <div>
                      {i.complete ? (
                        <TaskAltIcon style={{ color: "green" }} />
                      ) : (
                        <CircleIcon style={{ color: "orangered" }} />
                      )}
                    </div>
                    <Button
                      onClick={() => openClient(i.id, i.firstName, i.lastName)}
                    >
                      {i.firstName} {i.lastName}
                    </Button>
                  </div>
                  <p>{i.date}</p>
                </div>
                <Divider />
              </div>
            ))
          )}
        </div>
      ) : (
        <div>
          <ClientCard
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            clickedUser={clickedUser}
            setClickedUser={setClickedUser}
          />
        </div>
      )}
    </>
  );
};

export default Inquiries;
