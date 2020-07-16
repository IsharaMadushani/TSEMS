import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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

import { addMachine } from "../../store/actions/machineActions";
import { setAddMachineState } from "../../store/actions/machineActions";
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

class AddMachine extends Component {
  state = {
    machineid: "",
    label: "",
  };
  
  handleAdd = e => {
    e.preventDefault();
    this.props.addMachine(this.state,this.props.user, this.props.auth.uid); //call add machine function defined in machine actions
  };
  handleChange = e => {
    //when the input field values change, store them in the state
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
    this.props.setAddMachineState()
  } 
  render() {
    const { classes } = this.props;

    //if machine is added successfully, redirect to all machines page
    if (this.props.userType == "departmentHead" && this.props.addMachineError == "success") return <Redirect to="/admin/machines" />;
    if (this.props.userType == "managementStaff" && this.props.addMachineError == "success") return <Redirect to="/managementstaff/machines" />;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Add Machine</h4>
                {this.props.addMachineError ? (
                  <p className={classes.cardCategoryRed}>
                    Error: {this.props.addMachineError}
                  </p>
                ):(
                  <p className={classes.cardCategoryWhite}>
                    Fill in the details of the new machine
                  </p>
                )}
              </CardHeader>
              <form onSubmit={this.handleAdd}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Machine ID"
                        id="machineid"
                        type="text"
                        handleChange={this.handleChange}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Machine label"
                        id="label"
                        type="text"
                        handleChange={this.handleChange}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
            
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
                        <Link to="../machines">
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
};

//load required data from reducer state to props
const mapStateToProps = state => {
  return {
    addMachineError: state.machines.addMachineError,
    auth: state.firebase.auth,
    user: state.auth.user,
    userType: state.auth.userType,
  };
};

//load required functions from actions to props
const mapDispatchToProps = dispatch => {
  return {
    addMachine: (machine,user,uid) => {
      dispatch(addMachine(machine,user,uid));
    },
    setAddMachineState: () => {
      dispatch(setAddMachineState());
    },
    fetchUserData: (uid) => {
      dispatch(fetchUserData(uid));
    },
    getUserType: (uid) => {
      dispatch(getUserType(uid))
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddMachine));
