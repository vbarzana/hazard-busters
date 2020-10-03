import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectSignUpError = createSelector([selectUser], user =>
  user.signUpError
    ? user.signUpError.message || user.signUpError.toString()
    : ''
);

export const selectError = createSelector([selectUser], user =>
  user.error ? user.error.message || user.error.toString() : ''
);
