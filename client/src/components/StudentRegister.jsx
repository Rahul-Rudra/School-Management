import React,{useState} from 'react'
import axios from 'axios'
function StudentRegister() {
    const[alert,setAlert]=useState("");
    const[state,setState]=useState({
        Reg_no:"",
        student_name:"",
        email:"",
        fatherName:"",
        motherName:"",
        mobile_no:"",
        fatherMobileNo:"",
        DOB:"",
        className:"",
        password:""
    })
    const[errors,setError]=useState({
        Reg_no:"",
        student_name:"",
        email:"",
        fatherName:"",
        motherName:"",
        mobile_no:"",
        fatherMobileNo:"",
        DOB:"",
        className:"",
        password:""
    })

    const handleChange=(e)=>{
        const{id,value}=e.target;
        if(id==="Reg_no")
        {
            setError(prevState=>({...prevState,[id]:value.length>4?"Registration number should be 4 number and its between 1000 to 4444":""}))
        }
        if(id==="student_name")
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
       if(id==="fatherName")
        {
            setError(prevState=>({...prevState,[id]:value.length<3?"fatherName should be String and atleast 3 charachter":""}))
        }
        if(id==="motherName")
        {
            setError(prevState=>({...prevState,[id]:value.length<3?"motherName should be String and atleast 3 charachter":""}))
        }
        if(id==="mobile_no")
        {
            setError(prevState=>({...prevState,[id]:value.length!==10?"Mobile number should contain 10 digit":""}))
        }
        if(id==="fatherMobileNo")
        {
            setError(prevState=>({...prevState,[id]:value.length!==10?" Mobile number should contain 10 digit":""}))
        }
        if(id==="className")
        {
            setError(prevState=>({...prevState,[id]:value.length>10?"class should be valid":""}))
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
    if(state.Reg_no==="")
    {
        setError({["Reg_no"] : "Can not be null"});
    }
    else if (state.student_name === "") {
        setError({["student_name"] : "Can not be null"});
      }
      else if(state.className==="")
      {
          setError({["className"]:"Cant not be null"})
      } 
      else if (state.email === "") {
        setError({["email"] : "Can not be null"});
      }
      else if(state.motherName==="")
      {
        setError({["motherName"] : "Can not be null"});
      } 
      else if(state.fatherName==="")
      {
        setError({["fatherName"] : "Can not be null"});
      }
      else if(state.fatherMobileNo==="")
      {
        setError({["fatherMobileNo"] : "Can not be null"});
      }
      else if(state.mobile_no==="")
      {
        setError({["mobile_no"] : "Can not be null"});
      }
      else if (state.password === "") {
        setError({["password"]: "Can not be null"});
      } 
      else if(errors.Reg_no.length!==0)
      {
          setError({["Reg_no"]:errors.Reg_no});
      }
       else if (errors.student_name.length !== 0) {
        setError({["student_name"]: errors.name});
      }
      else if(errors.className.length!==0)
      {
          setError({["className"]:errors.className});
      } 
      else if (errors.email.length !== 0) {
        setError({["email"]: errors.email});
      }
      else if(errors.motherName.length!==0)
      {
          setError({["motherName"]:errors.motherName})
      }
      else if(errors.fatherName.length!==0)
      {
          setError(errors.fatherName)
      }
      else if(errors.fatherMobileNo.length!==0)
      {
          setError(errors.fatherMobileNo);
      }
      else if(errors.mobile_no.length!==0)
      {
          setError(errors.mobile_no);
      }
      else if (errors.password.length !== 0) {
        setError({["password"]:errors.password});
      } 

      axios
      .post("/api/students/register", state)
      .then((res) => {
          console.log(res.data);
        setAlert("success");
      })
      .catch((error) => {
          setAlert("failed");
        console.log(error);
      });

      setState({Reg_no:"",student_name:"",email:"",password:"",className:"",DOB:"",motherName:"",fatherName:"",mobile_no:"",fatherMobileNo:""});
}

    return (
     <>
     <div className="wrapper m-5" >
              {alert=== "success" ? <div className="alert alert-success" role="alert">
        Successfull Register 
      </div> : ""}
      {alert=== "failed" ? <div className="alert alert-danger" role="alert">
        Something went wrong
      </div> : ""}
      

             <form onSubmit={handleSubmit} >
            <div className="row">
                <div className="col">
                <div className="form-group m-3">
              <label forhtml="Reg_no">Registration Number</label>
              <input
                autoFocus
                type="number"
                id="Reg_no"
                placeholder="Registration number"
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
                </div>

                <div className="col">
                <div className="form-group m-3">
              <label forhtml="student_name">Name</label>
              <input
              //  autoFocus
                type="text"
                id="student_name"
                placeholder="Name"
                value={state.student_name}
                onChange={handleChange}
                className="form-control"
              />
             {errors.student_name ? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.student_name}
                </div>
              ) : (
                ""
              )} 
                </div>
            </div>
            
            </div>
            <div className="row">
                <div className="col">
                <div className="form-group m-3">
              <label forhtml="className">Class</label>
              <input
                // autoFocus
                type="text"
                id="className"
                placeholder="class"
                value={state.className}
               onChange={handleChange}
                className="form-control"
              />
              {errors.className? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.className}
                </div>
              ) : (
                ""
              )} 
            </div>
                </div>
                <div className="col">
                <div className="form-group m-3 ">
              <label forhtml="DOB">date Of birth</label>
              <input
                //autoFocus
                type="date"
                
                id="DOB"
               // datatype="yyyy-mmmm-dd"
                placeholder="date of birth"
                value={state.DOB}
               onChange={handleChange}
                className="form-control"
              />
               {errors.DOB? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.DOB}
                </div>
              ) : (
                ""
              )} 
            </div>
                </div>
              
            </div>
                
            <div className="row">
                <div className="col">
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
                </div>
                <div className="col">
                <div className="form-group m-3 ">
              <label forhtml="motherName">Mother Name</label>
              <input
                //autoFocus
                type="text"
                id="motherName"
                placeholder="Mother Name"
                value={state.mother}
               onChange={handleChange}
                className="form-control"
              />
               {errors.motherName ? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.motherName}
                </div>
              ) : (
                ""
              )} 
            </div>
                </div>
            </div>
                
            
            <div className="row">
                <div className="col">
                <div className="form-group m-3">
              <label forhtml="fatherName">Father Name</label>
              <input
                // autoFocus
                type="text"
                id="fatherName"
                placeholder="Father Name"
                value={state.fatherName}
               onChange={handleChange}
                className="form-control"
              />
              {errors.fatherName ? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.fatherName}
                </div>
              ) : (
                ""
              )} 
            </div>
                </div>  <div className="col">
                <div className="form-group m-3 ">
              <label forhtml="fatherMobileNo">Father No</label>
              <input
                //autoFocus
                type="number"
                id="fatherMobileNo"
                placeholder="fatherMobileNo"
                value={state.fatherMobileNo}
               onChange={handleChange}
                className="form-control"
              />
               {errors.fatherMobileNo ? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.fatherMobileNo}
                </div>
              ) : (
                ""
              )} 
            </div>
                </div>
             
            </div>
                
            <div className="row">
                <div className="col">
                <div className="form-group m-3">
              <label forhtml="mobile_no">Mobile No</label>
              <input
                // autoFocus
                type="number"
                id="mobile_no"
                placeholder="Mobile number"
                value={state.mobile_no}
               onChange={handleChange}
                className="form-control"
              />
              {errors.mobile_no ? (
                <div className="alert alert-warning m-1" role="alert">
                  {errors.mobile_no}
                </div>
              ) : (
                ""
              )} 
            </div>
                </div>
                <div className="col">
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
                </div>
              
            </div>
                
            
           
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
</div>    
     </>
    )
}

export default StudentRegister
