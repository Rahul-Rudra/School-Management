import React,{useState} from 'react'
import axios from 'axios';

function RegisterManagement() {
    const[alert,setAlert]=useState("");
    const[state,setState]=useState({
        name:"",
        email:"",
        password:""
    })
    const[errors,setError]=useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        const{id,value}=e.target;
        if(id==="name")
        {
            setError(prevState=>({...prevState,[id]:value.length<3?"Name should be String and atleast 3 charachter":""}))
        }
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
    if (state.name === "") {
        setError({["name"] : "Can not be null"});
      } else if (state.email === "") {
        setError({["email"] : "Can not be null"});
      } else if (state.password === "") {
        setError({["password"]: "Can not be null"});
      }  else if (errors.name.length !== 0) {
        setError({["name"]: errors.name});
      } else if (errors.email.length !== 0) {
        setError({["email"]: errors.email});
      } else if (errors.password.length !== 0) {
        setError({["password"]:errors.password});
      } 

      axios
      .post("/api/managements/register", state)
      .then((res) => {
          console.log(res.data);
        setAlert("success");
      })
      .catch((error) => {
        console.log(error);
        
      /*    if (
          errors.email.length === 0 &&
          errors.password.length === 0 &&
          errors.name.length === 0
        ) {
            setAlert("failure");
          // alert("user already exists ");
         // this.setState({ alert_message: "error" });
        } */
      });

      setState({name:"",email:"",password:""});
}

    return (
        <div className="wrapper m-5" >
              {alert=== "success" ? <div className="alert alert-success" role="alert">
        Successfull Register 
      </div> : ""}
      

             <form onSubmit={handleSubmit} >
            <div className="form-group m-3">
              <label forhtml="name">Name</label>
              <input
                autoFocus
                type="text"
                id="name"
                placeholder="Name"
                value={state.name}
                onChange={handleChange}
                className="form-control"
              />
             {errors.name ? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.name}
                </div>
              ) : (
                ""
              )} 
            </div>
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
           
       {/*     {errors.name.length===0 && errors.email.length===0 && errors.password.length===0? (
               
              <div className="form-group m-3">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-success "
                />
              </div>
            ) : (   */}
              <div className="form-group m-3">
                <input
                  type="submit"
                  value="Register"
                 // disabled="true"
                  className="btn btn-success "
                />
              </div>
             {/* )}   */}
          </form>
</div>    )
}

export default RegisterManagement
