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
import { fetchCompletedTasks } from "../../store/actions/taskActions";
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

class CompletedTasks extends Component {
  
  componentWillMount() {
    this.props.fetchCompletedTasks(this.props.id);
    this.props.fetchTasks();
    this.props.fetchSupervisor(this.props.id)
  }
  render() {
    const { classes } = this.props;
    if (this.props.tasks) {
      const alltasks = this.props.tasks;
      var completedTasksData = [];
      var count = 0;

      for (let [taskId, task] of Object.entries(alltasks)) {
        var data = [];
        //display only 5 tasks
        if(count>=5){
          break;
        }
        if(this.props.completedTasks){
          //get completed tasks of the supervisor
          if(this.props.completedTasks.length>0 && this.props.completedTasks.includes(taskId)){
            data.push(taskId);
            data.push(task.title);
            data.push(
              <Link to={"../tasks/" + taskId}>
                <Button color="info" round>
                  View
                </Button>
              </Link>
            );
            //push individal completed task data to completedTasksData array
            completedTasksData.push(data)
            count = count+1
          }
        }
      }

      //create table of completed tasks
      var details = this.props.completedTasks ? (
        <div>
          <Table
            tableHeaderColor="info"
            tableHead={["Task ID", "Title", "View"]}
            tableData={completedTasksData}
          />
        </div>
      ) : (
        <div>
          <p>No Completed Tasks</p>
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
                <GridItem xs={12} sm={12} md={6}>
                  <h4 className={classes.cardTitleWhite}>COMPLETED TASKS</h4>
                  <p className={classes.cardCategoryWhite}>
                    Tasks completed by {this.props.supervisor.firstName}
                  </p>
                </GridItem>
                {/* link to see full list of completed tasks of the supervisor */}
                <GridItem xs={12} sm={12} md={6}>
                  <Link to={"./completedtasks/" + this.props.id}>
                      <Button color="info" round>
                        See All
                      </Button>
                    </Link>
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

//load required data from reducer to props
const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks.tasks,
    completedTasks: state.tasks.completedTasks,
    supervisor: state.supervisor.supervisor
  };
};

//load required functions from actions to props
const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => {
      dispatch(fetchTasks());
    },
    fetchCompletedTasks: (id) => {
      dispatch(fetchCompletedTasks(id));
    },
    fetchSupervisor: (id) => {
        dispatch(fetchSupervisor(id))
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CompletedTasks));
