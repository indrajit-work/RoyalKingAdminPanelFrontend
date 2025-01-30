import { useEffect, useState } from "react";
import "./ManualResult.css";
import { Container, FloatingLabel, Form, ProgressBar } from "react-bootstrap";
import { getCardOrder } from "../utils/cardOrders";
import axios from "axios";
import { Checkbox } from "@material-ui/core";

const TICKET_API_URL = 'https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/games/currentgame/ticketlist';
const RESULT_SELECT_API_URL = 'https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/games/result';

const ManualResult = () => {
    const [gameType, setGameType] = useState("cards16");
    const [apiResponse, setAPIResponse] = useState(null);
    const [isAPILoading, setIsAPILoading] = useState(true);
    const [apiBetStatus, setAPIBetStatus] = useState(null);
    const [lastRefreshTime, setLastRefreshTime] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [isBetLocked, setIsBetLocked] = useState(false);
    const [hasRoundStarted, setHasRoundStarted] = useState(false);
    const [enableAutoRefresh, setEnableAutoRefresh] = useState(true);

    useEffect(() => {
        FetchTicketAPIData();                
    }, [gameType])

    function FetchTicketAPIData() {
        setLastRefreshTime(new Date());
        setIsAPILoading(true);

        axios.get(`${TICKET_API_URL}?gameType=${gameType}`)
            .then(response => {
                console.log(response.data);
                setAPIResponse(response.data);
                ParseAPIResponse(response.data);
                setIsAPILoading(false);
                setSelectedResult(ParseSelectedResultResponse(response.data.manualResult));
            })
            .catch(error => {
                console.error("Error fetching bet amounts: ", error);
                setIsAPILoading(false);
            })
    }

    function PostResultAPIData(gameID, selectedResult) {
        setSelectedResult(ParseSelectedResultResponse(selectedResult));

        const url = `${RESULT_SELECT_API_URL}?gameID=${encodeURIComponent(gameID)}&result=${encodeURIComponent(selectedResult)}`;
    
        axios.post(url)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('There was an error posting the data!', error);
            });
    }

    function ParseAPIResponse(response) {        
        if(response.gameType == "singleChance") {
            let betKeys = Object.keys(response.betStatus);
            let betValues = Object.values(response.betStatus);
            let returnObj = [];
            
            for(var i = 0; i < betKeys.length; i++) {
                let currObj = {
                    singleVal: GetNumValue(betKeys[i]),
                    betAmt: betValues[i],
                }
                returnObj.push(currObj);
            }            
            setAPIBetStatus(returnObj);
        }
        else if(response.gameType == "doubleChance") {
            let betKeys = Object.keys(response.betStatus);
            let betValues = Object.values(response.betStatus);
            let returnObj = [];

            for(var i = 0; i < betKeys.length; i++) {
                let currObj = {
                    andarValue: GetNumValue(betKeys[i].split(".")[0]),
                    baharValue: GetNumValue(betKeys[i].split(".")[1]),
                    betAmt: betValues[i],
                }
                returnObj.push(currObj);
            }            
            setAPIBetStatus(returnObj);
        }
        else {
            let betKeys = Object.keys(response.betStatus);
            let betValues = Object.values(response.betStatus);
            let returnObj = [];

            for(var i = 0; i < betKeys.length; i++) {
                let currObj = {
                    cardS: betKeys[i].slice(-1),
                    cardV: GetNumValue(betKeys[i].slice(0, -1)).toString(),
                    betAmt: betValues[i],
                }
                returnObj.push(currObj);
            }
            setAPIBetStatus(returnObj);
        }
    }

    function ParseSelectedResultResponse(response) {
        if(response == "xxx") return null;
        
        if(gameType == "singleChance") {
            let currObj = {
                singleVal: GetNumValue(response),                
            }           
                       
            return currObj;
        }
        else if(gameType == "doubleChance") {            
            let currObj = {
                andarValue: GetNumValue(response.split(".")[0]),
                baharValue: GetNumValue(response.split(".")[1]),                
            }
                       
            return currObj;
        }
        else {
            let currObj = {
                cardS: response.slice(-1),
                cardV: GetNumValue(response.slice(0, -1)).toString(),                
            }
            
            return currObj;
        }
    }

    function GetNumValue(numString) {
        switch(numString) {
            case "Zero":
                return 0;
            case "One":
                return 1;
            case "Two":
                return 2;
            case "Three":
                return 3;
            case "Four":
                return 4;
            case "Five":
                return 5;
            case "Six":
                return 6;
            case "Seven":
                return 7;
            case "Eight":
                return 8;
            case "Nine":
                return 9;
            case "Ten":
                return 10;
            default:
                return numString;
        }
    }

    function GetGameName(type) {
        switch (type) {
            case "cards16":
                return "Cards 16";
            case "cards52":
                return "Cards 52";
            case "jeetoJoker":
                return "Jeeto Joker";
            case "doubleChance":
                return "Double Chance";
            case "singleChance":
                return "Single Chance";
            case "cards24":
                return "Cards 24";
            default:
                return "Error";
        }
    }
    
    function Callback_ChangeBetLockStatus(isLocked) {
        setIsBetLocked(isLocked);
    }

    function Callback_ChangeRoundStartStatus(hasStarted) {
        setHasRoundStarted(hasStarted);
    }    

    function Callback_AutoRefresh() {
        console.log("Auto Refresh should be called");
        FetchTicketAPIData();
    }

    return (
        <Container>
            <section className="secMain">
                <section className="secHeader">
                    <h2>Manual Result</h2>

                    <FloatingLabel controlId="floatingSelectGrid" label="Select Game Type">
                        <Form.Select
                            onChange={(e) => setGameType(e.target.value)}
                            aria-label="Game Type Label"
                            value={gameType}
                            required
                        >
                            <option value="cards16">Cards 16</option>
                            <option value="cards52">Cards 52</option>
                            <option value="jeetoJoker">Jeeto Joker</option>
                            <option value="doubleChance">Double Chance</option>
                            <option value="singleChance">Single Chance</option>
                            <option value="cards24">Cards 24</option>
                        </Form.Select>
                    </FloatingLabel>
                </section>

                <section className="secBody">
                    <div className="divBodyHeader">
                        <h1>{GetGameName(gameType)} Live Bets</h1>
                        
                        <RoundTimer apiResponse={apiResponse} onBetLock={Callback_ChangeBetLockStatus} onRoundStart={Callback_ChangeRoundStartStatus} onComplete={() => FetchTicketAPIData()}/>
                        
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", height: "100%", borderStyle: "solid", borderWidth: "1px", borderRadius: "10px", borderColor: "rgb(68, 154, 235)", overflow: "clip"}}>
                            {/*<div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "0.2375rem", padding: "0rem 0.5rem 0rem 0.5rem", fontSize: "0.7rem", color: "rgba(0, 0, 0, 0.5)", borderRight: "1px solid rgb(68, 154, 235)"}}>
                                <input type="checkbox" checked={enableAutoRefresh} onChange={(e) => setEnableAutoRefresh(e.target.checked)} />
                                <div>Auto</div>
                            </div>*/}

                            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0rem", padding: "0rem 0rem 0rem 0.5rem", fontSize: "0.7rem", color: "rgba(0, 0, 0, 0.5)"}}>                                
                                <RefreshTimer lastRefreshedTime={lastRefreshTime} interval_AutoRefresh={10} isAutoRefresh={enableAutoRefresh} Callback_AutoRefresh={Callback_AutoRefresh}/>
                                <div style={{}}>Since Refreshed</div>
                            </div>

                            <button className="btnRefresh" onClick={() => FetchTicketAPIData()}>Refresh</button>
                        </div> 
                    </div>

                    <div className="divBodyContent">
                        <LiveBetGrid gameID={apiResponse?.gameID} gameType={gameType} isLoading={isAPILoading} betData={apiBetStatus} selectedResult={selectedResult} isBetLocked={isBetLocked} hasRoundStarted={hasRoundStarted} callback_OnManualResultSelect={PostResultAPIData}/>
                    </div>
                </section>
            </section>
        </Container>
    );
}

export default ManualResult;

export const RefreshTimer = ({ lastRefreshedTime, interval_AutoRefresh = 10, isAutoRefresh = true, Callback_AutoRefresh }) => {
    const [seconds, setSeconds] = useState(0);
    const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(isAutoRefresh);

    useEffect(() => {
        setAutoRefreshEnabled(isAutoRefresh);
    }, [isAutoRefresh]);

    useEffect(() => {
        let intervalID;
        if(lastRefreshedTime) {
            intervalID = setInterval(() => {
                var currSeconds = Math.floor((Date.now() - lastRefreshedTime) / 1000);

                if(autoRefreshEnabled && currSeconds > interval_AutoRefresh) {
                    setSeconds(0);
                    if(Callback_AutoRefresh) Callback_AutoRefresh();
                    clearInterval(intervalID);
                }
                else setSeconds(currSeconds);

                //setSeconds(Math.floor((Date.now() - lastRefreshedTime) / 1000));
                //setSeconds(currSeconds);
            }, 1000);
            return () => {setSeconds(0); clearInterval(intervalID);}
        }
    }, [lastRefreshedTime]);

    return <div style={{fontWeight: "bold"}}>{seconds} s</div>;
}

export const RoundTimer = ({apiResponse, onBetLock, onRoundStart, onComplete}) => {
    const [remTime, setRemTime] = useState(0);
    const [isBetLocked, setIsBetLocked] = useState(false);
    const [hasRoundStarted, setHasRoundStarted] = useState(false);

    useEffect(() => {
        if(apiResponse != null) setRemTime(apiResponse.timeToResult);
    }, [apiResponse]);

    useEffect(() => {
        if(remTime > 0) {
            const intervalID = setInterval(() => {
                setRemTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(intervalID);
        }
    }, [remTime]);

    useEffect(() => {
        if(apiResponse == null) return;

        if(remTime > apiResponse.gameTime && hasRoundStarted) {
            setHasRoundStarted(false);
            if(onRoundStart) onRoundStart(false);
        }
        else if(remTime < apiResponse.gameTime && !hasRoundStarted) {
            setHasRoundStarted(true);
            if(onRoundStart) onRoundStart(true);
        }

        if(remTime <= apiResponse.betLockTime && !isBetLocked) {
            setIsBetLocked(true);
            if(onBetLock) onBetLock(true);
        }
        else if(remTime <= 0) {
            if(onComplete) onComplete();
        }
        else if(remTime > apiResponse.betLockTime && isBetLocked) {
            setIsBetLocked(false);
            if(onBetLock) onBetLock(false);
        }
    }, [remTime])
    
   return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", width: "15rem", height: '100%', borderStyle: "solid", borderWidth: "1px", borderRadius: "10px", borderColor: "rgb(68, 154, 235)", overflow: "clip"}}>
            <div style={{display: "flex", width: "100%", height: "50%", alignItems: "center", justifyContent: "center", fontSize: "0.75rem"}}>Round Timer</div>
            <TimerProgressBar currTime={remTime} totalTime={apiResponse?.gameTime} isBetLocked={isBetLocked}/>
        </div> 
   )
}

export const TimerProgressBar = ({currTime, totalTime, isBetLocked }) => {
    const progressPercent = Math.round((currTime / totalTime) * 100);

    return (
        <div style={{position: "relative", width: "100%", height: "50%", backgroundColor: "rgb(224, 224, 224)", overflow: "clip"}}>
            <div style={{width: `${progressPercent}%`, height: "100%", backgroundColor: "rgb(68, 154, 235)", transition: "width 0.2s ease"}}>
            </div>

            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "0.75rem", fontWeight: "bold"}}>
                {!isBetLocked && (progressPercent > 100 ? "Round Starting" : `${Math.floor(currTime)} s`)}
                {isBetLocked && "Bet Locked"}
            </div>
        </div>
    )
}

export const LiveBetGrid = ({ gameID, gameType, isLoading, betData, selectedResult, isBetLocked, hasRoundStarted, callback_OnManualResultSelect }) => {
    const [gridRowCount, setGridRowCount] = useState(0);
    const [gridColCount, setGridColCount] = useState(0);
    const [gridCardType, setGridCardType] = useState(null);
    const [cards, setCards] = useState([]);
    const [currGameID, setCurrGameID] = useState(0);
    

    function GetGridDimensions(type) {
        let rows = 4, cols = 4;
        switch (type) {
            case "cards16":
                rows = 4;
                cols = 4;
                break;
            case "cards52":
                rows = 4;
                cols = 13;
                break;
            case "jeetoJoker":
                rows = 3;
                cols = 4;
                break;
            case "doubleChance":
                rows = 10;
                cols = 10;
                break;
            case "singleChance":
                rows = 2;
                cols = 5;
                break;
            case "cards24":
                rows = 4;
                cols = 6;
                break;
            default:
                rows = 0;
                cols = 0;
                break;
        }
        return { rows, cols };
    }

    function SelectGridCardType(type) {
        if (type == "singleChance") setGridCardType("SingleVal");
        else if (type == "doubleChance") setGridCardType("DoubleVal");
        else setGridCardType("Suite");
    }    

    function Callback_OnResultSelect(result) {
        console.log("Game Type: " + gameType + " | Game ID: " + currGameID + " | Result: " + result);
        if(callback_OnManualResultSelect != null) callback_OnManualResultSelect(currGameID, result);
    }    

    useEffect(() => {
        const { rows, cols } = GetGridDimensions(gameType);
        setGridRowCount(rows);
        setGridColCount(cols);
        SelectGridCardType(gameType);
        setCards(getCardOrder(gameType));        
    }, [gameType]);

    useEffect(() => {
        setCurrGameID(gameID);
    }, [gameID])

    const gridStyle = {
        position: 'relative',
        display: 'grid',
        gridTemplateRows: `repeat(${gridRowCount}, 1fr)`,
        gridTemplateColumns: `repeat(${gridColCount}, 1fr)`,
        gap: '10px',
    };

    const overlayStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#000',
        backdropFilter: 'blur(10px)',
    }

    return (
        <div style={gridStyle}>
            {isLoading && (
                <div style={overlayStyle}>
                    <div>Loading</div>
                    <div>Please Wait</div>
                </div>
            )}

            {!hasRoundStarted && (
                <div style={overlayStyle}>
                    <div>New Round Starting</div>
                    <div>Please Wait</div>
                </div>
            )}

            {isBetLocked && (
                <div style={overlayStyle}>
                    <div>Bet Locked</div>
                    <div>Please Wait</div>
                </div>
            )}

            {/*hasRoundStarted && !isBetLocked && selectedResult && selectedResult != "xxx" && (
                <div style={overlayStyle}>
                    <div>Result Locked</div>
                    <div>{selectedResult}</div>
                </div>
            )*/}

            {Array.from({ length: gridRowCount * gridColCount }, (_, index) => (
                (gridCardType == "Suite") ?
                (<GridCardSuite key={index} cardSuite={cards[index].suite} cardValue={cards[index].value} betData={betData} selectedResult={selectedResult} callback_OnResultSelect={Callback_OnResultSelect}/>) :
                ((gridCardType == "SingleVal") ?
                <GridCardSingleValue key={index} singleVal={index == 9 ? 0 : index + 1} betData={betData} selectedResult={selectedResult} callback_OnResultSelect={Callback_OnResultSelect} /> :
                <GridCardDoubleValue key={index} andarVal={Math.floor(index / gridColCount)} baharVal={index % gridColCount} betData={selectedResult} selectedResult={selectedResult} callback_OnResultSelect={Callback_OnResultSelect} />)
             ))} 
        </div>
    );    
}

export const GridCardSuite = ({ cardSuite, cardValue, betData, selectedResult, callback_OnResultSelect }) => {
    const [suiteImgURL, setSuiteImgURL] = useState(null);
    const [isSelectedResult, setIsSelectedResult] = useState(false);

    function SetCardSuite(suite) {
        switch (suite) {
            case "H":
                setSuiteImgURL("/Icon_Suite_Heart.svg")
                break;
            case "D":
                setSuiteImgURL("/Icon_Suite_Diamond.svg")
                break;
            case "C":
                setSuiteImgURL("/Icon_Suite_Club.svg")
                break;
            case "S":
                setSuiteImgURL("/Icon_Suite_Spade.svg")
                break;
            default:
                break;
        }
    }

    function GetBetAmt() {
        let betAmt = 0;
        
        if(betData == null) return betAmt;

        for(var i = 0; i < betData.length; i++) {
            if(betData[i].cardS == cardSuite && betData[i].cardV == cardValue) {
                betAmt = betData[i].betAmt;
                break;
            }
        }

        return betAmt;
    }

    function SelectResult(e) {
        e.preventDefault();

        if(callback_OnResultSelect) callback_OnResultSelect(GetNumString(cardValue.toString()) + cardSuite);
    }

    useEffect(() => {
        SetCardSuite(cardSuite);
    }, [cardSuite])

    useEffect(() => { 
        if(selectedResult == null) {setIsSelectedResult(false); return;}        

        if(selectedResult.cardS == cardSuite && selectedResult.cardV == cardValue) setIsSelectedResult(true);
        else setIsSelectedResult(false);

    }, [selectedResult])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: "0.25rem", gap: "5px", alignItems: 'center', justifyContent: 'center', minHeight: "4rem", backgroundImage: "linear-gradient(rgb(255, 255, 255), rgb(250, 250, 250))", border: '1px solid rgba(128, 128, 128, 0.1)', borderRadius: "5px", boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.15)" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "5px" }}>
                {suiteImgURL && <img src={suiteImgURL} alt={cardSuite} style={{ width: '20px', height: '20px' }} />}
                <div style={{ fontWeight: "bolder" }}>{cardValue}</div>
            </div>

            <div style={{ display: 'flex', gap: "5px", alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid rgba(128, 128, 128, 0.5)', borderRadius: "5px" }}>
                <div style={{ verticalAlign: "center", fontSize: "0.8rem", justifyContent: "center", alignItems: "center", height: "100%" }}>{GetBetAmt()}</div>
            </div>

            {!isSelectedResult && (<button className="btnBet" onClick={(e) => SelectResult(e)}>Select</button>)}

            {isSelectedResult && (<div className="betSelected">RS</div>)}
        </div>
    );
}

export const GridCardDoubleValue = ({ andarVal, baharVal, betData, selectedResult, callback_OnResultSelect }) => {
    const [isSelectedResult, setIsSelectedResult] = useState(false);
    
    function GetBetAmt() {
        let betAmt = 0;

        if(betData == null) return betAmt;

        for(var i = 0; i < betData.length; i++) {
            if(betData[i].andarValue == andarVal && betData[i].baharValue == baharVal) {
                betAmt = betData[i].betAmt;
                break;
            }
        }

        return betAmt;
    }

    function SelectResult(e) {
        e.preventDefault();

        if(callback_OnResultSelect) callback_OnResultSelect(GetNumString(andarVal.toString()) + "." + GetNumString(baharVal.toString()));
    }

    useEffect(() => { 
        if(selectedResult == null) {setIsSelectedResult(false); return;}        

        if(selectedResult.andarValue == andarVal && selectedResult.baharValue == baharVal) setIsSelectedResult(true);
        else setIsSelectedResult(false);

    }, [selectedResult])
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: "0.25rem", gap: "2px", alignItems: 'center', justifyContent: 'center', backgroundImage: "linear-gradient(rgb(255, 255, 255), rgb(250, 250, 250))", border: '1px solid rgba(128, 128, 128, 0.1)', borderRadius: "5px", boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.15)" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "5px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: "bolder" }}>{andarVal}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: "bolder" }}>{baharVal}</div>
            </div>

            <div style={{ display: 'flex', gap: "5px", alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid rgba(128, 128, 128, 0.5)', borderRadius: "5px" }}>
                <div style={{ verticalAlign: "center", fontSize: "0.65rem", justifyContent: "center", alignItems: "center", height: "100%" }}>{GetBetAmt()}</div>
            </div>

            {!isSelectedResult && (<button className="btnBetSmall" onClick={(e) => SelectResult(e)}>Select</button>)}

            {isSelectedResult && (<div className="betSelectedSmall">RS</div>)}
        </div>
    );
}

export const GridCardSingleValue = ({ singleVal, betData, selectedResult, callback_OnResultSelect }) => {
    const[isSelectedResult, setIsSelectedResult] = useState(false);
    
    function GetBetAmt () {
        let betAmt = 0;

        if(betData == null) return betAmt;

        for(var i = 0; i < betData.length; i++) {
            if(betData[i].singleVal == singleVal) {                
                betAmt = betData[i].betAmt;
                console.log(betAmt);
                break;
            }
        }

        return betAmt;
    }

    function SelectResult(e) {
        e.preventDefault();

        if(callback_OnResultSelect) callback_OnResultSelect(GetNumString(singleVal.toString()));
    }

    useEffect(() => { 
        if(selectedResult == null) {setIsSelectedResult(false); return;}        

        if(selectedResult.singleVal == singleVal) setIsSelectedResult(true);
        else setIsSelectedResult(false);

    }, [selectedResult])
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: "0.25rem", gap: "5px", alignItems: 'center', justifyContent: 'center', minHeight: "4rem", backgroundImage: "linear-gradient(rgb(255, 255, 255), rgb(250, 250, 250))", border: '1px solid rgba(128, 128, 128, 0.1)', borderRadius: "5px", boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.15)" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "5px" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bolder" }}>{singleVal}</div>
            </div>

            <div style={{ display: 'flex', gap: "5px", alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid rgba(128, 128, 128, 0.5)', borderRadius: "5px" }}>
                <div style={{ verticalAlign: "center", fontSize: "0.8rem", fontWeight: "bold", justifyContent: "center", alignItems: "center", height: "100%" }}>{GetBetAmt()}</div>
            </div>

            {!isSelectedResult && (<button className="btnBet" onClick={(e) => SelectResult(e)}>Select</button>)}

            {isSelectedResult && (<div className="betSelected">RS</div>)}
        </div>
    );
}

function GetNumString(numString) {
    switch(numString) {
        case "0":
            return "Zero";
        case "1":
            return "One";
        case "2":
            return "Two";
        case "3":
            return "Three";
        case "4":
            return "Four";
        case "5":
            return "Five";
        case "6":
            return "Six";
        case "7":
            return "Seven";
        case "8":
            return "Eight";
        case "9":
            return "Nine";
        case "10":
            return "Ten";
        default:
            return numString;
    }
}