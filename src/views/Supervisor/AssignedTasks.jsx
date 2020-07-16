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
import { fetchSupervisor} from "../../store/actions/supervisorActions";


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
    this.props.fetchSupervisor(this.props.id)
  }
  render() {
    const { classes } = this.props;
    if (this.props.tasks) {
      const alltasks = this.props.tasks;
      var assignedTasksData = [];

      for (let [taskId, task] of Object.entries(alltasks)) {
        var data = [];

        if(this.props.assignedTasks){
          //get task data of assigned tasks
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
            //push individual assigned task data to assigned taskdata array
            assignedTasksData.push(data)
          }
        }
      }

      //create table of assigned tasks data
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
                    Assigned tasks for {this.props.supervisor.firstName}
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


//load required data  from reducer to props
const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks.tasks,
    assignedTasks: state.tasks.assignedTasks,
    supervisor: state.supervisor.supervisor
  };
};

//load required functions from actions to props
const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => {
      dispatch(fetchTasks());
    },
    fetchAssignedTasks: (id) => {
      dispatch(fetchAssignedTasks(id));
    },
    fetchSupervisor: (id) => {
        dispatch(fetchSupervisor(id))
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AssignedTasks));
