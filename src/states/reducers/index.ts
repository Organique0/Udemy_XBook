import { combineReducers } from "redux";
import Cellreducer from "./CellReducer";

const reducers = combineReducers({
    cells: Cellreducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;