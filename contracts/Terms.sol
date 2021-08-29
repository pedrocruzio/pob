// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0;
import "./Ownable.sol";
import "./ChainLinkOracle.sol";
import "./Helper.sol";

contract Terms is Ownable, Helper, ChainLinkOracle {

    event NewEntry(address _address, uint betAmount, uint stepsGoal, uint16 numberOfDays);
    event resultsReceived(address _address, uint _returnedAmount, uint256 _daysCompleted, uint256 _numberOfDays);
    

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
    
    // Map the chainlink requests to their corresponding caller address for use in callback function
    mapping(bytes32 => address) requests;
    // TODO mapping of accessToken to addresses? We need prevent multiple addresses from using the same access token
    
    //ChainLinkOracle chainLinkOracle;

    //constructor() public {
    //    chainLinkOracle = new ChainLinkOracle();
    //}

    function makeEntry(string memory _accessToken,uint256 stepsGoal, uint16 numberOfDays) public payable {
        // Check that user does not have a active entry
        // If not, add an entry and add mapping to entries
        require(!entries[msg.sender].activeEntry, "You already have an active entry, only one active entry per participant!");
        require(msg.value > 0, "Please include a bet amount");
        uint32 currentDate = uint32(now);
        entries[msg.sender] = Entry(stepsGoal, msg.value, currentDate, numberOfDays, _accessToken, true);
        emit NewEntry(msg.sender, entries[msg.sender].betAmount , entries[msg.sender].stepsGoal, entries[msg.sender].numberOfDays);
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

    function _calculatePayout(uint _daysCompleted, uint _numberOfDays, uint _betAmount) internal pure returns(uint256){
        //TODO - check if this math function works properly
        return (_daysCompleted/_numberOfDays) * _betAmount;
    } 

    function CallerFulfill(bytes32 _requestId, uint256 _daysCompleted) public {
        //Find which address this request id belongs to
        address payable _requesterAddress = address(uint160(requests[_requestId]));
        // look up their entry details
        Entry memory entry = entries[_requesterAddress];
        require(entries[_requesterAddress].betAmount > 0, "no entry found");
        uint payoutAmount = _calculatePayout(_daysCompleted, entry.numberOfDays, entry.betAmount);
        // delete the entry before payout 
        delete entries[_requesterAddress];
        _requesterAddress.transfer(payoutAmount);
        emit resultsReceived( _requesterAddress,  payoutAmount, _daysCompleted, entry.numberOfDays);

    } 

    function checkResults() external {
        Entry memory entry = entries[msg.sender];
        // if days for contest + start date is less than today, let them know the contest isn't over yet
        // if days for contest + start date is past the current time, make a call to oracle
        require(entry.startDate + entry.numberOfDays < uint32(now),"Contest has not finished yet");
        string memory url = _buildOuraRequestUrl(entry.startDate, entry.startDate + entry.numberOfDays, entry.accessToken, entry.stepsGoal);
        //Save the request id
        bytes32 _requestId = requestNumberOfDaysMetGoal(url, address(this), this.CallerFulfill.selector);
        requests[_requestId] = msg.sender;
    }

}
