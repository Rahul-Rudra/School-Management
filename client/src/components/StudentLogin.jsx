import React,{useState} from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom"
function StudentLogin() {
    let history=useHistory()
    const[alert,setAlert]=useState("");
    const[state,setState]=useState({
        
        Reg_no:"",
        password:""
    })
    const[errors,setError]=useState({
       
        Reg_no:"",
        password:""
    })

    const handleChange=(e)=>{
        const{id,value}=e.target;
        const re = /^[0-9\b]+$/;
       if(id==="Reg_no")
       {
           setError(prevState=>({...prevState,[id]: value.length > 4 || value.length<4 ? "Reg_no should be 4 digit" : ""}));
       }
       if(id==="password")
       {
        setError(prevState => ({
            ...prevState,
            [id] : value.length < 6 ? "password must contain atleast  6 character" : ""
        }))
       }
      
       if(id==="Reg_no" && re.test(value) || value==="")
       {
        
        setState(prevState=>({...prevState,[id]:value}))
        
       }
       else
       { 
        setState(prevState=>({...prevState,["password"]:value}))
      } 
        
    }

const handleSubmit=(e)=>{
    e.preventDefault();
     if (state.Reg_no === "") {
        setError({["Reg_no"] : "Can not be null"});
      } else if (state.password === "") {
        setError({["password"]: "Can not be null"});
      }   else if (errors.Reg_no.length !== 0) {
        setError({["Reg_no"]: errors.Reg_no});
      } else if (errors.password.length !== 0) {
        setError({["password"]:errors.password});
      } 

      axios
      .post("/api/students/login", state)
      .then((res) => {
          console.log(res.data);
          localStorage.setItem("login", res.data.token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("name", res.data.student_name); 
          localStorage.setItem("DOB",res.data.DOB);
          localStorage.setItem("classname",res.data.className)
          //console.log(localStorage.getItem("login"))
        history.push("/student/dashboard");
        
      })
      .catch((error) => {
        console.log(error);
        //console.log(errors.Reg_no.length,errors.password.length)
        
            setAlert("failed");
        
      // console.log(alert)
      });

      setState({Reg_no:"",password:""});
}

    return (
        <div className="wrapper m-5" >
              <h1 style={{textAlign:"center"}}>Student Login</h1>
              {alert=== "failed" ? <div className="alert alert-danger" role="alert">
        Registration number or password is incorrect 
      </div> : ""}
             <form onSubmit={handleSubmit} >
         
            <div className="form-group m-3">
              <label forhtml="email">Reg_no</label>
              <input
                // autoFocus
                type="text"
                id="Reg_no"
                maxLength="4"
                placeholder="Reg_no"
                value={state.Reg_no}
               onChange={handleChange}
                className="form-control"
              />
              {errors.Reg_no ? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.Reg_no}
                </div>
              ) : (
                ""
              )} 
            </div>
            <div className="form-group m-3 ">
              <label forhtml="password">Password</label>
              <input
                //autoFocus
                type="password"
                id="password"
                placeholder="password"
                value={state.password}
               onChange={handleChange}
                className="form-control"
              />
               {errors.password ? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.password}
                </div>
              ) : (
                ""
              )} 
            </div>
           

              <div className="form-group m-3">
                <input
                  type="submit"
                  value="Login"
                 // disabled="true"
                  className="btn btn-success "
                />
              </div>
           
          </form>
</div>    )
}

export default StudentLogin
