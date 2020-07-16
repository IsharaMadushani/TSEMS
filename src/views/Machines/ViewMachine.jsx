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
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { removeMachine } from "../../store/actions/machineActions";
import MaintenanceAndRepairLogs from "./MaintenanceAndRepairLogs";
import { fetchMachine } from "../../store/actions/machineActions";
import { fetchUserData } from "../../store/actions/authActions";

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

class ViewMachine extends Component {
  state = {
    open: false, //handle dialog box open/close
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
      open: false,
    });
  };

  constructor(props) {
    super(props)
    props.fetchMachine(this.props.id); //fetch data of the machine
    props.fetchUserData(props.auth.uid); //fetch current user data to set notification
  } 
  
  handleRemove = (e) => {
    e.preventDefault();
    this.props.removeMachine(this.props.id,this.props.machine,this.props.user,this.props.auth.uid);
    this.props.history.push("../machines");
  };

  render() {
    const { classes } = this.props;
    var logs = []

    if (this.props.machine && this.props.machine.maintenanceAndRepairLogRefs) {
      logs= JSON.parse(this.props.machine.maintenanceAndRepairLogRefs) //parse JSON string containing task IDs of repairs/mentainance of the machine
    }
    
    const machine = this.props.machine ? (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>{this.props.machine.label.toUpperCase()}</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Machine ID"
                      id="machineid"
                      type="text"
                      value={this.props.id}
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
                      labelText="Machine label"
                      id="label"
                      type="text"
                      value={this.props.machine.label}
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
                    <Link to={"../machines/edit/" + this.props.id}>
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
            {/* do not allow deleting when there are ongong tasks for the machine */}
            {this.props.machine.numberOfOngoingTasks>=1 ? (
              <p className={classes.cardCategoryBlack}>
              {this.props.machine.label} is currently under maintenance.
            </p>
            ): (
              <p className={classes.cardCategoryBlack}>
              Are you sure you want to remove machine
              {" " + this.props.machine.label}?
            </p>
            )}
          </DialogContent>
          <DialogActions>
            {this.props.machine.numberOfOngoingTasks>=1 ? (
              <div></div>
            ) : (
              <Button color="danger" size="sm" onClick={this.handleRemove}>
              Remove
            </Button>
            )}
            <Button onClick={this.handleClose} color="transparent" size="sm">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <MaintenanceAndRepairLogs logs={logs}/> 
      </div>
    ) : (
      <div>
        <p className={classes.cardCategoryBlack} style={{fontSize:"20px", fontWeight:"300"}}>Machine Data Not Available.
        </p>
      </div>
    );
    return <div>{machine}</div>;
  }
}

//load required data from reducer to props
const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.machine_id;
  return {
    id: id,
    machine: state.machines.machine,
    auth: state.firebase.auth,
    user: state.auth.user,
  };
};

//load required functions from actions to props
const mapDispatchToProps = dispatch => {
  return {
    removeMachine: (id,machine,user,uid) => {
      dispatch(removeMachine(id,machine,user,uid));
    },
    fetchMachine: id => {
      dispatch(fetchMachine(id));
    },
    fetchUserData: (uid) => {
        dispatch(fetchUserData(uid));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ViewMachine));
