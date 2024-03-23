import {
  BookingPeriodLimitUpdated as BookingPeriodLimitUpdatedEvent,
  CallBooked as CallBookedEvent,
  CallCancelled as CallCancelledEvent,
  ProfileCreated as ProfileCreatedEvent,
  ProfileUpdated as ProfileUpdatedEvent
} from "../generated/CalCast/CalCast"
import {
  BookingPeriodLimitUpdated,
  CallBooked,
  CallCancelled,
  ProfileCreated,
  ProfileUpdated
} from "../generated/schema"

export function handleBookingPeriodLimitUpdated(
  event: BookingPeriodLimitUpdatedEvent
): void {
  let entity = new BookingPeriodLimitUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.bookingPeriodLimit = event.params.bookingPeriodLimit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCallBooked(event: CallBookedEvent): void {
  let entity = new CallBooked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.bookingId = event.params.bookingId
  entity.bookerFarcasterId = event.params.bookerFarcasterId
  entity.profileFarcasterId = event.params.profileFarcasterId
  entity.day = event.params.day
  entity.month = event.params.month
  entity.year = event.params.year
  entity.timeStartInSeconds = event.params.timeStartInSeconds
  entity.timePeriodInSeconds = event.params.timePeriodInSeconds
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCallCancelled(event: CallCancelledEvent): void {
  let entity = new CallCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.bookingId = event.params.bookingId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProfileCreated(event: ProfileCreatedEvent): void {
  let entity = new ProfileCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.farcasterId = event.params.farcasterId
  entity.timeSlots = event.params.timeSlots
  entity.timePeriods = event.params.timePeriods
  entity.pricing = event.params.pricing
  entity.minimumKarma = event.params.minimumKarma
  entity.profileMetadata = event.params.profileMetadata

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProfileUpdated(event: ProfileUpdatedEvent): void {
  let entity = new ProfileUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.farcasterId = event.params.farcasterId
  entity.timeSlots = event.params.timeSlots
  entity.timePeriods = event.params.timePeriods
  entity.pricing = event.params.pricing
  entity.minimumKarma = event.params.minimumKarma
  entity.profileMetadata = event.params.profileMetadata

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
