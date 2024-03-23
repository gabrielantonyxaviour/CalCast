import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  BookingPeriodLimitUpdated,
  CallBooked,
  CallCancelled,
  ProfileCreated,
  ProfileUpdated
} from "../generated/CalCast/CalCast"

export function createBookingPeriodLimitUpdatedEvent(
  bookingPeriodLimit: BigInt
): BookingPeriodLimitUpdated {
  let bookingPeriodLimitUpdatedEvent = changetype<BookingPeriodLimitUpdated>(
    newMockEvent()
  )

  bookingPeriodLimitUpdatedEvent.parameters = new Array()

  bookingPeriodLimitUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "bookingPeriodLimit",
      ethereum.Value.fromUnsignedBigInt(bookingPeriodLimit)
    )
  )

  return bookingPeriodLimitUpdatedEvent
}

export function createCallBookedEvent(
  bookingId: BigInt,
  bookerFarcasterId: BigInt,
  profileFarcasterId: BigInt,
  day: i32,
  month: i32,
  year: i32,
  timeStartInSeconds: BigInt,
  timePeriodInSeconds: BigInt,
  amount: BigInt
): CallBooked {
  let callBookedEvent = changetype<CallBooked>(newMockEvent())

  callBookedEvent.parameters = new Array()

  callBookedEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  callBookedEvent.parameters.push(
    new ethereum.EventParam(
      "bookerFarcasterId",
      ethereum.Value.fromUnsignedBigInt(bookerFarcasterId)
    )
  )
  callBookedEvent.parameters.push(
    new ethereum.EventParam(
      "profileFarcasterId",
      ethereum.Value.fromUnsignedBigInt(profileFarcasterId)
    )
  )
  callBookedEvent.parameters.push(
    new ethereum.EventParam(
      "day",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(day))
    )
  )
  callBookedEvent.parameters.push(
    new ethereum.EventParam(
      "month",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(month))
    )
  )
  callBookedEvent.parameters.push(
    new ethereum.EventParam(
      "year",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(year))
    )
  )
  callBookedEvent.parameters.push(
    new ethereum.EventParam(
      "timeStartInSeconds",
      ethereum.Value.fromUnsignedBigInt(timeStartInSeconds)
    )
  )
  callBookedEvent.parameters.push(
    new ethereum.EventParam(
      "timePeriodInSeconds",
      ethereum.Value.fromUnsignedBigInt(timePeriodInSeconds)
    )
  )
  callBookedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return callBookedEvent
}

export function createCallCancelledEvent(bookingId: BigInt): CallCancelled {
  let callCancelledEvent = changetype<CallCancelled>(newMockEvent())

  callCancelledEvent.parameters = new Array()

  callCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )

  return callCancelledEvent
}

export function createProfileCreatedEvent(
  farcasterId: BigInt,
  timeSlots: Array<BigInt>,
  timePeriods: Array<BigInt>,
  pricing: Array<BigInt>,
  minimumKarma: BigInt,
  profileMetadata: string
): ProfileCreated {
  let profileCreatedEvent = changetype<ProfileCreated>(newMockEvent())

  profileCreatedEvent.parameters = new Array()

  profileCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "farcasterId",
      ethereum.Value.fromUnsignedBigInt(farcasterId)
    )
  )
  profileCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timeSlots",
      ethereum.Value.fromUnsignedBigIntArray(timeSlots)
    )
  )
  profileCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timePeriods",
      ethereum.Value.fromUnsignedBigIntArray(timePeriods)
    )
  )
  profileCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "pricing",
      ethereum.Value.fromUnsignedBigIntArray(pricing)
    )
  )
  profileCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "minimumKarma",
      ethereum.Value.fromUnsignedBigInt(minimumKarma)
    )
  )
  profileCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "profileMetadata",
      ethereum.Value.fromString(profileMetadata)
    )
  )

  return profileCreatedEvent
}

export function createProfileUpdatedEvent(
  farcasterId: BigInt,
  timeSlots: Array<BigInt>,
  timePeriods: Array<BigInt>,
  pricing: Array<BigInt>,
  minimumKarma: BigInt,
  profileMetadata: string
): ProfileUpdated {
  let profileUpdatedEvent = changetype<ProfileUpdated>(newMockEvent())

  profileUpdatedEvent.parameters = new Array()

  profileUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "farcasterId",
      ethereum.Value.fromUnsignedBigInt(farcasterId)
    )
  )
  profileUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timeSlots",
      ethereum.Value.fromUnsignedBigIntArray(timeSlots)
    )
  )
  profileUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timePeriods",
      ethereum.Value.fromUnsignedBigIntArray(timePeriods)
    )
  )
  profileUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "pricing",
      ethereum.Value.fromUnsignedBigIntArray(pricing)
    )
  )
  profileUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "minimumKarma",
      ethereum.Value.fromUnsignedBigInt(minimumKarma)
    )
  )
  profileUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "profileMetadata",
      ethereum.Value.fromString(profileMetadata)
    )
  )

  return profileUpdatedEvent
}
