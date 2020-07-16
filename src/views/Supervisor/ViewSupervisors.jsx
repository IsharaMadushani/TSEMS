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
import { fetchSupervisors } from "../../store/actions/supervisorActions";
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

class Supervisors extends Component {
  state = {
    search: "",
  };

  componentWillMount() {
    this.props.fetchSupervisors();
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;

    if (this.props.supervisors) {
      const allsupervisors = this.props.supervisors;

      var supervisorData = [];

      //get all supervisor data
      for (let [key, supervisor] of Object.entries(allsupervisors)) {
        var data = [];
        data.push(supervisor.firstName);
        data.push(supervisor.lastName);
        data.push(supervisor.email);
        data.push(
          <Link to={"./supervisors/" + key}>
            <Button color="info" round>
              View
            </Button>
          </Link>
        );
        //push individual supervisor data to supervisorData array
        supervisorData.push(data);
      }
      if(this.state.search){
        supervisorData = supervisorData.filter(item => item[0].toLowerCase().includes(this.state.search.toLowerCase()) || item[1].toLowerCase().includes(this.state.search.toLowerCase()) || item[2].toLowerCase().includes(this.state.search.toLowerCase()))
      }
      
    }
    const details = this.props.supervisors ? (
      <div>
        <Table
          tableHeaderColor="info"
          tableHead={["First Name", "Last Name", "Email", "View"]}
          tableData={supervisorData}
        />
      </div>
    ) : (
      <div>
        <p>No Supervisors</p>
      </div>
    );

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h4 className={classes.cardTitleWhite}>SUPERVISORS</h4>
                  <p className={classes.cardCategoryWhite}>
                    Current Supervisors at CBL Engineering Department
                  </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <span>
                    <Link to={"./supervisors/add"}>
                      <Button color="success">Add +</Button>
                    </Link>
                  </span>
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
}

//load required data from reducer to props
const mapStateToProps = state => {
  return {
    supervisors: state.supervisor.supervisors
  };
};

//load required functions from actions to props
const mapDispatchToProps = dispatch => {
  return {
    fetchSupervisors: () => {
      dispatch(fetchSupervisors());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Supervisors));
