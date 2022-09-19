import { createContext, useReducer } from "react";

export const SearchChat = createContext();

export const SearchChatProvider = ({ children }) => {

    const INITIAL_STATE = {
        isShowInput: false,
        isRemoveHighlights: true,
        searchedTerm: ''
    }

    const searchChatReducer = (state, action) => {
        switch (action.type) {
            case 'LET_USER_SEARCH':
                return {
                    isShowInput: true,
                    isRemoveHighlights: true,
                }
            case 'USER_ENTERED_VALUE':
                return {
                    isShowInput: true,
                    isRemoveHighlights: false,
                    searchTerm: action.payload.searchTerm  
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