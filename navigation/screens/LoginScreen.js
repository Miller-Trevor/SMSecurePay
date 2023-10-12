import React , {useContext} from 'react';
import {SafeAreaView, View, TextInput, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';
import * as SQLite from 'expo-sqlite';
import {useState, useEffect} from 'react';

export default function LoginScreen({navigation}) {
    const db = SQLite.openDatabase('main.db');
    const[password, setPassword] = useState();
    const[email, setEmail] = useState();


    useEffect(() => {
        db.transaction(tx =>{
            tx.executeSql('SELECT * FROM Accounts'),
            (_,results)=>
            {
                console.log(results);
            }
        });
    }, []);
    const TryLogIn = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Accounts WHERE email = ?',
                [email],
                (_, results) => {
                    const len = results.rows.length;
                    if (len === 1) {
                        const user = results.rows.item(0);
                        if (user.password === password) {
                            // Password matches, log in successful
                            console.log('Login successful');

                            // Navigate to Account screen with email as a parameter
                            navigation.navigate('Account', { userEmail: email });
                        } else {
                            // Password doesn't match
                            console.error('Incorrect password');
                        }
                    } else if (len === 0) {
                        // Email not found
                        console.error('Email not found');
                    } else {
                        // More than one user with the same email (should not happen)
                        console.error('Multiple users with the same email');
                    }
                }
            );
        });
    };

    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 28, fontWeight:500, color:'#333', marginBottom:30, paddingLeft:20}}>
                Login
            </Text>
            <View style={{
                flexDirection:'row', 
                borderBottomColor:'#ccc', 
                borderBottomWidth:1, 
                paddingBottom:8, 
                marginBottom:25,
                marginLeft:25,
                marginRight:25
            }}>
                <Ionicons 
                    name="mail" 
                    size={20} 
                    color="#666" 
                    style={{marginRight: 5}} 
                />
                <TextInput 
                    placeholder="Email" 
                    value={email}
                    onChnageText={setEmail}
                    style={{flex:1, paddingVertical:0}} 
                    keyboardType='email-address'
                />
            </View>
            <View style={{
                flexDirection:'row', 
                borderBottomColor:'#ccc', 
                borderBottomWidth:1, 
                paddingBottom:8, 
                marginBottom:25,
                marginLeft:25,
                marginRight:25
            }}>
                <Ionicons 
                    name="ios-lock-closed-outline" 
                    size={20} 
                    color="#666" 
                    style={{marginRight: 5}} 
                />
                <TextInput 
                    placeholder="Password" 
                    value={password}
                    onChnageText={setPassword}
                    style={{flex:1, paddingVertical:0}} 
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => {}}>
                    <Text style={{color:'#42EC95', fontWeight:'700'}}>
                        Forgot?
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingLeft: 50, paddingRight:50}}>
            <TouchableOpacity onPress={() =>TryLogIn()} style={{backgroundColor:'#42EC95', padding:20, borderRadius:10, marginBottom:30}}>
                <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#fff'}}>
                    Login
                </Text>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
                <Text>New to the App?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{color:'#42EC95', fontWeight:'700'}}>  Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
