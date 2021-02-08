import React,{useState} from 'react'
import axios from 'axios';

function TeacherRegister() {
    const[alert,setAlert]=useState("");
    const[state,setState]=useState({
        teacher_name:"",
        email:"",
        date_of_birth:"",
        password:""
    })
    const[errors,setError]=useState({
        teacher_name:"",
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        const{id,value}=e.target;
        if(id==="teacher_name")
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
    if (state.teacher_name === "") {
        setError({["teacher_name"] : "Can not be null"});
      } else if (state.email === "") {
        setError({["email"] : "Can not be null"});
      } else if (state.password === "") {
        setError({["password"]: "Can not be null"});
      }  else if (errors.teacher_name.length !== 0) {
        setError({["teacher_name"]: errors.teacher_name});
      } else if (errors.email.length !== 0) {
        setError({["email"]: errors.email});
      } else if (errors.password.length !== 0) {
        setError({["password"]:errors.password});
      } 

      axios
      .post("/api/teachers/register", state)
      .then((res) => {
          console.log(res.data);
        setAlert("success");
      })
      .catch((error) => {
        console.log(error);
      });

      setState({name:"",email:"",password:"",date_of_birth:""});
}

    return (
        <div className="wrapper m-5" >
              {alert=== "success" ? <div className="alert alert-success" role="alert">
        Successfull Register 
      </div> : ""}
      

             <form onSubmit={handleSubmit} >
            <div className="form-group m-3">
              <label forhtml="teacher_name">Name</label>
              <input
                autoFocus
                type="text"
                id="teacher_name"
                placeholder="Name"
                value={state.teacher_name}
                onChange={handleChange}
                className="form-control"
              />
             {errors.teacher_name ? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.teacher_name}
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
              <label forhtml="date_of_birth">Date of birth</label>
              <input
                //autoFocus
                type="date"
                id="date_of_birth"
                placeholder="date-of-birth"
                value={state.date_of_birth}
               onChange={handleChange}
                className="form-control"
              />
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

export default TeacherRegister;
