import { createSlice } from "@reduxjs/toolkit";
import { useDepedencies } from "@/utils/useDepedencies";

const { userServices } = useDepedencies();
const currentUser = userServices.getCurrentUserSession();
console.log(currentUser?.id);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: currentUser,
    isAuth: !!currentUser,
    isAdmin: currentUser?.userType == 4,
    isOwner: currentUser?.userType == 3,
    isTenant: currentUser?.userType == 2,
    isisitor: currentUser?.userType == 1,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logOut: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
