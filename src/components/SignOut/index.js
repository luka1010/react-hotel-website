import React from 'react';
 
import { withFirebase } from '../Firebase';
 
const SignOutButton = ({ firebase }) => (
  <button className="signout-button" type="button" onClick={firebase.doSignOut}>
    SIGN OUT
  </button>
);
 
export default withFirebase(SignOutButton);