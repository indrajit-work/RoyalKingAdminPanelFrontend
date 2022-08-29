import React ,{useEffect,useState} from 'react'
import { Card, Container ,Row} from 'react-bootstrap'
import { RiH4 } from 'react-icons/ri'
import "./Dashbaord.css"
import axios from 'axios'
const Dashboard = () => {
 const[state,setState]=useState({
    count:0
 });

 const{count}=state;
    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get(
            ` https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/-getcount`,
          );
          console.log(response)
          setState({
            ...state,
           count:response.data.count
          });
    
          return response.data;
        };
        try {
          fetchData();
        } catch (error) {
          if (error.response.status === 401) {
            return { user: "no data" };
          }
        }
      }, []);

  return (

   <Container>
    <Row>
    <Card
    bg="light"
    key="light"
   
    style={{ width: '50rem' ,height:"13rem"}}
    className="mb-2  mt-4"
  >
    <Card.Header className='text-center dashboard'><div>Online Admins</div></Card.Header>
    <Card.Body>
    <Card.Text>
        <h1 className='text-center mt-4 text-muted'>
            {count}
        </h1>
    </Card.Text>
      
    </Card.Body>
  </Card>
    </Row>
   
</Container>

    
  )
}

export default Dashboard