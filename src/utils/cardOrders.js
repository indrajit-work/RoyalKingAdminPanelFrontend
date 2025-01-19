// cardOrders.js

export const cardOrders = {
    cards16: [
        { suite: 'H', value: 'A' }, { suite: 'S', value: 'A' }, { suite: 'D', value: 'A' }, { suite: 'C', value: 'A' },
        { suite: 'H', value: 'K' }, { suite: 'S', value: 'K' }, { suite: 'D', value: 'K' }, { suite: 'C', value: 'K' },
        { suite: 'H', value: 'Q' }, { suite: 'S', value: 'Q' }, { suite: 'D', value: 'Q' }, { suite: 'C', value: 'Q' },
        { suite: 'H', value: 'J' }, { suite: 'S', value: 'J' }, { suite: 'D', value: 'J' }, { suite: 'C', value: 'J' },
    ],
    jeetoJoker: [
        { suite: 'H', value: 'K' }, { suite: 'S', value: 'K' }, { suite: 'D', value: 'K' }, { suite: 'C', value: 'K' },
        { suite: 'H', value: 'Q' }, { suite: 'S', value: 'Q' }, { suite: 'D', value: 'Q' }, { suite: 'C', value: 'Q' },
        { suite: 'H', value: 'J' }, { suite: 'S', value: 'J' }, { suite: 'D', value: 'J' }, { suite: 'C', value: 'J' },
    ],    
    cards52: [
        { suite: 'H', value: 'A' }, { suite: 'H', value: '2' }, { suite: 'H', value: '3' }, { suite: 'H', value: '4' },
        { suite: 'H', value: '5' }, { suite: 'H', value: '6' }, { suite: 'H', value: '7' }, { suite: 'H', value: '8' },
        { suite: 'H', value: '9' }, { suite: 'H', value: '10' }, { suite: 'H', value: 'J' }, { suite: 'H', value: 'Q' }, { suite: 'H', value: 'K' },
        { suite: 'S', value: 'A' }, { suite: 'S', value: '2' }, { suite: 'S', value: '3' }, { suite: 'S', value: '4' },
        { suite: 'S', value: '5' }, { suite: 'S', value: '6' }, { suite: 'S', value: '7' }, { suite: 'S', value: '8' },
        { suite: 'S', value: '9' }, { suite: 'S', value: '10' }, { suite: 'S', value: 'J' }, { suite: 'S', value: 'Q' }, { suite: 'S', value: 'K' },
        { suite: 'D', value: 'A' }, { suite: 'D', value: '2' }, { suite: 'D', value: '3' }, { suite: 'D', value: '4' },
        { suite: 'D', value: '5' }, { suite: 'D', value: '6' }, { suite: 'D', value: '7' }, { suite: 'D', value: '8' },
        { suite: 'D', value: '9' }, { suite: 'D', value: '10' }, { suite: 'D', value: 'J' }, { suite: 'D', value: 'Q' }, { suite: 'D', value: 'K' },
        { suite: 'C', value: 'A' }, { suite: 'C', value: '2' }, { suite: 'C', value: '3' }, { suite: 'C', value: '4' },
        { suite: 'C', value: '5' }, { suite: 'C', value: '6' }, { suite: 'C', value: '7' }, { suite: 'C', value: '8' },
        { suite: 'C', value: '9' }, { suite: 'C', value: '10' }, { suite: 'C', value: 'J' }, { suite: 'C', value: 'Q' }, { suite: 'C', value: 'K' },
    ],
    cards24: [
        { suite: 'H', value: 'A' }, { suite: 'H', value: 'K' }, { suite: 'H', value: 'Q' }, { suite: 'H', value: 'J' }, { suite: 'H', value: '10' }, { suite: 'H', value: '9' },
        { suite: 'S', value: 'A' }, { suite: 'S', value: 'K' }, { suite: 'S', value: 'Q' }, { suite: 'S', value: 'J' }, { suite: 'S', value: '10' }, { suite: 'S', value: '9' },
        { suite: 'D', value: 'A' }, { suite: 'D', value: 'K' }, { suite: 'D', value: 'Q' }, { suite: 'D', value: 'J' }, { suite: 'D', value: '10' }, { suite: 'D', value: '9' },
        { suite: 'C', value: 'A' }, { suite: 'C', value: 'K' }, { suite: 'C', value: 'Q' }, { suite: 'C', value: 'J' }, { suite: 'C', value: '10' }, { suite: 'C', value: '9' },
    ],
};

// Helper function to get card order based on game type
export const getCardOrder = (gameType) => {
    return cardOrders[gameType] || [];
};
