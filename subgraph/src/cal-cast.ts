import { BigInt } from "@graphprotocol/graph-ts";
import {
  BookingPeriodLimitUpdated as BookingPeriodLimitUpdatedEvent,
  CallBooked as CallBookedEvent,
  CallCancelled as CallCancelledEvent,
  ProfileCreated as ProfileCreatedEvent,
  ProfileUpdated as ProfileUpdatedEvent,
} from "../generated/CalCast/CalCast";
import { booking as Booking, profile as Profile } from "../generated/schema";

export function handleBookingPeriodLimitUpdated(
  event: BookingPeriodLimitUpdatedEvent
): void {}

export function handleCallBooked(event: CallBookedEvent): void {
  let entity = new Booking(event.params.bookingId.toHex());

  entity.booker = event.params.bookerFarcasterId.toHexString();
  entity.receiver = event.params.profileFarcasterId.toHexString();
  entity.day = BigInt.fromI32(event.params.day);
  entity.month = BigInt.fromI32(event.params.month);
  entity.year = BigInt.fromI32(event.params.year);
  entity.timeStartInSeconds = event.params.timeStartInSeconds;
  entity.timePeriodInSeconds = event.params.timePeriodInSeconds;
  entity.receiverRevenue = event.params.amount;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleCallCancelled(event: CallCancelledEvent): void {
  let entity = Booking.load(event.params.bookingId.toHex());

  // delete this entity
}

export function handleProfileCreated(event: ProfileCreatedEvent): void {
  let entity = new Profile(event.params.farcasterId.toString());

  entity.farcasterId = event.params.farcasterId;
  entity.timeSlots = event.params.timeSlots;
  entity.timePeriods = event.params.timePeriods;
  entity.prices = event.params.pricing;
  entity.minimumKarma = event.params.minimumKarma;
  entity.metadata = event.params.profileMetadata;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProfileUpdated(event: ProfileUpdatedEvent): void {
  let entity = Profile.load(event.params.farcasterId.toString());
  if (entity != null) {
    entity.farcasterId = event.params.farcasterId;
    entity.timeSlots = event.params.timeSlots;
    entity.timePeriods = event.params.timePeriods;
    entity.prices = event.params.pricing;
    entity.minimumKarma = event.params.minimumKarma;
    entity.metadata = event.params.profileMetadata;
    entity.save();
  }
}
