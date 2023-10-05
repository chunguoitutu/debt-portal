import * as React from "react";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./features/user/userSlice";
import { RootState } from "./app/store";

function App() {
  const dispatch = useDispatch();
  dispatch(setToken("kha"));
  const token = useSelector((state: RootState) => state.user.accessToken);

  return <div className="app text-[20px] text-blue-400">{token}</div>;
}

export default App;
