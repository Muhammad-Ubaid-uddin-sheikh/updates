export const addSoccer = (soccerData) => ({
    type: 'ADD_SOCCER',
    payload: soccerData,
  });
  export const deleteSoccer = (index) => ({
    type: 'DELETE_SOCCER',
    payload: index,
  });
  export const clearCourtId = () => ({
    type: 'CLEAR_COURT_ID',
  });
  export const clearCourClear = () => ({
    type: 'COURT_DATA_CLEAR',
  });