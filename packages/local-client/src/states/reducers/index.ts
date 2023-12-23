import { combineReducers } from "redux";
import CellReducer from "./CellReducer";
import BundleReducer from "./BundleReducer";

const reducers = combineReducers({
    cells: CellReducer,
    bundles: BundleReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;