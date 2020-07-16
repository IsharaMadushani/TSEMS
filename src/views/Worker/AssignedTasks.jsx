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
import { fetchAssignedTasks } from "../../store/actions/taskActions";
import { fetchTasks } from "../../store/actions/taskActions";
import { fetchWorker } from "../../store/actions/workerActions";

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

class AssignedTasks extends Component {
  
  componentWillMount() {
    this.props.fetchAssignedTasks(this.props.id);
    this.props.fetchTasks();
    this.props.fetchWorker(this.props.id)
  }
  render() {
    const { classes } = this.props;
    if (this.props.tasks) {
      const alltasks = this.props.tasks;
      var assignedTasksData = [];

      for (let [taskId, task] of Object.entries(alltasks)) {
        var data = [];

        if(this.props.assignedTasks){
          if(this.props.assignedTasks.length>0 && this.props.assignedTasks.includes(taskId)){
            data.push(taskId);
            data.push(task.title);
            data.push(
              <Link to={"../tasks/" + taskId}>
                <Button color="info" round>
                  View
                </Button>
              </Link>
            );
            assignedTasksData.push(data)
          }
        }
      }
      var details = this.props.assignedTasks ? (
        <div>
          <Table
            tableHeaderColor="info"
            tableHead={["Task ID", "Title", "View"]}
            tableData={assignedTasksData}
          />
        </div>
      ) : (
        <div>
          <p>No Tasks Assigned</p>
        </div>
      );
    }

    const tasks = this.props.tasks ? (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info">
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardTitleWhite}>ASSIGNED TASKS</h4>
                  <p className={classes.cardCategoryWhite}>
                    Assigned tasks for {this.props.worker.firstName}
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
    return <div>{tasks}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks.tasks,
    assignedTasks: state.tasks.assignedTasks,
    worker: state.worker.worker
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => {
      dispatch(fetchTasks());
    },
    fetchAssignedTasks: (id) => {
      dispatch(fetchAssignedTasks(id));
    },
    fetchWorker: (id) => {
        dispatch(fetchWorker(id))
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AssignedTasks));
