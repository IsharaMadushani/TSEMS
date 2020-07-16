import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

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

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTaskSupervisor } from "../../store/actions/taskActions";
import { fetchWorkers } from "../../store/actions/workerActions";
import { fetchUnregisteredWorkers } from "../../store/actions/workerActions";


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

class ViewTask extends Component {
  
  componentWillMount() {
    this.props.fetchTaskSupervisor(this.props.supervisorId);
    this.props.fetchWorkers();
    this.props.fetchUnregisteredWorkers();
  }
  render() {
    const { classes } = this.props;

    var assignedWorkersData = "";
    var responsibleWorkerData = "No responsible Worker Assigned"

    if(this.props.workers){
      for (let [key, worker] of Object.entries(this.props.workers)) {
        if(key == this.props.responsibleWorkerId){
          responsibleWorkerData = worker.firstName + " " + worker.lastName
        }
        if(this.props.assignedWorkers.includes(key)){
          assignedWorkersData = assignedWorkersData + worker.firstName + " " + worker.lastName + " , "
        }
      }
    }

    if(this.props.unregisteredWorkers){
      for (let [key, worker] of Object.entries(this.props.unregisteredWorkers)) {
        if(key == this.props.responsibleWorkerId){
          responsibleWorkerData = worker.firstName + " " + worker.lastName + "(Unregistered)"
        }
        if(this.props.assignedWorkers.includes(key)){
          assignedWorkersData = assignedWorkersData + worker.firstName + " " + worker.lastName + "(Unregistered)" + " , "
        }
      }
    }
    const task = this.props.supervisor && this.props.workers ? (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Assigned Employees</h4>
                <p className={classes.cardCategoryWhite}>Assigned Supervisor and Workers for the Task</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Supervisor"
                      id="supervisor"
                      type="text"
                      value={this.props.supervisor.firstName + " " + this.props.supervisor.lastName + (this.props.supervisor.status == "unregistered" ? (" (Unregistered)"):(""))}
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
                      labelText="Responsible Employee"
                      id="title"
                      type="text"
                      value={responsibleWorkerData}
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
                    <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Assigned Workers"
                      id="assignedWorkers"
                      type="text"
                      value={assignedWorkersData.slice(0,-2)}
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
    return <div>{task}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    supervisor: state.tasks.supervisor,
    workers: state.worker.workers,
    unregisteredWorkers: state.worker.unregisteredWorkers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTaskSupervisor: id => {
      dispatch(fetchTaskSupervisor(id));
    },
    fetchWorkers: () => {
      dispatch(fetchWorkers())
    },
    fetchUnregisteredWorkers: () => {
      dispatch(fetchUnregisteredWorkers())
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ViewTask));
