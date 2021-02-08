import React,{useEffect,useState} from 'react'
import axios from 'axios';
import{Link} from 'react-router-dom';
import Sidebar from './Sidebar'
function Management() {
    const[management,setManagement]=useState([]);
useEffect(()=>{
    axios.get("/api/managements").then((response)=>{
        //console.log(response.data);
        setManagement(response.data);
})
},[])
    return (
        <>
        <Sidebar/>
        <div className="content-wrapper" >
        
            <section className="content">
            <Link to="/register/management">
            <button className="btn btn-success float-right" type="button">
                Add Management
            </button>
          </Link>
    <div className="container-fluid">
    
         <div className="row">
          <div className="col-lg-12 col-12">
            <div className="small-box">
              <div className="inner">
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
                {management.map((u, i) => {
                  //const d = u.DOB.split("T");
                  return (
                    <tr key={i}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>

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

export default Management
