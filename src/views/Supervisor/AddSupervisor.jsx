import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addSupervisor } from "../../store/actions/supervisorActions";
import { setAddSupervisorState } from "../../store/actions/supervisorActions";
import { fetchUserData } from "../../store/actions/authActions";
import { getUserType } from "../../store/actions/authActions";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardCategoryRed: {
    color: "rgba(255,0,0,.62)",
    margin: "0",
    fontSize: "20px",
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

//styles for contanct number error tooltip
const ErrorTooltip = withStyles({
  tooltip: {
    fontSize: "15px",
    color: "#000000",
    backgroundColor: "#ff9999",
  }
})(Tooltip);

class AddSupervisor extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    tooltipOpen: false //error tooltip state
  };

  //close error tolltip
  handleTooltipClose = () => {
    this.setState({
      tooltipOpen:false
    })
  }

  handleAdd = e => {
    e.preventDefault();
    //validate contact number
    if(this.state.contactNumber.match(/^[0][7][0-9]{8}$/)){
      let supervisor = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        contactNumber: this.state.contactNumber
      }
      this.props.addSupervisor(supervisor, this.props.user, this.props.auth.uid);
    }
    //show error tooltlip if contact number is not valid
    else{
      this.setState({
        tooltipOpen:true
      })
    }
  };

  //update state when input fields change
  handleChange = e => {
    this.setState({
      tooltipOpen:false
    })
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  constructor(props) {
    super(props)
    props.fetchUserData(props.auth.uid); //fetch current user data to set notifications
    props.getUserType(props.auth.uid);
  } 

  componentWillUnmount(){
    this.props.setAddSupervisorState()
  } 

  render() {
    const { classes } = this.props;
    //redirect to supervisors page after succesfully adding supervisor
    if (this.props.userType == "departmentHead" && this.props.addSupervisorError == "success") return <Redirect to="/admin/supervisors" />;
    if (this.props.userType == "managementStaff" && this.props.addSupervisorError == "success") return <Redirect to="/managementstaff/supervisors" />;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Add Supervisor</h4>
                {this.props.addSupervisorError ? (
                  <p className={classes.cardCategoryRed}>
                    Error: {this.props.addSupervisorError}
                  </p>
                ):(
                  <p className={classes.cardCategoryWhite}>
                    Fill in the details of the new supervisor
                  </p>
                )}
              </CardHeader>
              <form onSubmit={this.handleAdd}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="First Name"
                        id="firstName"
                        type="text"
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
                        type="text"
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
                        handleChange={this.handleChange}
                        formControlProps={{
                          fullWidth: true
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
                        ADD
                    </Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                    <Link to="../supervisors">
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
      </div>
    );
  }
}

//load required data from reducer to props
const mapStateToProps = state => {
  return {
    addSupervisorError: state.supervisor.addSupervisorError,
    auth: state.firebase.auth,
    user: state.auth.user,
    userType: state.auth.userType,
  };
};

//load required functions from actions to props
const mapDispatchToProps = dispatch => {
  return {
    addSupervisor: (supervisor,user,uid) => {
      dispatch(addSupervisor(supervisor,user,uid));
    },
    setAddSupervisorState: () => {
      dispatch(setAddSupervisorState());
    },
    fetchUserData: (uid) => {
      dispatch(fetchUserData(uid));
    },
    getUserType: (uid) => {
      dispatch(getUserType(uid))
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddSupervisor));
