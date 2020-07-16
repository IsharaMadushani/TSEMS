import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import GroupIcon from "@material-ui/icons/Group";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general.jsx";

import { getNoOfWorkers } from "../../store/actions/dashboardActions";
import { getNoOfSupervisors } from "../../store/actions/dashboardActions";
import { getNoOfManagementStaff } from "../../store/actions/dashboardActions";
import { getNoOfTasks } from "../../store/actions/dashboardActions";
import { getNoOfMachines } from "../../store/actions/dashboardActions";
import { fetchTasks } from "../../store/actions/taskActions";

import {
  lineChart,
  barChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  componentWillMount() {
    this.props.getNoOfWorkers();
    this.props.getNoOfSupervisors();
    this.props.getNoOfManagementStaff();
    this.props.getNoOfTasks();
    this.props.getNoOfMachines();
    this.props.fetchTasks();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes, auth } = this.props;

    //if not signed in as a valid user, redirect to sign in page
    if(!auth.uid) return <Redirect to='/signin'/>
    
    var dt = new Date()
    var tasksInProgressCount = 0;

    //filter tasks
    if(this.props.tasks){
      const alltasks = this.props.tasks;

      //filter completed tasks
      var completedTaskData = [];
      for (let [key, task] of Object.entries(alltasks)) {
        //split completed date
        let completed = task.completedAt.split(" @")
        let date = completed[0].split("/")
        completedTaskData.push({year:parseInt(date[0]),month:parseInt(date[1]),type:task.type}) //date[2]

        //count tasks in progress
        if(task.status == "In-Progress"){
          tasksInProgressCount++
        }
      }

      //filter for this year
      var completedTasksCount = [0,0,0,0,0,0,0,0,0,0,0,0,]
      var taskTypes = [0,0]
      for (let item of completedTaskData){
        if(item.year == dt.getFullYear()){
          completedTasksCount[item.month-1] ++  //data for the task progress graph
          if(item.month == dt.getMonth()+1){
            switch(item.type){  //data for the task type chart
              case "Maintenance": taskTypes[0]++;  //Maintainance
                break
              case "Repair":taskTypes[1]++;
                break
            }
          }
        }
      }

      //filter for last year
      var completedTasksCountPrev = [0,0,0,0,0,0,0,0,0,0,0,0,]
      for (let item of completedTaskData){
        if(item.year == dt.getFullYear()-1){
          completedTasksCountPrev[item.month-1] ++
        }
      }

      var labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
      var completedTasksChart = {
        labels: labels,
        series: [completedTasksCount]
      }
      var completedTasksChartPrev = {
        labels: labels,
        series: [completedTasksCountPrev]
      }
      var taskTypesChart = {
        labels: ["Maintainance", "Repair"],
        series: [taskTypes]
      }
    }
    

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <SupervisorAccount />
                  {/* <Icon>content_copy</Icon> */}
                </CardIcon>
                <p className={classes.cardCategory}>Workers</p>
                <h3 className={classes.cardTitle}>{this.props.noOfWorkers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {/* <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a> */}
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <GroupIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Supervisors</p>
                <h3 className={classes.cardTitle}>{this.props.noOfSupervisors}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                  {/* <DateRange />
                  Last 24 Hours */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <AssignmentIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Tasks In-Progress</p>
                <h3 className={classes.cardTitle}>{tasksInProgressCount}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <SettingsApplicationsIcon />
                  {/* <Icon>info_outline</Icon> */}
                </CardIcon>
                <p className={classes.cardCategory}>Machines</p>
                <h3 className={classes.cardTitle}>{this.props.noOfMachines}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                  {/* <LocalOffer />
                  Tracked from Github */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChartPrev}
                  type="Line"
                  options={lineChart.options}
                  listener={lineChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Completed Task Summary For {dt.getFullYear()-1}
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated just now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart}
                  type="Line"
                  options={lineChart.options}
                  listener={lineChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                Completed Task Summary For {dt.getFullYear()}
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated just now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={taskTypesChart}
                  type="Bar"
                  options={barChart.options}
                  responsiveOptions={barChart.responsiveOptions}
                  listener={barChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Monthly Task Summary</h4>
                <p className={classes.cardCategory}>
                  Summary for this month
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated just now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem> 
        </GridContainer> 
        <GridContainer> */}
          {/* <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem> */}
          {/* <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem> */}
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    noOfWorkers: state.dashboard.noOfWorkers,
    noOfSupervisors: state.dashboard.noOfSupervisors,
    noOfStaff: state.dashboard.noOfStaff,
    noOfTasks: state.dashboard.noOfTasks,
    noOfMachines: state.dashboard.noOfMachines,
    auth: state.firebase.auth,
    tasks: state.tasks.tasks
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getNoOfWorkers: () => {
      dispatch(getNoOfWorkers());
    },
    getNoOfSupervisors: () => {
      dispatch(getNoOfSupervisors());
    },
    getNoOfManagementStaff: () => {
      dispatch(getNoOfManagementStaff());
    },
    getNoOfTasks: () => {
      dispatch(getNoOfTasks())
    },
    fetchTasks: () => {
      dispatch(fetchTasks());
    },
    getNoOfMachines: () => {
      dispatch(getNoOfMachines())
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(dashboardStyle)(Dashboard));
