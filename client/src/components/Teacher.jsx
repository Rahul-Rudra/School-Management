import React,{Fragment,useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
function Teacher() {
const[teacher,setTeacher]=useState([]);
useEffect(()=>{
    axios.get("/api/teachers").then((response)=>{
        //console.log(response.data);
        setTeacher(response.data);
    })
},[])



    return (
        <Fragment>
            <Sidebar/>
            <div className="content-wrapper" >
            <section className="content">
            {localStorage.getItem("role")==="management"?
            <Link to="/register/teacher">
            <button className="btn btn-success float-right" type="button">
                Add Teacher
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
                      TeacherName
                  </th>
                  <th>Email</th>
                  <th >
                      ClassName
                  </th>
                  <th >
                      DOB
                  </th>
                  <th scope="col">Issue</th>
                 
                </tr>
              </thead>
              <tbody>
                {teacher.map((u, i) => {
                  const d = u.Date_of_birth.split("T");
                  const bool=u.class_name==null;
                  console.log(bool)
                  return (
                    <tr key={i}>
                      <td>{u.teacher_name}</td>
                      <td>{u.email}</td>
                      <td>{u.class_name}</td>
                      <td>{d[0]}</td>

                      <td>
                        <Link to={`/assignclass/${u._id}`}><button
                          key={u._id}
                          type="button"
                           disabled={bool?false:true} 
                          className="btn btn-primary float-right"
                        >
                         AssignClass
                        </button>
                        </Link>
                        
                      </td>
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
           
        </Fragment>
    )
}

export default Teacher
