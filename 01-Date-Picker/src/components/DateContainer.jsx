import { useState } from 'react';
import './date.css';
import DateDisplay from './DateDisplay';
const DateContainer = () => {
  const [date, setDate] = useState(Date.now()); // useState
  //props
  console.log(date);
  return ( 
    <>
    <input type="date" className="date-input" onChange={(e) => setDate(e.target.value) }/>
    <DateDisplay date={date}/>
    </>
   );
}
 
export default DateContainer;