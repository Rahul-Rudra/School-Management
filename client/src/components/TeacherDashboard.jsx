import React,{useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';
import axios from 'axios';
function TeacherDashboard() {
  const[teacher1,setTeacher]=useState([]);
  const[Data,setData]=useState([]);
  const[state,setState]=useState("");
  const d1=new Date();
  const date=d1.getMonth()+1;
 //console.log(d1,date);

  useEffect(()=>{
      axios.get("/api/teachers").then((response)=>{
          //console.log(response.data);
          setTeacher(response.data);
        
      })
  },[])

  useEffect(()=>{
    axios.get("/api/managements/announcement").then((response)=>{
     // console.log(response.data[0].text);
        setData(response.data);

      
    })
},[])

const handleInputChange=(event) =>{
  console.log(event.target.files[0]);
  setState(
       event.target.files[0]
    )
}
const submit=(e)=>{
  e.preventDefault();
  let data = new FormData() 
  data.append('pic', state);
 console.log(data);
 

  axios.post("/post", data, { // receive two parameter endpoint url ,form data 
  })
  .then(res => { // then print response status
      console.log(res);
  }).catch((error)=>{
    console.log(error);
  })
//data="";
  setState({state:""})
}

  //console.log(teacher1)

    return (
      
        <>
        <Sidebar/>
        <div className="content-wrapper">
   
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
    <section className="content">
    <div className="container-fluid m-3">
    <div className="row m-3">
          <div className="col-lg-3 col-6 ">
         
            <div className="small-box bg-info ">
              <div className="inner">
    <h3>10</h3>

                <p>Mystudent</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add"></i>
              </div>
              <Link to="/mystudents" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
            </div>
          </div>
          <div className="col-lg-3 col-6 ">
         
         <div className="small-box bg-warning ">
           <div className="inner">
 <h3>2</h3>

             <p>Homework</p>
           </div>
           <div className="icon">
             <i className="ion ion-person-add"></i>
           </div>
           <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
         </div>
       </div>
      
       <div className="col-lg-6 col-6 bg-secondary">
       
         <div className="small-box bg-light ">
         <h3 className="ml-3">Announcement</h3>
           <div className="inner">
 
               { Data.map((u,i)=>{
              return (<p>{i+1 +"     "+ u.text} </p>)
              
            
              }) }
 
          
           </div>        
         </div>
       </div>
     </div>
     </div>


<div className="card">
  <div className="card-header">
      <h3>Upload-Assignment</h3>
  </div>
  <div className="card-body">
    <form onSubmit={submit}>
     <input className="ml-2" type="file" name="pic"  id="pic" onChange={handleInputChange}></input>
     <button type="submit" className="btn btn-success" value="submit" >upload</button>
    </form>
  </div>
</div> 
<div className="card">
  <div className="card-header">
      <h3> Birthdays In This Month</h3>
  </div>
  <div className="card-body">
  <table className="table table-bordered table-hover table-lg  p-1 mt-2">
              <thead>
                <tr className="table-primary">
                  <th scope="col" >
                      Name
                  </th>
                  <th>Email</th>
                 
                </tr>
              </thead>
              <tbody>
                {teacher1.map((u, i) => {

                  const d = u.Date_of_birth.split("-");
                 
                  
                  return (
                    d[1]===date?
                    <tr key={i}>
                      <td>{u.teacher_name}</td>
                      <td>{u.email}</td>
                    
                      </tr>:""
                 ) })}
               
                      </tbody>
                      </table>
  </div>
</div> 

   
     </section>
    </div>
        </>
    )
}

export default TeacherDashboard
