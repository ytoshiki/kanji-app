import React, {useReducer, createContext} from "react";

interface AuthState {
  user: null | string;
}

let initialUser: string | null = "";
if (typeof window !== 'undefined') {
  initialUser = localStorage.getItem("kanji-gql-token");
}

const initialState: AuthState = {
  user: initialUser
}


interface IAuthContext {
  user: null | string;
  login: (userData: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: (userData: string) => {},
  logout: () => {}
})



type ACTIONTYPE =
    | { type: "LOGIN", payload: string}
    | { type: "LOGOUT" };


function authReducer(state: AuthState, action: ACTIONTYPE) {
  switch(action.type) {
    case "LOGIN": 
      return {
        ...state,
        user: action.payload
      }
    case "LOGOUT": 
      return {
        ...state, 
        user: null
      }
    default: 
      return state
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (token: string) => {
    localStorage.setItem("kanji-gql-token", token);
    dispatch({
      type: "LOGIN",
      payload: token
    })
  }

  const logout = () => {
    localStorage.removeItem("kanji-gql-token");
    dispatch({
      type: "LOGOUT"
    })
  }

  return <AuthContext.Provider 
    value={{user: state.user, login, logout}}
    {...props}
  />
}

export { AuthContext, AuthProvider };