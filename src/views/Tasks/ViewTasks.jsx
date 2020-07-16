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
import CustomInput from "components/CustomInput/CustomInput.jsx";

import { connect } from "react-redux";
import { fetchTasks } from "../../store/actions/taskActions";
// import { Button } from "react-bootstrap";

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

class ViewTasks extends Component {
  state = {
    search: "",
  };

  componentWillMount() {
    this.props.fetchTasks();
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;

    if (this.props.tasks) {
      const alltasks = this.props.tasks;

      var taskData = [];
      for (let [key, task] of Object.entries(alltasks)) {
        var data = [];
        data.push(key)
        data.push(task.title);
        data.push(task.type);
        data.push(task.status)
        data.push(
          <Link to={"./tasks/" + key}>
            <Button color="info" round>
              View
            </Button>
          </Link>
        );
        taskData.push(data);
      }
      if(this.state.search){
        taskData = taskData.filter(item => item[0].toLowerCase().includes(this.state.search.toLowerCase()) || item[1].toLowerCase().includes(this.state.search.toLowerCase()) || item[2].toLowerCase().includes(this.state.search.toLowerCase()) || item[3].toLowerCase().includes(this.state.search.toLowerCase()))
      }
    }

    const details = this.props.tasks ? (
      <div>
        <Table
          tableHeaderColor="info"
          tableHead={["TaskID","Title","Type","Status","View"]}
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
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardTitleWhite}>TASKS</h4>
                  <p className={classes.cardCategoryWhite}>
                    Tasks at CBL Engineering Department
                  </p>
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
    );
  }
  c;
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks
  };
};
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
)(withStyles(styles)(ViewTasks));
