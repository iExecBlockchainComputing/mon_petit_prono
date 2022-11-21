// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9; 
import "hardhat/console.sol";
import './GetOracleInfo.sol';

contract PetitProno is GetOracleInfo {

    address public owner;

    event NewLeague(string _LeagueId, string _League_name);
    event NewTeam(string _LeagueId, string _TeamId, string _Team_name);
    event NewForecast(string _LeagueId, string _ForecastId);
    event EndDate (string _LeagueId, uint _EndDate, uint _matchDate);
    event MatchAvailable(string _LeagueId, string _matchId);
    enum Time{ AVAILABLE, FINISHED }

    struct Forecast{
        string [2] teams;
        uint[2] prono;
        uint[2] result;
        uint PointNb;
        uint matchDate;
        bytes32 _oracleId;
        bool scoreIsSet;
        Time time;
    }

    struct Player {
        string Player_name;
        uint score;
        string [] keyMappingForecasts;
        mapping(string => Forecast) Forecasts;
    }

    struct Team {
        string Team_name;
        string ipfs;
        address [] keyMappingPlayer;
        mapping(address => Player) Players;
    }

    struct League {
        string refTeamId;
        string League_name;
        string ipfs;
        string [] keyMappingTeam;
        mapping(string => Team) Teams;
    }
    
    string [] keyMappingLeague;
    mapping(string => League) Leagues;

    constructor(){
        owner = msg.sender;
    }

    modifier OnlyOwner{
        require(msg.sender == owner);
        _;
    }

    modifier ValideEnd(uint _endDate){
        require(block.timestamp < _endDate, "End date must be in the future");
        _;
    }

    //change the owner of the contract
    function changeOwner(address _newOwner) public OnlyOwner{
        owner = _newOwner;
    }

    /** LEAGUE */
    //add a league
    function addLeague(string memory _LeagueId, string memory _League_name,string memory _ipfs) public OnlyOwner{
        Leagues[_LeagueId].League_name = _League_name;
        Leagues[_LeagueId].ipfs = _ipfs;
        keyMappingLeague.push(_LeagueId);
        emit NewLeague(_LeagueId, _League_name);
    }  

    // get all leagues id
    function getLeaguesID() public view returns(string[] memory){
        return keyMappingLeague;
    }

    //get all info of a League
    function getLeagueById(string memory _LeagueId) public view returns(string [3] memory){
        string memory League_name = Leagues[_LeagueId].League_name;
        string memory ipfs = Leagues[_LeagueId].ipfs;
        return [_LeagueId, League_name, ipfs];
    } 

    /** TEAM */
    //add a team
    function addTeam(string memory _LeagueId,string memory _TeamId, string memory _Teame_Name, string memory _Player_name, string memory _ipfs) public{
        Leagues[_LeagueId].Teams[_TeamId].Team_name = _Teame_Name;
        Leagues[_LeagueId].Teams[_TeamId].ipfs = _ipfs;
        Leagues[_LeagueId].keyMappingTeam.push(_TeamId);
        addPlayer(_LeagueId, _TeamId,  _Player_name);
        emit NewTeam(_LeagueId, _TeamId, _Teame_Name);
    }

    // return all the team of a league in which the player is
    function getMyTeamFromOneLeague(string memory _LeagueId) public view returns(string [] memory){
        uint _TeamNb = Leagues[_LeagueId].keyMappingTeam.length;
        string [] memory _myTeam = new string[](_TeamNb);
        uint rg = 0;
        for (uint k; k<_TeamNb;k++){
            string memory _TeamId = Leagues[_LeagueId].keyMappingTeam[k];
            for (uint i; i<Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer.length;i++){
                if (Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer[i] == msg.sender){
                    _myTeam[rg]=_TeamId;
                    rg+=1;
                }
            }
        }
        string [] memory _result = new string[](rg);
        for (uint j; j<rg;j++){
            _result[j]=_myTeam[j];
        }
        return _result;
    }

    //return all the theam of a league in which the player is not
    function getFreeTeamFromOneLeague(string memory _LeagueId) public view returns(string [] memory){
        string [] memory _myTeam = getMyTeamFromOneLeague(_LeagueId);
        string [] memory _freeTeam = new string[](Leagues[_LeagueId].keyMappingTeam.length - _myTeam.length);
        uint rg = 0;
        for(uint i; i<Leagues[_LeagueId].keyMappingTeam.length; i++){
            bool test = false;
            for (uint k; k<_myTeam.length ; k++){
                if (keccak256(abi.encodePacked(_myTeam[k])) == keccak256(abi.encodePacked(Leagues[_LeagueId].keyMappingTeam[i]))){
                    test = true;
                }
            }
            if (test == false){
                _freeTeam[rg]=Leagues[_LeagueId].keyMappingTeam[i];
                rg+=1;
            }
        }
        return _freeTeam;
    }

    //get all Team Id of an League
    function getTeamsIdFromOneLeague(string memory _LeagueId) public view returns(string [] memory){
        return Leagues[_LeagueId].keyMappingTeam;
    }

    //return infos of a team for and Id
    function getTeamsInfos(string memory _LeagueId, string memory _TeamId) public view returns(string [3] memory){
        string memory Team_name = Leagues[_LeagueId].Teams[_TeamId].Team_name;
        string memory ipfs = Leagues[_LeagueId].Teams[_TeamId].ipfs;
        return [_TeamId,Team_name,ipfs];
    }                       

    /** PLAYER */
    //add a player to a certain league and team
    function addPlayer(string memory _LeagueId, string memory _TeamId, string memory _Player_name) public {
        Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Player_name = _Player_name;
        Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer.push(msg.sender);
        if (keccak256(abi.encodePacked(Leagues[_LeagueId].refTeamId)) != ""){
            string memory _referenceTeamId = Leagues[_LeagueId].refTeamId;
            for (uint k; k<Leagues[_LeagueId].Teams[_referenceTeamId].Players[owner].keyMappingForecasts.length; k++){
                string memory _forecastId = Leagues[_LeagueId].Teams[_referenceTeamId].Players[owner].keyMappingForecasts[k];
                Forecast memory _forecast = Leagues[_LeagueId].Teams[_referenceTeamId].Players[owner].Forecasts[_forecastId];         
                Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].keyMappingForecasts.push(_forecastId);
                Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_forecastId].teams = _forecast.teams;
                Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_forecastId].prono = [100,100];
                Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_forecastId].result = _forecast.result;
                Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_forecastId].PointNb = 0;
                Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_forecastId].matchDate = _forecast.matchDate;
                Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_forecastId]._oracleId = _forecast._oracleId;
                Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_forecastId].scoreIsSet = _forecast.scoreIsSet;   
                Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_forecastId].time = _forecast.time;   
            }
        }
        emit NewTeam( _LeagueId,  _TeamId, Leagues[_LeagueId].Teams[_TeamId].Team_name);
    }

    //update score of a player in a certain team and league
    function updateScore(string memory _LeagueId, string memory _TeamId) public {
        uint _score = 0;
        for (uint k ; k<Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].keyMappingForecasts.length; k++){
            string memory _key = Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].keyMappingForecasts[k];
            _score += Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_key].PointNb;
        }
        Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].score = _score;
    }

    //return all the player of a certain team and league
    function getAllPlayerAddrFromOneTeam(string memory _LeagueId, string memory _TeamId) public view returns(address [] memory){
        return Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer;
    }

    //return the name of a player and his score of a certain team and league
    function getPlayerInfo(string memory _LeagueId, string memory _TeamId, address _walletId) public view returns(string memory,uint){
        string memory Player_name = Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Player_name;
        uint score = Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].score;
        return (Player_name, score);
    }

    /** FORECAST */
    //add a forecast from a player
    function addForecast(string memory _LeagueId,  string memory _matchId, string [2] memory  teams,uint _endDate) public OnlyOwner ValideEnd(_endDate){
        for (uint i; i<Leagues[_LeagueId].keyMappingTeam.length; i++){
            string memory _TeamId = Leagues[_LeagueId].keyMappingTeam[i];
            for (uint k; k<Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer.length; k++){
                address _walletId = Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer[k];
                if(_walletId == owner && msg.sender == owner){
                    Leagues[_LeagueId].refTeamId = _TeamId;
                }
                Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].keyMappingForecasts.push(_matchId);
                Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].teams = teams;
                Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].prono = [100,100];
                Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].PointNb = 0;
                Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].matchDate = _endDate;
                Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].scoreIsSet = false;
                Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].time = Time.AVAILABLE;
                
            }
        }
        emit NewForecast(_LeagueId, _matchId );
    }

    //get forecast id of a player
    function getForecastId(string memory _LeagueId, string memory _TeamId) public view returns(string [] memory){
        return Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].keyMappingForecasts;
    }

    //get forecast info from a player
    function getForecast(string memory _LeagueId, string memory _TeamId, string memory _matchId) public view returns(string [2] memory, uint[2] memory, uint[2] memory, uint,uint,Time,bool){
        Forecast memory _match = Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_matchId];
        return (_match.teams, _match.prono, _match.result, _match.PointNb, _match.matchDate, _match.time, _match.scoreIsSet);
    }

    //update Time of Match for all leagues
    function updateTime(string memory _LeagueId, string memory _matchId) public {
        for (uint i; i<Leagues[_LeagueId].keyMappingTeam.length; i++){
            string memory _TeamId = Leagues[_LeagueId].keyMappingTeam[i];
            for (uint k; k<Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer.length; k++){
                address _walletId = Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer[k];
                if(block.timestamp < Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_matchId].matchDate){
                    Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].time = Time.AVAILABLE;
                }else{
                    Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].time = Time.FINISHED;
                }
            }
        }
    }

    //update forecat result from a player
    function setForecastResult(string memory _LeagueId, string memory _matchId, uint[2] memory _result) public {
        updateTime( _LeagueId, _matchId);
        for (uint i; i<Leagues[_LeagueId].keyMappingTeam.length; i++){
            string memory _TeamId = Leagues[_LeagueId].keyMappingTeam[i];
            for (uint k; k<Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer.length; k++){
                address _walletId = Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer[k];
                if(block.timestamp > Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].matchDate){
                    Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].result = _result;
                    calculatePoint(_LeagueId, _TeamId, _walletId, _matchId);
                    Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].scoreIsSet = true;
                }
            }
        }
    }


    //calculate point for a player
    function calculatePoint(string memory _LeagueId, string memory _TeamId, address _walletId,string memory _matchId) public {
        uint[2] memory _result = Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].result;
        uint[2] memory _prono = Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].prono;
        uint _PointNb = 0;
        if (_prono[0]!=100 && _prono[1]!=100){
            if(_result[0] == _prono[0] && _result[1] == _prono[1]){
                _PointNb = 3;
            }else if(_result[0] > _result[1] && _prono[0] > _prono[1]){
                _PointNb = 1;
            }else if(_result[0] < _result[1] && _prono[0] < _prono[1]){
                _PointNb = 1;
            }else if(_result[0] == _result[1] && _prono[0] == _prono[1]){
                _PointNb = 1;
            }
            setForecastPointNb(_LeagueId, _TeamId, _walletId,_matchId, _PointNb);
        }
    }

    //update forecat prono for a player
    function setForecastProno(string memory _LeagueId, string memory _TeamId, string memory _matchId, uint[2] memory _prono) public {
        if (block.timestamp < Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_matchId].matchDate){
            Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_matchId].prono = _prono;
        }else{
            updateTime( _LeagueId, _matchId);
            emit MatchAvailable(_LeagueId,_matchId);
        }
    }

    //update forecast point for a player
    function setForecastPointNb(string memory _LeagueId, string memory _TeamId, address _walletId,string memory _matchId, uint _PointNb) public {
        Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].PointNb = _PointNb;    
    }

    //get forecast point for a player
    function getForecastPointNb(string memory _LeagueId, string memory _TeamId, string memory _matchId) public view returns(uint){
        return Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_matchId].PointNb;
    }

    //set forecast OracleId
    function setForecastOracleId(string memory _LeagueId, string memory _TeamId, string memory _matchId, bytes32 _OracleId) public OnlyOwner{
        Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_matchId]._oracleId = _OracleId;
    }

    //get forecast OracleId
    function getForecastOracleId(string memory _LeagueId, string memory _TeamId, string memory _matchId) public view returns(bytes32){
        return Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_matchId]._oracleId;
    }
}

