import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTask } from "../../store/actions/taskActions";
import { fetchTaskActivityLogs } from "../../store/actions/taskActions";

import AssignedEmployees from "./AssignedEmployees"


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
  },
  timelineTextBlack: {
    color: "rgba(0,0,0,.62)",
    margin: "0",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "0"
  },
  timelineTitleBlack: {
    color: "#000000",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class ViewTask extends Component {

  constructor(props) {
    super(props)
    props.fetchTask(props.id);
    props.fetchTaskActivityLogs(props.id)
  } 
  
  render() {
    const { classes } = this.props;

    if(this.props.task){
      var workers = this.props.task.assignedEmployees ? (
        JSON.parse(this.props.task.assignedEmployees)
      ): (
        ""
      )
    }
    if(this.props.taskActivityLogs){
      var activityData = [];
      for (let [key, activity] of Object.entries(this.props.taskActivityLogs)) {
        var data = (
          <TimelineItem key={key} dateText={key} dateInnerStyle={{ background: '#3333ff' }} style = {{color:'#002ac1'}}>
            <h4 className={classes.timelineTitleBlack}>{activity.activity}</h4>
            <p className={classes.timelineTextBlack}>{activity.description}</p>
            <p className={classes.timelineTextBlack}>Responsible User : {activity.responsibleUserName}</p>
          </TimelineItem>
        )
        activityData.push(data);
      }
    }
    const activity = this.props.taskActivityLogs ? (
      <Timeline animate={false} lineColor={'#ccccff'}>
        {activityData}
      </Timeline>
    ) : (
      <div>
        No Task Activity Available
      </div>
    )
    const task = this.props.task ? (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <h4 className={classes.cardTitleWhite}>{this.props.task.title.toUpperCase()}</h4>
                    <p className={classes.cardCategoryWhite}>Task Details</p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Link to={"./report/" + this.props.id}>
                      <Button color="info" round>
                        Get Report
                      </Button>
                    </Link>
                  </GridItem>
                </GridContainer>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Task ID"
                      id="taskId"
                      type="text"
                      value={this.props.id}
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
                      labelText="Title"
                      id="title"
                      type="text"
                      value={this.props.task.title}
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
                      labelText="Description"
                      id="description"
                      type="text"
                      value={this.props.task.description}
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
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Type"
                      id="type"
                      type="text"
                      value={this.props.task.type}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Location"
                      id="location"
                      type="text"
                      value={this.props.task.location}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Priority Level"
                      id="priorityLevel"
                      type="text"
                      value={this.props.task.priorityLevel}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Status"
                      id="status"
                      type="text"
                      value={this.props.task.status}
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
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Task Timeline</h4>
                {this.props.task.updatedAt !=0 ? (
                    <p className={classes.cardCategoryWhite}>Updated at: {this.props.task.updatedAt}</p>
                ) : (
                    null
                )}
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Created At"
                      id="createdAt"
                      type="text"
                      value={this.props.task.createdAt}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Started At"
                      id="createdAt"
                      type="text"
                      value={this.props.task.startedAt}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Last Resumed At"
                      id="lastResumedAt"
                      type="text"
                      value={this.props.task.lastResumedAt !=0 ? (this.props.task.lastResumedAt) : ("Not Resumed")}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Completed At"
                      id="completedAt"
                      type="text"
                      value={this.props.task.completedAt != 0 ? (this.props.task.completedAt): ("Still in progress")}
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
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Days"
                      id="days"
                      type="text"
                      value={this.props.task.days}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Hours"
                      id="location"
                      type="hours"
                      value={this.props.task.hours}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Minutes"
                      id="minutes"
                      type="text"
                      value={this.props.task.minutes}
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
        <AssignedEmployees supervisorId={this.props.task.supervisorUserID} responsibleWorkerId={this.props.task.responsibleEmployee} assignedWorkers={workers}/>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Task Activity</h4>
              </CardHeader>
              <CardBody>
                {activity}
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    ) : (
      <div>
      <p className={classes.cardCategoryBlack} style={{fontSize:"20px", fontWeight:"300"}}>Task Data Not Available.</p>
      </div>
    );
    return <div>{task}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.task_id;
  return {
    id: id,
    task: state.tasks.task,
    taskActivityLogs: state.tasks.taskActivityLogs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTask: id => {
      dispatch(fetchTask(id));
    },
    fetchTaskActivityLogs: id => {
      dispatch(fetchTaskActivityLogs(id))
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ViewTask));
