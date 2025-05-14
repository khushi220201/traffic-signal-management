import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Col, Row, Select, Space } from "antd";
import { getApi } from "../../utils/api";

const { Option } = Select;

const RED = "red";
const YELLOW = "yellow";
const GREEN = "green";

const DEFAULT_SIGNAL_DURATION = 30;
const YELLOW_DURATION = 5;

const lightStyle = (color: string) => {
  return {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: color,
    border: "2px solid #444",
  };
};

const timerPlateStyle = (color: string) => {
  return {
    marginTop: 6,
    width: 36,
    height: 24,
    background: color,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 14,
    borderRadius: 4,
  };
};

const SignalsLayout = () => {
  const [intersection, setIntersection] = useState("FOUR_WAY_TYPE1");
  const [signalStates, setSignalStates] = useState([RED, RED, RED, RED]);
  const [running, setRunning] = useState(false);
  const [cycleTimer, setCycleTimer] = useState(0);
  const [displayTimers, setDisplayTimers] = useState([0, 0, 0, 0]);
  const [customTimers, setCustomTimers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const intervalRef: any = useRef(null);

  useEffect(() => {
    const fetchTimers = async () => {
      setLoading(true);
      let count = 4;
      if (intersection === "THREE_WAY") count = 3;
      if (intersection === "FIVE_WAY") count = 5;
      try {
        const response = await getApi(
          `/traffic-signal-configs/type/${intersection}`
        );
        const data = response.data.data;
        let timers = [];
        for (let i = 1; i <= count; i++) {
          const key = `signal${i}Time`;
          if (data[key] !== undefined) {
            timers.push(data[key]);
          } else {
            timers.push(DEFAULT_SIGNAL_DURATION);
          }
        }
        setCustomTimers(timers);
      } catch (e) {
        let timers = [];
        for (let i = 0; i < count; i++) {
          timers.push(DEFAULT_SIGNAL_DURATION);
        }
        setCustomTimers(timers);
      }
      setLoading(false);
    };
    fetchTimers();
  }, [intersection]);

  let signalDurations = customTimers.length > 0 ? customTimers : [];
  if (signalDurations.length === 0) {
    let count = 4;
    if (intersection === "THREE_WAY") count = 3;
    if (intersection === "FIVE_WAY") count = 5;
    for (let i = 0; i < count; i++) {
      signalDurations.push(DEFAULT_SIGNAL_DURATION);
    }
  }
  let totalCycleTime = 0;
  for (let i = 0; i < signalDurations.length; i++) {
    totalCycleTime += signalDurations[i];
  }

  const getTimerPlateColor = (state: string) => {
    if (state === GREEN) return "#1db954";
    if (state === YELLOW) return "#fbc02d";
    return "#d32f2f";
  };

  const handleIntersectionChange = async (value: string) => {
    if (running) return;
    setIntersection(value);
    let count = 4;
    if (value === "THREE_WAY") count = 3;
    if (value === "FIVE_WAY") count = 5;
    let arr = [];
    for (let i = 0; i < count; i++) arr.push(RED);
    setSignalStates(arr);
    setDisplayTimers(new Array(count).fill(0));
    setCycleTimer(0);
  };

  const resetTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
    setCycleTimer(0);
    let count = 4;
    if (intersection === "THREE_WAY") count = 3;
    if (intersection === "FIVE_WAY") count = 5;
    let arr = [];
    for (let i = 0; i < count; i++) arr.push(RED);
    setSignalStates(arr);
    setDisplayTimers(new Array(count).fill(0));
  };

  const startSignal = () => {
    if (running) return;
    let count = 4;
    if (intersection === "THREE_WAY") count = 3;
    if (intersection === "FIVE_WAY") count = 5;
    let arr = [];
    for (let i = 0; i < count; i++) arr.push(RED);
    arr[0] = GREEN;
    setSignalStates(arr);
    let timers = [];
    for (let i = 0; i < count; i++) {
      if (i === 0) timers.push(signalDurations[0]);
      else timers.push(0);
    }
    setDisplayTimers(timers);
    setRunning(true);
    setCycleTimer(0);
    intervalRef.current = setInterval(() => {
      setCycleTimer((prevTime) => (prevTime + 1) % totalCycleTime);
    }, 1000);
  };

  useEffect(() => {
    if (!running) return;
    let count = signalStates.length;
    let newStates = [];
    let endTime = 0;
    for (let i = 0; i < count; i++) {
      const startTime = endTime;
      endTime = startTime + signalDurations[i];
      if (cycleTimer >= startTime && cycleTimer < endTime) {
        const remainingTime = endTime - cycleTimer;
        if (remainingTime <= YELLOW_DURATION) {
          for (let j = 0; j < count; j++) newStates[j] = RED;
          newStates[i] = YELLOW;
        } else {
          for (let j = 0; j < count; j++) newStates[j] = RED;
          newStates[i] = GREEN;
        }
      }
    }
    if (newStates.length === 0) {
      for (let i = 0; i < count; i++) newStates[i] = RED;
    }
    setSignalStates(newStates);
    let newDisplayTimers = [];
    endTime = 0;
    for (let i = 0; i < count; i++) {
      const startTime = endTime;
      endTime = startTime + signalDurations[i];
      if (cycleTimer >= startTime && cycleTimer < endTime) {
        newDisplayTimers[i] = endTime - cycleTimer;
      } else {
        if (cycleTimer < startTime) {
          newDisplayTimers[i] = startTime - cycleTimer;
        } else {
          newDisplayTimers[i] = totalCycleTime - cycleTimer + startTime;
        }
      }
    }
    setDisplayTimers(newDisplayTimers);
  }, [cycleTimer, running]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const renderSignal = (
    idx: number,
    position: React.CSSProperties,
    label: string
  ) => (
    <div className="signal" style={{ ...position }}>
      <div className="signal-label">
        {label}
      </div>
      <div className="signal-body">
        <div style={lightStyle(signalStates[idx] === RED ? "red" : "#444")} />
        <div
          style={lightStyle(signalStates[idx] === YELLOW ? "orange" : "#444")}
        />
        <div
          style={lightStyle(signalStates[idx] === GREEN ? "green" : "#444")}
        />
      </div>
      <div
        style={{
          ...timerPlateStyle(getTimerPlateColor(signalStates[idx])),
          background: getTimerPlateColor(signalStates[idx]),
        }}
      >
        {loading ? "..." : displayTimers[idx]}s
      </div>
    </div>
  );

  let signals: any = [];
  if (signalStates.length === 3) {
    signals = [
      renderSignal(
        0,
        { top: 20, left: "50%", transform: "translateX(-50%)" },
        "Signal 1"
      ),
      renderSignal(
        1,
        { top: "50%", left: 20, transform: "translateY(-50%)" },
        "Signal 2"
      ),
      renderSignal(
        2,
        { top: "50%", right: 20, transform: "translateY(-50%)" },
        "Signal 3"
      ),
    ];
  } else if (signalStates.length === 4) {
    signals = [
      renderSignal(
        0,
        { top: 20, left: "50%", transform: "translateX(-50%)" },
        "Signal 1"
      ),
      renderSignal(
        1,
        { top: "50%", right: 20, transform: "translateY(-50%)" },
        "Signal 2"
      ),
      renderSignal(
        2,
        { bottom: 20, left: "50%", transform: "translateX(-50%)" },
        "Signal 3"
      ),
      renderSignal(
        3,
        { top: "50%", left: 20, transform: "translateY(-50%)" },
        "Signal 4"
      ),
    ];
  } else if (signalStates.length === 5) {
    signals = [
      renderSignal(0, { top: 20, left: 320 }, "Signal 1"),
      renderSignal(1, { top: 20, right: 320 }, "Signal 2"),
      renderSignal(
        2,
        { top: "50%", left: 60, transform: "translateY(-50%)" },
        "Signal 3"
      ),
      renderSignal(
        3,
        { top: "50%", right: 60, transform: "translateY(-50%)" },
        "Signal 4"
      ),
      renderSignal(
        4,
        { bottom: 20, left: "50%", transform: "translateX(-50%)" },
        "Signal 5"
      ),
    ];
  }

  return (
    <div className="visualizer-container">
      <div className="visualizer-inner">
        <div className="signal-wrapper">{signals}</div>
      </div>
      <Card className="visualizer-card">
        <Row gutter={[16, 16]} align="middle" justify="center">
          <Col>
            <Select
              value={intersection}
              onChange={handleIntersectionChange}
              style={{ width: 240 }}
              disabled={running || loading}
              loading={loading}
              placeholder="Select Intersection"
            >
              <Option value="THREE_WAY">3 Way Intersection</Option>
              <Option value="FOUR_WAY_TYPE1">
                4 Way Intersection (Type-1)
              </Option>
              <Option value="FOUR_WAY_TYPE2">
                4 Way Intersection (Type-2)
              </Option>
              <Option value="FIVE_WAY">5 Way Intersection</Option>
            </Select>
          </Col>
          <Col>
            <Space>
              <Button
                type="primary"
                onClick={startSignal}
                disabled={running || loading}
              >
                Start Signal
              </Button>
              <Button
                type="primary"
                danger
                onClick={resetTimers}
                disabled={loading || !running}
              >
                Reset Timers
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SignalsLayout;
