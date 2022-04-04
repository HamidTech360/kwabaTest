import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/userContext'
import joi from 'joi-browser'
import toastr from 'toastr'
import './css/style.css'

const PaymentRequest = ({handleChange, handleStatusChange}) => {
    const navigate = useNavigate()
    const userData = useContext(UserContext)
 
    const [accomodationStatus, setAccomodationStatus] =useState(
     [
        {label:'Looking to renew my rent',selected:true},
        {label:'Want to pay for a new place'},
        { label:"I'm still searching" }
    ])



    const [validationErrors, setValidationErrors]= useState(null)
    const months = [1,2,3,4,5,6,7,8,9,10,11,12]

    const SelectAccomodationStatus = (i, option)=>{
        const clone = [...accomodationStatus]
        clone.map(item=>item.selected=false)
        clone[i].selected= true
        setAccomodationStatus(clone)
        
        handleStatusChange(option)
       
    }

 
    const Validate = ()=>{
        const schema = {
            rentRequest:joi.string().required(),
            plan:joi.string().required(),
            income:joi.string().required(),
            status:joi.required()
        }

        try{
            const {error} = joi.validate(userData, schema, {abortEarly:false})
            if(!error) return null


            return error.details[0].message
        }catch(error){
            console.log(error);
        }
    }

    const handleSubmit = ()=>{
        toastr.error('error')
        const error = Validate()
        if(!error){
            console.log('Error free');
            setValidationErrors(null)
            //console.log(data);
            navigate('/preapproval')
        }
        setValidationErrors(error)
       

        console.log(error);
    }

   
    return ( 
        
        <div className="payment-request">
            <div className="payment-request-form">
            <div className="page-header">My Rent</div>
            <div className="box">
                <div className="form-header">Payment Options</div>
               
                <div className="form-group">
                    <label htmlFor="status">What's your accomodation status</label>
                   
                    {accomodationStatus.map((item, i)=>
                    <input 
                          key={i}
                          type="text" 
                          className={`form-control select-input text-center ${item.selected?'selected':''}` }
                          readOnly 
                          placeholder={item.label} 
                          onClick={()=>SelectAccomodationStatus(i, item)}
                          
                      />
                    )}
                  

                </div>

                <div className="form-group">
                    <label htmlFor="rent request">How much is your rent request amount</label>
                    <input 
                        type="number"
                        placeholder="Amount"
                        className="form-control"
                        name="rentRequest"
                        onChange={(e)=>handleChange(e)} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="montly income">How much do you earn monthly</label>
                    <input 
                        type="number"
                        placeholder="Amount"
                        className="form-control"
                        name="income"
                        onChange={(e)=>handleChange(e)} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rent request">Choose a monthly payment plan</label>
                    <select name="plan" onChange={(e)=>handleChange(e)} className="form-control" style={{fontSize:'14px'}}>
                       {months.map((item, i)=>
                            <option value={`${item} Months`} key={i} >{item} Month</option>
                        )}
                    </select>
                </div>

                {validationErrors? <div className="alert alert-danger"> {validationErrors} </div>:''}

                <button className="btn btn-next" onClick={()=>handleSubmit()}>NEXT</button>

            </div>
            </div>
        </div>
      
     );
}
 
export default PaymentRequest;