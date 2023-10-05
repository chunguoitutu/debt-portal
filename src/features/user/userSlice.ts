import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import _get from "lodash/get";
import Cookies from 'js-cookie';

interface UserInfoInterface {
  email: string;
  firstName: string;
  lastName: string;
  role: string[];
}
export interface UserState {
  accessToken: string;
  userInfo: UserInfoInterface | null;
  statusDrawer: boolean;
  userId: string;
}
const initialState: UserState = {
  accessToken: Cookies.get("access_token") || "",
  userInfo: {
    email: "",
    firstName: "",
    lastName: "",
    role: [],
  },
  statusDrawer: localStorage.getItem("showDrawer") === "1" ? true : false,
  userId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = _get(action, "payload", "");
      Cookies.set("access_token", _get(action, "payload", ""));
    },
    removeToken: (state) => {
      state.accessToken = "";
      Cookies.set("access_token", "");
      Cookies.set("userId", "");
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = _get(action, "payload", "");
      Cookies.set("userId", _get(action, "payload", ""));
    },
    setUserInfo: (state, action: PayloadAction<UserInfoInterface | null>) => {
      state.userInfo = _get(action, "payload");
    },
    setStatusDrawer: (state, action: PayloadAction<boolean>) => {
      state.statusDrawer = _get(action, "payload");
    },
  },
});

export const {
  setToken,
  removeToken,
  setUserInfo,
  setStatusDrawer,
  setUserId,
} = userSlice.actions;

export default userSlice.reducer;
