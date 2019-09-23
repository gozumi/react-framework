import { ITimeSlot } from 'common/interfaces/_booking'

export function isDate (param: any): boolean {
  return Object.prototype.toString.call(param) === '[object Date]'
}

export function timeSlotComparator (a: ITimeSlot, b: ITimeSlot) {
  const aTime = a.from
  const bTime = b.from

  if (aTime < bTime) {
    return -1
  } else if (aTime > bTime) {
    return 1
  } else {
    return 0
  }
}

export function removePastTimeSlots (timeSlot: ITimeSlot): boolean {
  const currentTime = new Date().getTime()
  const slotTime = timeSlot.from.getTime()

  return slotTime > currentTime
}

export function calculateBookableSlotsWithinDateTimeSlots (duration: number, slots: Map<string, ITimeSlot[]>): Map<string, ITimeSlot[]> {
  const bookableSlotsByDay: Map<string, ITimeSlot[]> = new Map()

  slots.forEach((slots, slotsDate) => {
    const bookableSlots = calculateBookableSlotsForDuration(duration, slots)
    if (bookableSlots.length > 0) {
      bookableSlotsByDay.set(slotsDate, bookableSlots)
    }
  })

  return bookableSlotsByDay
}

function calculateBookableSlotsForDuration (duration: number, slots: ITimeSlot[]): ITimeSlot[] {
  const bookableSlots: ITimeSlot[] = []
  const copiedSlots = [...slots]

  for (let i = 0; i < copiedSlots.length; i++) {
    const slot = copiedSlots[i]
    firstSlotIsBookable(duration, copiedSlots) && bookableSlots.push(slot)
    copiedSlots.splice(0, 1)
  }

  return bookableSlots
}

function firstSlotIsBookable (duration:number, slots: ITimeSlot[]): boolean {
  if (slots.length === 0) {
    return false
  }
  const durationInMilliseconds = duration * 60 * 1000
  const slotSizeInMilliseconds = slots[0].to.getTime() - slots[0].from.getTime()
  const consecutiveSlotsNeeded = durationInMilliseconds / slotSizeInMilliseconds
  let theFirstSlotIsBookable = true

  for (let i = 0; (slots.length >= consecutiveSlotsNeeded) && (i < consecutiveSlotsNeeded); i++) {
    if ((i > 0) && (slots[i].from.getTime() !== slots[i - 1].to.getTime())) {
      theFirstSlotIsBookable = false
    }
  }

  return theFirstSlotIsBookable
}
