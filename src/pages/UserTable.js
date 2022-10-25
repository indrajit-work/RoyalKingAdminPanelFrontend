import { useState } from 'react'
import styled from 'styled-components'
import ListAdmin from './ListAdmin'
import ListDistributor from './ListDistributor'
import ListPlayer from './ListPlayers'
import StokistList from './StokistList'
import { getCookie, getRole } from "../utils/auth";
import { Link } from 'react-router-dom'

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

const AddLink = styled(Link)`
  background-color: steelblue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  &:hover{
    text-decoration: none;
    color: white;
  }
`

const UserTable = () => {
  const roles = ["Admin", "Distributor", "Stokist", "Player"]
  const [userRole, setUserRole] = useState('')
  const [loggedUserRole, setloggedUserRole] = useState('')

  //current user
  // useEffect(() => {
  //   const getUserRole = async () => {
  //     const loggedUser = getCookie("token");
  //     const loggedUserRole = await getRole(parseInt(loggedUser));
  //     console.log("logeed in", loggedUser);
  //     console.log("ROLE", loggedUserRole);
  //   }

  //   getUserRole()
  // }, [])

  const loggedUser = getCookie("token");
  console.log("logeed in", loggedUser);

  (async () => {
    const role = await getRole(loggedUser);
    setloggedUserRole(role)
  })();

  console.log("loggedUser", loggedUser, "loggedUserRole", loggedUserRole)
  

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

        <AddLink to='/createUser'>Add User</AddLink>

          {/* <Button style={{backgroundColor: '#850000'}}>
            Add User
          </Button> */}

      </ButtonContainer>

      <div>
        {userRole === "Admin" && (
          <ListAdmin userType="ADMIN" loggedUser={loggedUser} loggedUserRole={loggedUserRole} />
        )}
        {userRole === "Distributor" && (
          <ListDistributor  userType="Distributor" loggedUser={loggedUser} loggedUserRole={loggedUserRole} />
        )}
        {userRole === "Stokist" && (
          <StokistList userType="Stokist" loggedUser={loggedUser} loggedUserRole={loggedUserRole} />
        )}
        {userRole === "Player" && (
          <ListPlayer userType="Player" loggedUser={loggedUser} loggedUserRole={loggedUserRole} />
        )}
      </div>
    </>
  )
}

export default UserTable