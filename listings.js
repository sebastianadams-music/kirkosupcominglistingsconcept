// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getDatabase, ref, onValue, query, orderByChild } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

window.showArchive = function showArchive(){
    // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh4BXlWbGPGNwZEblDhaDqtdgUeM2alpQ",
  authDomain: "kirkos-marketing-form.firebaseapp.com",
  databaseURL: "https://kirkos-marketing-form-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kirkos-marketing-form",
  storageBucket: "kirkos-marketing-form.appspot.com",
  messagingSenderId: "383685035953",
  appId: "1:383685035953:web:b253e4b806fcd6f2579f90"
};
  
  // Initialize Firebase
  const rtdb = initializeApp(firebaseConfig);
  const analytics = getAnalytics(rtdb);
  console.log(rtdb)
  window.rtdb = rtdb
  
  
  
      const db = getDatabase();
      console.log(db)
  // const dbref = ref(db, '15THFlWen9Zrc28MmZlgZZhqAtNjavXaTMTz4qtaQ46k/Events/'); //first level of ref is the spreadsheet ID
  const q = query(ref(db, "1vQI121Zx6nyygFwKMn-gdujP55xe2Y2j5id8YDlRwcU/Form responses 1"), orderByChild('DATE'))
  console.log(q)
  
  let events = []
  let visibleEvents = ['Concert', 'Screening', 'Meeting/workshare', 'Exhibition', 'Listening event', 'Improv jam', 'open mic', 'Improv jam (body)', 'Theatre', 'Improv comedy', 
  'Lecture', 'Radio broadcast', 'Event', 'Demo', 'Live interactive set', 'Interview/Q&A', 'Live electronic set', 'Writing group', 'Group meetup/workshare', 'Launch', 'Durational performance', 
  'Installation', 'WIP presentation', 'Festival', 'Residency', 'Poetry/spoken word', 'Happening', 'Outdoor performance', 'Improvised Performance', 'Intervention'];
  let content = document.getElementById("archive_content")
  
  
  onValue(q, (snapshot) => {
  
      snapshot.forEach((child) =>{
          let e = child.val()
          console.log(e)
          // if (visibleEvents.indexOf(e.Format1) > -1 || visibleEvents.indexOf(e.Format2) > -1
          // ){  
          //   //   console.log(child.val())
          //     events.unshift(child.val()) 
  
          // }
          events.unshift(child.val()) 

      }
      )
    //   console.log("events", events)
      events.forEach(event => {

        

        console.log(event)
        var date = new Date(event["DATE "])
        console.log(date)

        if (inFuture(date)){
          console.log("In future")
          let br = document.createElement("br")
        content.appendChild(br)

        // event name 
        // br = document.createElement("br")
        // content.appendChild(br)
        // br = document.createElement("br")
        // content.appendChild(br)
        let head = document.createElement("span")
        head.classList.add("home");
        head.textContent = event["EVENT TITLE"].toUpperCase()
        content.appendChild(head)

        // date + venue + ensemble
        br = document.createElement("br")
        content.appendChild(br)
        let p = document.createElement("b")
        

        
        if (event.Ensemble){
          p.textContent = date.toLocaleString('default', {dateStyle: 'long' }) // + " / " + event.Venue + " / " + event.Ensemble

        }
        else {
          p.textContent = date.toLocaleString('default', {dateStyle: 'long' }) // + " / " + event.Venue

        }


     

        //   console.log(event)
        content.appendChild(p)

        
          
        // more info
        
        

          if (event.DESCRIPTION){
            br = document.createElement("br")
            content.appendChild(br)
            br = document.createElement("br")
            content.appendChild(br)
            p = document.createElement("details")
            p.textContent = event.DESCRIPTION
            let summary = document.createElement("summary")
            summary.textContent = "description"
            p.appendChild(summary)
            content.appendChild(p)
                    //   console.log(event.Bio)
          }

        // pieces performed 
        if (event.Pieces_Performed){

          if (event.Pieces_Performed != "#N/A"){
          //   console.log(event.Pieces_Performed)
          br = document.createElement("br")
          content.appendChild(br)
          br = document.createElement("br")
          content.appendChild(br)
          let s = document.createElement("b")
          s.textContent = "Pieces performed: "
          p = document.createElement("span")
          p.textContent = event.Pieces_Performed
          content.appendChild(s)
          content.appendChild(p)
          }

          
        }
          
        if (!event.Bio){
          br = document.createElement("br")
          content.appendChild(br)
        }
        // blank space 
        
          br = document.createElement("br")
          content.appendChild(br)
          // dividing line 
          let hr = document.createElement("hr")
          content.appendChild(hr)


        }

        
          
      })   
    })
    
    
  
  // // const query(ref(db, ), orderByChild('starCount'));
  // onValue(dbref, (snapshot) => {
  //   const data = snapshot.val();
  //   data.forEach(d => console.log(d))
  // });
  
  // query(ref(db, 'user-posts/' + myUserId), orderByChild('starCount'));
  
}


const inFuture = (date) => {
  return date.setHours(0,0,0,0) > new Date().setHours(0,0,0,0)
};
