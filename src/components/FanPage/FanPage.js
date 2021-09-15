import React, { Component } from 'react';
import classes from './FanPage.css';
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
let intervalId;

class FanPage extends Component {

    state = {
        data: [
            {
                country: "India",
                count: 0
            },
            {
                country: "USA",
                count: 0
            },
            {
                country: "Australia",
                count: 0
            }
        ],

        dbData: [
            {
                country: "India",
                count: 0
            },
            {
                country: "USA",
                count: 0
            },
            {
                country: "Australia",
                count: 0
            }
        ]
    };

    componentDidMount() {
        this.fetchFromDatabase();
        intervalId = setInterval(() => this.fetchFromDatabase(), 10000);
    }

    componentWillUnmount() {
        clearInterval(intervalId);
    }

    updateDatabase = async (country, count) => {
        const docRef = doc(db, 'cheerCount', country);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await setDoc(doc(db, "cheerCount", country), {
                count: docSnap.data().count+1
            });
        } else {
            await setDoc(doc(db, "cheerCount", country), {
                count: count
            });
        }
    };

    fetchFromDatabase = async () => {
        const dbData = [];
        for (let i=0;i<this.state.data.length;i++) {
            const obj = this.state.data[i];
            const docRef = doc(db, 'cheerCount', obj.country);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                dbData.push({country: obj.country, count: docSnap.data().count});
            } else {
                console.log("No such document!");
            }
        }
        this.setState({ dbData: dbData });
    };

    cheerClickHander = (idx) => {
        const data = [...this.state.data];

        data[idx].count++;

        this.setState({ data: data }, () => {
            this.updateDatabase(data[idx].country, data[idx].count);
        });
    };

    render() {
        const cheerComponent = this.state.data.map((obj, idx) => {
            return (
                <div className={classes.Card} key={idx}>
                    <div className={classes.Name}>{obj.country}</div>
                    <div className={classes.Name}>{obj.count}</div>
                    <button className={classes.Button} onClick={() => this.cheerClickHander(idx)}>
                        Cheer
                    </button>
                </div>
            );
        });

        const tallyComponent = this.state.dbData.map((obj, idx) => {
            return (
                <div className={classes.TallyRow} key={idx}>
                    <div className={classes.Name}>{obj.country}</div>
                    <div className={classes.Name}>{obj.count}</div>
                </div>
            )
        });

        return (
            <div>
                <div className={classes.Heading}>FAN PAGE</div>
                <div className={classes.CheerComponent}>
                    {cheerComponent}
                </div>
                <div className={classes.TallyHeading}>Cheer Tally</div>
                <div className={classes.TallyComponent}>
                    {tallyComponent}
                </div>
            </div>
        );
    }
};

export default FanPage;