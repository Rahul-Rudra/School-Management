import Axios from 'axios';
import React, { Fragment,useEffect,useState} from 'react';
import axios from 'axios'
import {useParams} from 'react-router-dom';
import ErrorAlert12 from './ErrorAlert12';
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
function AssignClassForm() {
    const params = useParams();
    //console.log(params.id)
    const[class_name,setClassName]=useState("");
    const[error,setError]=useState("");
    const[alert,setAlert]=useState("");
    
    const handleChange = (e) => {
        const {name ,error, value} = e.target   ;
         setError(value.length>3?"It must be string and not greater than 3":"");

        setClassName(value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(class_name.length==="")
        {
            setError("Can not be null");
        }
        else if(error.length!==0)
        {
            setError(error);
        }
      axios.patch(`/api/teachers/${params.id}`,{class_name:class_name}).then((res)=>{
          //console.log(res.data)
          setAlert("success")

      }).catch(()=>{
        setAlert("failed")
      })
      setClassName("");
    }
    return (
        <Fragment>
          <div className="jumbotron jumbotron-fluid">
  <div className="container">
  {alert=== "success" ? <ErrorAlert12 /> : ""}
  <form onSubmit={handleSubmit} >
  <div className="form-group">
    <label for="email">Class Name:</label>
    <input type="text" className="form-control" placeholder="Enter className.." id="className" name="className" value={class_name} onChange={handleChange}/>
  </div>
  {error?
  <div className="alert alert-warning " role="alert">
     {error}
      </div>:""}

  
  <button type="submit" className="btn btn-default" >Submit</button>
</form>
  </div>
</div>
            
        </Fragment>
    )
}

export default AssignClassForm
