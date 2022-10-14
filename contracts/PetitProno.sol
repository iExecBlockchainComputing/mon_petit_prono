// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9; 

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
        address [] keyMappingPlayer;
        mapping(address => Player) Players;
    }

    struct League {
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

    modifier OnlyPlayer(string memory _League_name, string memory _TeamId, address _walletId){
        for (uint k; k<Leagues[_League_name].Teams[_TeamId].keyMappingPlayer.length; k++){
            if (Leagues[_League_name].Teams[_TeamId].keyMappingPlayer[k] == _walletId){
                _;
            }
        }
        revert("Vous n'etes pas un Player de cette team");
    }

    /** LEAGUE */
    //add a league
    function addLeague(string memory _League_name) public OnlyOwner{
        Leagues[_League_name];
        keyMappingLeague.push(_League_name);
    }

    // get all name of leagues
    function getAllLeague() public view returns(string [] memory){
        return keyMappingLeague;
    }

    /** TEAM */
    //add a team
    function addTeam(string memory _League_name,string memory _TeamId, string memory _Teame_Name) public{
        Leagues[_League_name].Teams[_TeamId].Team_name = _Teame_Name;
        Leagues[_League_name].keyMappingTeam.push(_TeamId);
    }

    // return all the team of a league in which the player is
    function getMyTeamFromOneLeague(string memory _League_name) public view returns(string [] memory){
        string [] memory _myTeam;
        uint rg = 0;
        for (uint k; k<Leagues[_League_name].keyMappingTeam.length;k++){
            string memory _TeamId = Leagues[_League_name].keyMappingTeam[k];
            for (uint i; i<Leagues[_League_name].Teams[_TeamId].keyMappingPlayer.length;i++){
                if (Leagues[_League_name].Teams[_TeamId].keyMappingPlayer[i] == msg.sender){
                    _myTeam[rg]=_TeamId;
                    rg+=1;
                }
            }
        }
        return _myTeam;
    }

    //return all the theam of a league in which the player is not
    function getFreeTeamFromOneLeague(string memory _League_name) public view returns(string [] memory){
        string [] memory _freeTeam;
        string [] memory _myTeam = getMyTeamFromOneLeague(_League_name);
            for (uint k; k<_myTeam.length ; k++){
                for(uint i; i<Leagues[_League_name].keyMappingTeam.length; i++){
                    if (keccak256(abi.encodePacked(_myTeam[k])) != keccak256(abi.encodePacked(Leagues[_League_name].keyMappingTeam[i]))){
                        _freeTeam[k]=Leagues[_League_name].keyMappingTeam[i];
                    }
                }
            }
        return _freeTeam;
    }

    /** PLAYER */
    //add a player to a certain league and team
    function addPlayer(string memory _League_name, string memory _TeamId, string memory _Player_name) public {
        Leagues[_League_name].Teams[_TeamId].Players[msg.sender].Player_name = _Player_name;
        Leagues[_League_name].Teams[_TeamId].keyMappingPlayer.push(msg.sender);
    }

    //update score of a player in a certain team and league
    function updateScore(string memory _League_name, string memory _TeamId, address _walletId) public OnlyPlayer(_League_name,_TeamId, _walletId){
        uint _score = 0;
        for (uint k ; k<Leagues[_League_name].Teams[_TeamId].Players[msg.sender].keyMappingForecasts.length; k++){
            string memory _key = Leagues[_League_name].Teams[_TeamId].Players[msg.sender].keyMappingForecasts[k];
            _score += Leagues[_League_name].Teams[_TeamId].Players[msg.sender].Forecasts[_key].PointNb;
        }
        Leagues[_League_name].Teams[_TeamId].Players[msg.sender].score = _score;
    }

    //update score of all player in a certain team and league
    function updateAllScore(string memory _League_name, string memory _TeamId) public {
        for (uint i ; i<Leagues[_League_name].Teams[_TeamId].keyMappingPlayer.length; i++){
            address _walletId = Leagues[_League_name].Teams[_TeamId].keyMappingPlayer[i];
            updateScore(_League_name, _TeamId, _walletId);
        }
    }

    //return all the player of a certain team and league
    function getAllPlayerAddrFromOneTeam(string memory _League_name, string memory _TeamId) public view returns(address [] memory){
        return Leagues[_League_name].Teams[_TeamId].keyMappingPlayer;
    }

    //return the name of a player of a certain team and league
    function getPlayername(string memory _League_name, string memory _TeamId, address _walletId) public view returns(string memory){
        return Leagues[_League_name].Teams[_TeamId].Players[_walletId].Player_name;
    }

    //return the score of a player of a certain team and league
    function getPlayerScore(string memory _League_name, string memory _TeamId, address _walletId) public view returns(uint){
        return Leagues[_League_name].Teams[_TeamId].Players[_walletId].score;
    }

    /** FORECAST */
    //add a forecast from a player
    function addForecast(string memory _League_name, string memory _TeamId, address _walletId, string memory _matchId, uint[3] memory _odds, uint[2] memory _prono) public {
        Leagues[_League_name].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].odds = _odds;
        Leagues[_League_name].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].prono = _prono;
    }

    //get forecast info from a player
    function getForecast(string memory _League_name, string memory _TeamId, address _walletId, string memory _matchId) public view returns(uint[3] memory, uint[2] memory, uint[2] memory, uint){
        Forecast memory _match = Leagues[_League_name].Teams[_TeamId].Players[_walletId].Forecasts[_matchId];
        return (_match.odds, _match.prono, _match.result, _match.PointNb);
    }

    //update forecat result from a player
    function setForecastResult(string memory _League_name, string memory _TeamId, address _walletId, string memory _matchId, uint[2] memory _result) public {
        Leagues[_League_name].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].result = _result;
    }

    //update forecat prono for a player
    function setForecastProno(string memory _League_name, string memory _TeamId, address _walletId, string memory _matchId, uint[2] memory _prono) public {
        Leagues[_League_name].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].prono = _prono;
    }

    //update forecast point for a player
    function setForecastPointNb(string memory _League_name, string memory _TeamId, address _walletId, string memory _matchId, uint _PointNb) public {
        Leagues[_League_name].Teams[_TeamId].Players[_walletId].Forecasts[_matchId].PointNb = _PointNb;
    }
}