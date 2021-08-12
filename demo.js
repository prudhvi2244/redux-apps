const redux=require('redux')
const reduxLogger=require('redux-logger')

const createStore=redux.createStore
const applyMiddleware=redux.applyMiddleware
const logger=reduxLogger.createLogger()


const BUY_BOOKS='BUY_BOOKS'
const BUY_PENS='BUY_PENS'

//Action Creator
function buyBooks()
{
    return{
        type:BUY_BOOKS
    }
}


//Action Creator
function buyPens()
{
    return{
        type:BUY_PENS
    }
}

const initialState={
    numOfBooks:50,
    numOfPens:30
}

const reducer=(state=initialState,action)=>
{
 switch(action.type)
 {
     case BUY_BOOKS:
         return{
             ...state,
             numOfBooks:state.numOfBooks-1
         }
    case BUY_PENS:
        return{
            ...state,
            numOfPens:state.numOfPens-1
        }
    default:
        return state
 }
}

const store=createStore(reducer,applyMiddleware(logger))
console.log('Initial State :',store.getState())
//store.subscribe(()=>console.log('Updated State :',store.getState()))

store.dispatch(buyBooks())
store.dispatch(buyBooks())
store.dispatch(buyPens())
store.dispatch(buyPens())
store.dispatch(buyPens())
