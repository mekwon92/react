import React, { useState } from 'react';
// 변수 선언 구간
const scaleNames = {c: '섭씨', f: '화씨'};

//함수 구간
const toCelsius = fahrenheit => (fahrenheit - 32) * 5 / 9;

const toFahrenheit = celsius => celsius * 9 / 5 + 32;

const tryConver = (temperature, convert) => {
  const input = parseFloat(temperature);
  if(isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

//컴포넌트 구간
const TemperatureInput = ({scale, temperature, onTemperatureChange}) => {
  return (
  <fieldset>
    <legend>온도를 입력해주세요(단위 : {scaleNames[scale]})</legend>
    <input value={temperature} onChange={e => onTemperatureChange(e.target.value)}/>
  </fieldset>);
}

const BoilingVerdict = ({celsius}) => (celsius >= 100) ? <p>물이 끓습니다</p> : <p>물이 끓지 않습니다</p>;

const Calculator = () => {
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState('c');

  const handleCelsiusChange = temperature => {
    setTemperature(temperature);
    setScale('c');
  }
  
  const handleFahrenheitChange = temperature => {
    setTemperature(temperature);
    setScale('f');
  }

  const celsius = scale === 'f' ? tryConver(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConver(temperature, toFahrenheit) : temperature;

  return (
    <div>
      <TemperatureInput
        scale={'c'}
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange} />
      
      <TemperatureInput
        scale={'f'}
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange} />

      <BoilingVerdict celsius={parseFloat(celsius)} />      
    </div>
  );
}

export default Calculator;
