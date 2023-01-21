import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components';
import moment from "moment/moment";

const FormContainer = styled.div`
    width: 400px;
    display: grid;
    place-items: center;
    margin: 0 auto;
    height: 100vh;
    @media (max-width: 425px) {
        width: 80vw;
  }
`

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Button = styled.button`
    background-color: steelblue;
    color: white;
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 8px 0;
    margin-top: 1rem;
`

const CleanData = () => {
    const [from, setFrom] = useState(null);
    const [daysToClean, setDaysToClean] = useState('')

    const cleanDataHandler = (e) => {
        e.preventDefault()

        // if(daysToClean > 30){
        //     toast.error("Please enter a number between 1 and 30")
        //     return
        // }
        // console.log(daysToClean)

        let fromMom = moment(new Date()).subtract(daysToClean, 'days').format('DD MMM YYYY')
        setFrom(fromMom)
        // console.log(from)
    }
    
  return (
    <FormContainer>
        <Form onSubmit={cleanDataHandler}>
            <label>Delete data older than</label>
            <select name='daysToClean' style={{height: '40px'}} onChange={e => setDaysToClean(e.target.value)}>
                <option value='' selected disabled>Select no of days below...</option>
                <option value='15'>15 days</option>
                <option value='30'>30 days</option>
                <option value='90'>90 days</option>
            </select>
            <Button className='button'>Clean</Button>
        </Form>
        <ToastContainer />
    </FormContainer>
  )
}

export default CleanData