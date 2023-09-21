import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ClientData {
    generalInfo: {
      name: string;
      headquartersAddress: string;
      industry: string;
    };
    pointOfContact: {
      name: string;
      email: string;
    };
  }

export default function ClientView() {
  const [generalInfo, setGeneralInfo] = useState({
    name: '',
    headquartersAddress: '',
    industry: '',
  });

  const [pointOfContact, setPointOfContact] = useState({
    name: '',
    email: '',
  });
  const [show, setShow] = useState(false);

  const [dataHistory, setDataHistory] = useState([]);


  useEffect(() => {
    const savedDataHistory = JSON.parse(localStorage.getItem('clientDataHistory') || '[]');
    setDataHistory(savedDataHistory);
  }, []);

  function showHandler(){
    if (show === false) {
      setShow(true);
    } else {      
      setShow(false);
    }
  }

  const saveData = () => {
    const newData : ClientData = {
      generalInfo,
      pointOfContact,
    };

    // Update the data history with the new data
    const updatedDataHistory = [...dataHistory, newData];

    // Save the updated data history to local storage
    localStorage.setItem('clientDataHistory', JSON.stringify(updatedDataHistory));

    // Clear the input fields
    setGeneralInfo({
      name: '',
      headquartersAddress: '',
      industry: '',
    });
    setPointOfContact({
      name: '',
      email: '',
    });
  };

  function DisplayDataHistory() {
    return dataHistory.map((data: ClientData, index: number) => {
      return (
        <div key={index}>
            <br />
            <h1>General Information: {index}</h1>
            <h2>Name: {data.generalInfo.name}</h2>
            <h2>Headquarters Address: {data.generalInfo.headquartersAddress}</h2>
            <h2>Industry: {data.generalInfo.industry}</h2>
            <h1>Point of Contact: {index}</h1>
            <h2>Name: {data.pointOfContact.name}</h2>
            <h2>Email: {data.pointOfContact.email}</h2>
        </div>
      );
    });
  }

  return (
    <div className='client-view'>
      <h1>Client View</h1>
      <Link to="/" className='links'>Back to Home</Link>
      <div className="General Information">
        <h1>General Information</h1>
        <br />
        <h2>Name</h2>
        <input
          type="text"
          value={generalInfo.name}
          onChange={(e) => setGeneralInfo({ ...generalInfo, name: e.target.value })}
        />
        <h2>Headquarters Address</h2>
        <input
          type="text"
          value={generalInfo.headquartersAddress}
          onChange={(e) =>
            setGeneralInfo({ ...generalInfo, headquartersAddress: e.target.value })
          }
        />
        <h2>Industry</h2>
        <input
          type="text"
          value={generalInfo.industry}
          onChange={(e) => setGeneralInfo({ ...generalInfo, industry: e.target.value })}
        />
      </div>
      <br />
      <div className="Point of contact">
        <h1>Point of Contact</h1>
        <br />
        <h2>Name</h2>
        <input
          type="text"
          value={pointOfContact.name}
          onChange={(e) => setPointOfContact({ ...pointOfContact, name: e.target.value })}
        />
        <h2>Email</h2>
        <input
          type="text"
          value={pointOfContact.email}
          onChange={(e) => setPointOfContact({ ...pointOfContact, email: e.target.value })}
        />
      </div>
      <button className="glow-on-hover" onClick={saveData} type="button">
        Save
      </button>
      <br />
      <div>
        <button className='glow-on-hover' onClick={showHandler} type='button'>Local Storage</button>
        {show ? (<DisplayDataHistory />) : null}
      </div>
    </div>
  );
}
