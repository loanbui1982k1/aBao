import {
  SET_USERNAME,
  SET_EMAIL,
  SET_IDUSER,
  SET_PROFILE_PHOTO_PATH
} from './actions';

const initialState = {
  idUser: ''
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PROFILE_PHOTO_PATH:
      return { ...state, profilePhotoPath: action.payload };
    case SET_IDUSER:
      return { ...state, idUser: action.payload };
    default:
      return state;
  }
}

export default taskReducer;
