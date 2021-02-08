import React,{useState,useEffect} from 'react'
import Sidebar from './Sidebar';
import axios from 'axios'
function MyStudent() {
    const[student,setStudent]=useState([]);
    const id=localStorage.getItem("id");
    useEffect(()=>{
        axios.get(`/api/teachers/${id}`).then((response)=>{
            //console.log(response.data);
            setStudent(response.data);
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
            <h1 className="m-0 text-dark">Student</h1>
          </div>
        </div>
      </div>
    </div>
    <section className="content">
    <div className="container-fluid">
    <div className="card">
        <div className="card-body">
        <table className="table table-bordered table-hover table-lg  p-1 mt-2">
              <thead>
                <tr className="table-primary">
                    <th>Reg_no</th>
                  <th scope="col" >
                  StudentName 
                     
                  </th>
                  <th>Email</th>
                  <th >
                      ClassName
                  </th>
                  <th>Mobile-no</th>
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
                        <td>{u.Reg_no}</td>
                      <td>{u.student_name}</td>
                      <td>{u.email}</td>
                      <td>{u.className}</td>
                  <td>{u.mobile_no}</td>
                      <td>{d[0]}</td>

                      </tr>
                 ) })}
                      </tbody>
                      </table>
        </div>

    </div>
     </div>
     </section>
    </div>
   
        </>
    )
}

export default MyStudent
