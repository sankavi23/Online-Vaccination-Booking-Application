const vaccineSearchReducer = (
  state = {
    data: [],
    loading: false,
    error: false,
  },
  action: { type: any; data: any }
) => {
  switch (action.type) {
    case "GET_VACCINE_SEARCH_LOADING":
      return { ...state, loading: true, error: false };
    case "GET_VACCINE_SEARCH_SUCCESS":
      return { ...state, data: action.data, loading: false, error: false };
    case "GET_VACCINE_SEARCH_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default vaccineSearchReducer;
