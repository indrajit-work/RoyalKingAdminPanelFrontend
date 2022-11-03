import axios from "axios"

export const fetchTicketInfo = async(id, gameType, startDate, endDate) => {
    const res = await axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/gettickethistory",{
        userID: id,
        gameType: gameType,
        startTime: startDate,
        endTime: endDate
      })
    console.log(res.data.tickets)
    return res.data.tickets
}