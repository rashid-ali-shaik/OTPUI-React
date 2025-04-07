import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const otpRef = useRef([]);
  const NO_OF_INPUTS = 5;
  const [otp, setOTP] = useState(new Array(NO_OF_INPUTS).fill(""));
  useEffect(() => {
    otpRef.current?.[0]?.focus();
  }, []);
  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newOtp = [...otp];
    newOtp[index] = newValue.slice(-1);
    setOTP(newOtp);
    newValue && otpRef?.current?.[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (!e.target.value && e?.code == "Backspace") {
      otpRef?.current?.[index - 1]?.focus();
    }
  };
  return (
    <div className="App">
      {otp.map((value, index) => (
        <input
          ref={(input) => (otpRef.current[index] = input)}
          key={index}
          type="text"
          value={otp[index]}
          onChange={(e) => handleChange(e?.target?.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
}
