import { useEffect, useState } from 'react';
import './App.css';
import TipPerServer from './components/TipPerServer';

function App() {
  const [totalTip, setTotalTip] = useState('');
  const [totalServerHours, setTotalServerHours] = useState('');
  const [percentKitchen, setPercentKitchen] = useState('');
  const [kitchenTip, setKitchenTip] = useState(0);
  const [serverTotalTip, setServerTotalTip] = useState(0);

  const onChangeTotalTip = (e) => {
    setTotalTip(e.target.value);
  };

  const onChangeTotalServerHours = (e) => {
    setTotalServerHours(e.target.value);
  };

  const onChangePercentKitchen = (e) => {
    setPercentKitchen(e.target.valueAsNumber);
    const kitchenResult = totalTip * (e.target.valueAsNumber / 100);
    setKitchenTip(parseFloat(Math.round(kitchenResult * 100) / 100).toFixed(2));
  };

  useEffect(() => {
    if (totalTip === '') {
      setServerTotalTip(0);
    } else {
      setServerTotalTip(parseFloat(totalTip - kitchenTip).toFixed(2));
    }
  }, [kitchenTip]);

  return (
    <div className="App">
      <h1 className="header">Tip Calculator</h1>
      <div className="top-container">
        <div className="sec-container">
          <h2>Total Tip</h2>
          <input type="number" value={totalTip} onChange={onChangeTotalTip} />
        </div>

        <div className="sec-container">
          <h2>Total Server Hours</h2>
          <input
            type="number"
            value={totalServerHours}
            onChange={onChangeTotalServerHours}
          />
        </div>

        <div className="sec-container">
          <h2>Percentage for Kitchen</h2>
          <input
            type="number"
            value={percentKitchen}
            onChange={onChangePercentKitchen}
          />
        </div>

        <div className="sec-container">
          <h2>After Kitchen</h2>
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
      />
    </div>
  );
}

export default App;
