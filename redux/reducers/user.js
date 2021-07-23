import * as actionType from "../constants/index";

const initialState = {
  currentUser: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_STATE_CHANGE:
      const user = action.payload;
      return {
        ...state,
        currentUser: user,
      };
  }
};
