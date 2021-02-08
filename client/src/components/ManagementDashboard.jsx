import React,{useEffect,useState} from 'react'
import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';
import axios from 'axios';
import Chart from './Chart';
function ManagementDashboard() {
    const[student,setStudent]=useState([]);
const[teacher,setTeacher]=useState([]);
const[alert,setAlert]=useState(""); 
const[state,setState]=useState({
  text:""
})
//const[management,setManagement]=useState([]);
useEffect(()=>{
    axios.get("/api/students").then((response)=>{
        //console.log(response.data);
        setStudent(response.data);
})
},[])
useEffect(()=>{
    axios.get("/api/teachers").then((response)=>{
        console.log(response.data);
        setTeacher(response.data);
    })
},[])

const handleChange=(e)=>{
  const{id,value}=e.target;
  setState(prevState=>({...prevState,[id]:value}))
}

const handleSubmit=e=>{
  e.preventDefault();
  axios.post("/api/managements/announcement",state) .then((res) => {
    console.log(res.data);
  setAlert("success");
 // console.log(alert)
  
})
.catch((error) => {
  console.log(error);
})
setState({text:""})
}

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
   <div className="container-fluid">
    
       <div className="row">
        
       <div class="col-12 col-sm-6 col-md-3">
       <Link to="/students">
            <div class="info-box">
              <span class="info-box-icon bg-info elevation-1">  <i className="ion ion-person-add"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Student</span>
                <span class="info-box-number">
                {student.length}
                  
                </span>
              </div>
              
            </div>
            </Link>
          </div>
         
          <div class="col-12 col-sm-6 col-md-3">
       <Link to="/teachers">
            <div class="info-box">
              <span class="info-box-icon bg-success elevation-1">  <i className="ion ion-person-add"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Teacher</span>
                <span class="info-box-number">
                {teacher.length}
                  
                </span>
              </div>
              
            </div>
            </Link>
          </div>
        
        
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-users"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Report card</span>
                <span class="info-box-number">2,000</span>
              </div>
              
            </div>
        
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-users"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Report card</span>
                <span class="info-box-number">2,000</span>
              </div>
              
            </div>
        
          </div>
         
         {/* Charts */}


          <div class="row">
          <div class="col-md-12">
            <div class="card">
            
              <div class="card-body">
    
                <div class="card">
                <h1 style={{textAlign:"center"}}>Bar chart</h1>
                  <div class="col-md-8">
                  <Chart/>
                
                  </div>
                  </div>
                  
                  </div>
               
              
                  
            </div>
            </div>
            </div>
{/* end charts */}

 
<div class="col-12 col-sm-6 col-md-3">


            <div className="card">
          
              <div className="card-header">
              {/* {alert=== "success" ? <h1 className="alert alert-success" role="alert">Done</h1>:""} */}
           <h1>Activity</h1> 
          
              </div>
              <div className="card-body">
             <form onSubmit={handleSubmit}>
             <div className="form-group m-3 ">
            
              <label forhtml="text">Announcement</label>
              <input
                //autoFocus
                type="text"
                id="text"
                placeholder="Enter a announcement"
                value={state.text}
               onChange={handleChange}
                className="form-control"
              />
            </div>
           
              <div className="form-group m-3">
                <input
                  type="submit"
                  value="Submit"
               
                  className="btn btn-success "
                />
              </div>
           
             </form>
             
              </div>
            </div>
           
          </div>
         </div>
         </div>
       
   </section>
   </div>
        </>
    )
}

export default ManagementDashboard
