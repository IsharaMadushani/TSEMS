import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from '@material-ui/core/Tooltip';

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUserData } from "../../store/actions/authActions";
import { editUserProfile } from "../../store/actions/authActions";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const ErrorTooltip = withStyles({
  tooltip: {
    fontSize: "15px",
    color: "#000000",
    backgroundColor: "#ff9999",
  }
})(Tooltip);

class EditUserProfile extends Component {
  constructor(props) {
    super(props)
    props.fetchUserData(props.auth.uid);
  } 
  componentWillReceiveProps(nextProps) {
    if (nextProps.user != this.props.user) {
      this.setState({ ... nextProps.user, ...this.state });
    }
  }
  componentWillMount() {
    this.props.fetchUserData(this.props.auth.uid);
    this.setState({ ...this.props.user, ...this.state });
  }
  state = {
    open: false,
    tooltipOpen: false
  };

  handleClickOpen = e => {
    e.preventDefault();
    if(this.state.contactNumber.match(/^[0][7][0-9]{8}$/)){
      this.setState({
        open: true
      });
    }
    else{
      this.setState({
        tooltipOpen:true
      })
    }
  };

  handleClose = e => {
    this.setState({
      open: false
    });
  };

  handleTooltipClose = () => {
    this.setState({
      tooltipOpen:false
    })
  };

  handleEdit = e => {
    e.preventDefault();
    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      contactNumber: this.state.contactNumber
    }
    this.props.editUserProfile(this.props.auth.uid, this.props.userType, user);
    this.props.history.push("../user");
  };

  handleChange = e => {
    this.setState({
      tooltipOpen:false
    })
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;

    const user = this.props.user ? (
       <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <form onSubmit={this.handleClickOpen}>
                <CardBody>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                        labelText="First Name"
                        id="firstName"
                        value= {this.state.firstName}
                        handleChange={this.handleChange}
                        formControlProps={{
                            fullWidth: true
                        }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                        labelText="Last Name"
                        id="lastName"
                        value={this.state.lastName}
                        handleChange={this.handleChange}
                        formControlProps={{
                            fullWidth: true
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
                            value={this.state.email}
                            handleChange={this.handleChange}
                            formControlProps={{
                            fullWidth: true
                            }}
                            inputProps={{
                            disabled: true
                            }}
                        />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <ErrorTooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            onClose={this.handleTooltipClose}
                            open={this.state.tooltipOpen}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Please enter a valid phone number"
                            arrow
                          >
                          <CustomInput
                            labelText="Contact Number"
                            id="contactNumber"
                            type="text"
                            value={this.state.contactNumber}
                            handleChange={this.handleChange}
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                          </ErrorTooltip>
                        </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                        <Button type="submit" color="info">
                            UPDATE PROFILE
                        </Button>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                        <Link to={"../user"}>
                            <Button color="grey">
                            Cancel
                            </Button>
                        </Link>
                        </GridItem>
                    </GridContainer>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogContent>
            <p className={classes.cardCategoryBlack}>
              Are you sure you want to save changes?
            </p>
          </DialogContent>
          <DialogActions>
            <Button color="success" size="sm" onClick={this.handleEdit}>
              Save
            </Button>
            <Button onClick={this.handleClose} color="transparent" size="sm">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : (
      <div>loading....</div>
    )
    return <div>{user}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    userType: state.auth.userType,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: (uid) => {
      dispatch(fetchUserData(uid));
    },
    editUserProfile: (uid, userType, userData) => {
        dispatch(editUserProfile(uid,userType,userData))
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditUserProfile));