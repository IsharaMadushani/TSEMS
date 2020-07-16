import React, { Component } from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { connect } from "react-redux";
import { fetchTasks } from "../../store/actions/taskActions";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "16px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class ViewMaintenanceAndRepairLogs extends Component {

  componentWillMount() {
    this.props.fetchTasks(); //fetch all tasks
  };

  render() {
    const { classes } = this.props;
    
    if (this.props.tasks) {
        const alltasks = this.props.tasks;
  
        var taskData = [];
        if(this.props.logs.length>0){
          for (let [key, task] of Object.entries(alltasks)) {
            var data = [];
            //get id,title, type of task that are in the machine log
            if(this.props.logs.includes(key)){
              data.push(key)
              data.push(task.title);
              data.push(task.type);
              data.push(
                <Link to={"../tasks/" + key}>
                  <Button color="info" round>
                    View
                  </Button>
                </Link>
              );
              //push individual task data into taskData array
              taskData.push(data);
            }
          }
        }
      }
  
      //create repair logs table
      const details = this.props.tasks && taskData.length>0 ? (
        <div>
          <Table
            tableHeaderColor="info"
            tableHead={["TaskID","Title","Type","View"]}
            tableData={taskData}
          />
        </div>
      ) : (
        <div>
          <p>No Tasks</p>
        </div>
      );
  

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info">
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardTitleWhite}>Maintenance and Repair Logs</h4>
                  <p className={classes.cardCategoryWhite}>
                    Completed Tasks for this machine
                  </p>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>{details}</CardBody> 
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
  c;
}

//load requied data from reducer to props
const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks
  };
};

//load required functions from actions to props
const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => {
      dispatch(fetchTasks());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ViewMaintenanceAndRepairLogs));
