import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { getCookie, getRole } from '../utils/auth'

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem auto 0;
  /* @media (max-width: 768px) {
    flex-direction: column;
  } */
`

const Button = styled(NavLink)`
  background-color: steelblue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  &:hover{
    text-decoration: none;
    color: steelblue;
    background-color: #fff;
    font-weight: bold;
  }
`

const AdjustPointButton = () => {
    const roles = ["Admin", "Distributor", "Stokist", "Player"]
    const [loggedUserRole, setloggedUserRole] = useState('')

    const loggedUser = getCookie("token");

    (async () => {
        const role = await getRole(loggedUser);
        setloggedUserRole(role)
    })();

    return (
        <ButtonContainer>
            {loggedUserRole === 'SUPERADMIN' && roles.map((role, i) => (
                <Button to={`/adjustpoints/${role.toLowerCase()}`} key={i}>
                    {role}
                </Button>
            ))}

            {loggedUserRole === 'ADMIN' && roles.slice(1).map((role, i) => (
                <Button to={`/adjustpoints/${role.toLowerCase()}`} key={i}>
                    {role}
                </Button>
            ))}

            {loggedUserRole === 'Distributor' && roles.slice(2).map((role, i) => (
                <Button to={`/adjustpoints/${role.toLowerCase()}`} key={i}>
                    {role}
                </Button>
            ))}

            {loggedUserRole === 'STOKIST' && roles.slice(3).map((role, i) => (
                <Button to={`/adjustpoints/${role.toLowerCase()}`} key={i}>
                    {role}
                </Button>
            ))}
        </ButtonContainer>
    )
}

export default AdjustPointButton