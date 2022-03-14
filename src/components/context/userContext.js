import React,{useReducer} from 'react';

export const userContext = React.createContext({});

const userState = {
    user: null,
};

function reducer(state,action){
    switch(action.type){
        case "LOGIN":
            return{
                user:{
                    email:  action.email,
                    isAuth: true,
                    userName: action.userName,
                },
            };
        case "LOGOUT":
            return{
                user: null,
            };
        default:
            return state;
    };
};

function UserContextComponent({children}) {
    const [state,dispacth] = useReducer(reducer,userState);
    return (
        <userContext.Provider value={{state,dispacth}}>
            {children}
        </userContext.Provider>
    );
}

export default UserContextComponent;