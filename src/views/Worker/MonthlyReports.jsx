import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCompletedTasks } from "../../store/actions/taskActions";
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

class MonthlyReports extends Component {
    state = {
        search: "",
      };

  componentWillMount() {
    this.props.fetchCompletedTasks(this.props.id);
    this.props.fetchTasks();
    this.props.fetchWorker(this.props.id)
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    if (this.props.tasks) {
      const alltasks = this.props.tasks;
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      var availableMonthlyData = [];
      var available = [];

      for (let [taskId, task] of Object.entries(alltasks)) {
        var data = [];
        
        if(this.props.completedTasks){
            if(this.props.completedTasks.length>0 && this.props.completedTasks.includes(taskId) && task.status=="Complete"){ //completed
                let completed = task.completedAt.split(" @")
                let date = completed[0].split("/")

                if(!available.includes(date[0]+date[1])){  //date[2]
                    available.push(date[0]+date[1])
                    data.push(date[0]+"  "+months[date[1]-1])  //date[2]
                    data.push(
                    <Link to={"../monthlyreport/" +this.props.id+"/"+ date[0]+"d"+date[1]}>
                        <Button color="info" round>
                        Get Report
                        </Button>
                    </Link>
                    ) //date[2]
                    availableMonthlyData.push(data)
                }
                if(this.state.search){
                    availableMonthlyData = availableMonthlyData.filter(item => item[0].toLowerCase().includes(this.state.search.toLowerCase()))
                  }
            }
        }
      }
      var details = this.props.completedTasks ? (
        <div>
          <Table
            tableHeaderColor="info"
            tableHead={["Available Reports","Get Report"]}
            tableData={availableMonthlyData}
          />
        </div>
      ) : (
        <div>
          <p>No Monthly Reports Available</p>
        </div>
      );
    }

    const tasks = this.props.tasks && this.props.worker? (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info">
              <GridContainer>
                <GridItem xs={12} sm={12} md={9}>
                  <h4 className={classes.cardTitleWhite}>MONTHLY REPORTS</h4>
                  <p className={classes.cardCategoryWhite}>
                    Monthly Completed Tasks Reports for {this.props.worker.firstName}
                  </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Link to={"../" + this.props.id}>
                    <Button color="info" round>
                        Back to Worker Detials
                    </Button>
                    </Link>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>
            <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                labelText="SEARCH"
                id="search"
                type="text"
                handleChange={this.handleChange}
                formControlProps={{
                    fullWidth: true
                }}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}></GridItem>
            </GridContainer>
            <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
            {details}
            </GridItem>
            </GridContainer>
            </CardBody>
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
  let id = ownProps.match.params.worker_id;
  return {
    id:id,
    tasks: state.tasks.tasks,
    completedTasks: state.tasks.completedTasks,
    worker: state.worker.worker
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => {
      dispatch(fetchTasks());
    },
    fetchCompletedTasks: (id) => {
      dispatch(fetchCompletedTasks(id));
    },
    fetchWorker: (id) => {
        dispatch(fetchWorker(id))
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MonthlyReports));