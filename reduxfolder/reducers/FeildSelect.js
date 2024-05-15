const initialState = {
  selectedImages: [],
  favoriteImageIndex: 0,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_IMAGES':
      return {
        ...state,
        selectedImages: action.payload,
      };
    case 'SET_FAVORITE_IMAGE_INDEX':
      return {
        ...state,
        favoriteImageIndex: action.payload,
      };
    default:
      return state;
  }
};

export const setSelectedImages = (images) => ({
  type: 'SET_SELECTED_IMAGES',
  payload: images,
});

export const setFavoriteImageIndex = (index) => ({
  type: 'SET_FAVORITE_IMAGE_INDEX',
  payload: index,
});

export default imageReducer;
