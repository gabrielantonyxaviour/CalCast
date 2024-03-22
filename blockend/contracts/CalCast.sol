// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


contract CalCast{

    struct Profile{
        uint256 farcasterId;
        uint256[] timeSlots;
        uint256[] timePeriods;
        uint256[] pricing;
        string profileMetadata;
        bool exists;
    }

    struct Booking{
        uint256 bookingId;
        uint256 bookerFarcasterId;
        uint256 profileFarcasterId;
        uint256 timeStart;
        uint256 timePeriod;
        uint256 amount;
        bool exists;
    }

    struct BookingTimeCheck{
        uint256 timeStart;
        uint256 timePeriod;
        bool exists;
    }

    uint256 public _bookingCounter;
    uint256 public _profileCounter;
    mapping(uint256 => Profile) public profiles;
    mapping(uint256 => Booking[]) public bookings;
    mapping(uint256=> mapping(uint256 => BookingTimeCheck)) public bookingTimeCheck;
    uint256 public bookingPeriodLimit= 1 hours;
    address public owner;


    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }


    event ProfileCreated(uint256 farcasterId, uint256[] timeSlots, uint256[] timePeriods, uint256[] pricing, string profileMetadata);
    event ProfileUpdated(uint256 farcasterId, uint256[] timeSlots, uint256[] timePeriods, uint256[] pricing, string profileMetadata);
    event CallBooked(uint256 bookingId, uint256 bookerFarcasterId, uint256 profileFarcasterId, uint256 timeStart, uint256 timePeriod, uint256 amount);
    event CallCancelled(uint256 bookingId);
    event BookingPeriodLimitUpdated(uint256 bookingPeriodLimit);

    function createProfile(uint256 _farcasterId, uint256[] memory _timeSlots, uint256[] memory _timePeriods, uint256[] memory _pricing,  string memory _profileMetadata) public 
    {
    
    }

    function updateProfile(uint256 _farcasterId, uint256[] memory _timeSlots, uint256[] memory _timePeriods, uint256[] memory _pricing, string memory _profileMetadata) public returns (uint256)
    {
       
    }
    

    function updatePricing(uint256 _farcasterId, uint256[] memory _pricing) public returns (uint256)
    {
       
    
    }   

    function updateProfileTimeSlots(uint256 _farcasterId, uint256[] memory _timeSlots) public returns (uint256)
    {
        
    }

    function updateProfileTimePeriods(uint256 _farcasterId, uint256[] memory timePeriods) public returns (uint256)
    {
        
    }

    function updateProfileMetadata(uint256 _farcasterId, string memory _profileMetadata) public returns (uint256)
    {
        
    }

    function updateBookingPeriodLimit(uint256 _bookingPeriodLimit) public onlyOwner returns (uint256)
    {
        
    }

    function bookCall(uint256 _senderFarcasterId, uint256 _profileFarcasterId, uint256 _timeSlotId, uint256 _timePeriodId) public payable returns (uint256)
    {
        
    }

    function cancelCall(uint256 _profileFarcasterId, uint256 _timeSlot, uint256 _timePeriod) public returns (uint256)
    {
        
    }

    function totalProfiles() public view returns (uint256)
    {
        return _profileCounter;
    }

    function totalBookings() public view returns (uint256)
    {
        return _bookingCounter;
    }

    function bookingCount(uint256 _farcasterId) public view returns (uint256)
    {
        return bookings[_farcasterId].length;
    }

    function getProfile(uint256 _farcasterId) public view returns (Profile memory)
    {
        return profiles[_farcasterId];
    }

    function getAllBookigs(uint256 _farcasterId) public view returns (Booking[] memory)
    {
        return bookings[_farcasterId];
    }


}