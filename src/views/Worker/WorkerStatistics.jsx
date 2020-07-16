import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import ChartistGraph from "react-chartist";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchWorker } from "../../store/actions/workerActions";
import { fetchWorkerStatistics } from "../../store/actions/workerActions";


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
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

const statisticsChart = {
    options: {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 20,
      height: '400px',
      axisY: {
        onlyInteger: true,
      },
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0
      }
    },
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 20,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ],
    animation: {
      draw: function(data) {
        if (data.type === "bar") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
          data.element.attr({
            style: 'stroke-width: 40px'
          });
        }
      }
    }
  };
class WorkerStatistics extends Component {
  
  constructor(props) {
    super(props)
    props.fetchWorkerStatistics(props.id)
  } 

  render() {
    const { classes } = this.props;

    if(this.props.workerStatistics){
        var labels = ["Completed Tasks","Current Tasks", "Incompleted Tasks", "Tasks in Progress", "Tasks on Hold", "Overdue Tasks", "Pending Tasks"];
        var series = [];
        var values = [];

        for (let [key, stat] of Object.entries(this.props.workerStatistics)) {
            values.push(stat)
        }
        values.shift()
        series.push(values)
        var chartData = {
            labels: labels,
            series: series
        }
    }

    return (
        <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
            <Card chart>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={chartData}
                  type="Bar"
                  options={statisticsChart.options}
                  responsiveOptions={statisticsChart.responsiveOptions}
                  listener={statisticsChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Worker Statistics</h4>
                {this.props.workerStatistics ? (
                <p className={classes.cardCategory}>
                  Feedback Score : {this.props.workerStatistics.feedbackScore}
                </p>
                ) : (
                    <div></div>
                )}
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    worker: state.worker.worker,
    workerStatistics: state.worker.workerStatistics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWorker: id => {
      dispatch(fetchWorker(id));
    },
    fetchWorkerStatistics: id => {
        dispatch(fetchWorkerStatistics(id))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WorkerStatistics));
