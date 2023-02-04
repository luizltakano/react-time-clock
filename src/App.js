import "./styles.css";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function App() {
  //Variables
  const [timerType, setTimerType] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionTime, setSessionTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [restart, setRestart] = useState(0);
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="clock">Time's Up!</div>;
    }
    const minutes = Math.floor(remainingTime / 60)
      .toString()
      .padStart(2, 0);
    const seconds = (remainingTime % 60).toString().padStart(2, 0);

    return (
      <div className="clock__wrapper">
        <span className="clock__title" id="timer-label">
          {!timerType ? "Session " : "Break "}
          {isPlaying ? "Running" : "Paused"}
        </span>
        <div className="clock__value" id="time-left">
          {minutes}:{seconds}
        </div>
      </div>
    );
  };

  const StartStop = () => {
    if (isPlaying) {
      return (
        <span className="btn__icon btn__stop material-icons" id="start_stop">
          stop
        </span>
      );
    } else {
      return (
        <span className="btn__icon btn__start material-icons" id="start_stop">
          play_arrow
        </span>
      );
    }
  };

  //Functions

  const initiateClock = (e) => {
    const btn = e.target.className.includes("btn__start");
    if (btn) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const changeType = (e) => {
    const btn = e.target;
    if (btn.className.includes("btn__break")) {
      setTimerType(true);
      document
        .getElementById("btn__session")
        .classList.remove("btn__type--active");
      document.body.style.backgroundColor = "#447ca2";
    } else {
      setTimerType(false);

      document
        .getElementById("btn__break")
        .classList.remove("btn__type--active");
      document.body.style.backgroundColor = "#d95450";
    }
    setIsPlaying(false);
    setRestart((pre) => pre + 1);
    btn.classList.add("btn__type--active");
  };

  const changeTime = (e) => {
    const btnClass = e.target.className;
    const btnText = e.target.innerHTML;
    if (btnClass.includes("btn__sessionlength")) {
      if (btnText === "+" && sessionTime < 3541) {
        setSessionTime((pre) => pre + 60);
      } else if (btnText === "-" && sessionTime > 60) {
        setSessionTime((pre) => pre - 60);
      }
    } else if (btnClass.includes("btn__breaklength")) {
      if (btnText === "+" && breakTime < 3541) {
        setBreakTime((pre) => pre + 60);
      } else if (btnText === "-" && breakTime > 60) {
        setBreakTime((pre) => pre - 60);
      }
    } else {
      return;
    }
  };

  const complete = () => {
    if (timerType) {
      document
        .getElementById("btn__break")
        .classList.remove("btn__type--active");
      document
        .getElementById("btn__session")
        .classList.add("btn__type--active");
      document.body.style.backgroundColor = "#447ca2";
    } else {
      document
        .getElementById("btn__session")
        .classList.remove("btn__type--active");
      document.getElementById("btn__break").classList.add("btn__type--active");
      document.body.style.backgroundColor = "#d95450";
    }
    setTimerType((pre) => !pre);
    setRestart((pre) => pre + 1);
  };

  const reset = () => {
    setRestart((pre) => pre + 1);
    setIsPlaying(false);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="clock">
          <CountdownCircleTimer
            key={restart}
            isPlaying={isPlaying}
            duration={timerType ? breakTime : sessionTime}
            colors={["#ebebeb"]}
            onComplete={() => {
              complete();
              return { shouldRepeat: true, delay: 1.5 };
            }}
            size={200}
            strokeWidth={8}
            trailColor={"#"}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <div className="setup">
          <div className="setup__type">
            <button
              className="btn btn__type btn__session btn__type--active"
              id="btn__session"
              onClick={changeType}
            >
              Session
            </button>
            <button
              className="btn btn__type btn__break"
              id="btn__break"
              onClick={changeType}
            >
              Break
            </button>
          </div>
          <div className="setup__length">
            <p className="length__title" id="session-label">
              Session Length
            </p>
            <div className="length__config length__session">
              <button
                className="btn btn__sessionlength btn__action btn__subtract"
                id="break-decrement"
                onClick={changeTime}
              >
                -
              </button>
              <span className="length__time" id="session-length">
                {sessionTime / 60}
              </span>
              <button
                className="btn btn__sessionlength btn__action btn__add"
                id="break-increment"
                onClick={changeTime}
              >
                +
              </button>
            </div>
          </div>
          <div className="setup__length">
            <p className="length__title" id="break-label">
              Break Length
            </p>
            <div className="length__config length__break">
              <button
                className="btn btn__breaklength btn__action btn__subtract"
                id="session-decrement"
                onClick={changeTime}
              >
                -
              </button>
              <span className="length__time" id="break-length">
                {breakTime / 60}
              </span>
              <button
                className="btn btn__breaklength btn__action btn__add"
                id="break-increment"
                onClick={changeTime}
              >
                +
              </button>
            </div>
          </div>
          <div className="control">
            <button
              className="btn btn__control btn__startstop"
              onClick={initiateClock}
            >
              <StartStop />
            </button>
            <button className="btn btn__control btn__reset" onClick={reset}>
              <span className="btn__icon material-icons" id="reset">
                restart_alt
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
