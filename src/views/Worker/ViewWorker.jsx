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

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import avatar from "assets/img/faces/default.jpg";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AssignedSupervisors from "./AssignedSupervisors"
import WorkerStatistics from "./WorkerStatistics"
import AssignedTasks from "./AssignedTasks"
import CompletedTasks from "./CompletedTasks"

import { removeWorker } from "../../store/actions/workerActions";
import { fetchWorker } from "../../store/actions/workerActions";
import { fetchAssignedSupervisors } from "../../store/actions/workerActions";
import { fetchAllAssignedWorkers } from "../../store/actions/workerActions";
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

class ViewWorker extends Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: "sm",
    supervisors: [],
    supervisor: ""
  };

  handleClickOpen = e => {
    this.setState({
      open: true
    });
  };

  handleClose = e => {
    this.setState({
      open: false,
    });
  };

  constructor(props) {
    super(props)
    props.fetchWorker(props.match.params.worker_id);
    props.fetchAssignedTasks(props.id);
    props.fetchAssignedSupervisors(props.id);
    props.fetchAllAssignedWorkers();
    props.fetchUserData(props.auth.uid);
  } 
  componentWillReceiveProps(nextProps) {
    if (nextProps.assignedSupervisors != this.props.assignedSupervisors) {
        this.setState({supervisors: nextProps.assignedSupervisors});
    }
  }

  handleRemove = e => {
    e.preventDefault();
    if(this.props.assignedSupervisors){
      for (var supervisorId of this.props.assignedSupervisors){
        var assignedWorkersArray = JSON.parse(this.props.assignedWorkers[supervisorId]);
        var assignedWorkers = assignedWorkersArray.filter(
          worker => worker != this.props.id
        )
        var assignedSupervisors = this.state.supervisors.filter(
            supervisor => supervisor != supervisorId
        )
        
        if(assignedWorkers.length>0){
            this.props.assignWorker(supervisorId,this.props.id,JSON.stringify(assignedWorkers))
        }
        else{
            this.props.removeAssigendWorker(supervisorId)
        }
      }
      this.props.removeAssigendSupervisor(this.props.id);
    }
    this.props.removeWorker(this.props.id, this.props.worker, this.props.user, this.props.auth.uid);
    this.props.history.push("../workers");
  };

  render() {
    const { classes } = this.props;

    const worker = this.props.worker ? (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={2}>
                    <CardAvatar profile>
                    {this.props.worker.profilePictureURL ? (
                      <img src={this.props.worker.profilePictureURL} alt="..." />
                    ): (
                      <img src={avatar} alt="..." />
                    )}
                    </CardAvatar>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <h4 className={classes.cardTitleWhite}>
                      {this.props.worker.firstName.toUpperCase()}
                    </h4>
                    <p className={classes.cardCategoryWhite}>Registered At: {this.props.worker.registeredAt}</p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <Link to={"./report/" + this.props.id}>
                        <Button color="info" round>
                          Get Worker Report
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
                      value={this.props.worker.firstName}
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
                      value={this.props.worker.lastName}
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
                      value={this.props.worker.email}
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
                      value={this.props.worker.contactNumber}
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
                    <Link to={"../workers/edit/" + this.props.id}>
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
              {this.props.worker.firstName} is currently assigned to a task.
            </p>
            ): (
              <p className={classes.cardCategoryBlack}>
              Are you sure you want to remove worker
              {" " + this.props.worker.firstName}?
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
        <AssignedSupervisors id={this.props.id}/>
        <AssignedTasks id={this.props.id}/>
        <CompletedTasks id={this.props.id}/>
        <WorkerStatistics id={this.props.id}/>
      </div>
    ) : (
      <div>
        <p className={classes.cardCategoryBlack} style={{fontSize:"20px", fontWeight:"300"}}>Worker Data Not Available. Check
        <Link to={"../unregisteredusers"}> Unregistered Users</Link>
        </p>
      </div>
    );
    return (
        <div>{worker}</div>  
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.worker_id;
  return {
    id: id,
    worker: state.worker.worker,
    assignedSupervisors: state.worker.assignedSupervisors,
    assignedWorkers: state.worker.assignedWorkers,
    assignedTasks: state.tasks.assignedTasks,
    auth: state.firebase.auth,
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeWorker: (id,worker,user,uid) => {
      dispatch(removeWorker(id,worker,user,uid));
    },
    fetchWorker: id => {
      dispatch(fetchWorker(id));
    },
    fetchAssignedSupervisors: (id) => {
      dispatch(fetchAssignedSupervisors(id));
    },
    fetchAllAssignedWorkers: () => {
      dispatch(fetchAllAssignedWorkers());
    },
    removeAssigendSupervisor: (workerID,index) => {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ViewWorker));
