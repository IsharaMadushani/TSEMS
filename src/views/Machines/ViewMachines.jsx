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
import { fetchMachines } from "../../store/actions/machineActions";

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

class ViewMachines extends Component {
    state = {
        search: "",
    };
    
  componentWillMount() {
    this.props.fetchMachines();
  }

  //update state when input fields change
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;

    if (this.props.machines) {
      const allmachines = this.props.machines;

      var machineData = [];
      for (let [key, machine] of Object.entries(allmachines)) {
        //get details of each machine
        var data = [];
        data.push(key);
        data.push(machine.label);
        data.push(
          <Link to={"./machines/" + key}>
            <Button color="info" round>
              View
            </Button>
          </Link>
        );
        //push individual machine data array to machieData array
        machineData.push(data);
      }

      //search
      if(this.state.search){
        machineData = machineData.filter(item => item[0].toLowerCase().includes(this.state.search.toLowerCase()) || item[1].toLowerCase().includes(this.state.search.toLowerCase()))
      }
    }

    const details = this.props.machines ? (
      <div>
        <Table
          tableHeaderColor="info"
          tableHead={["Machine ID", "Machine Label", "View"]}
          tableData={machineData}
        />
      </div>
    ) : (
      <div>
        <p>No Machines</p>
      </div>
    );

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h4 className={classes.cardTitleWhite}>MACHINES</h4>
                  <p className={classes.cardCategoryWhite}>
                    Current Machines at CBL Engineering Department
                  </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <span>
                    <Link to={"./machines/add"}>
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
  c;
}

//load required data from reducer to props
const mapStateToProps = state => {
  return {
    machines: state.machines.machines
  };
};

//load required functions from actions to props
const mapDispatchToProps = dispatch => {
  return {
    fetchMachines: () => {
      dispatch(fetchMachines());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ViewMachines));
