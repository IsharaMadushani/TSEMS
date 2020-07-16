import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/default.jpg";

import { connect } from "react-redux";

import { fetchUnregisteredManagementStaff} from "../../store/actions/managementStaffActions";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardCategoryBlack: {
    color: "rgba(0,0,0,.62)",
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
  },
  dialog: {
    backgroundColor: "transparent"
  }
};

class ViewUnregisteredManagementStaff extends Component {

  constructor(props) {
    super(props)
    props.fetchUnregisteredManagementStaff(props.id);
  } 

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
                    <h4 className={classes.cardTitleWhite}>
                      {this.props.managementStaff.firstName.toUpperCase()}
                    </h4>
                    <p className={classes.cardCategoryWhite}>Unregistered At: {this.props.managementStaff.unregisteredAt}</p>
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
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    ) : (
      <div>loading....</div>
    );
    return (
        <div>{managementStaff}</div>  
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.managementStaff_id;
  return {
    id: id,
    managementStaff: state.managementStaff.unregisteredManagementStaff,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUnregisteredManagementStaff: id => {
      dispatch(fetchUnregisteredManagementStaff(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ViewUnregisteredManagementStaff));
