import { useEffect, useState } from "react"

import './styles/pomo.scss'

export default function Pomo(){
    const minuteTest = 1
    const testTime = minuteTest * 60
    const [timerActive, setTimerActive] = useState(false)
    const [time, setTime] = useState(testTime)


    // // just for now, this will be set by settings
    // const testTime = 60 * 60 // minutes * seconds
    // const [time, setTime] = useState(testTime)
    useEffect(() => {
        // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        // https://stackoverflow.com/questions/39426083/update-react-component-every-second
        let timeInterval = null
        if(timerActive){
            timeInterval = setInterval(() => {
                if(time > 0) setTime(time - 1)
            }, 1000)
        }

        // called when unmounted
        return() => {
            clearInterval(timeInterval)
        }
    }, [timerActive, time])


    function formatTime(time){
        let minute = Math.floor(time / 60)
        let second = Math.floor(time % 60)
    
        minute = minute.toString().length === 1 ? "0" + minute : minute
        second = second.toString().length === 1 ? "0" + second : second
        return `${minute}:${second}`
    }

    function modifyActiveTimer(minutes, operation){
        minutes = minutes * 60 // if receiving seconds, *60 to convert to minutes
        console.log(`${minutes} seconds received`)
        switch(operation){
            case 'add':
                setTime(time+minutes)
                break
            case 'sub':
                // Can't have negative time :P 
                time-minutes > 0 ? setTime(time-minutes) : setTime(0)
                break
            default:
                console.log(`Hrmmmm, how peculiar. An error occurred.`)
        }
    }

    function reset(){
        setTime(testTime)
    }

    function timerControl(op){
        switch(op){
            case 'start':
                setTimerActive(true)
                break;
            case 'stop':
                setTimerActive(false)
                reset()
                break;
            case 'pause':
                setTimerActive(false)
                break;
            default:
                console.log(`Hrmmmm, how peculiar. An error occurred.`)
        }
    }

    return(
        <div>
            <div className='timerContainer'>
                <div className='timerStringContainer'>
                    <p> {formatTime(time)} </p>
                </div>
                <div className='timerControls'>
                    <button onClick={() => modifyActiveTimer(5, 'add')}>Add</button>
                    <button onClick={() => modifyActiveTimer(1, 'sub')}>Subtract</button>
                    <button onClick={() => reset()}> Reset</button>
                    <button onClick={() => timerControl('start')}> Start</button>
                    <button onClick={() => timerControl('stop')}> Stop</button>
                    <button onClick={() => timerControl('pause')}> Pause</button>
                </div>
            </div>

        </div>
    )
}