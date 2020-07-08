import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { Link } from "react-router-dom";
import { MDBBtn,MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
var storageRef = firebase.storage().ref();

class EventsDetails extends React.Component{
  constructor(props){
      super(props);

      this.database = firebase.database().ref().child('EVENTS');

      this.state={
          EVENTS:[],
       }

  }

  componentDidMount(){
      const previousEvents = this.state.EVENTS;

      // DataSnapshot
      this.database.on('child_added', snap => {
        previousEvents.push({
          id: snap.key,
          title: snap.val().title,
          date: snap.val().date,
          description: snap.val().description,
          imageURL: snap.val().imageURL,
        })


        this.setState({
          EVENTS: previousEvents
        })
      })

  }


render() {
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    <MDBCol style={{ maxWidth: "100%" }}>
          <MDBCard>
            <MDBCardImage className="img-fluid" id="new-img" waves />
              {
                    this.state.EVENTS.map((eve,index) => {
                        if(eve.id===this.props.location.state.id){
                      let spaceRef = storageRef.child('IMAGES/'+this.state.EVENTS[index].imageURL)
                      storageRef.child('IMAGES/'+this.state.EVENTS[index].imageURL).getDownloadURL().then((url)=>{
                          document.getElementById('new-img').src = url;
                    })
                    }
                  }

              )
                }

            <MDBCardBody className="txt_body">
              <h1 style={{fontStyle: "bold"}}>{this.props.location.state.title}</h1>
              <h5>{this.props.location.state.date}</h5>
              <pre className="pre">{this.props.location.state.description}</pre>
            </MDBCardBody>
          </MDBCard>
        <MDBBtn outline color="primary" className="backToEvents"><Link style={{ fontSize: "19px", padding: "7px" }} to={'/events'}>Back to Events List</Link></MDBBtn>
        </MDBCol>
    </div> 
  )
}
}

export default EventsDetails

