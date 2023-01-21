import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import AdjustPointForm from '../components/AdjustPointForm'
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

const Button = styled.button`
  background-color: steelblue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
`

const AdjustPoints = () => {
  const roles = ["Admin", "Distributor", "Stokist", "Player"]

  const [userRole, setUserRole] = useState('')
  const [loggedUserRole, setloggedUserRole] = useState('')

  const loggedUser = getCookie("token");

  (async () => {
    const role = await getRole(loggedUser);
    setloggedUserRole(role)
  })();

  return (
    <>
        <ButtonContainer>
        {loggedUserRole === 'SUPERADMIN' && roles.map((role, i) => (
          <Button key={i} onClick={() => setUserRole(role)}>
            {role}
          </Button>
        ))}

        {loggedUserRole === 'ADMIN' && roles.slice(1).map((role, i) => (
          <Button key={i} onClick={() => setUserRole(role)}>
            {role}
          </Button>
        ))}

        {loggedUserRole === 'Distributor' && roles.slice(2).map((role, i) => (
          <Button key={i} onClick={() => setUserRole(role)}>
            {role}
          </Button>
        ))}

        {loggedUserRole === 'STOKIST' && roles.slice(3).map((role, i) => (
          <Button key={i} onClick={() => setUserRole(role)}>
            {role}
          </Button>
        ))}
      </ButtonContainer>

      <div>
        {userRole === "Admin" && (
          <AdjustPointForm userRole='ADMIN' loggedUser={loggedUser} />
          )}
        {userRole === "Distributor" && (
          <AdjustPointForm userRole='Distributor' loggedUser={loggedUser} />
          )}
        {userRole === "Stokist" && (
          <AdjustPointForm userRole='STOKIST' loggedUser={loggedUser} />
          )}
        {userRole === "Player" && (
          <AdjustPointForm userRole='PLAYER' loggedUser={loggedUser} />
        )}
      </div>
    </>
  )
}

export default AdjustPoints