import React from "react";

constructor() {
    super();
    this.state = {
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      duration: 2 * 60 * 1000,
      timer: null
    };
    this.startTimer = this.start.bind(this);
  }

  msToTime(duration) {
    let milliseconds = parseInt((duration % 1000));
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    milliseconds = milliseconds.toString().padStart(3, '0');

    return {
      hours,
      minutes,
      seconds,
      milliseconds
    };
  }

  componentDidMount() {}

  start() {
    if (!this.state.timer) {
      this.state.startTime = Date.now();
      this.timer = window.setInterval(() => this.run(), 10);
    }
  }

  run() {
    const diff = Date.now() - this.state.startTime;
    
    // If you want to count up
    // this.setState(() => ({
    //  time: this.msToTime(diff)
    // }));
    
    // count down
    let remaining = this.state.duration - diff;
    if (remaining < 0) {
      remaining = 0;
    }
    this.setState(() => ({
      time: this.msToTime(remaining)
    }));
    if (remaining === 0) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    return ( <
      div >
      <
      button onClick = {
        this.startTimer
      } > Start < /button> {
        this.state.time.hours
      }: {
        this.state.time.minutes
      }: {
        this.state.time.seconds
      }. {
        this.state.time.milliseconds
      }:
      <
      /div>
    );
  }