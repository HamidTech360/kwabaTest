import React, {useContext, useState} from 'react';
import axios from 'axios'
import UserContext from '../../context/userContext';
import {apiUrl} from '../../config/config.json'
import numeral from 'numeral'
import { CircularProgress } from '@material-ui/core';



import './css/style.css'

const PreApproval = ({handleChange}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)

    const months = [1,2,3,4,5,6,7,8,9,10,11,12]
    const userData = useContext(UserContext)

    let noOfMonths = userData.plan.split(" ")[0]
    noOfMonths = parseInt(noOfMonths)
    
    const interest = 0.02 * userData.rentRequest
    const monthlyPayment = userData.rentRequest/noOfMonths + interest

   const handleSubmit = async ()=>{
        setLoading(true)
        try{
            const response = await axios.post(`${apiUrl}/rent_request`, userData)
            console.log(response.data);
            setLoading(false)
            setSuccessMsg('Your request has been posted successfully')
            setError( null)
        }catch(err){
            console.log(err.response?.data);
            setLoading(false)
            setError(err.response?.data)
            setSuccessMsg(null)
        }
   }
   
    console.log(userData);
    return ( 
        <div className="preApproval">
             <div className="payment-request-form">
            <div className="page-header">My Rent</div>
            <div className="box" id='preApproved-box'>
                <div className="form-header">Payment Breakdown</div>

                
                <div className="form-group">
                    <label htmlFor="rent request">Rent request amount</label>
                    <div className="preApproval-amount-box">
                        <div className="preApproval-amount-label">Amount</div>
                        <input 
                            type="number"
                            className="form-control preApproval-amount"
                            name="rentRequest"
                            value={ userData.rentRequest}
                            onChange={(e)=>handleChange(e)} 
                         /> 
                        
                    </div>
                   
                </div>

             
                <div className="form-group">
                    <label htmlFor="rent request">Monthly payment plan</label>
                    <select name="plan" value={userData.plan} onChange={(e)=>handleChange(e)} className="form-control" style={{fontSize:'14px'}}>
                       {months.map((item, i)=>
                            <option value={`${item} Months`} key={i} >{item} Month</option>
                        )}
                    </select>
                </div>
                
                <label htmlFor="rent request">Payment Option</label>
                <div className="payment-option">
                    <div className="payment-option-item">
                        <span className="payment-option-label">Pre-approved amount</span>
                        <span className="pull-right payment-option-price">&#8358;{numeral(userData.rentRequest).format('0,0')}</span>
                    </div>
                    <div className="payment-option-item">
                        <span className="payment-option-label">Monthly Payment</span>
                        <span className="pull-right payment-option-price">&#8358;{numeral(monthlyPayment).format('0,0') }</span>
                    </div>
                    <div className="payment-option-item">
                        <span className="payment-option-label">Tenor</span>
                        <span className="pull-right payment-option-price"> {userData.plan} </span>
                    </div>
                </div>
                
                
                {error? <div className="alert alert-danger" style={{marginTop:'15px'}}> {error} </div>:''}
                {successMsg? <div className="alert alert-success" style={{marginTop:'15px'}}> {successMsg} </div>:''}

                <button className="btn btn-accept" onClick={()=>handleSubmit()} >
                     {loading? <CircularProgress size={27}/>:'ACCEPT'}
                </button>

            </div>
            </div>
        </div>
     );
}
 
export default PreApproval;