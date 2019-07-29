/* eslint-disable react/no-unused-state */
import PropTypes from 'prop-types';
import * as React from 'react';
import firebaseHelper from '../config/firebase/firebaseHelper';
import MyContext from './MyContext';

const getAllPeople = () => firebaseHelper.database
  .ref('people')
  .once('value');

const getActivePeople = () => firebaseHelper.database
  .ref('people')
  .orderByChild('active')
  // .equalTo(true)
  .once('value');

const getAllBuildings = () => firebaseHelper.database
  .ref('buildings')
  .once('value');

const getActiveBuildings = () => firebaseHelper.database
  .ref('buildings')
  .orderByChild('active')
  // .equalTo(true)
  .once('value');

class GlobalProvider extends React.Component {
  constructor(props) {
    super(props);

    const initialState = {
      currentUser: null,
      errorMessage: null,
    };

    const state = {
      ...initialState,

      setCurrentUser: user => this.setCurrentUser(user),
      getUser: () => this.getUser(),
      isLoggedIn: () => this.isLoggedIn(),
      logout: () => this.logout(),

      savePerson: newPerson => this.savePerson(newPerson),
      getAllPeople: () => getAllPeople(),
      getActivePeople: () => getActivePeople(),

      saveBuilding: newBuilding => this.saveBuilding(newBuilding),
      getAllBuildings: () => getAllBuildings(),
      getActiveBuildings: () => getActiveBuildings(),
    };
    firebaseHelper.auth.onAuthStateChanged((user) => {
      if (user) {
        state.currentUser = user;
      }
    });
    this.state = state;
  }

  componentDidMount() {
    firebaseHelper.auth.onAuthStateChanged(user => this.setCurrentUser(user));
  }

  setCurrentUser(user) {
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  getUser() {
    const { currentUser } = this.state;
    return currentUser;
  }

  savePerson(newPerson) {
    const person = { ...newPerson };
    this.checkForUser().then(() => {
      const { email, password, name } = person;
      delete person.password;
      firebaseHelper.createUsersAuth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebaseHelper.database.ref(`people/${person.id}`).set(person);
          const user = firebaseHelper.createUsersAuth.currentUser;
          user.updateProfile({
            displayName: name,
          }).catch((error) => {
            const errorMessage = error.message;
            this.setState({ errorMessage });
          });
        })
        .catch((error) => {
          const errorMessage = error.message
          this.setState({ errorMessage });
        });
    });
  }

  saveBuilding(newBuilding) {
    // console.log("SAVE", newBuilding);
    const building = { ...newBuilding };
    this.checkForUser().then(() => {
      const ref = firebaseHelper.database.ref('buildings');
      const newRef = ref.push();
      building.id = newRef.key;
      ref.push(building);
    });
  }

  checkForUser() {
    return new Promise((resolve) => {
      firebaseHelper.auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            currentUser: user,
          }, () => {
            resolve();
          });
        }/* else {
          console.log('Not logged in :(');
        } */
      });
    });
  }

  isLoggedIn() {
    const { currentUser } = this.state;
    if (!currentUser) {
      return false;
    }
    return true;
  }

  logout() {
    firebaseHelper.logout().then(() => {
      this.setState({ currentUser: null });
    });
  }

  // updateMyself() {
  // var user = firebase.auth().currentUser;
  // user.updateProfile({
  //   displayName: "Jane Q. User",
  //   photoURL: "https://example.com/jane-q-user/profile.jpg"
  // }).then(function() {
  //   // Update successful.
  // }).catch(function(error) {
  //   // An error happened.
  // });
  // }

  render() {
    const { children } = this.props;
    return (
      <MyContext.Provider value={this.state}>
        {children}
      </MyContext.Provider>
    );
  }
}

GlobalProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
export default GlobalProvider;
