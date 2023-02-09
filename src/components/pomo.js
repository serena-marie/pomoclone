import { useEffect, useState } from "react"


export default function Pomo(){
    const minuteTest = 1
    const testTime = minuteTest * 60
    const [time, setTime] = useState(testTime)


    // // just for now, this will be set by settings
    // const testTime = 60 * 60 // minutes * seconds
    // const [time, setTime] = useState(testTime)

    useEffect(() => {
        // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        // https://stackoverflow.com/questions/39426083/update-react-component-every-second

        const timeInterval = setInterval(() => {
            if(time > 0) setTime(time - 1)
        }, 1000)

        // called when unmounted
        return() => {
            clearInterval(timeInterval)
        }
    }, [time])

    function formatTime(time){
        let minute = Math.floor(time / 60)
        let second = Math.floor(time % 60)
    
        minute = minute.toString().length === 1 ? "0" + minute : minute
        second = second.toString().length === 1 ? "0" + second : second
        return `${minute}:${second}`
    }

    function modifyActiveTimer(minutes, operation){
        minutes = minutes * 60 // if receiving seconds, *60 to convert to minutes
        console.log(`${minutes} minutes received`)
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

    return(
        <div>
            <div> Hello from the Pomo component </div>

            <div>
                <p> Timer is {formatTime(time)} </p>
                <button onClick={() => modifyActiveTimer(5, 'add')}>Add</button>
                <button onClick={() => modifyActiveTimer(1, 'sub')}>Subtract</button>
                <button onClick={() => reset()}> Reset</button>
            </div>

        </div>
    )
}