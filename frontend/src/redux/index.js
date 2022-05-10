import { combineReducers } from "redux"
import listTour from './reducers/listTour'
import typePlace from './reducers/typePlace'
import listTicket from './reducers/listTicket'

const rootReducer = combineReducers({
    listTour,
    typePlace,
    listTicket
});

export default rootReducer;