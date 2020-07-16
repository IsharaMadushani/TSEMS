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
import Table from "components/Table/Table.jsx";

import avatar from "assets/img/faces/default.jpg";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUnregisteredSupervisor } from "../../store/actions/supervisorActions";
import { fetchCompletedTasks } from "../../store/actions/taskActions";
import { fetchTasks } from "../../store/actions/taskActions";

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

class ViewUnregisteredSupervisor extends Component {

  constructor(props) {
    super(props)
    props.fetchUnregisteredSupervisor(props.match.params.supervisor_id);
    this.props.fetchCompletedTasks(this.props.id);
    this.props.fetchTasks();
  } 

  render() {
    const { classes } = this.props;
    if (this.props.tasks) {
        const alltasks = this.props.tasks;
        var completedTasksData = [];
  
        for (let [taskId, task] of Object.entries(alltasks)) {
          var data = [];
          if(this.props.completedTasks){
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
                    completedTasksData.push(data)
                }
            }
        }
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
  

    const supervisor = this.props.supervisor ? (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={2}>
                    <CardAvatar profile>
                    {this.props.supervisor.profilePictureURL ? (
                      <img src={this.props.supervisor.profilePictureURL} alt="..." />
                    ): (
                      <img src={avatar} alt="..." />
                    )}
                    </CardAvatar>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <h4 className={classes.cardTitleWhite}>
                      {this.props.supervisor.firstName.toUpperCase()}
                    </h4>
                    <p className={classes.cardCategoryWhite}>Unregistered At: {this.props.supervisor.unregisteredAt}</p>
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
                      value={this.props.supervisor.firstName}
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
                      value={this.props.supervisor.lastName}
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
                      value={this.props.supervisor.email}
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
                      value={this.props.supervisor.contactNumber}
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
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <h4 className={classes.cardTitleWhite}>COMPLETED TASKS</h4>
                    <p className={classes.cardCategoryWhite}>
                        Tasks completed by {this.props.supervisor.firstName}
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
    );
    return (
        <div>{supervisor}</div>  
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.supervisor_id;
  return {
    id: id,
    supervisor: state.supervisor.unregisteredSupervisor,
    tasks: state.tasks.tasks,
    completedTasks: state.tasks.completedTasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUnregisteredSupervisor: id => {
      dispatch(fetchUnregisteredSupervisor(id));
    },
    fetchTasks: () => {
        dispatch(fetchTasks());
    },
    fetchCompletedTasks: (id) => {
        dispatch(fetchCompletedTasks(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ViewUnregisteredSupervisor));
