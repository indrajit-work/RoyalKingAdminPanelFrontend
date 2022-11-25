import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCookie } from '../utils/auth';

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 2rem auto 4rem;
    @media (max-width: 425px){
        flex-direction: column;
    }
`

const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
`

const Desc = styled.p`
    font-size: 12px;
    width: 30%;
    @media (max-width: 425px){
        width: 90%;
        text-align: justify;
        margin-top: 1rem;
    }
`

const RandomResult = () => {
    const [randomResult, setRandomResult] = useState(null)

  // get loggedin user id
  const loggedUser = getCookie("token");

  const getRandomResult = async () => {
    try {
      const res = await axios.get(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/games/randomresults?userID=${loggedUser}`
      );
      console.log(res.data);
      setRandomResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomResult();
  }, []);

    const randomResultHandler = async(e) => {
        e.preventDefault()

        try {
          const res = await axios.post(`https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/games/randomresults?userID=${loggedUser}`, randomResult);
          console.log(res.data)
        } catch (error) {
          console.log("Error:", error);
        }
      }

  return (
    <Container>
        <Form onSubmit={randomResultHandler}>
            <label style={{fontWeight: 'bold'}}>Set Random Result</label>
            <select
                name="randomResult"
                defaultValue={randomResult}
                onChange={(e) => setRandomResult(e.target.value)}
                style={{width: '100%', marginBottom: '10px'}}
            >
                <option value={randomResult} disabled selected>{randomResult ? 'True': 'False'}</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
            </select>

            <button>Save</button>
        </Form>

        <Desc><span style={{color: 'red', fontSize: '16px'}}>*</span>If ON then winner will be decided Randomly between played cards. IF OFF then there is a  50% chance that winner can be non played card. Even if it's the only one card that is not played. Every option considers payout. In both option total pay will not go higher than payout"</Desc>
    </Container>
  )
}

export default RandomResult