// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


error ProfileAlreadyExists(uint256 farcasterId);
error ProfileDoesNotExist(uint256 farcasterId);
error BookingDoesNotExist(uint256 bookingId);
error InvalidTimeSlot(uint256 _profileFarcasterId, uint256 _timeSlot, uint256 _totalTimeSlotLength);
error TimeSlotDoesNotExist(uint256 farcasterId, uint256 timeSlot);
error InvalidTimePeriod(uint256 _profileFarcasterId, uint256 _timePeriod, uint256 _totalTimePeriodLength);
error TimePeriodDoesNotExist(uint256 farcasterId, uint256 timePeriod);
error TimeSlotUnavailable(uint256 farcasterId, uint256 timeSlot);
error SlotAlreadyBooked(uint256 profileFarcasterId, uint256 timeStart, uint256 timePeriod);
error TimeSlotInvalid(uint256 farcasterId, uint256 timeSlot, uint256 timePeriod);
error InsufficientBookingFee(uint256 farcasterId, uint256 timeSlot, uint256 bookingFee, uint256 amount);

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
        if(profiles[_farcasterId].exists == true) revert ProfileAlreadyExists(_farcasterId);
        profiles[_farcasterId] = Profile(_farcasterId, _timeSlots, _timePeriods, _pricing, _profileMetadata, true);
        emit ProfileCreated(_farcasterId, _timeSlots, _timePeriods, _pricing, _profileMetadata);
        _profileCounter++;

    }

    function updateProfile(uint256 _farcasterId, uint256[] memory _timeSlots, uint256[] memory _timePeriods, uint256[] memory _pricing, string memory _profileMetadata) public returns (uint256)
    {
        if(profiles[_farcasterId].exists == false) revert ProfileDoesNotExist(_farcasterId);
        profiles[_farcasterId].timeSlots = _timeSlots;
        profiles[_farcasterId].timePeriods = _timePeriods;
        profiles[_farcasterId].pricing = _pricing;
        profiles[_farcasterId].profileMetadata = _profileMetadata;
        emit ProfileUpdated(_farcasterId, _timeSlots, _timePeriods, _pricing, _profileMetadata);
    }
    

    function updatePricing(uint256 _farcasterId, uint256[] memory _pricing) public returns (uint256)
    {
        if(profiles[_farcasterId].exists == false) revert ProfileDoesNotExist(_farcasterId);
        profiles[_farcasterId].pricing = _pricing;
        emit ProfileUpdated(_farcasterId, profiles[_farcasterId].timeSlots, profiles[_farcasterId].timePeriods, _pricing, profiles[_farcasterId].profileMetadata);
    }   

    function updateProfileTimeSlots(uint256 _farcasterId, uint256[] memory _timeSlots) public returns (uint256)
    {
        if(profiles[_farcasterId].exists == false) revert ProfileDoesNotExist(_farcasterId);
        profiles[_farcasterId].timeSlots = _timeSlots;
        emit ProfileUpdated(_farcasterId, _timeSlots, profiles[_farcasterId].timePeriods, profiles[_farcasterId].pricing, profiles[_farcasterId].profileMetadata);

    }

    function updateProfileTimePeriods(uint256 _farcasterId, uint256[] memory timePeriods) public returns (uint256)
    {
        if(profiles[_farcasterId].exists == false) revert ProfileDoesNotExist(_farcasterId);
        profiles[_farcasterId].timePeriods = timePeriods;
        emit ProfileUpdated(_farcasterId, profiles[_farcasterId].timeSlots, timePeriods, profiles[_farcasterId].pricing, profiles[_farcasterId].profileMetadata);
    }

    function updateProfileMetadata(uint256 _farcasterId, string memory _profileMetadata) public returns (uint256)
    {
        if(profiles[_farcasterId].exists == false) revert ProfileDoesNotExist(_farcasterId);
        profiles[_farcasterId].profileMetadata = _profileMetadata;
        emit ProfileUpdated(_farcasterId, profiles[_farcasterId].timeSlots, profiles[_farcasterId].timePeriods, profiles[_farcasterId].pricing, _profileMetadata);
    }

    function updateBookingPeriodLimit(uint256 _bookingPeriodLimit) public onlyOwner returns (uint256)
    {
        bookingPeriodLimit = _bookingPeriodLimit;
        emit BookingPeriodLimitUpdated(_bookingPeriodLimit);
    }

    function bookCall(uint256 _senderFarcasterId, uint256 _profileFarcasterId, uint256 _timeSlotId, uint256 _timePeriodId) public payable returns (uint256)
    {
        if(profiles[_profileFarcasterId].exists == false) revert ProfileDoesNotExist(_profileFarcasterId);
        if(profiles[_senderFarcasterId].exists == false) revert ProfileDoesNotExist(_profileFarcasterId);
        if(profiles[_profileFarcasterId].timeSlots.length < _timeSlotId) revert TimeSlotDoesNotExist(_profileFarcasterId, _timeSlotId);
        if(profiles[_profileFarcasterId].timePeriods.length < _timePeriodId) revert TimePeriodDoesNotExist(_profileFarcasterId, _timePeriodId);

        uint256 _timeSlot=profiles[_profileFarcasterId].timeSlots[_timeSlotId];
        uint256 _timePeriod=profiles[_profileFarcasterId].timePeriods[_timePeriodId];

        for(uint256 i=15 minutes; i<= 1 hours; i+=15 minutes)
        {   
            if(_timeSlot<i) revert TimeSlotInvalid(_profileFarcasterId, _timeSlot, 1 hours);
            BookingTimeCheck memory _prevBookingTimeCheck=bookingTimeCheck[_profileFarcasterId][_timeSlot-i];
            if(_prevBookingTimeCheck.exists && _prevBookingTimeCheck.timePeriod>i) revert TimeSlotUnavailable(_profileFarcasterId, _timeSlot);
            BookingTimeCheck memory _afterBookingTimeCheck=bookingTimeCheck[_profileFarcasterId][_timeSlot+i];
            if(_timePeriod>i && _afterBookingTimeCheck.exists) revert TimeSlotUnavailable(_profileFarcasterId, _timeSlot);
        }

        if(msg.value < profiles[_profileFarcasterId].pricing[_timePeriodId]) revert InsufficientBookingFee(_profileFarcasterId, _timeSlot, profiles[_profileFarcasterId].pricing[_timePeriod], msg.value);
        bookings[_profileFarcasterId].push(Booking(_bookingCounter, _senderFarcasterId, _profileFarcasterId, _timeSlot, _timePeriod, msg.value, true));
        bookingTimeCheck[_profileFarcasterId][_timeSlot] = BookingTimeCheck(_timeSlot, _timePeriod, true);
        emit CallBooked(_bookingCounter, _senderFarcasterId, _profileFarcasterId, _timeSlot, _timePeriod, msg.value);
        _bookingCounter++;
    }

    function cancelCall(uint256 _profileFarcasterId, uint256 _timeSlot, uint256 _timePeriod) public returns (uint256)
    {
        if(bookingTimeCheck[_profileFarcasterId][_timeSlot].exists == false) revert BookingDoesNotExist(_bookingCounter);
        bookingTimeCheck[_profileFarcasterId][_timeSlot].exists=false;
        emit CallCancelled(_bookingCounter);
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