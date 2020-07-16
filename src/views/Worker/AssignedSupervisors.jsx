import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";
import Select from "components/CustomInput/InputSelect.jsx"

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchWorker } from "../../store/actions/workerActions";
import { fetchAssignedSupervisors } from "../../store/actions/workerActions";
import { fetchAllAssignedWorkers } from "../../store/actions/workerActions";
import { fetchSupervisors } from "../../store/actions/supervisorActions";
import { assignSupervisor } from "../../store/actions/workerActions";
import { assignWorker } from "../../store/actions/workerActions";
import { removeAssigendSupervisor } from "../../store/actions/workerActions";
import { removeAssigendWorker } from "../../store/actions/workerActions";
import { fetchTasks } from "../../store/actions/taskActions";
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

class AssignedSupervisors extends Component {
  state = {
    open: false,
    openRemove: false,
    fullWidth: true,
    maxWidth: "sm",
    supervisors: [],
    supervisor: "",
    supervisorId:"",
    taskAssignedSupervisors: []
  };

  handleClickOpen = e => {
    this.setState({
      open: true
    });
  };

  handleClose = e => {
    this.setState({
      open: false,
      supervisor: ""
    });
  };

  handleClickOpenRemove = (id,taskAssignedSupervisors) => {
    this.setState({
      supervisorId:id,
      taskAssignedSupervisors: [...taskAssignedSupervisors],
      openRemove: true
    });
  };

  handleCloseRemove = e => {
    this.setState({
      openRemove: false,
    });
  };

  constructor(props) {
    super(props)
    props.fetchAssignedSupervisors(props.id);
    props.fetchWorker(props.id);
    props.fetchAllAssignedWorkers();
    props.fetchSupervisors();
    props.fetchTasks();
    props.fetchAssignedTasks(props.id);
  } 
  componentWillReceiveProps(nextProps) {
    if (nextProps.assignedSupervisors != this.props.assignedSupervisors) {
        this.setState({supervisors: nextProps.assignedSupervisors});
    }
  }

  handleSelect = e => {
    if(this.state.supervisors){
      var supervisors = this.state.supervisors.filter(Boolean)
      this.setState({
        supervisors: [...supervisors, e.target.value],
        supervisor: e.target.value
      });
    }
    else{
      this.setState({
        supervisors: [e.target.value],
        supervisor: e.target.value
      });
    }
  };

  handleAssign = e => {
    e.preventDefault();
    this.setState({
      supervisors: [...this.state.supervisors, this.state.supervisor],
    })
    if(this.props.assignedWorkers && this.props.assignedWorkers.hasOwnProperty(this.state.supervisor)){
      var assignedWorkersArray = [... JSON.parse(this.props.assignedWorkers[this.state.supervisor]), this.props.id]
    }
    else{
      var assignedWorkersArray = [this.props.id]
    }
    var assignedWorkers = JSON.stringify(assignedWorkersArray)
    var assignedSupervisors = JSON.stringify(this.state.supervisors)
    this.props.assignWorker(this.state.supervisor,this.props.id,assignedWorkers)
    this.props.assignSupervisor(this.props.id,this.state.supervisor,assignedSupervisors)
    this.setState({
      open: false,
    });
    this.props.fetchAssignedSupervisors(this.props.id);
    this.props.fetchWorker(this.props.id);
    this.props.fetchAllAssignedWorkers();
  };
  
  handleRemoveSupervisor = (supervisorId) => {
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
    if(assignedSupervisors.length>0){
        this.props.assignSupervisor(this.props.id, supervisorId,JSON.stringify(assignedSupervisors))
    }
    else{
        this.props.removeAssigendSupervisor(this.props.id);
    }   
    this.props.fetchAssignedSupervisors(this.props.id);
    this.props.fetchWorker(this.props.id);
    this.props.fetchAllAssignedWorkers();

    this.setState({
      openRemove: false,
    });
    // this.props.history.push("../workers/" + this.props.id);
  }

  render() {
    const { classes } = this.props;
    
    if (this.props.supervisors && this.props.tasks && this.props.assignedTasks) {
      const allsupervisors = this.props.supervisors;
      var supervisorData = [];
      var assignedSupervisorData = [];

      var taskAssignedSupervisors = []
      for(let [taskId,task] of Object.entries(this.props.tasks)){
        if(this.props.assignedTasks.includes(taskId)){
          taskAssignedSupervisors.push(task.supervisorUserID)
        }
      }

      for (let [supervisorId, supervisor] of Object.entries(allsupervisors)) {
        var data = [];
        data.push(supervisorId);
        data.push(supervisor.firstName);
        data.push(supervisor.lastName);

        if(this.props.supervisors && (! this.props.assignedSupervisors || ! this.props.assignedSupervisors.includes(supervisorId))){
          supervisorData.push(data);
        }

        if(this.props.assignedSupervisors && this.props.assignedSupervisors.includes(supervisorId)){
          let index = this.props.assignedSupervisors.indexOf(supervisorId)
          data.shift()
          data.push(
            <Link to={"../supervisors/" + supervisorId}>
              <Button color="info" round>
                View
              </Button>
            </Link>
          );
          data.push(
              // {/* <Button id={index} color="danger" round onClick={this.handleRemoveSupervisor.bind(this,index,supervisorId)}> */}
              <Button id={index} color="danger" round onClick={this.handleClickOpenRemove.bind(this,supervisorId,taskAssignedSupervisors)}>
                Remove
              </Button>
          );
          assignedSupervisorData.push(data)
        }
      }
    }

    const details = this.props.supervisors && this.props.tasks && this.props.assignedTasks ? (
      <div>
        <Table
          tableHeaderColor="info"
          tableHead={["First Name", "Last Name", "View","Remove"]}
          tableData={assignedSupervisorData}
        />
      </div>
    ) : (
      <div>
        <p>No Supervisors Assigned</p>
      </div>
    );

    const worker = this.props.worker ? (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info">
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h4 className={classes.cardTitleWhite}>ASSIGNED SUPERVISORS</h4>
                  <p className={classes.cardCategoryWhite}>
                    Assigned Supervisors for {this.props.worker.firstName}
                  </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <span>
                      <Button color="success" onClick={this.handleClickOpen}>Assign New supervisor</Button>
                  </span>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>{details}</CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.dialog}
        >
        <form onSubmit={this.handleAssign}>
          <DialogContent>
            {supervisorData && supervisorData.length>0 ? (
              <GridContainer>
              <h4 className={classes.cardCategoryBlack}>
                SELECT SUPERVISOR
              </h4>
              <GridItem xs={12} sm={12} md={12}>
                <Select
                  labelText="Supervisor"
                  id="supervisor"
                  type="text"
                  value={this.state.supervisor}
                  list={supervisorData}
                  handleChange={this.handleSelect}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiple: false
                  }}
                />
              </GridItem>
              </GridContainer>
            ):(
              <p className={classes.cardCategoryBlack}>
                No Available Supervisors
              </p>
            )}
             
          </DialogContent>
          <DialogActions>
            {supervisorData && supervisorData.length>0 ? (
              <Button color="success" size="sm" type="submit">
                Select
              </Button>
            ):(<div></div>)}
            <Button onClick={this.handleClose} color="transparent" size="sm">
              Cancel
            </Button>
          </DialogActions>
          </form>
        </Dialog>

        {/* dialog box for unassigning supervisor */}
        <Dialog
          open={this.state.openRemove}
          onClose={this.handleCloseRemove}
          className={classes.dialog}
        >
          <DialogContent>
            {this.state.taskAssignedSupervisors.includes(this.state.supervisorId) ? (
              <p className={classes.cardCategoryBlack}>
              {this.props.worker.firstName} is currently assigned to a task supervised by this supervisor
            </p>
            ): (
              <p className={classes.cardCategoryBlack}>
              Are you sure you want to unassign supervisor?
            </p>
            )}
          </DialogContent>
          <DialogActions>
            {this.state.taskAssignedSupervisors.includes(this.state.supervisorId) ? (
              <div></div>
            ) : (
              <Button color="danger" size="sm" onClick={() => {this.handleRemoveSupervisor(this.state.supervisorId)}}>
              Remove
            </Button>
            )}
            <Button onClick={this.handleCloseRemove} color="transparent" size="sm">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : (
      <div>loading....</div>
    );
    return (
        <div>{worker}</div>  
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    worker: state.worker.worker,
    assignedSupervisors: state.worker.assignedSupervisors,
    assignedWorkers: state.worker.assignedWorkers,
    supervisors: state.supervisor.supervisors,
    tasks: state.tasks.tasks,
    assignedTasks: state.tasks.assignedTasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWorker: id => {
      dispatch(fetchWorker(id));
    },
    fetchAssignedSupervisors: (id) => {
      dispatch(fetchAssignedSupervisors(id));
    },
    fetchAllAssignedWorkers: () => {
      dispatch(fetchAllAssignedWorkers());
    },
    fetchSupervisors: () => {
      dispatch(fetchSupervisors());
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
    fetchTasks: () => {
      dispatch(fetchTasks());
    },
    fetchAssignedTasks: (workerID) => {
      dispatch(fetchAssignedTasks(workerID))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AssignedSupervisors));
