import React,{Fragment,useEffect} from 'react'
//import Sidebar from './Sidebar'
//import {IoIosPower  } from "react-icons/io"
import {Link,useLocation} from 'react-router-dom'
function Header() {
    const location = useLocation();
    const role=localStorage.getItem("role");
    let path=location.pathname;
    useEffect(()=>{
     
       path=location.pathname;
    },[location])
 

    return (
        <Fragment>
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
  
    <ul className="navbar-nav">
  
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/" className={path==="/"?"nav-link active":"nav-link" }>Home</Link>
      </li>



    {/*   FOR Admin */}



      {localStorage.getItem("login") && localStorage.getItem("role")=="Admin" || localStorage.getItem("role")==="management"?
      <li className="nav-item d-none d-sm-inline-block">
        <Link to={role==="Admin"?"/admin/dashboard":"/management/dashboard"} className={path.match("/admin/dashboard") || path.match("/management/dashboard")?"nav-link active":"nav-link" }>Dashboard</Link>
      </li>:""}
      {localStorage.getItem("login") && localStorage.getItem("role")=="Admin" || localStorage.getItem("role")==="management"?
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/teachers" className={path.match("/teachers")?"nav-link active":"nav-link" }>Teacher</Link>
      </li>:""}
      {localStorage.getItem("login") && localStorage.getItem("role")=="Admin" || localStorage.getItem("role")==="management"?
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/students" className={path.match("/students")?"nav-link active":"nav-link" }>Student</Link>
      </li>:""}
      {localStorage.getItem("login") && localStorage.getItem("role")=="Admin"?
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/managements" className={path.match("/managements")?"nav-link active":"nav-link" }>Management</Link>
      </li>:""}
      {localStorage.getItem("login") && localStorage.getItem("role")=="teacher"?
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/teacher/dashboard" className={path.match("/teacher/dashboard")?"nav-link active":"nav-link" }>Dashboard</Link>
      </li>:""}
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
{localStorage.getItem("login")?
      <li className="nav-item">
                <Link to="/profile" className={path.match("/profile")?"nav-link active":"nav-link"}>
                  Profile
                </Link>
              </li>:""}

            

      {localStorage.getItem("login") ? (
              <li className="nav-item">
                <Link
                  className={path.match("/logout")?"nav-link active":"nav-link" }
                  to="/logout"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                 Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item">
             
                <Link
                  className={path.match("/adminlogin")?"nav-link active":"nav-link" }
                  to="/adminlogin"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                AdminLogin
                </Link>
              </li>
            )}

 {localStorage.getItem("login") ?"":
            <li className="nav-item">
             
             <Link
               className={path.match("/managementlogin")?"nav-link active":"nav-link" }
               to="/managementlogin"
               tabIndex="-1"
               aria-disabled="true"
             >
             ManagementLogin
             </Link>
           </li>} 
           {localStorage.getItem("login") ?"":
            <li className="nav-item">
             
             <Link
               className={path.match("/teacher/login")?"nav-link active":"nav-link" }
               to="/teacher/login"
               tabIndex="-1"
               aria-disabled="true"
             >
           TeacherLogin
             </Link>
           </li>} 

           {localStorage.getItem("login") ?"":
            <li className="nav-item">
             
             <Link
               className={path.match("/studentlogin")?"nav-link active":"nav-link" }
               to="/studentlogin"
               tabIndex="-1"
               aria-disabled="true"
             >
             StudentLogin
             </Link>
           </li>} 
    </ul>

</nav>

        </Fragment>
    )
}

export default Header
