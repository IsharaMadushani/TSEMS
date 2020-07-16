import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import UnregisteredWorkers from "./UnregisteredWorkers";
import UnregisteredSupervisors from "./UnregisteredSupervisors";
import UnregisteredManagementStaffs from "./UnregisteredManagementStaffs";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "16px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class UnregisteredUsers extends Component {
  constructor(props) {
    super(props)
  } 
  
  render() {
    const { classes } = this.props;
    //load unregistered user components
    return (
      <div>
          <UnregisteredWorkers/>
          <UnregisteredSupervisors />
          <UnregisteredManagementStaffs />
      </div>
    );
  }
}

export default connect()(withStyles(styles)(UnregisteredUsers));
