const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_USERS':
          return { ...state, loading: true };
        case 'GET_USER':
          return { ...state, loading: true };
        case 'GET_PHOTOS':
          return { ...state, photos_loading: true };
        case 'GET_ALBUMS':
          return { ...state, loading: true };
        case 'GET_POSTS':
          return { ...state, loading: true };
        case 'GET_COMMENTS':
          return { ...state, loading: true };
        case 'GET_TODOS':
          return { ...state, loading: true };

        case 'SET_USERS':
          return { ...state, loading: false , users: action.users };
        case 'SET_USER':
          return { ...state, loading: false , user: action.user };
        case 'SET_PHOTOS':
          return {...state, photos_loading: false , photos: action.photos};
        case 'SET_ALBUMS':
          return {...state, loading: false , albums: action.albums};
        case 'SET_POSTS':
          return {...state, loading: false , posts: action.posts};
        case 'SET_COMMENTS':
          return {...state, loading: false , comments: action.comments};
        case 'SET_TODOS':
          return {...state, loading: false , todos: action.todos};
        default:
          return state;
     }
  };
  export default reducer;