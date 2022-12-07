export const SET_IDUSER = 'SET_IDUSER';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PROFILE_PHOTO_PATH = 'SET_PROFILE_PHOTO_PATH';


export const setUsernameRedux = (username) => (dispatch) => {
  dispatch({
    type: SET_USERNAME,
    payload: username,
  });
};
export const setIdUserRedux = (idUser) => (dispatch) => {
  dispatch({
    type: SET_IDUSER,
    payload: idUser,
  });
};

export const setEmailRedux = (email) => (dispatch) => {
  dispatch({
    type: SET_EMAIL,
    payload: email,
  });
};

export const setProfilePhotoPathRedux = (profilePhotoPath) => (dispatch) => {
  dispatch({
    type: SET_PROFILE_PHOTO_PATH,
    payload: profilePhotoPath,
  });
};

