import React,{useState} from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios';
function ManagementLogin() {
    let history=useHistory()
    const[alert,setAlert]=useState("");
    const[state,setState]=useState({
        
        email:"",
        password:""
    })
    const[errors,setError]=useState({
       
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        const{id,value}=e.target;
      
       if(id==="email")
       {
           setError(prevState=>({...prevState,[id]: value.length > 30 ? "email can not be more than 30 character" : ""}));
           let apos = value.indexOf("@");
           let dotpos = value.lastIndexOf(".");
           if (apos < 1 || dotpos - apos < 2)
           {
               setError(prevState=>({...prevState,[id]:"please enter a valid email id"}));
           }
       }
       if(id==="password")
       {
        setError(prevState => ({
            ...prevState,
            [id] : value.length < 6 ? "password must contain atleast  6 character" : ""
        }))
       }
        setState(prevState=>({...prevState,[id]:value}))
    }

const handleSubmit=(e)=>{
    e.preventDefault();
     if (state.email === "") {
        setError({["email"] : "Can not be null"});
      } else if (state.password === "") {
        setError({["password"]: "Can not be null"});
      }   else if (errors.email.length !== 0) {
        setError({["email"]: errors.email});
      } else if (errors.password.length !== 0) {
        setError({["password"]:errors.password});
      } 

      axios
      .post("/api/managements/login", state)
      .then((res) => {
          console.log(res.data);
          localStorage.setItem("login", res.data.token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("name", res.data.name); 
          //console.log(localStorage.getItem("login"))
        history.push("/management/dashboard");
        
      })
      .catch((error) => {
        setAlert("failed");
        console.log(error);
      });

      setState({email:"",password:""});
}

    return (
        <div className="wrapper m-5" >
             <h1 style={{textAlign:"center"}}>Management Login</h1>
             {alert=== "failed" ? <div className="alert alert-danger" role="alert">
        Username or password is incorrect 
      </div> : ""}
             <form onSubmit={handleSubmit} >
         
            <div className="form-group m-3">
              <label forhtml="email">Email</label>
              <input
                // autoFocus
                type="text"
                id="email"
                placeholder="Email"
                value={state.email}
               onChange={handleChange}
                className="form-control"
              />
              {errors.email ? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.email}
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

export default ManagementLogin
