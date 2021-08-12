const redux=require('redux')
const reduxLogger=require('redux-logger')
const applyMiddleware=redux.applyMiddleware
const logger=reduxLogger.createLogger()
const createStore=redux.createStore
const axios=require('axios')
const thunkMiddleware=require('redux-thunk').default




const FETCH_CUSTOMER_REQUEST='FETCH_CUSTOMER_REQUEST'
const FETCH_CUSTOMER_SUCCESS='FETCH_CUSTOMER_SUCCESS'
const FETCH_CUSTOMER_FAILURE='FETCH_CUSTOMER_FAILURE'

//State
const initialState={
    loading:false,
    customers:[],
    error:''
}

//Action Creator
function fetchCustomerRequest()
{
    return {
        type:FETCH_CUSTOMER_REQUEST
    }
}

//Action Creator
function fetchCustomerSuccess(customers)
{
    return {
        type:FETCH_CUSTOMER_SUCCESS,
        payload:customers
        
    }
}

//Action Creator
function fetchCustomerFailure(error)
{
    return {
        type:FETCH_CUSTOMER_FAILURE,
        payload:error
    }
}

const reducer=(state=initialState,action)=>
{
    switch(action.type)
    {
        case FETCH_CUSTOMER_REQUEST:
            return {
                ...state,
                loading:true
            }
        case FETCH_CUSTOMER_SUCCESS:
            return{
                ...state,
                loading:false,
                customers:action.payload
            }
        case FETCH_CUSTOMER_FAILURE:
            return{
                ...state,
                loading:false,
                customers:[],
                error:action.payload
            }
        default:
            return state
    }
}


const fetchCustomers=()=>
{
    return function(dispatch)
    {
        dispatch(fetchCustomerRequest())
        axios.get('http://localhost:8080/customer/allCustomers')
             .then(response=>
                {
                    const customers=response.data
                    dispatch(fetchCustomerSuccess(customers))
                })
            .catch(error=>
                {
                   dispatch(fetchCustomerFailure(error.message))
                })
    }
}

let store=createStore(reducer,applyMiddleware(logger,thunkMiddleware))
console.log('Initial State :',store.getState())
store.dispatch(fetchCustomers())
