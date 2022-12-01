import React from "react";
import ReactModal from 'react-modal';
import {AiOutlineCloseCircle} from 'react-icons/ai'

const BetDetails = ({bets, ticket, isModalOpen, setIsModalOpen}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false)
    console.log(bets.length);
  return (
    <>
      <ReactModal isOpen={isModalOpen} shouldCloseOnOverlayClick={true} onRequestClose={() => setIsModalOpen(false)}>
        <div className="app__modal">
          <div className='app__modal-content'>
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
        </div>
        <AiOutlineCloseCircle className='close' onClick={() => setIsModalOpen(false)} />
      </div>
    </ReactModal>
    </>
  );
};

export default BetDetails;
