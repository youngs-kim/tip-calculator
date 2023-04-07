import React, { useState, useEffect } from 'react';
import '../App.css';

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
    arr[index]['hours'] = e.target.valueAsNumber;
    setServerList(arr);
    setTotalHoursLeft(totalServerHours - sumTotalHours(arr));
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
    // const newArray = serverList.filter((item) => item.id !== id);
    // setServerList(newArray);
    // console.log('amc');
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
    });
    setServerList(newArray);
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
      <div className="add-button">
        <button onClick={addServer}>+</button>
      </div>

      <h5>Tip Per Hour: ${tipPerHour}</h5>
      <h5>Total Hours left: {totalHoursLeft}</h5>
      <h5>Total Tip left: ${totalTipLeft}</h5>

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
                <tr key={index}>
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
                      type="number"
                      name="hours"
                      value={item.hours}
                      onChange={updateHours(index)}
                      // onChange={(e) => handleInputChange()}
                    />
                  </td>
                  <td>
                    <h2>${item.earnedTips}</h2>
                    <div>
                      <button onClick={() => deleteServer(index)}>
                        Delete
                      </button>
                    </div>
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
      <div>
        <button type="submit" onClick={() => calcEarnedTips()}>
          Calculate
        </button>
      </div>
    </div>
  );
};

export default TipPerServer;
