import React,{useState,useEffect} from 'react'
import axios from 'axios';
//import Header from './Header';
import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';

//import { FcDown, FcUp } from "react-icons/fc";
function Student() {
const[student,setStudent]=useState([]);
/* const[sortColumn,setSortColumn]=useState({
  path:"student_name",
  order:"asc"
}) */
//console.log(sortColumn.path)
useEffect(()=>{
    axios.get("/api/students").then((response)=>{
        //console.log(response.data);
        setStudent(response.data);
})
},[])


    return (
       
        <>
        
        <Sidebar/>
       
        <div className="content-wrapper" >
            <section className="content">
              {localStorage.getItem("role")==="management"?
            <Link to="/register/student">
            <button className="btn btn-success float-right" type="button">
                Add Student
            </button>
          </Link>:""}
    <div className="container-fluid">
    
         <div className="row">
          <div className="col-lg-12 col-12">
            <div className="small-box">
              <div className="inner">
              <table className="table table-bordered table-hover table-lg  p-1 mt-2">
              <thead>
                <tr className="table-primary">
                  <th scope="col" >
                  StudentName 
                     
                  </th>
                  <th>Email</th>
                  <th >
                      ClassName
                  </th>
                  <th >
                      DOB
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {student.map((u, i) => {
                  const d = u.DOB.split("T");
                  return (
                    <tr key={i}>
                      <td>{u.student_name}</td>
                      <td>{u.email}</td>
                      <td>{u.className}</td>
                      <td>{d[0]}</td>

                      </tr>
                 ) })}
                      </tbody>
                      </table>

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

export default Student;