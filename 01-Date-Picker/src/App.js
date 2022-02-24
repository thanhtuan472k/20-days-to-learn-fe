import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import DateContainer from './components/DateContainer';

function App() {
  return (
    <div className="App">
      <Header/> 
      <div className="date-container">
        <DateContainer/>
      </div>
    </div>
  );
}

export default App;
