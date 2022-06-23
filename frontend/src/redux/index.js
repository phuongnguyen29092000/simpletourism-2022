import { combineReducers } from "redux"
import listTour from './reducers/listTour'
import typePlace from './reducers/typePlace'
import listTicket from './reducers/listTicket'
import feedback from './reducers/feedback'
import user from './reducers/user'
import news from './reducers/news'
import statistic from "./reducers/statistic"
import activeUrl from "./reducers/activeUrl"

const rootReducer = combineReducers({
    listTour,
    typePlace,
    listTicket,
    user,
    feedback,
    news,
    statistic,
    activeUrl
});

export default rootReducer;