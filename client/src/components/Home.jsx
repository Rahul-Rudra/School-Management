
import React,{useEffect,useState} from 'react'
import axios from 'axios';

function Home() {
const[Data,setData]=useState([]);
//console.log(props)

useEffect(()=>{
    axios.get("/file").then((response)=>{
       // console.log(response.data);
        setData(response.data);
        //console.log(Data)
    }).catch((err)=>{
        console.log(err);
    })
},[])

const Download=id=>{
    axios({
        url: `/download/${id}`,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      });
    //console.log("press")
   /*  axios.get(`/download/:${id}`).then((response)=>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'file.png');
  document.body.appendChild(link);
  link.click(); */
        //console.log(response.data);
   /*  }) */
}
    return (
        <div>
         
           <table>
               <thead>
               <th>File Name</th>
               <th>action</th>
               </thead>
               <tbody>
               {Data.map((u, i) => {
                  
                  return (
                    <tr key={i}>
                      <td>{u.picspath}</td>
                    <td>
                    <button  onClick={() => Download(u._id)}>
                                            Download
                                        </button>
                    </td>
                      </tr>
                 ) })} 
                      </tbody>
                      </table>
                 
        </div>
    )
}

export default Home
