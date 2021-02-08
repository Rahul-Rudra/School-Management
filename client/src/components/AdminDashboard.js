import React,{useState,useEffect} from 'react'

import {Link} from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Chart from './Chart.js'
function Home() {
const[student,setStudent]=useState([]);
const[teacher,setTeacher]=useState([]);
const[management,setManagement]=useState([]);
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

useEffect(()=>{
    axios.get("/api/managements").then((response)=>{
        //console.log(response.data);
        setManagement(response.data);
})
},[])

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
          <div className="col-lg-3 col-6">
         
            <div className="small-box bg-info">
              <div className="inner">
    <h3>{teacher.length}</h3>

                <p>Teacher</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add"></i>
              </div>
              <a href="/teachers" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-6">
       
            <div className="small-box bg-success">
              <div className="inner">
                <h3>{student.length}<sup style={{"font-size": "20px"}}></sup></h3>

                <p>Student</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add"></i>
              </div>
              <Link to="/students" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
            </div>
          </div>
          <div className="col-lg-3 col-6">
          
            <div className="small-box bg-warning">
              <div className="inner">
    <h3>{management.length}</h3>

                <p>Management</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add"></i>
              </div>
              <Link to="/managements" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
            </div>
          </div>
          <div className="col-lg-3 col-6">
       
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>65</h3>

                <p>Gallery</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph"></i>
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          </div>
          </div>

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
         
    </section>
    </div>
        </>
    )
}

export default Home
