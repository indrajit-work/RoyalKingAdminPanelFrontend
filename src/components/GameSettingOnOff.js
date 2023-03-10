import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { getCookie } from '../utils/auth'

const Container = styled.div`
  margin: 1rem auto 2rem;
`

const Form = styled.form`
    display: flex;
    justify-content: center;
    gap: 2rem;
    align-items: center;
    flex-wrap: wrap;
`

const Label = styled.label`
  margin: auto 4px auto;
`

const GameSettingOnOff = () => {
    const loggedUser = getCookie("token");

    const [jeetoJoker, setJeetoJoker] = useState(null)
    const [singleChance, setSingleChance] = useState(null)
    const [doubleChance, setDoubleChance] = useState(null)
    const [cards16, setCards16] = useState(null)
    const [cards52, setCards52] = useState(null)
    const [cards24, setCards24] = useState(null)

    // console.log(
    //     "jeetoJoker", jeetoJoker,
    //     "singleChance", singleChance,
    //     "doubleChance", doubleChance,
    //     "cards16", cards16,
    //     "cards52", cards52
    //   )

    const getActiveGames = async () => {
      try {
        const res = await axios.get(
          `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/games/getactivegames?userID=${loggedUser}`
        );
        // console.log(res.data);
  
        setJeetoJoker(res.data.jeetoJoker);
        setSingleChance(res.data.singleChance);
        setDoubleChance(res.data.doubleChance);
        setCards16(res.data.cards16);
        setCards52(res.data.cards52);
        setCards24(res.data.cards24);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getActiveGames();
    }, []);

    const onOffHandler = async (e) => {
      e.preventDefault()

      try {
          const res = await axios.post(
              `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/games/setactivegames?userID=${loggedUser}`,
                [
                  jeetoJoker,
                  cards16,
                  singleChance,
                  doubleChance,
                  cards52,
                  cards24
                ]
            );
            // console.log(res.data)
      } catch (error) {
          console.log(error)
      }
    }

  return (
    <Container>
      <h4 style={{textAlign: 'center', marginBottom: '2rem'}}>Active Games Settings</h4>
      <Form onSubmit={onOffHandler}>
          <div>
            <input type="checkbox" name="jeetojoker" checked={jeetoJoker} onChange={() => setJeetoJoker(prev => !prev)} id="jeetojoker" />
            <Label htmlFor="jeetojoker">Jeeto Joker</Label>
          </div>
          <div>
            <input type="checkbox" name="cards16" id="cards16" checked={cards16} onChange={() => setCards16(prev => !prev)} />
            <Label htmlFor="cards16">Cards 16</Label>
          </div>
          <div>
            <input type="checkbox" name="singlechance" id="singlechance" checked={singleChance} onChange={() => setSingleChance(prev => !prev)} />
            <Label htmlFor="singlechance">Single Chance</Label>
          </div>
          <div>
            <input type="checkbox" name="doublechance" id="doublechance" checked={doubleChance} onChange={() => setDoubleChance(prev => !prev)} />
            <Label htmlFor="doublechance">Double Chance</Label>
          </div>
          <div>
            <input type="checkbox" name="cards52" id="cards52" checked={cards52} onChange={() => setCards52(prev => !prev)} />
            <Label htmlFor="cards52">Cards 52</Label>
          </div>
          <div>
            <input type="checkbox" name="cards24" id="cards24" checked={cards24} onChange={() => setCards24(prev => !prev)} />
            <Label htmlFor="cards24">Cards 24</Label>
          </div>

          <button>Save</button>
      </Form>
    </Container>
  )
}

export default GameSettingOnOff