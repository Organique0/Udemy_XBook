import { legacy_createStore as createStore, applyMiddleware, Middleware, Action, Dispatch } from "redux";
import { thunk } from "redux-thunk";
import reducers, { RootState } from "./reducers";
import { persistMiddleware } from "./middlewares/persist-middleware";

// Define the type of the middleware to make TS happy
type CustomMiddleware = Middleware<object, RootState, Dispatch<Action>>;

export const store = createStore(reducers, {}, applyMiddleware(thunk as CustomMiddleware, persistMiddleware as CustomMiddleware));


