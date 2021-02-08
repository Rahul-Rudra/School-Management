
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import Teacher from './components/Teacher';
import Student from './components/Student';
import Management from './components/Management';
import AssignClassForm from './components/AssignClassForm';
import RegisterManagement from './components/RegisterManagement';
import AdminLogin from './components/AdminLogin';
import Logout from './components/Logout';
import AdminProtected from'./components/AdminProtected';
import Protected from './components/Protected';
import Home from './components/Home';
import ManagementDashboard from './components/ManagementDashboard';
import ManagementLogin from './components/ManagementLogin';
import StudentRegister from './components/StudentRegister';
import TeacherRegister from './components/TeacherRegister';
import Profile from './components/Profile';
import TeacherLogin from './components/TeacherLogin';
import TeacherDashboard from './components/TeacherDashboard';
import MyStudent from './components/MyStudent';
import StudentLogin from './components/StudentLogin';
import Studentdashboard from './components/StudentDashboard';
function App() {
  return (
    
     
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/teacher/login" component={TeacherLogin}></Route>
          <Route path="/studentlogin" component={StudentLogin}></Route>
          <Protected path="/teacher/dashboard" component={TeacherDashboard}></Protected>
          <Protected path="/student/dashboard" component={Studentdashboard}></Protected>
          <Protected path="/mystudents" component={MyStudent}></Protected>
        <AdminProtected  path="/admin/dashboard" component={AdminDashboard}></AdminProtected>
        <Route  path="/adminlogin" component={AdminLogin}></Route>
        <Route  path="/managementlogin" component={ManagementLogin}></Route>
        <Route  path="/logout" component={Logout}></Route>
        <Route path="/management/dashboard" component={ManagementDashboard}></Route>
        <Protected path="/profile" component={Profile}></Protected>
        <AdminProtected   path="/teachers" component={Teacher}></AdminProtected>
        <AdminProtected  path="/students" component={Student}></AdminProtected>
        <AdminProtected  path="/managements" component={Management}></AdminProtected>
        <AdminProtected  path="/assignclass/:id" component={AssignClassForm}></AdminProtected>
        <AdminProtected  path="/register/management" component={RegisterManagement}></AdminProtected>
        <AdminProtected  path="/register/student" component={StudentRegister}></AdminProtected>
        <AdminProtected  path="/register/teacher" component={TeacherRegister}></AdminProtected>
        </Switch>
      
    </Router>
  
  );
}

export default App;
