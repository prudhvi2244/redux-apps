const redux=require('redux')
const creatStore=redux.createStore

const BOOK_TICKET='BOOK_TICKET'

//Action Creator
function bookTicket()
{
    return {
        type:BOOK_TICKET
    }
}

const inititalState={
    numOfTickets:30
}

const reducer=(state=inititalState,action)=>
{
 switch(action.type)
 {
     case BOOK_TICKET:
         return{
             numOfTickets:state.numOfTickets-1
         }
    default:
        return state
 }
}

let store=creatStore(reducer)
console.log('Initial State :',store.getState())
store.subscribe(()=>console.log(store.getState()))
store.dispatch(bookTicket())
store.dispatch(bookTicket())
store.dispatch(bookTicket())