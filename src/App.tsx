import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./features/user/userSlice";
import { RootState } from "./app/store";
import AppRoutes from "./router";

function App() {
  const dispatch = useDispatch();
  dispatch(setToken("kha"));
  const token = useSelector((state: RootState) => state.user.accessToken);

  return  <AppRoutes />
}

export default App;
