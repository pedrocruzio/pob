// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.6.0;
import "./Ownable.sol";
import "./ChainLinkOracle.sol";
import "./Helper.sol";

contract Terms is Ownable, Helper, ChainLinkOracle {

    event NewEntry(address _address, uint betAmount, uint endDate, uint stepsGoal);
    event resultsReceived(address _address, uint returnedAmount, bool outcome, uint avgHistoricalSteps);
    

    struct Entry {
        uint256 stepsGoal;
        uint256 betAmount; //amount participant bets
        uint32 startDate; // when participant made bet 
        uint16 numberOfDays;
        string accessToken;
        bool activeEntry;
    }
    // This declares a state variable that
    // stores a `Entry` struct for each possible entry.
    mapping(address => Entry) entries;
    // TODO mapping of accessToken to addresses? We need prevent multiple addresses from using the same access token
    
    event Greet(string message);

    function greet() public {
        emit Greet("Hello World!");
    }

    function makeEntry(string memory _accessToken,uint256 stepsGoal, uint16 numberOfDays) public payable {
        // Check that user does not have a active entry
        // If not, add an entry and add mapping to entries
        require(!entries[msg.sender].activeEntry, "You already have an active entry, only one active entry per participant!");
        require(msg.value > 0, "Please include a bet amount");
        uint32 currentDate = uint32(now);
        entries[msg.sender] = Entry(stepsGoal, msg.value, currentDate, numberOfDays, _accessToken, true);
        emit NewEntry(msg.sender, entries[msg.sender].betAmount, currentDate + entries[msg.sender].numberOfDays, entries[msg.sender].stepsGoal);
    }

    function _buildOuraRequestUrl (uint32 _startDate, uint32 _endDate, string memory _accessToken, uint256 _stepsGoal) private pure returns(string memory){
        string memory a = "https://ea4ank8od6.execute-api.us-east-1.amazonaws.com/default/getOuraRingDataResults?startTimestamp=";
        //convert timetstamps from s to miliseconds
        string memory b = uint2str(_startDate * 1000);
        string memory c = "&token=";
        string memory d = _accessToken; 
        string memory e = "&stepsGoal=";
        string memory f = uint2str(_stepsGoal); 
        string memory g = "&endTimestamp="; 
        string memory h = uint2str(_endDate * 1000);
        
        return string(abi.encodePacked(a, b, c, d, e, f, g, h));
    }

    function _calculatePayout(uint _daysCompleted, uint _numberOfDays, uint betAmount) internal returns(uint256){
        //TODO - check if this math function works properly
        return (_daysCompleted/_numberOfDays) * betAmount;
    } 

    function checkResults() external returns(bytes32){
        Entry memory entry = entries[msg.sender];
        // if days for contest + start date is less than today, let them know the contest isn't over yet
        // if days for contest + start date is past the current time, make a call to oracle
        require(entry.startDate + entry.numberOfDays < uint32(now),"Contest has not finished yet");
        string memory url = _buildOuraRequestUrl(entry.startDate, entry.startDate + entry.numberOfDays, entry.accessToken, entry.stepsGoal);
        //TODO , change to await for number of days goal met, then calculate payout and pay user. Before paying out, delete their entry.
        // delete entries[msg.sender];
        return requestNumberOfDaysMetGoal(url);
    }

}
