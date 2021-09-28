import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const numbers = new Set('0123456789.');
const operators = new Set('/x+-=A');


function Key({ value, color = 0, handleClick }) {
  const colors = ['#353834', '#d82b5f', ' #2b68d8'];

  return (
    <button
      style={{ backgroundColor: `${colors[color]}` }}
      onClick={() => handleClick(value[0])}
    >
      {value}
    </button>
  )
}

function KeyBoard({ handleClick }) {
  return (
    <table className='keyBoard'>
      <tbody>
        <tr>
          <td colSpan='2'> <Key value='AC' color='1' handleClick={handleClick} /> </td>
          <td> <Key value='/' handleClick={handleClick} /> </td>
          <td> <Key value='x' handleClick={handleClick} /> </td>
        </tr>
        <tr>
          <td> <Key value='7' handleClick={handleClick} /> </td>
          <td> <Key value='8' handleClick={handleClick} /> </td>
          <td> <Key value='9' handleClick={handleClick} /> </td>
          <td> <Key value='-' handleClick={handleClick} /> </td>
        </tr>
        <tr>
          <td> <Key value='4' handleClick={handleClick} /> </td>
          <td> <Key value='5' handleClick={handleClick} /> </td>
          <td> <Key value='6' handleClick={handleClick} /> </td>
          <td> <Key value='+' handleClick={handleClick} /> </td>
        </tr>
        <tr>
          <td> <Key value='1' handleClick={handleClick} /> </td>
          <td> <Key value='2' handleClick={handleClick} /> </td>
          <td> <Key value='3' handleClick={handleClick} /> </td>
        </tr>
        <tr>
          <td colSpan='2'> <Key value='0' handleClick={handleClick} /> </td>
          <td> <Key value='.' handleClick={handleClick} /> </td>
          <td rowSpan='2'> <Key value='=' color='2' handleClick={handleClick} /> </td>
        </tr>
      </tbody>
    </table>
  )
}

function Screen({ value }) {
  return (
    <div className='screen'>
      <p className='value'> {value} </p>
    </div>
  )
}

function App() {
  const [value, setValue] = useState('0');
  const [isNum, setIsNum] = useState(true);
  const [stack, setStack] = useState([]);

  const calcular = (stack_) => {
    const size = stack_.length - !(stack_.length & 1)
    let total = parseFloat(stack_[0]);


    for (let i = 1; i < size; i += 2) {
      if (stack_[i] == 'x') total *= parseFloat(stack_[i + 1]);
      if (stack_[i] == '+') total += parseFloat(stack_[i + 1]);
      if (stack_[i] == '-') total -= parseFloat(stack_[i + 1]);
      if (stack_[i] == '/') {
        if (parseFloat(stack_[i + 1]) === 0) {
          alert('Error en la operación a realizar');
          return 0;
        }
        else total /= parseFloat(stack_[i + 1]);
      }
    }

    return  (total.toFixed(3)).toString();
  }

  const handleClick = value_ => {
    if (value_ === 'A') {
      setValue('0');
      setStack([]);
      setIsNum(true);
    }
    else if (value_ === '=') {
      alert('a');
      if (stack.length >= 2 && isNum) {
        setValue(calcular(stack.concat(value)));
        setStack([]);
        setIsNum(true);
      }
    }
    else if (value_ === '.') {
      if (!value.includes('.') && isNum) setValue(value + '.');
    }
    else if (!numbers.has(value) && value_ == '-') {
      setStack(stack.concat(value));
      setValue(value_);
      setIsNum(true);
    }
    else if (numbers.has(value_) && value === '-' && isNum) {
      setValue((value !== '0' ? value + value_ : value_));
    }
    else if (numbers.has(value_) && isNum) {
      setValue((value !== '0' ? value + value_ : value_));
    }
    else if (numbers.has(value_) != isNum) {
      setStack(stack.concat(value));
      setValue(value_);
      setIsNum(!isNum);
    }
    else {
      setValue(value_);
    }
  }

  return (
    <div className='app'>
      <Screen value={value} />
      <KeyBoard setValue={setValue} handleClick={handleClick} />
    </div>
  )
}

ReactDOM.render(
  <div className='root'>
    <App />
  </div>,
  document.getElementById('root')
);
