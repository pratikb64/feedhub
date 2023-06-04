export default function dateDifference(previousDate: Date): string {
  const currentDate = new Date()
  const differenceInSeconds = Math.floor(
    (currentDate.getTime() - previousDate.getTime()) / 1000
  )

  // Define time units in seconds
  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const year = month * 12

  if (differenceInSeconds < minute) {
    return `${differenceInSeconds} sec(s) ago`
  } else if (differenceInSeconds < hour) {
    const minutes = Math.floor(differenceInSeconds / minute)
    return `${minutes} min(s) ago`
  } else if (differenceInSeconds < day) {
    const hours = Math.floor(differenceInSeconds / hour)
    return `${hours} hour(s) ago`
  } else if (differenceInSeconds < month) {
    const days = Math.floor(differenceInSeconds / day)
    return `${days} day(s) ago`
  } else if (differenceInSeconds < year) {
    const months = Math.floor(differenceInSeconds / month)
    return `${months} month(s) ago`
  } else {
    const years = Math.floor(differenceInSeconds / year)
    return `${years} year(s) ago`
  }
}
