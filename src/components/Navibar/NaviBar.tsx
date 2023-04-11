import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import "./NaviBar.css";

const NaviBar = () => {
  const { logout, currentUser } = React.useContext(AuthContext);

  return (
    <div className="test">
      <List className="navi-container">
        {/* <ListItem className="linksContainer">
          <Link className="links" to={"/"}>
            Home
          </Link>
        </ListItem> */}
        {!currentUser ? (
          <ListItem className="linksContainer">
            <Link className="links" to={"/login"}>
              Login
            </Link>
          </ListItem>
        ) : (
          <ListItem className="linksContainer">
            <Link onClick={logout} className="links" to={"/login"}>
              Logout
            </Link>
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default NaviBar;
