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
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="header">Tip Calculator</h1>
            <div className="tip-form">
              <div className="tip-row">
                <label for="total-tip" className="input-title">
                  Total Tip
                </label>
                <div className="">
                  <input
                    id="total-tip"
                    type="number"
                    min="0"
                    value={totalTip}
                    onChange={onChangeTotalTip}
                  />
                </div>
              </div>

              <div className="tip-row">
                <label for="total-server-hours" className="input-title">
                  Total Server Hours
                </label>
                <div className="">
                  <input
                    id="total-server-hours"
                    type="number"
                    min="0"
                    value={totalServerHours}
                    onChange={onChangeTotalServerHours}
                  />
                </div>
              </div>

              <div className="tip-row">
                <label for="percent-kitchen" className="input-title">
                  % for Kitchen Tip
                </label>
                <div className="">
                  <input
                    id="percent-kitchen"
                    type="number"
                    min="0"
                    value={percentKitchen}
                    onChange={onChangePercentKitchen}
                  />
                </div>
              </div>

              <div className="tip-row">
                <h5 className="">Kitchen Tip</h5>
                <h5 className="">
                  ${parseFloat(Math.round(kitchenTip * 100) / 100).toFixed(2)}
                </h5>
              </div>

              <div className="tip-row">
                <h5 className="">Server Total Tip</h5>
                <h5 className="">${serverTotalTip}</h5>
              </div>
            </div>
          </div>
          <div className="col">
            <TipPerServer
              totalServerHours={totalServerHours}
              serverTotalTip={serverTotalTip}
              tipPerHour={tipPerHour}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
