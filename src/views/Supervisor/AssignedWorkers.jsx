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

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSupervisor } from "../../store/actions/supervisorActions";
import { fetchAssignedWorkers } from "../../store/actions/supervisorActions";
import { fetchWorkers } from "../../store/actions/workerActions";


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

class AssignedWorkers extends Component {
  
  componentWillMount() {
    this.props.fetchSupervisor(this.props.id);
    this.props.fetchAssignedWorkers(this.props.id);
    this.props.fetchWorkers();
  };

  handleRemove = (e) => {
    e.preventDefault();
    this.props.removeSupervisor(this.props.id);
    this.props.history.push("../supervisors");
  };

  render() {
    const { classes } = this.props;
    if (this.props.workers) {
      const allworkers = this.props.workers;
      var assignedWorkerData = [];

      for (let [workerId, worker] of Object.entries(allworkers)) {
        var data = [];

        if(this.props.assignedWorkers){
          //get data of assigned workers
          if(this.props.assignedWorkers.length>0 && this.props.assignedWorkers.includes(workerId)){
            data.push(worker.firstName);
            data.push(worker.lastName);
            data.push(
              <Link to={"../workers/" + workerId}>
                <Button color="info" round>
                  View
                </Button>
              </Link>
            );
            //push individual assigned worker data to assignedWorker data array
            assignedWorkerData.push(data)
          }
        }
      }

      //create table of assigned workers
      var details = this.props.assignedWorkers ? (
        <div>
          <Table
            tableHeaderColor="info"
            tableHead={["First Name", "Last Name", "View"]}
            tableData={assignedWorkerData}
          />
        </div>
      ) : (
        <div>
          <p>No Workers Assigned</p>
        </div>
      );
    }

    const supervisor = this.props.supervisor ? (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info">
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardTitleWhite}>ASSIGNED WORKERS</h4>
                  <p className={classes.cardCategoryWhite}>
                    Assigned workers for {this.props.supervisor.firstName}
                  </p>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>{details}</CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    ) : (
      <div>loading....</div>
    )
    return <div>{supervisor}</div>;
  }
}

//load required data from reducer to props
const mapStateToProps = (state, ownProps) => {
  return {
    supervisor: state.supervisor.supervisor,
    assignedWorkers: state.supervisor.assignedWorkers,
    workers: state.worker.workers
  };
};

//load required functions from actions to props
const mapDispatchToProps = dispatch => {
  return {
    fetchSupervisor: id => {
      dispatch(fetchSupervisor(id));
    },
    fetchWorkers: () => {
      dispatch(fetchWorkers());
    },
    fetchAssignedWorkers: (id) => {
      dispatch(fetchAssignedWorkers(id));
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AssignedWorkers));
