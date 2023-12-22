import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../states/reducers/index.ts";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;