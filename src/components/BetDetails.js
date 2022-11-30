import React from "react";

const BetDetails = ({bets, ticket}) => {
    console.log(bets.length);
  return (
    <>
      <h3>Bet Details {ticket}</h3>
      <table>
        <thead>
          <tr>
            <th>Bet</th>
            <th>Played</th>
            <th>Win</th>
          </tr>
        </thead>
        <tbody>
          {bets?.map((bet, index) => (
            // console.log(params?.formattedValue)
            <tr key={index}>
              <td>{bet.betOn}</td>
              <td>{bet.betValue}</td>
              <td>{bet.winAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BetDetails;
