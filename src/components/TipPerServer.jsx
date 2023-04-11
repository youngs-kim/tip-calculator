import React, { useState, useEffect } from 'react';
import '../App.css';
import { RxReset } from 'react-icons/Rx';
import { FiUserPlus } from 'react-icons/Fi';
import { TiUserDelete } from 'react-icons/Ti';

const TipPerServer = ({ totalServerHours, serverTotalTip, tipPerHour }) => {
  const defaultServer = {
    name: '',
    hours: '',
    earnedTips: 0,
  };

  const [serverList, setServerList] = useState([defaultServer]);
  const [totalHoursLeft, setTotalHoursLeft] = useState(0);
  const [totalTipLeft, setTotalTipLeft] = useState(0);

  const sumTotalHours = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum = sum + arr[i].hours;
    }
    return sum;
  };

  const updateHours = (index) => (e) => {
    let arr = [...serverList];
    if (e.target.value === '') {
      arr[index]['hours'] = '';
    } else {
      arr[index]['hours'] = e.target.valueAsNumber;
    }
    setServerList(arr);
    // setTotalHoursLeft(totalServerHours - sumTotalHours(arr));

    setTotalHoursLeft(
      parseFloat(
        Math.round((totalServerHours - sumTotalHours(arr)) * 100) / 100
      ).toFixed(2)
    );
  };

  const updateName = (index) => (e) => {
    let arr = [...serverList];
    arr[index]['name'] = e.target.value;
    setServerList(arr);
  };

  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   let arr = [...serverList];
  //   arr[index][name] = value;
  //   setServerList(arr);
  // };

  const addServer = (e) => {
    e.preventDefault();

    const server = {
      name: '',
      hours: '',
      earnedTips: 0,
    };

    setServerList([...serverList, server]);
  };

  const deleteServer = (ind) => {
    const newArray = serverList.filter((item, index) => index !== ind);
    setServerList(newArray);
    console.log(ind, 'ind');

    let sum = 0;
    newArray.forEach((server) => {
      sum += server.hours;
    });
    setTotalHoursLeft(totalServerHours - sum);
  };

  // const calcEarnedTips = (serverList) => {
  //   for (let i = 0; i < serverList.length; i++) {
  //     serverList[i].earnedTips = serverList[i].hours * tipPerHour;
  //   }
  //   setServerList(serverList);
  // };

  // Never mutate a state variable, create a new reference and update the state variable by using an update method.
  const calcEarnedTips = () => {
    const newArray = [...serverList];
    newArray.forEach((server) => {
      server.earnedTips = server.hours * tipPerHour;
      server.earnedTips = parseFloat(
        Math.round(server.earnedTips * 100) / 100
      ).toFixed(2);
    });
    setServerList(newArray);
  };

  const restart = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    if (totalServerHours !== '') {
      setTotalHoursLeft(totalServerHours);
    } else {
      setTotalHoursLeft(0);
    }
    setTotalTipLeft(serverTotalTip);
  }, [totalServerHours, serverTotalTip]);

  return (
    <div>
      <div className="mb-3 row">
        <div className="col">
          <h5 className="tip-info">Tip Per Hour</h5>
          <h2 className="tip-info">
            ${parseFloat(Math.round(tipPerHour * 100) / 100).toFixed(2)}
          </h2>
        </div>
        <div className="col">
          <h5 className="tip-info">Total Hours left</h5>
          <h2 className="tip-info">{totalHoursLeft}</h2>
        </div>
        <div className="col">
          <h5 className="tip-info">Total Tip left</h5>
          <h2 className="tip-info">${totalTipLeft}</h2>
        </div>
        <hr />
      </div>

      <div className="buttons">
        <div className="add-button">
          <FiUserPlus onClick={addServer} />
        </div>
        <div className="cal-reset-btns">
          <button
            className="cal-btn"
            type="submit"
            onClick={() => calcEarnedTips()}
          >
            Calculate
          </button>
          <RxReset onClick={restart} className="reset-btn" />
        </div>
      </div>

      {/* <div className="server-tip-info">
        <h2>Name</h2>
        <h2>Hours</h2>
        <h2>Earned Tips</h2>
      </div>
      <div className="server-tip-card">
        <input type="text" />
        <input type="number" />
        <h2>$40</h2>
      </div> */}
      <div className="border-for-servers">
        <div className="server-table-container">
          <table className="server-table">
            <tbody>
              <tr>
                <td>Name</td>
                <td>Hours</td>
                <td>Earned Tips</td>
              </tr>
              {serverList.map((item, index) => {
                return (
                  <tr key={index} className="server-card">
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={updateName(index)}
                        // onChange={(e) => handleInputChange()}
                      />
                    </td>
                    <td>
                      <input
                        className="hour-input"
                        type="number"
                        name="hours"
                        value={item.hours}
                        onChange={updateHours(index)}
                        // onChange={(e) => handleInputChange()}
                      />
                    </td>
                    <td className="earned-tips">
                      <h2>
                        $
                        {parseFloat(
                          Math.round(item.earnedTips * 100) / 100
                        ).toFixed(2)}
                      </h2>
                    </td>
                    <td>
                      <TiUserDelete
                        className="delete-btn"
                        onClick={() => deleteServer(index)}
                      />
                    </td>
                  </tr>
                );
              })}
              {/* <tr>
              <td>
                <input type="text" />
              </td>
              <td>
                <input
                  type="number"
                  value={serverHours}
                  onChange={onChangeServerHours}
                />
              </td>
              <td>
                <h2>${earnedTips}</h2>
              </td>
            </tr> */}
            </tbody>
          </table>
        </div>
        {/* <div>
        <button
          className="cal-btn"
          type="submit"
          onClick={() => calcEarnedTips()}
        >
          Calculate
        </button>
        <button className="cal-reset-btn" onClick={restart}>
          <GrPowerReset />
        </button>
      </div> */}
      </div>
    </div>
  );
};

export default TipPerServer;
