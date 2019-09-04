import { ISetPersonAction } from 'client/app/state/action-creators'
import { STANDARD_DATE_FORMAT } from 'common/constants'
import { IDateTimeSlots, IPerson, IService, ITimeSlot } from 'common/interfaces'
import moment from 'moment'

/**
 * Transforms the payload of a given ISetPersonAction into a format that is
 * usable on the UI.
 * @param action The ISetPersonAction
 */
export function transformPerson (action: ISetPersonAction): ISetPersonAction {
  const payloadPerson: IPerson = { ...action.payload }
  const { stylistBookingConfiguration, stylistServices, stylistUnavailability } = payloadPerson

  const person: IPerson = {
    ...payloadPerson,
    stylistBookableSlots: calculateBookableSlots(
      stylistUnavailability,
      stylistBookingConfiguration.slotSize,
      stylistServices
    )
  }

  return {
    ...action,
    payload: person
  }
}

function calculateBookableSlots (unavailability: ITimeSlot[], slotSize: number, services: IService[]): IDateTimeSlots {
  const bookableDates: IDateTimeSlots = new Map()

  const currentDate: Date = new Date()
  const from: Date = new Date()
  const to: Date = new Date()
  from.setTime(currentDate.getTime())
  to.setDate(currentDate.getDate())
  to.setHours(23,59,0,0)

  for (let i = 0; i < 30; i++) {
    const dateString = moment(currentDate).format(STANDARD_DATE_FORMAT)
    const dateSlots = bookableDates.get(dateString) || []
    dateSlots.push(
      ...calculateSlotsWithinStretch({ from, to }, slotSize, unavailability, services)
    )
    if (dateSlots.length > 0) {
      bookableDates.set(dateString, dateSlots)
    }

    currentDate.setDate(currentDate.getDate() + 1)
    from.setDate(currentDate.getDate())
    from.setHours(0,0,0,0)
    to.setDate(currentDate.getDate())
    to.setHours(23,59,0,0)
  }

  return bookableDates
}

/**
 * Takes a slot and divides it up into smaller time slots where each of these smaller time slots
 * equals the second parameter (slotSize). The array of these smaller time slots is returned
 * @param stretch The time slot to be divided up
 * @param slotSize The size of each time slot in the return array
 * @returns The array of divided time slots
 */
function calculateSlotsWithinStretch (
  stretch: ITimeSlot,
  slotSize: number,
  unavailability: ITimeSlot[],
  services: IService[]
): ITimeSlot[] {
  const { from, to } = stretch
  const fromMilli = from.getTime()
  const toMilli = to.getTime()
  const slotSizeMilli = slotSize * 60 * 1000
  const slots: ITimeSlot[] = []

  const servicesMap = services ?
    services.reduce((map, service) => map.set(service.id, service.duration * 60 * 1000), new Map()) :
    new Map()

  for (let currentFrom = fromMilli; currentFrom < toMilli; currentFrom += slotSizeMilli) {
    const currentTo = currentFrom + slotSizeMilli
    const slotFrom = new Date(currentFrom)
    const slotTo = new Date(currentFrom + slotSizeMilli)

    if (isTimeSlotAvailable(currentFrom, currentTo, unavailability, servicesMap)) {
      slots.push({ from: slotFrom, to: slotTo })
    }
  }
  return slots
}

function isTimeSlotAvailable (
  currentFrom: number,
  currentTo: number,
  unavailability: ITimeSlot[],
  servicesMap: Map<string, number>
) {
  let isAvailable = true

  for (let i = 0; unavailability && i < unavailability.length && isAvailable; i++) {
    const unavailableFrom = new Date(unavailability[i].from).getTime()
    const unavailableTo = unavailability[i].to ?
      new Date(unavailability[i].to).getTime() :
      new Date(unavailability[i].from).getTime() + servicesMap.get(unavailability[i].serviceId)

    if (
      (currentFrom >= unavailableFrom && currentFrom <= unavailableTo) ||
      (currentTo >= unavailableFrom && currentTo <= unavailableTo)
    ) {
      isAvailable = false
    }
  }
  return isAvailable
}
