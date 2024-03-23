import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { BookingPeriodLimitUpdated } from "../generated/schema"
import { BookingPeriodLimitUpdated as BookingPeriodLimitUpdatedEvent } from "../generated/CalCast/CalCast"
import { handleBookingPeriodLimitUpdated } from "../src/cal-cast"
import { createBookingPeriodLimitUpdatedEvent } from "./cal-cast-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let bookingPeriodLimit = BigInt.fromI32(234)
    let newBookingPeriodLimitUpdatedEvent = createBookingPeriodLimitUpdatedEvent(
      bookingPeriodLimit
    )
    handleBookingPeriodLimitUpdated(newBookingPeriodLimitUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BookingPeriodLimitUpdated created and stored", () => {
    assert.entityCount("BookingPeriodLimitUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BookingPeriodLimitUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bookingPeriodLimit",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
