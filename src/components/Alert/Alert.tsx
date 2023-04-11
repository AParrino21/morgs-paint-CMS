import { Snackbar, SnackbarContent } from "@mui/material";
import React from "react";
import "./Alert.css";

interface AlertProps {
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
  alertMessage: string;
  alertStatus: string;
}

const Alert: React.FC<AlertProps> = ({
  openAlert,
  setOpenAlert,
  alertMessage,
  alertStatus,
}) => {
  return (
    <div>
      {alertStatus === "success" ? (
        <Snackbar
          open={openAlert}
          autoHideDuration={5000}
          onClose={() => setOpenAlert(false)}
        >
          <SnackbarContent className="success" message={alertMessage} />
        </Snackbar>
      ) : (
        <Snackbar
          open={openAlert}
          autoHideDuration={5000}
          onClose={() => setOpenAlert(false)}
        >
          <SnackbarContent className="failed" message={alertMessage} />
        </Snackbar>
      )}
    </div>
  );
};

export default Alert;
