import { FirebaseOptions,  initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { signInWithEmailAndPassword ,sendPasswordResetEmail} from "firebase/auth";


class FirebaseAuthBackend {

  private firebase ;

  constructor(firebaseConfig: FirebaseOptions) {
      if (firebaseConfig) {
          // Initialize Firebase
          this.firebase = initializeApp(firebaseConfig);
          getAuth(this.firebase).onAuthStateChanged((user) => {
              if (user) {
                  sessionStorage.setItem('authUser', JSON.stringify(user));
                  console.log("authUser Loggeed");
              } else {
                  sessionStorage.removeItem('authUser');
                  console.log("fail Login");
              }
          });
      }
  }



  /**
   * Registers the user with given details
   */
  registerUser = (email: string, password: string) => {
      return new Promise((resolve, reject) => {
          createUserWithEmailAndPassword(getAuth(this.firebase) ,email, password).then((user: any) => {
              var user: any = getAuth(this.firebase).currentUser;
              resolve(user);
          }, (error) => {
              reject(this._handleError(error));
          });
      });
  }

  /**
   * Login user with given details
   */
  loginUser = (email: string, password: string) => {
      return new Promise((resolve, reject) => {
          signInWithEmailAndPassword(getAuth(this.firebase), email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            resolve(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(this._handleError(error));
          });
      });
  }

  /**
   * forget Password user with given details
   */
  forgetPassword = (email:string) => {
      return new Promise((resolve, reject) => {
          // tslint:disable-next-line: max-line-length
          sendPasswordResetEmail(getAuth(this.firebase),email,
            { url: window.location.protocol + '//' + window.location.host + '/login' }).then(() => {
              resolve(true);
          }).catch((error) => {
              reject(this._handleError(error));
          });
      });
  }

  /**
   * Logout the user
   */
  logout = () => {
      return new Promise((resolve, reject) => {
        getAuth(this.firebase).signOut().then(() => {
          console.log("authUser Logout");
              resolve(true);
          }).catch((error) => {
            console.log("authUser error");
              reject(this._handleError(error));
          });
      });
  }

  setLoggeedInUser = (user: any) => {
      sessionStorage.setItem('authUser', JSON.stringify(user));
  }


  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = () => {
      if (!sessionStorage.getItem('authUser')) {
          return null;
      }
      // Argument of type 'string | null' is not assignable to parameter of type 'string'. Type 'null' is not assignable to type 'string'
      return JSON.parse(sessionStorage.getItem('authUser') || '{}' ) ;
  }

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error: { message: any; }) {
      // tslint:disable-next-line: prefer-const
      var errorMessage = error.message;
      return errorMessage;
  }
}

// tslint:disable-next-line: variable-name
let _fireBaseBackend: FirebaseAuthBackend ;

/**
* Initilize the backend
* @param {*} config
*/
const initFirebaseBackend = (config: FirebaseOptions) => {
  if (!_fireBaseBackend) {
      _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

/**
* Returns the firebase backend
*/
const getFirebaseBackend = () => {
  return _fireBaseBackend;
};

export { initFirebaseBackend, getFirebaseBackend };



