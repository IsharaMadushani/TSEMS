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
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { connect } from "react-redux";
import { fetchUnregisteredWorkers } from "../../store/actions/workerActions";
import { restoreWorker } from "../../store/actions/workerActions";
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

class UnregisteredWorkers extends Component {
  state = {
    search: "",
  };

  constructor(props) {
    super(props)
    props.fetchUnregisteredWorkers();
  } 
  
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleRestore = (e,id,worker) => {
    this.props.restoreWorker(id,worker)
  }

  render() {
    const { classes } = this.props;

    if (this.props.unregisteredWorkers) {
      const allworkers = this.props.unregisteredWorkers;

      var workerData = [];
      for (let [key, worker] of Object.entries(allworkers)) {
        var data = [];
        data.push(worker.firstName);
        data.push(worker.lastName);
        data.push(worker.email);
        data.push(worker.unregisteredAt)
        data.push(
          <Button id={key} color="info" onClick={ e => this.handleRestore(e,key,worker)} round>
            Restore
          </Button>
        );
        data.push(
          <Link to={"./unregisteredusers/workers/" + key}>
            <Button color="info" round>
              View
            </Button>
          </Link>
        );
        workerData.push(data);
      }
      if(this.state.search){
        workerData = workerData.filter(item => item[0].toLowerCase().includes(this.state.search.toLowerCase()) || item[1].toLowerCase().includes(this.state.search.toLowerCase()) || item[2].toLowerCase().includes(this.state.search.toLowerCase()))
      }
    }
    
    const details = this.props.unregisteredWorkers ? (
      <div>
        <Table
          tableHeaderColor="info"
          tableHead={["First Name", "Last Name", "Email", "Unregistered On", "Restore", "View"]}
          tableData={workerData}
        />
      </div>
    ) : (
      <div>
        <p>No Workers</p>
      </div>
    );

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardTitleWhite}>UNREGISTERED WORKERS</h4>
                  <p className={classes.cardCategoryWhite}>
                    Past Workers at CBL Engineering Department
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
    unregisteredWorkers: state.worker.unregisteredWorkers
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchUnregisteredWorkers: () => {
      dispatch(fetchUnregisteredWorkers());
    },
    restoreWorker: (id,worker) => {
      dispatch(restoreWorker(id,worker))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UnregisteredWorkers));
