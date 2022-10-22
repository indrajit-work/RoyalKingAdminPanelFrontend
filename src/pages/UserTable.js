import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ListAdmin from './ListAdmin'
import ListDistributor from './ListDistributor'
import ListPlayer from './ListPlayers'
import StokistList from './StokistList'
import { getCookie, getRole } from "../utils/auth";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem auto 0;
`

const Button = styled.button`
  background-color: steelblue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
`

const UserTable = () => {
  const roles = ["Admin", "Distributor", "Stokist", "Player"]
  const [userRole, setUserRole] = useState('')

  //current user
  const loggedUser = getCookie("token");
  console.log("logeed in", loggedUser);
  const loggedUserRole = getRole(loggedUser);
  console.log("ROLE", loggedUserRole);

  useEffect(async () => {
    await getRole()
  }, [])
  

  return (
    <>
      <ButtonContainer>
        {roles.map((role, i) => (
          <Button key={i} onClick={() => setUserRole(role)}>
            {role}
          </Button>
        ))}
      </ButtonContainer>

      <div>
        {userRole === "Admin" && (
          <ListAdmin userType="Admin" />
        )}
        {userRole === "Distributor" && (
          <ListDistributor  userType="Distributor" />
        )}
        {userRole === "Stokist" && (
          <StokistList userType="Stokist" />
        )}
        {userRole === "Player" && (
          <ListPlayer userType="Player" />
        )}
      </div>
    </>
  )
}

export default UserTable