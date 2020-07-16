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
import { fetchUnregisteredSupervisors } from "../../store/actions/supervisorActions";
import { restoreSupervisor } from "../../store/actions/supervisorActions";

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

class unregisteredSupervisors extends Component {
  state = {
    search: "",
  };

  componentWillMount() {
    this.props.fetchUnregisteredSupervisors();
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleRestore = (e,id,supervisor) => {
    this.props.restoreSupervisor(id,supervisor)
  }

  render() {
    const { classes } = this.props;

    if (this.props.unregisteredSupervisors) {
      const allsupervisors = this.props.unregisteredSupervisors;

      var supervisorData = [];
      for (let [key, supervisor] of Object.entries(allsupervisors)) {
        var data = [];
        data.push(supervisor.firstName);
        data.push(supervisor.lastName);
        data.push(supervisor.email);
        data.push(supervisor.unregisteredAt)
        data.push(
          <Button id={key} color="info" onClick={ e => this.handleRestore(e,key,supervisor)} round>
            Restore
          </Button>
        );
        data.push(
          <Link to={"./unregisteredusers/supervisors/" + key}>
            <Button color="info" round>
              View
            </Button>
          </Link>
        );
        supervisorData.push(data);
      }
      if(this.state.search){
        supervisorData = supervisorData.filter(item => item[0].toLowerCase().includes(this.state.search.toLowerCase()) || item[1].toLowerCase().includes(this.state.search.toLowerCase()) || item[2].toLowerCase().includes(this.state.search.toLowerCase()))
      }
    }

    //create table of unregistered supervisors
    const details = this.props.unregisteredSupervisors ? (
      <div>
        <Table
          tableHeaderColor="info"
          tableHead={["First Name", "Last Name", "Email", "Unregistered On", "Restore", "View"]}
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
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardTitleWhite}>UNREGISTERED SUPERVISORS</h4>
                  <p className={classes.cardCategoryWhite}>
                    Past Supervisors at CBL Engineering Department
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
}

const mapStateToProps = state => {
  return {
    unregisteredSupervisors: state.supervisor.unregisteredSupervisors
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchUnregisteredSupervisors: () => {
      dispatch(fetchUnregisteredSupervisors());
    },
    restoreSupervisor: (id,supervisor) => {
      dispatch(restoreSupervisor(id,supervisor))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(unregisteredSupervisors));
