import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAlicorn,
  faAt,
  faBadgeDollar,
  faDrawSquare,
  faEnvelopeOpenDollar,
  faEye,
  faEyeSlash,
  faGhost,
  faHandHoldingUsd,
  faIdCard,
  faInfoSquare,
  faMapMarkedAlt,
  faMeteor as farMeteor,
  faMoneyCheckEditAlt,
  faPaperPlane,
  faPencilAlt,
  faPiggyBank,
  faPlusHexagon,
  faRepeat,
  faRocket,
  faSackDollar,
  faSave,
  faSignInAlt,
  faSignOutAlt,
  faSpinner,
  faTrashAlt,
  faUndo,
  faUnlockAlt,
  faUser,
  faUserAstronaut,
  faWarehouse,
  faUniversity,
} from '@fortawesome/pro-regular-svg-icons';
import { faMeteor as fasMeteor } from '@fortawesome/pro-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import FirebaseContext from './components/firebase/context';
import Firebase from './components/firebase/firebase';
import './index.css';
import * as serviceWorker from './serviceWorker';

library.add(
  faSignInAlt, faSignOutAlt, faUserAstronaut, faRocket,
  faEye, faEyeSlash, faSave, faPlusHexagon, faPaperPlane,
  farMeteor, fasMeteor, faAlicorn, faWarehouse, faSpinner,
  faDrawSquare, faTrashAlt, faGhost, faRepeat, faEnvelopeOpenDollar,
  faPencilAlt, faMoneyCheckEditAlt, faHandHoldingUsd, faBadgeDollar,
  faUndo, faSackDollar, faUnlockAlt, faAt, faIdCard, faUser,
  faMapMarkedAlt, faInfoSquare, faPiggyBank, faUniversity,
);

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
