import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
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

import { addWorker } from "../../store/actions/workerActions";
import { setAddWorkerState } from "../../store/actions/workerActions";
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
    fontWeight: "600",
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
};

const ErrorTooltip = withStyles({
  tooltip: {
    fontSize: "15px",
    color: "#000000",
    backgroundColor: "#ff9999",
  }
})(Tooltip);


class AddWorker extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    tooltipOpen: false
  };
  
  handleTooltipClose = () => {
    this.setState({
      tooltipOpen:false
    })
  }

  handleAdd = e => {
    e.preventDefault();

    if(this.state.contactNumber.match(/^[0][7][0-9]{8}$/)){
      let worker = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        contactNumber: this.state.contactNumber
      }
      this.props.addWorker(worker,this.props.user, this.props.auth.uid);
    }
    else{
      this.setState({
        tooltipOpen:true
      })
    }
  };

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
    props.fetchUserData(props.auth.uid);
    props.getUserType(props.auth.uid);
  } 

  componentWillUnmount(){
    this.props.setAddWorkerState()
    this.props.fetchUserData(this.props.auth.uid);
  } 
  
  render() {
    const { classes } = this.props;
    if (this.props.userType == "departmentHead" && this.props.addWorkerError == "success") return <Redirect to="/admin/workers" />;
    if (this.props.userType == "managementStaff" && this.props.addWorkerError == "success") return <Redirect to="/managementstaff/workers" />;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Add Worker</h4>
                {this.props.addWorkerError ? (
                  <p className={classes.cardCategoryRed}>
                    Error: {this.props.addWorkerError}
                  </p>
                ):(
                  <p className={classes.cardCategoryWhite}>
                    Fill in the details of the new worker
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
                    <Link to="../workers">
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
const mapStateToProps = state => {
  return {
    addWorkerError: state.worker.addWorkerError,
    auth: state.firebase.auth,
    user: state.auth.user,
    userType: state.auth.userType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addWorker: (worker,user,uid) => {
      dispatch(addWorker(worker,user,uid));
    },
    setAddWorkerState: () => {
      dispatch(setAddWorkerState());
    },
    fetchUserData: (uid) => {
      dispatch(fetchUserData(uid));
    },
    getUserType: (uid) => {
      dispatch(getUserType(uid))
    },

  };
};
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddWorker));
