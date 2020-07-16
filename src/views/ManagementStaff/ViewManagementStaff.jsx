import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/default.jpg";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeManagementStaff } from "../../store/actions/managementStaffActions";
import { fetchManagementStaff } from "../../store/actions/managementStaffActions";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class ViewManagementStaff extends Component {
  state = {
    open: false //dialog box for confirming delete
  };

  //open dialog box
  handleClickOpen = e => {
    this.setState({
      open: true
    });
  };

  //close dialog box
  handleClose = e => {
    this.setState({
      open: false
    });
  };

  componentWillMount() {
    this.props.fetchManagementStaff(this.props.id); //fetch details of the staff member
  };

  handleRemove = (e) => {
    e.preventDefault();
    this.props.removeManagementStaff(this.props.id, this.props.managementStaff);
    this.props.history.push("../staff");
  };

  render() {
    const { classes } = this.props;
    const managementStaff = this.props.managementStaff ? (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={2}>
                      <CardAvatar profile>
                      {this.props.managementStaff.profilePictureURL ? (
                        <img src={this.props.managementStaff.profilePictureURL} alt="..." />
                      ): (
                        <img src={avatar} alt="..." />
                      )}
                      </CardAvatar>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <h4 className={classes.cardTitleWhite}>{this.props.managementStaff.firstName.toUpperCase()}</h4>
                    <p className={classes.cardCategoryWhite}>Registered At: {this.props.managementStaff.registeredAt}</p>
                  </GridItem>
                </GridContainer>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="firstName"
                      type="text"
                      value={this.props.managementStaff.firstName}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="lastName"
                      type="text"
                      value={this.props.managementStaff.lastName}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      type="email"
                      value={this.props.managementStaff.email}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Contact Number"
                      id="contactNumber"
                      type="text"
                      value={this.props.managementStaff.contactNumber}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Button color="danger" onClick={this.handleClickOpen}>
                      Remove
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Link to={"../staff/edit/" + this.props.id}>
                      <Button color="info">Edit</Button>
                    </Link>
                  </GridItem>
                </GridContainer>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.dialog}
        >
          <DialogContent>
            <p className={classes.cardCategoryBlack}>
              Are you sure you want to remove management staff member
              {" " + this.props.managementStaff.firstName}?
            </p>
          </DialogContent>
          <DialogActions>
            <Button color="danger" size="sm" onClick={this.handleRemove}>
              Remove
            </Button>
            <Button onClick={this.handleClose} color="transparent" size="sm">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : (
      <div>
        <p className={classes.cardCategoryBlack} style={{fontSize:"20px", fontWeight:"300"}}>Management Staff Data Not Available. Check
        <Link to={"../unregisteredusers"}> Unregistered Users</Link>
        </p>
      </div>
    );
    return <div>{managementStaff}</div>;
  }
}

//load required data from reducer to props
const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.managementStaff_id;
  return {
    id: id,
    managementStaff: state.managementStaff.managementStaff
  };
};

//load required functions from actions to props
const mapDispatchToProps = dispatch => {
  return {
    removeManagementStaff: (id,managementStaff) => {
      dispatch(removeManagementStaff(id,managementStaff));
    },
    fetchManagementStaff: id => {
      dispatch(fetchManagementStaff(id));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ViewManagementStaff));
