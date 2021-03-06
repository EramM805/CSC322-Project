import React, {useEffect, useState } from 'react';
import './Manager.css'
import Fire from '../../firebaseConfig';
import 'react-tabs/style/react-tabs.css';

export default function Users() {
    let tests = Fire.db

    const[newUsers, setNewUsers] = useState([])
    
    const getData = async() =>{
        const users = []
        tests.getCollection('Users').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                //let currentId = doc.id
                let data = doc.data()
                users.push(data)
            });
            setNewUsers(users)
        }).catch(function(error){
            console.log(error)
        })
    }

    useEffect(() =>{
        getData()
    },[])


    async function deleteUser(user){
        await tests.getCollection('Users').doc(user).delete()
        .then(() =>{
            console.log("User deleted from Database")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }



    return (     
        <div style={{textAlign:'center'}}>
            <h1>Users</h1>
            <div>
            {newUsers.map(function(item, i){
                console.log(item);
                return <div key={i} className='complaint'>
                <h1>User number: {i + 1}</h1>
                <h2>Name: {item.name} {item.Vip ? '[VIP]' :''}</h2>
                <h2>Email: {item.email}</h2>
                <h2>Username: {item.username}</h2>
                <h2>Balance: {item.Balance}</h2>
                <h2>Warnings: {item.warnings}</h2>
                <button className="btn btn-outline-dark w-20 mt-3 font-text" onClick={() => {deleteUser(item.email)}}>Delete</button>
                <br/>
                <br/>
                </div>
            })}
            </div>
        </div>
   

        );

    
}