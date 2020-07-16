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
import { fetchUnregisteredManagementStaffs } from "../../store/actions/managementStaffActions";
import { restoreManagementStaff } from "../../store/actions/managementStaffActions";
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

class unregisteredManagementStaff extends Component {
  state = {
    search: "",
  };

  componentWillMount() {
    this.props.fetchUnregisteredManagementStaffs();
  }

  //update state when input fields change
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleRestore = (e,id,managementStaff) => {
    this.props.restoreManagementStaff(id,managementStaff)
  }

  render() {
    const { classes } = this.props;

    if (this.props.unregisteredManagementStaff) {
      const allmanagementStaffs = this.props.unregisteredManagementStaff;

      var managementStaffData = [];
      
      //get all unregistered management staff data
      for (let [key, managementStaff] of Object.entries(allmanagementStaffs)) {
        var data = [];
        data.push(managementStaff.firstName);
        data.push(managementStaff.lastName);
        data.push(managementStaff.email);
        data.push(managementStaff.unregisteredAt);
        data.push(
          <Button id={key} color="info" onClick={ e => this.handleRestore(e,key,managementStaff)} round>
            Restore
          </Button>
        );
        data.push(
          <Link to={"./unregisteredusers/staff/" + key}>
            <Button color="info" round>
              View
            </Button>
          </Link>
        );
        managementStaffData.push(data);
      }
      if(this.state.search){
        managementStaffData = managementStaffData.filter(item => item[0].toLowerCase().includes(this.state.search.toLowerCase()) || item[1].toLowerCase().includes(this.state.search.toLowerCase()) || item[2].toLowerCase().includes(this.state.search.toLowerCase()))
      }
    }

    const details = this.props.unregisteredManagementStaff ? (
      <div>
        <Table
          tableHeaderColor="info"
          tableHead={["First Name", "Last Name", "Email", "Unregistered On", "Restore","View"]}
          tableData={managementStaffData}
        />
      </div>
    ) : (
      <div>
        <p>No ManagementStaff</p>
      </div>
    );

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardTitleWhite}>UNREGISTERED MANAGEMENTSTAFF</h4>
                  <p className={classes.cardCategoryWhite}>
                    Past ManagementStaff at CBL Engineering Department
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
    unregisteredManagementStaff: state.managementStaff.unregisteredManagementStaffs
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchUnregisteredManagementStaffs: () => {
      dispatch(fetchUnregisteredManagementStaffs());
    },
    restoreManagementStaff: (id,managementStaff) => {
      dispatch(restoreManagementStaff(id,managementStaff))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(unregisteredManagementStaff));
