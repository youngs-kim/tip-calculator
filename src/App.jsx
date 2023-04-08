import { useEffect, useState } from 'react';
import './App.css';
import TipPerServer from './components/TipPerServer';

function App() {
  const [totalTip, setTotalTip] = useState('');
  const [totalServerHours, setTotalServerHours] = useState('');
  const [percentKitchen, setPercentKitchen] = useState('');
  const [kitchenTip, setKitchenTip] = useState(0);
  const [serverTotalTip, setServerTotalTip] = useState(0);
  const [tipPerHour, setTipPerHour] = useState(0);

  const onChangeTotalTip = (e) => {
    if (e.target.value === '') {
      setTotalTip('');
    }
    setTotalTip(e.target.value);
  };

  const onChangeTotalServerHours = (e) => {
    if (e.target.value === '') {
      setTotalServerHours('');
    }
    setTotalServerHours(e.target.value);
  };

  const onChangePercentKitchen = (e) => {
    if (e.target.value === '') {
      setPercentKitchen('');
      setKitchenTip(0);
    } else {
      setPercentKitchen(e.target.valueAsNumber);
      const kitchenResult = totalTip * (e.target.valueAsNumber / 100);
      setKitchenTip(
        parseFloat(Math.round(kitchenResult * 100) / 100).toFixed(2)
      );
    }
  };

  useEffect(() => {
    const tip = totalTip - kitchenTip;
    setServerTotalTip(parseFloat(totalTip - kitchenTip).toFixed(2));
    if (tip === 0) {
      setTipPerHour(0);
    } else {
      setTipPerHour(parseFloat(tip / totalServerHours).toFixed(2));
    }
  }, [serverTotalTip, kitchenTip]);

  return (
    <div className="App">
      <h1 className="header">Tip Calculator</h1>
      <div className="top-container">
        <div className="sec-container">
          <h2>Total Tip</h2>
          <input
            type="number"
            min="0"
            value={totalTip}
            onChange={onChangeTotalTip}
          />
        </div>

        <div className="sec-container">
          <h2>Total Server Hours</h2>
          <input
            type="number"
            min="0"
            value={totalServerHours} // <input type="number" /> will always return integer value, typeof(totalServerHours) === Number, hence why empty field === NaN
            onChange={onChangeTotalServerHours}
          />
        </div>

        <div className="sec-container">
          <h2>Percentage for Kitchen</h2>
          <input
            type="number"
            min="0"
            value={percentKitchen}
            onChange={onChangePercentKitchen}
          />
        </div>

        <div className="sec-container">
          <h2>Kitchen Tip</h2>
          <h2>${kitchenTip}</h2>
        </div>

        <div className="sec-container">
          <h2>Server Total Tip</h2>
          <h2>${serverTotalTip}</h2>
        </div>
      </div>

      <TipPerServer
        totalServerHours={totalServerHours}
        serverTotalTip={serverTotalTip}
        tipPerHour={tipPerHour}
      />
    </div>
  );
}

export default App;
