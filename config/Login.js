import React, { Component } from 'react';
import classes from './Login.css';
import loginIcon from '../../resources/login-icon.png';
import firebase from '../../utils/firebase';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    provider;
    componentDidMount() {
        this.onAuthStateChanged();
    }

    redirectToUserScreen = (user) => {
        this.props.history.push({
            pathname: "/user/"+user.uid,
            state: {
                email: user.email,
                userName: user.displayName,
                photo: user.photoURL
            }
        });
    }

    signIn = () => {
        firebase.auth().signInWithPopup(this.provider)
                .then(result => {
                    const user = result.user;
                    console.log("SignIn successful");

                    this.redirectToUserScreen(user);
                })
                .catch(error => {
                    console.log(error);
                });    
    }

    onAuthStateChanged = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.redirectToUserScreen(user);
            }
            else {
                this.provider = new firebase.auth.GoogleAuthProvider();
            }
          });
    }
    
    render(){
        return(
            <div className={classes.LoginButton} onClick={this.signIn}>
                <img src={loginIcon} alt="login-icon" className={classes.LoginImage} />
                <p className={classes.LoginText}>Continue with Google</p>
            </div>
        )
    }
};

export default withRouter(Login);