import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const numbers = new Set('0123456789.');
const operator = new Set('+-x/A=');


function Key({ value, color = 0, handleClick, myid }) {
  const colors = ['#353834', '#d82b5f', ' #2b68d8'];

  return (
    <button
      id={myid}
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
          <td colSpan='2'> <Key value='AC' color='1' handleClick={handleClick} myid='clear' /> </td>
          <td> <Key value='/' handleClick={handleClick} myid='divide' /> </td>
          <td> <Key value='x' handleClick={handleClick} myid='multiply' /> </td>
        </tr>
        <tr>
          <td> <Key value='7' handleClick={handleClick} myid='seven' /> </td>
          <td> <Key value='8' handleClick={handleClick} myid='eight' /> </td>
          <td> <Key value='9' handleClick={handleClick} myid='nine' /> </td>
          <td> <Key value='-' handleClick={handleClick} myid='subtract' /> </td>
        </tr>
        <tr>
          <td> <Key value='4' handleClick={handleClick} myid='four' /> </td>
          <td> <Key value='5' handleClick={handleClick} myid='five' /> </td>
          <td> <Key value='6' handleClick={handleClick} myid='six' /> </td>
          <td> <Key value='+' handleClick={handleClick} myid='add' /> </td>
        </tr>
        <tr>
          <td> <Key value='1' handleClick={handleClick} myid='one' /> </td>
          <td> <Key value='2' handleClick={handleClick} myid='two' /> </td>
          <td> <Key value='3' handleClick={handleClick} myid='three' /> </td>
        </tr>
        <tr>
          <td colSpan='2'> <Key value='0' handleClick={handleClick} myid='zero' /> </td>
          <td> <Key value='.' handleClick={handleClick} myid='decimal' /> </td>
          <td rowSpan='2'> <Key value='=' color='2' handleClick={handleClick} myid='equals' /> </td>
        </tr>
      </tbody>
    </table>
  )
}

function Screen({ value }) {
  return (
    <div className='screen' id='display'>
      <p className='value'> {value} </p>
    </div>
  )
}

function App() {
  const [value, setValue] = useState('0');
  const [isNum, setIsNum] = useState(true);
  const [stack, setStack] = useState([]);

  const clean = (stack_) => {
    let lastSeeIsOp = false;
    const cleanStack = [];
    const tmp = stack_.reverse();
    for (let i of tmp) {
      if (operator.has(i) && lastSeeIsOp) continue;
      else if (operator.has(i)) lastSeeIsOp = true;
      else lastSeeIsOp = false;
      cleanStack.push(i);
    }

    return cleanStack.reverse();
  }

  const calcular = (stack_) => {
    const myStack = clean(stack_);
    const size = myStack.length - !(myStack.length & 1)
    let total = parseFloat(myStack[0]);

    for (let i = 1; i < size; i += 2) {
      if (myStack[i] === 'x') total *= parseFloat(myStack[i + 1]);
      if (myStack[i] === '+') total += parseFloat(myStack[i + 1]);
      if (myStack[i] === '-') total -= parseFloat(myStack[i + 1]);
      if (myStack[i] === '/') {
        if (parseFloat(myStack[i + 1]) === 0) {
          alert('Error en la operación a realizar');
          return 0;
        }
        else total /= parseFloat(myStack[i + 1]);
      }
    }

    return total;
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
    else if (operator.has(value) && value_ === '-') {
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
    else if (numbers.has(value_) !== isNum) {
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
