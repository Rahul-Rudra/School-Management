import React,{useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
function Sidebar() {
    const location = useLocation();
    const role=localStorage.getItem("role")
    let path=location.pathname;
    useEffect(()=>{
     
       path=location.pathname;
    },[location])
 

    return (
       <>
       <aside className="main-sidebar sidebar-dark-primary elevation-4">
  
  <Link to="" className="brand-link">
    <img src="../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
         style={{"opacity": .8}}/>
    <span className="brand-text font-weight-light">{role}</span>
  </Link> 
  <div className="sidebar">
  <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {localStorage.getItem("login") && localStorage.getItem("role")==="Admin"?
          <li className="nav-item ">
            <Link to="/admin/dashboard" className={path.match("/admin/dashboard") ?"nav-link active":"nav-link" }>
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i className="right fas fa-angle-left"></i>
              </p>
            </Link>
            </li>:""}


{/* //management dashboard */}
{localStorage.getItem("login") && localStorage.getItem("role")==="management"?
          <li className="nav-item ">
            <Link to="/management/dashboard" className={path.match("/management/dashboard") ?"nav-link active":"nav-link" }>
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i className="right fas fa-angle-left"></i>
              </p>
            </Link>
            </li>:""}

{/* //Teacher dashboard */}
{localStorage.getItem("login") && localStorage.getItem("role")==="teacher"?
          <li className="nav-item ">
            <Link to="/teacher/dashboard" className={path.match("/teacher/dashboard") ?"nav-link active":"nav-link" }>
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i className="right fas fa-angle-left"></i>
              </p>
            </Link>
            </li>:""}


            {localStorage.getItem("login") && localStorage.getItem("role")==="Admin" || localStorage.getItem('role')==="management"?
            <li className="nav-item">
            <Link to="/teachers" className={path.match("/teachers")?"nav-link active":"nav-link"}>
              <i className="nav-icon fas fa-th"></i>
              <p>
                Teacher
              </p>
            </Link>
          </li>:""}
          {localStorage.getItem("login") && localStorage.getItem("role")==="Admin" || localStorage.getItem('role')==="management"?
          <li className="nav-item">
            <Link to="/students" className={path.match("/students")?"nav-link active":"nav-link"}>
              <i className="nav-icon far fa-image"></i>
              <p>
               Student
              </p>
            </Link>
          </li>:""}
          
          {localStorage.getItem("login") && localStorage.getItem("role")==="Admin"?
          <li className="nav-item">
            <Link to="/managements" className={path.match("/managements")?"nav-link active":"nav-link"}>
              <i className="nav-icon far fa-image"></i>
              <p>
               Management
              </p>
            </Link>
          </li>:""
}
{localStorage.getItem("login") && localStorage.getItem("role")==="teacher"?
      <li className="nav-item">
                <Link to="/mystudents" className={path.match("/mystudents")?"nav-link active":"nav-link"}>
                  Mystudent
                </Link>
              </li>:""}

              {localStorage.getItem("login") && localStorage.getItem("role")==="student"?
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/student/dashboard" className={path.match("/student/dashboard")?"nav-link active":"nav-link" }>Dashboard</Link>
      </li>:""}
          <li className="nav-item">
                <Link to="/profile" className={path.match("/profile")?"nav-link active":"nav-link"}>
                  <i className="far fa-circle nav-icon"></i>
                  <p>Profile</p>
                </Link>
              </li>
            </ul>
            
            </nav>


  </div>
</aside>




       </>
    )
}

export default Sidebar
