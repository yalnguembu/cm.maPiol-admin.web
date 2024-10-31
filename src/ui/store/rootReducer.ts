import layout from "./layout";
import auth from "./api/auth/authSlice";
import { UserView } from "@/primary/UserView";

type AuthState = {
  user: UserView | undefined;
  isAuth: boolean;
  isAdmin: boolean;
  isOwner: boolean;
  isTenant: boolean;
};

export type State = { 
  layout: unknown,
  auth: AuthState
}

const rootReducer = {
  layout,
  auth,
};
export default rootReducer;
