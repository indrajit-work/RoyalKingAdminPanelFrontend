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
    { field: "id", headerName: "User ID", width: 100 },
    { field: "email", headerName: "Email", width: 280, sortable: false},
    { field: "fullName", headerName: "Name", width: 250, sortable: false},
    { field: "balance", headerName: "Balance", width: 140}, 
    { field: "verified", headerName: "Verified", width: 120, sortable: false, 
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
    { field: "blocked", headerName: "Blocked", width: 120, sortable: false, 
        renderCell : (params) => {
            if (params.row.blocked === 'yes') {
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
    { field: "status", headerName: "Status", width: 120, sortable: false }
];