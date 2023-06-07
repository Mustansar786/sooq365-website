import { combineReducers } from 'redux';
import {User} from './user.reducer';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['filter', 'chat']
}

const reducers = combineReducers({
  user:User,
 
});



export type RootStateI = ReturnType<typeof reducers>

export default persistReducer(persistConfig, reducers);