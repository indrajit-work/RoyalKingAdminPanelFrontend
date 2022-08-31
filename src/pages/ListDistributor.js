import axios from 'axios';
import React ,{useEffect,useState} from 'react'
import { MDBTable , MDBTableHead , MDBTableBody , MDBRow , MDBCol , MDBContainer} from "mdb-react-ui-kit" ;

const ListDistributor = () => {
    const[data,setData]=useState([]);
    useEffect(()=>{
        loadUserData();
    },[])

    const loadUserData=async ()=>{
      return   await axios.get("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getallusers")
      .then((response)=> setData(response.data)).catch((err)=>console.error("Erroror",err))

    }
    console.log("data:",data.users);

  return (
  <MDBContainer>
    <div style={{marginTop:"80px"}}>
    < h1 className='text-center mb-5 text-muted'> Distributors </h1>
<MDBRow>
   <MDBCol size ="12">
    <MDBTable >
       < MDBTableHead dark >
         < tr >
         <th scope ="col">User Id</th>
            <th scope = " col " > User Role </ th >
            <th scope = " col " >Email </ th >
            <th scope = " col " > Name </th >
            <th scope = " col " >Registered On </th >
            <th scope = " col " > Status </th >
         </tr>
       </MDBTableHead >
       { data.length === 0 ? (
         <MDBTableBody className = "align-center mb-8" >
         <tr>
            <td colspan ={ 8 } className = " text-center mb-8" > No Data Found </td>
         </tr>
      </MDBTableBody>
       ):(
        data.users.map ((item ,index ) => (
            <MDBTableBody key={index} >
           <tr>
          
            <td > {item.userID } </td>
              < td > { item.userRole } </td >
               < td > { item.email } </ td >
                <td>{item.fullName}</td>
              < td > { item.registeredOn } </td >
              < td > { item.userStatus } </ td > 
        </tr>
        </MDBTableBody>
        ))
       )}
    </MDBTable >
  </MDBCol>
</MDBRow>
    </div>
  </MDBContainer>
  )
}

export default ListDistributor