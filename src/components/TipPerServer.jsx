import React, { useState } from 'react';
import '../App.css';

const TipPerServer = ({ totalServerHours, serverTotalTip }) => {
  const defaultServer = {
    name: '',
    hours: '',
    earnedTips: 0,
  };

  const [serverList, setServerList] = useState([defaultServer]);

  const updateHours = (index) => (e) => {
    e.preventDefault();
    let arr = [...serverList];
    arr[index]['hours'] = e.target.valueAsNumber;
    setServerList(arr);
  };

  const updateName = (index) => (e) => {
    e.preventDefault();
    let arr = [...serverList];
    arr[index]['name'] = e.target.value;
    setServerList(arr);
  };

  const addServer = (e) => {
    e.preventDefault();
    setServerList([...serverList, defaultServer]);
    console.log(serverList, 'hello');
  };

  const deleteServer = (ind) => {
    const newArray = serverList.filter((item, index) => index !== ind);
    setServerList(newArray);
    console.log(ind, 'ind');
    // const newArray = serverList.filter((item) => item.id !== id);
    // setServerList(newArray);
    // console.log('amc');
  };

  return (
    <div>
      <div className="add-button">
        <button onClick={addServer}>+</button>
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
                      value={item.name}
                      onChange={updateName(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.hours}
                      onChange={updateHours(index)}
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
    </div>
  );
};

export default TipPerServer;
