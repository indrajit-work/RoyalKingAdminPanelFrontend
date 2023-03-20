import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
    background-color: ${({background}) => background};
    color: #fff;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: -1px 4px 12px -1px rgba(0,0,0,0.74);
    -webkit-box-shadow: -1px 4px 12px -1px rgba(0,0,0,0.74);
    -moz-box-shadow: -1px 4px 12px -1px rgba(0,0,0,0.74);
    padding: 10px 1rem;
`

const BoxRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const Title = styled.p`
    font-size: 18px;
    text-transform: uppercase;
`

const Icon = styled.img`
    width: 80px;
    height: 80px;
`

const Number = styled.p`
    font-size: 30px;
    font-weight: 700;
    color: #fff;
`

const DashboardInfo = ({title, icon, background, number}) => {
  return (
    <Box background={background}>
        <BoxRow>
            <Title>{title}</Title>
            <Number>{number}</Number>
        </BoxRow>
        <Icon src={icon} alt="icon" />
    </Box>
  )
}

export default DashboardInfo