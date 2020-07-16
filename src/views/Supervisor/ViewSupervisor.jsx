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

import AssignedWorkers from "./AssignedWorkers"
import SupervisorStatistics from "./SupervisorStatistics"
import AssignedTasks from "./AssignedTasks"
import CompletedTasks from "./CompletedTasks"

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeSupervisor } from "../../store/actions/supervisorActions";
import { fetchSupervisor } from "../../store/actions/supervisorActions";
import { fetchAssignedWorkers } from "../../store/actions/supervisorActions";
import { fetchAllAssignedSupervisors } from "../../store/actions/supervisorActions" 
import { assignSupervisor } from "../../store/actions/workerActions";
import { assignWorker } from "../../store/actions/workerActions";
import { removeAssigendSupervisor } from "../../store/actions/workerActions";
import { removeAssigendWorker } from "../../store/actions/workerActions";
import { fetchUserData } from "../../store/actions/authActions";
import { fetchAssignedTasks } from "../../store/actions/taskActions";


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

class ViewSupervisor extends Component {
  state = {
    open: false //dialog box state
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
  constructor(props) {
    super(props)
    props.fetchSupervisor(this.props.id);
    props.fetchAssignedWorkers(this.props.id);
    props.fetchAssignedTasks(props.id);
    props.fetchAllAssignedSupervisors();
    props.fetchUserData(props.auth.uid);
  } 
  
  handleRemove = (e) => {
    e.preventDefault();
    if(this.props.assignedWorkers){

      //remove supervisor from all assigned workers
      for (var workerId of this.props.assignedWorkers){
        var assignedSupervisorsArray = JSON.parse(this.props.assignedSupervisors[workerId]);
        var assignedSupervisors = assignedSupervisorsArray.filter(
          supervisor => supervisor != this.props.id
        )
        // var assignedWorkers = this.props.assignedWorkers.filter(
        //     worker => worker != workerId
        // )
        
        if(assignedSupervisors.length>0){
            this.props.assignSupervisor(workerId,this.props.id,JSON.stringify(assignedSupervisors))
        }
        else{
            this.props.removeAssigendSupervisor(workerId)
        }
      }
      this.props.removeAssigendWorker(this.props.id);
    }
    this.props.removeSupervisor(this.props.id,this.props.supervisor, this.props.user, this.props.auth.uid);
    this.props.history.push("../supervisors");
  };
  render() {
    const { classes } = this.props;
   
    const supervisor = this.props.supervisor ? (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <GridContainer>
                <GridItem xs={12} sm={12} md={2}>
                      <CardAvatar profile>
                      {this.props.supervisor.profilePictureURL ? (
                        <img src={this.props.supervisor.profilePictureURL} alt="..." />
                      ): (
                        <img src={avatar} alt="..." />
                      )}
                      </CardAvatar>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <h4 className={classes.cardTitleWhite}>{this.props.supervisor.firstName.toUpperCase()}</h4>
                    <p className={classes.cardCategoryWhite}>Registered At: {this.props.supervisor.registeredAt}</p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                      <Link to={"./report/" + this.props.id}>
                        <Button color="info" round>
                          Get Report
                        </Button>
                      </Link>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                    <Link to={"./monthlyreport/" + this.props.id}>
                        <Button color="info" round>
                          Get Monthly Reports
                        </Button>
                      </Link>
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
                      value={this.props.supervisor.firstName}
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
                      value={this.props.supervisor.lastName}
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
                      value={this.props.supervisor.email}
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
                      value={this.props.supervisor.contactNumber}
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
                    <Link to={"../supervisors/edit/" + this.props.id}>
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
          {this.props.assignedTasks ? (
              <p className={classes.cardCategoryBlack}>
              {this.props.supervisor.firstName} is currently supervising a task.
            </p>
            ): (
              <p className={classes.cardCategoryBlack}>
              Are you sure you want to remove worker
              {" " + this.props.supervisor.firstName}?
            </p>
            )}
          </DialogContent>
          <DialogActions>
            {this.props.assignedTasks ? (
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
        <AssignedWorkers id={this.props.id}/>
        <AssignedTasks id={this.props.id} />
        <CompletedTasks id={this.props.id} />
        <SupervisorStatistics id={this.props.id}/>
      </div>
    ) : (
      <div>
        <p className={classes.cardCategoryBlack} style={{fontSize:"20px", fontWeight:"300"}}>Supervisor Data Not Available. Check
        <Link to={"../unregisteredusers"}> Unregistered Users</Link>
        </p>
      </div>
    )
    return <div>{supervisor}</div>;
  }
}

//load required data from reducer to props
const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.supervisor_id;
  return {
    id: id,
    supervisor: state.supervisor.supervisor,
    assignedSupervisors: state.supervisor.assignedSupervisors,
    assignedWorkers: state.supervisor.assignedWorkers,
    assignedTasks: state.tasks.assignedTasks,
    auth: state.firebase.auth,
    user: state.auth.user,
  };
};

//load required functions from actions to props
const mapDispatchToProps = dispatch => {
  return {
    removeSupervisor: (id,supervisor,user,uid) => {
      dispatch(removeSupervisor(id,supervisor,user,uid));
    },
    fetchSupervisor: id => {
      dispatch(fetchSupervisor(id));
    },
    fetchAssignedWorkers: (id) => {
      dispatch(fetchAssignedWorkers(id));
    },
    fetchAllAssignedSupervisors: () => {
      dispatch(fetchAllAssignedSupervisors());
    },
    assignSupervisor: (workerId,supervisorId,supervisors) => {
      dispatch(assignSupervisor(workerId,supervisorId,supervisors));
    },
    removeAssigendSupervisor: (workerID) => {
      dispatch(removeAssigendSupervisor(workerID));
    },
    assignWorker: (supervisorId,workerId, workers) => {
      dispatch(assignWorker(supervisorId,workerId, workers));
    },
    removeAssigendWorker: (supervisorId) => {
      dispatch(removeAssigendWorker(supervisorId));
    },
    fetchUserData: (uid) => {
      dispatch(fetchUserData(uid));
    },
    fetchAssignedTasks: (id) => {
      dispatch(fetchAssignedTasks(id));
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ViewSupervisor));
