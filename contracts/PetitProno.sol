// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9; 
import "hardhat/console.sol";

contract MonPetitProno{

    address public owner;
    struct Forecast{
        uint[3] odds;
        uint[2] prono;
        uint[2] result;
        uint PointNb;
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

    modifier OnlyPlayer(string memory _LeagueId, string memory _TeamId, address _walletId){
        for (uint k; k<Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer.length; k++){
            if (Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer[k] == _walletId){
                _;
            }
        }
        revert("Vous n'etes pas un Player de cette team");
    }

    /** LEAGUE */
    //add a league
    function addLeague(string memory _LeagueId, string memory _League_name,string memory _ipfs) public OnlyOwner{
        Leagues[_LeagueId].League_name = _League_name;
        Leagues[_LeagueId].ipfs = _ipfs;
        keyMappingLeague.push(_LeagueId);
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
    function addTeam(string memory _LeagueId,string memory _TeamId, string memory _Teame_Name, string memory _ipfs) public{
        Leagues[_LeagueId].Teams[_TeamId].Team_name = _Teame_Name;
        Leagues[_LeagueId].Teams[_TeamId].ipfs = _ipfs;
        Leagues[_LeagueId].keyMappingTeam.push(_TeamId);
    }

    // return all the team of a league in which the player is
    function getMyTeamFromOneLeague(string memory _LeagueId) public view returns(string [] memory){
        string [] memory _myTeam;
        console.log(msg.sender);
        uint rg = 0;
        for (uint k; k<Leagues[_LeagueId].keyMappingTeam.length;k++){
            string memory _TeamId = Leagues[_LeagueId].keyMappingTeam[k];
            for (uint i; i<Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer.length;i++){
                if (Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer[i] == msg.sender){
                    _myTeam[rg]=_TeamId;
                    rg+=1;
                }
            }
        }
        return _myTeam;
    }

    //return all the theam of a league in which the player is not
    function getFreeTeamFromOneLeague(string memory _LeagueId) public view returns(string [] memory){
        string [] memory _freeTeam;
        string [] memory _myTeam = getMyTeamFromOneLeague(_LeagueId);
            for (uint k; k<_myTeam.length ; k++){
                for(uint i; i<Leagues[_LeagueId].keyMappingTeam.length; i++){
                    if (keccak256(abi.encodePacked(_myTeam[k])) != keccak256(abi.encodePacked(Leagues[_LeagueId].keyMappingTeam[i]))){
                        _freeTeam[k]=Leagues[_LeagueId].keyMappingTeam[i];
                    }
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
    }

    //update score of a player in a certain team and league
    function updateScore(string memory _LeagueId, string memory _TeamId, address _walletId) public OnlyPlayer(_LeagueId,_TeamId, _walletId){
        uint _score = 0;
        for (uint k ; k<Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].keyMappingForecasts.length; k++){
            string memory _key = Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].keyMappingForecasts[k];
            _score += Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].Forecasts[_key].PointNb;
        }
        Leagues[_LeagueId].Teams[_TeamId].Players[msg.sender].score = _score;
    }

    //update score of all player in a certain team and league
    function updateAllScore(string memory _LeagueId, string memory _TeamId) public {
        for (uint i ; i<Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer.length; i++){
            address _walletId = Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer[i];
            updateScore(_LeagueId, _TeamId, _walletId);
        }
    }

    //return all the player of a certain team and league
    function getAllPlayerAddrFromOneTeam(string memory _LeagueId, string memory _TeamId) public view returns(address [] memory){
        return Leagues[_LeagueId].Teams[_TeamId].keyMappingPlayer;
    }

    //return the name of a player of a certain team and league
    function getPlayername(string memory _LeagueId, string memory _TeamId, address _walletId) public view returns(string memory){
        return Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Player_name;
    }

    //return the score of a player of a certain team and league
    function getPlayerScore(string memory _LeagueId, string memory _TeamId, address _walletId) public view returns(uint){
        return Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].score;
    }

    /** FORECAST */
    //add a forecast from a player
    function addForecast(string memory _LeagueId, string memory _TeamId, address _walletId, string memory _matchId, uint[3] memory _odds, uint[2] memory _prono) public {
        Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].odds = _odds;
        Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].prono = _prono;
    }

    //get forecast info from a player
    function getForecast(string memory _LeagueId, string memory _TeamId, address _walletId, string memory _matchId) public view returns(uint[3] memory, uint[2] memory, uint[2] memory, uint){
        Forecast memory _match = Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId];
        return (_match.odds, _match.prono, _match.result, _match.PointNb);
    }

    //update forecat result from a player
    function setForecastResult(string memory _LeagueId, string memory _TeamId, address _walletId, string memory _matchId, uint[2] memory _result) public {
        Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].result = _result;
    }

    //update forecat prono for a player
    function setForecastProno(string memory _LeagueId, string memory _TeamId, address _walletId, string memory _matchId, uint[2] memory _prono) public {
        Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].prono = _prono;
    }

    //update forecast point for a player
    function setForecastPointNb(string memory _LeagueId, string memory _TeamId, address _walletId, string memory _matchId, uint _PointNb) public {
        Leagues[_LeagueId].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].PointNb = _PointNb;
    }
}