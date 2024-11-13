import { createSlice } from "@reduxjs/toolkit";
import { useDependencies } from "@/utils/useDependencies";

const { userServices } = useDependencies();
let currentUser = userServices.getCurrentUserSession();
console.log(currentUser?.id);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: currentUser,
    isAuth: !!currentUser,
    isAdmin: currentUser?.userType == 4,
    isOwner: currentUser?.userType == 3,
    isTenant: currentUser?.userType == 2,
    isVisitor: currentUser?.userType == 1,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      console.log(action.payload);
    },
    logOut: (state) => {
      state.user = null;
      state.isAuth = false;
      currentUser = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
