import styled from "styled-components";
import {MdVerified} from 'react-icons/md'

const BlockYes = styled.div`
    background-color: #c35557;
    color: #fff;
    padding: 6px 24px;
    border-radius: 5px;
    font-weight: 600px;
`

const BlockNo = styled.div`
    background-color: #55c374;
    color: #fff;
    padding: 6px 24px;
    border-radius: 5px;
    font-weight: 600px;
`

export const userColumns = [
    { field: "id", headerName: "User ID", minWidth: 70, flex: 1 },
    { field: "userName", headerName: "Username", minWidth: 100, sortable: false, flex: 1},
    { field: "fullName", headerName: "Name", minWidth: 100, sortable: false, flex: 1},
    { field: "balance", headerName: "Balance", minWidth: 100, flex: 1}, 
    { field: "verified", headerName: "Verified", minWidth: 80, sortable: false, flex: 1,
        renderCell : (params) => {
            if (params.row.verified) {
                return(
                    <MdVerified style={{color: '#00b7ff', fontSize: '1.2rem'}} />
                )
                }else{
                    return(
                    <p></p>
                )
            }
        }
    },
    { field: "blocked", headerName: "Blocked", minWidth: 80, sortable: false, flex: 1,
        renderCell : (params) => {
            if (params.row.blocked === 'Yes') {
                return(
                    <BlockYes>Yes</BlockYes>
                    )
                }else{
                    return(
                    <BlockNo>No</BlockNo>
                )
            }
        }
    },
    // { field: "status", headerName: "Status", width: 120, sortable: false }
];