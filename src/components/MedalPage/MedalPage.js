import React, { Component } from 'react';
import classes from './MedalPage.css';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDi5qj9me2jKYb1HNRW0DftPx3QfIgkURI",
    authDomain: "olympics-ce7c4.firebaseapp.com",
    projectId: "olympics-ce7c4",
    storageBucket: "olympics-ce7c4.appspot.com",
    messagingSenderId: "503675043149",
    appId: "1:503675043149:web:eeab591682846258580b04",
    measurementId: "G-XL32WCRM66"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class MedalPage extends Component {
    state = {
        data: [
            {
                country: 'India',
                gold: 0, 
                silver: 0,
                bronze: 0
            },
            {
                country: 'USA',
                gold: 0, 
                silver: 0,
                bronze: 0
            },
            // {
            //     country: 'Australia',
            //     gold: 0, 
            //     silver: 0,
            //     bronze: 0
            // }
        ]
    }

    componentDidMount(){
        this.fetchFromDatabase();
    }


    fetchFromDatabase = async () => {
        const data = [];
        for (let i=0;i<this.state.data.length;i++) {
            const obj = this.state.data[i];
            const docRef = doc(db, 'medalCount', obj.country);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                data.push({country: obj.country, gold: docSnap.data().gold, silver: docSnap.data().silver, bronze: docSnap.data().bronze});
            } else {
                console.log("No such document!");
            }
        }
        this.setState({ data: data });
    };

    updateDatabase = async (country) => {
        const docRef = doc(db, 'medalCount', country);
        const docSnap = await getDoc(docRef);
        await setDoc(doc(db, "medalCount", country), {
            silver: 2,
            gold: 2,
            bronze: 2
        });
        this.fetchFromDatabase();
    };

    render() {
        const tallyComponent = this.state.data.map((obj, idx) => {
            return (
                <div className={classes.TallyRow} key={idx}>
                    <div className={classes.Name}>{obj.country}</div>
                    <div className={classes.Gold}>{obj.gold}</div>
                    <div className={classes.Silver}>{obj.silver}</div>
                    <div className={classes.Bronze}>{obj.bronze}</div>
                    <button onClick={() => this.updateDatabase(obj.country)}>Update Gold</button>
                </div>
            )
        });
        return (
            <div>
                <div className={classes.TallyHeading}>Medal Tally</div>
                <div className={classes.TallyComponent}>
                    {tallyComponent}
                </div>
            </div>
        )
    }
};

export default MedalPage;