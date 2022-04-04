import React, {useState} from 'react'
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import PaymentRequest from './pages/paymentRequest/paymentRequest';
import PreApproval from './pages/preApproval/preApproval';

import UserContext from './context/userContext';


//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

function App() {

  const [data, setData] = useState({
    status:'Looking to renew my rent',
    rentRequest:'',
    plan:'1',
    income:''
  })

  const handleChange = (e)=>{
    const clone= {...data}
    clone[e.currentTarget.name] = e.currentTarget.value
    setData(clone)
    //console.log(data);
  }

  const handleStatusChange = (option)=>{
      const cloneData = {...data}
      cloneData['status']= option
      setData(cloneData)
      //console.log(option);
  }

  return (
      <BrowserRouter>
        <UserContext.Provider value={data}>
          <Routes>
            <Route path="/" element={<PaymentRequest 
                                        handleChange={handleChange} 
                                        handleStatusChange={handleStatusChange} />}/>

            <Route path="/preapproval" element={<PreApproval handleChange={handleChange}/>}/>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
