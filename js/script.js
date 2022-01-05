//! DOM selectors
const clockDisplay = document.querySelector("#clock")
const setAlarmButton = document.querySelector(".set-alarm")
const clearAlarmButton = document.querySelector(".clear-alarm")
const timeInput = document.querySelector("input")

//! URL for playing BEEP audio
const audioURL =
  "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"

const beepAudio = new Audio(audioURL)
beepAudio.loop = true

//! Adding event listeners to the buttons to set alarm or clear it
setAlarmButton.addEventListener("click", setAlarm, { passive: true })
clearAlarmButton.addEventListener("click", clearAlarm, { passive: true })

//prettier-ignore
let alarmTime = null
let alarmTimeout = null

//* Formatting the clockDisplay
const formatTime = time => {
  if (time < 10) return `0${time}`
  return time
}

//! Updating clockDisplay
const updateTime = async () => {
  const date = new Date()

  //* Getting hours, minutes and seconds from today's date
  const hour = await formatTime(date.getHours())
  const minutes = await formatTime(date.getMinutes())
  const seconds = await formatTime(date.getSeconds())

  //* Setting the clockDisplay here
  clockDisplay.innerText = `${hour} : ${minutes} : ${seconds}`
}

//prettier-ignore
//! Setting the alarmTime when we get the value from the input
timeInput.addEventListener('change', () => alarmTime = timeInput.value)

//! Setting the alarm here
function setAlarm() {
  if (!alarmTime)
    return alert("Enter the alarm time in the input and then submit!")

  const current = new Date()
  const timeToAlarm = new Date(alarmTime)

  //* Checking whether the input alarm value is greater than the current time
  if (timeToAlarm < current) {
    return alert(
      "Good morning my friend! The time entered is gone and presumably wouldn't come again."
    )
  }

  const timeout = timeToAlarm.getTime() - current.getTime()
  alarmTimeout = setTimeout(async () => await beepAudio.play(), timeout)
  alert("Alarm is set!!")
}

//! Clearing the alarm
function clearAlarm() {
  beepAudio.pause()

  if (!alarmTimeout) return

  clearTimeout(alarmTimeout)
  alert("Alarm is cleared!!")
}

//* Continually updating the clockDisplay using setInterval
setInterval(updateTime, 1000)
