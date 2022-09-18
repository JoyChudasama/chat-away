import { createContext, useContext, useReducer } from "react";
// import { AuthContext } from "./AuthContext";


export const SearchChat = createContext();

export const SearchChatProvider = ({ children }) => {

    // const { currentUser } = useContext(AuthContext);

    const INITIAL_STATE = {
        isShowInput: false,
        isRemoveHighlights: true,
        // searchedTerm: ''
    }


    const searchChatReducer = (state, action) => {
        switch (action.type) {
            case 'LET_USER_SEARCH':
                return {
                    isShowInput: true,
                    isRemoveHighlights: false,
                    // searchedTerm: action.payload
                }
            case 'RESET_SEARCH_CHAT':
                return INITIAL_STATE;
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(searchChatReducer, INITIAL_STATE);

    return (
        <SearchChat.Provider value={{ searchChatContext: state, dispatch }} >
            {children}
        </SearchChat.Provider>
    )
};