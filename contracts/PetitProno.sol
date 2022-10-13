// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PetitProno {
    address public owner;
<<<<<<< HEAD
    string public League;
    mapping(string => string) LeaguePool;
=======
    mapping(string => League) Leagues;
>>>>>>> 162e867 (upgarde Smart-Contract)

    constructor() {
        owner = msg.sender;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner);
        _;
    }

<<<<<<< HEAD
    function get(string memory league_addr)
        public
        view
        returns (string memory)
    {
        return LeaguePool[league_addr];
    }

    function set(string memory league_addr, string memory ipfs_link)
        public
        OnlyOwner
    {
        LeaguePool[league_addr] = ipfs_link;
    }

    function remove(string memory league_addr) public OnlyOwner {
        delete LeaguePool[league_addr];
    }
}
=======
    function addLeague (string memory _name) public OnlyOwner {
        Leagues[_name] = new League(_name);
    }

    function getLeague (string memory _name) public view returns (League) {
        return Leagues[_name];
    }

    function removeLeague (string memory _name) public OnlyOwner {
        delete Leagues[_name];
    }
}

contract Pari{
    address public owner;
    string id_Match;
    uint score;
    uint[3] cotes;
    uint[2] prono;

    constructor(string memory _id_Match, uint[3] memory _cotes, uint[2] memory _prono, uint _score) {
        owner = msg.sender;
        id_Match = _id_Match;
        cotes = _cotes;
        prono = _prono;
        score = _score;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner);
        _;
    }
}

abstract contract Joueur is Pari{
    string nom_Joueur;
    address walletId;
    mapping(string => Pari) Paris;

    constructor(string memory _nom_Joueur, address _walletId) {
        walletId = _walletId;
        nom_Joueur = _nom_Joueur;
    }

    modifier OnlyJoueur() {
        require(msg.sender == walletId);
        _;
    }

    function addPari (string memory _id_Match, uint[3] memory _cotes, uint[2] memory _prono, uint _score) public {
        Paris[_id_Match] = Pari(_id_Match, _cotes, _prono, _score);
    }

    function getPari(string memory _id_Match) public view returns(Pari){
        return Paris[_id_Match];
    }
    
    function update_Pari(string memory _id_Match, uint[3] memory _cotes, uint[2] memory _prono, uint _score) public OnlyJoueur{
        Paris[_id_Match].cotes = _cotes;
        Paris[_id_Match].prono = _prono;
        Paris[_id_Match].score = _score;
    }
}
 
abstract contract Equipe is Joueur{
    string name_Equipe;
    mapping(address => Joueur) Joueurs;

    constructor(string memory _name_Equipe) {
        name_Equipe = _name_Equipe;
    }
    
    function addJoueur (string memory _nom_Joueur, address _walletId) public {
        Joueurs[_walletId] = Joueur(_nom_Joueur, _walletId);
    }

    function getJoueur(address _walletId) public view returns(Joueur){
        return Joueurs[_walletId];
    }

    function removeJoueur(address _walletId) public OnlyOwner{
        delete Joueurs[_walletId];
    }
}

abstract contract League is Equipe{
    string name_League;
    mapping(string => Equipe) Equipes;

    constructor(string memory _name_League) {
        name_League = _name_League;
    }

    function addEquipe (string memory _name_Equipe) public {
        Equipes[_name_Equipe] = Equipe(_name_Equipe);
    }

    function getEquipe (string memory _name_Equipe) public view returns(Equipe){
        return Equipes[_name_Equipe];
    }

    function removeEquipe(string memory _name_Equipe) public OnlyOwner{
        delete Equipes[_name_Equipe];
    }
} 
>>>>>>> 162e867 (upgarde Smart-Contract)
