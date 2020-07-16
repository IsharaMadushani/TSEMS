import React, { Component } from "react";
import NewWindow from 'react-new-window'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";

import Button from "components/CustomButtons/Button.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTask } from "../../store/actions/taskActions";
import { fetchWorkers } from "../../store/actions/workerActions";
import { fetchUnregisteredWorkers } from "../../store/actions/workerActions";

// Create styles

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    body: {
        paddingTop:200,
        padding: 60
    },
    heading: {
        textAlign: "center",
        // paddingTop: "20px",
        paddingBottom: "30px",
        fontSize: "18",
    },
    subHeading:{
        textAlign: "left",
        // paddingVertical: "20px",
        paddingBottom: "10px",
        paddingTop: "30px",
        fontSize: "14"
    },
    text:{
        textAlign: "left",
        paddingBottom: "10px",
        // paddingTop: "30px",
        fontSize: "12"
    },
    pageNumbers: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'right',
        fontSize: "10"
    },
    date: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'left',
        fontSize: "10"
    }
});

// Create Document Component
// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );

class TaskReport extends Component {

    componentWillMount() {
        this.props.fetchTask(this.props.id);
        this.props.fetchWorkers();
        this.props.fetchUnregisteredWorkers();
    }
    render() {
        var assignedWorkersData = []
        var responsibleWorkerData = "No responsible Worker Assigned"
        var dt = new Date()
        if(this.props.task){
            var workers = this.props.task.assignedEmployees ? (
                JSON.parse(this.props.task.assignedEmployees)
              ): (
                ""
              )

            if(this.props.workers){
                
                for (let [key, worker] of Object.entries(this.props.workers)) {
                    if(key == this.props.task.responsibleEmployee){
                        responsibleWorkerData = worker.firstName + " " + worker.lastName
                    }
                    if(workers.includes(key)){
                        assignedWorkersData.push(<Text style={styles.text}>{worker.firstName + " " + worker.lastName}</Text>)
                    }
                }
            }
    
            if(this.props.unregisteredWorkers){
                for (let [key, worker] of Object.entries(this.props.unregisteredWorkers)) {
                    if(key == this.props.task.responsibleEmployee){
                        responsibleWorkerData = worker.firstName + " " + worker.lastName + "(Unregistered)"
                    }
                    if(workers.includes(key)){
                        assignedWorkersData.push(<Text style={styles.text}>{worker.firstName + " " + worker.lastName + "(Unregistered)"}</Text>)
                    }
                }
            }
        }
       
        var report = (this.props.task && this.props.workers && this.props.unregisteredWorkers)?(
              <Document>
                <Page size="A4" style={styles.body}>
                <View>
                    <Text style={styles.heading}>CBL Engineering Department</Text>
                    <Text style={styles.heading}>Task Report</Text>                
                </View>
                <View>
                    <Text style={styles.subHeading}>TASK ID</Text>
                    <Text style={styles.text}>{this.props.id}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>TITLE</Text>
                    <Text style={styles.text}>{this.props.task.title}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>DESCRIPTION</Text>
                    <Text style={styles.text}>{this.props.task.description}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>TYPE</Text>
                    <Text style={styles.text}>{this.props.task.type}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>LOCATION</Text>
                    <Text style={styles.text}>{this.props.task.location}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>PRIORITY LEVEL</Text>
                    <Text style={styles.text}>{this.props.task.priorityLevel}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>STATUS</Text>
                    <Text style={styles.text}>{this.props.task.status}</Text>
                </View>
                <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
                <Text style={styles.date}>{dt.toLocaleDateString()}</Text>
                </Page>
                <Page size="A4" style={styles.body}>
                <View>
                    <Text style={styles.subHeading}>CREATED AT</Text>
                    <Text style={styles.text}>{this.props.task.createdAt}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>STARTED AT</Text>
                    <Text style={styles.text}>{this.props.task.startedAt != "0" ? (this.props.task.startedAt) : (<Text style={styles.text}>Not Started</Text>)}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>COMPLETED AT</Text>
                    <Text style={styles.text}>{this.props.task.completedAt != "0" ? (this.props.task.completedAt): (<Text style={styles.text}>Not Completed</Text>)}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>LAST RESUMED AT</Text>
                    <Text style={styles.text}>{this.props.task.lastResumedAt != "0" ? (this.props.task.lastResumedAt) : (<Text style={styles.text}>Not Resumed</Text>)}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>UPDATED AT</Text>
                    <Text style={styles.text}>{this.props.task.updatedAt != "0" ? (this.props.task.updatedAt) : (<Text style={styles.text}>Not Updated</Text>)}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>DURATION</Text>
                    <Text style={styles.text}>Days  :  {this.props.task.days}</Text>
                    <Text style={styles.text}>Hours  :  {this.props.task.hours}</Text>
                    <Text style={styles.text}>Minutes  :  {this.props.task.minutes}</Text>
                </View>
                <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
                <Text style={styles.date}>{dt.toLocaleDateString()}</Text>
                </Page>
                <Page size="A4" style={styles.body}>
                <View>
                    <Text style={styles.subHeading}>ASSIGNED SUPERVISOR</Text>
                    <Text style={styles.text}>{this.props.task.supervisorName}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>RESPONSIBLE WORKER</Text>
                    <Text style={styles.text}>{responsibleWorkerData}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>ASSIGNED WORKERS</Text>
                    {assignedWorkersData}
                </View>
                <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
                <Text style={styles.date}>{dt.toLocaleDateString()}</Text>
                </Page>
            </Document>
          ):(
              <Document>
                  loading...
              </Document>
          )
      return (
            <div>
                <Link to={"../" + this.props.id}>
                    <Button color="info" round>
                    Go To Task Details
                    </Button>
                </Link>
                <NewWindow>
                    <PDFViewer style={{width:"100%", height:"100%"}}>{report}</PDFViewer>
                </NewWindow>
            </div>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
let id = ownProps.match.params.task_id;
    return {
        id: id,
        task: state.tasks.task,
        workers: state.worker.workers,
        unregisteredWorkers: state.worker.unregisteredWorkers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTask: id => {
            dispatch(fetchTask(id));
        },
        fetchWorkers: () => {
            dispatch(fetchWorkers())
        },
        fetchUnregisteredWorkers: () => {
            dispatch(fetchUnregisteredWorkers())
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TaskReport));