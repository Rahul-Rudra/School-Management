import React from 'react'
import Sidebar from './Sidebar'

function Profile() {
    return (
      <>
      <Sidebar/>
      <div className="content-wrapper" >
        
        <section className="content">
<div className="container-fluid">

     <div className="row">
      <div className="col-lg-12 col-12">
        <div className="small-box">
          <div className="inner">
       <div className="card m-5 p-5">
           <h3 style={{textAlign:"center"}}>Personal-Detail</h3>
       <table className="table table-bordered ">
 
    <tr>
      
      <th scope="col" className="text-center">Id</th>
    <td className="text-center">{localStorage.getItem("id")}</td>
      
    </tr>
  
 <tr>
 <th scope="col" className="text-center">Name</th>
    <td className="text-center">{localStorage.getItem("name")}</td>
 </tr>
    <tr>
    <th scope="col" className="text-center">Role</th>
    <td className="text-center">{localStorage.getItem("role")}</td>
      
    </tr>
    {localStorage.getItem("role")==="teacher"?
    <tr>
    <th scope="col" className="text-center">Class</th>
    <td className="text-center">{localStorage.getItem("classname")}</td>
      
    </tr>:""}
    </table>
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

export default Profile
