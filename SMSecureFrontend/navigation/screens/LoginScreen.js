import * as React from 'react';
import {SafeAreaView, View, TextInput, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';
import {useState, useEffect} from 'react';
import * as Crypto from 'expo-crypto'
import { setGlobalState } from '../../Globals';


export default function BuyerAccountScreen({navigation}) {
    const db = SQLite.openDatabase('main.db');
    const[password, setPassword] = useState();
    const[email, setEmail] = useState();

    const SHA256Digest = async (input) => {
        console.log("Digesting password into SHA256...");
        try {
          const hash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            input
          );
          console.log('Hash of password: ' + hash);
          return hash;
        } catch (error) {
          console.error('Error calculating SHA-256 hash:', error);
          throw error;
        }
      };

      const TryLogIn = async () => {
        console.log("Attempting log in with given email and password...");
        console.log('email: '+ email + ' Password: ' + password);
        try {
          console.log("calling hash function...")
          const hashedPassword = await SHA256Digest(password);
    
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM Accounts WHERE email = ?',
              [email],
              (_, results) => {
                const len = results.rows.length;
                if (len === 1) {
                  const user = results.rows.item(0);
                  if (user.password === hashedPassword) {
                    // Password matches, log in successful
                    console.log('Login successful');
                    setGlobalState('loggedInUser', email);
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
        } catch (error) {
          console.error('Error while hashing password:', error);
        }
      };

    const DeleteAllAccountsFromDb = () =>{
        db.transaction((tx) =>{
            tx.executeSql('DELETE FROM Accounts;',[],
            (tx, results) =>{
                if(results.rowsAffected >= 1){
                    console.log('Accounts deleted. ');
                }
            },
        
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
                    onChangeText={setEmail}
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
                    onChangeText={setPassword}
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
            {/* <View style={{paddingLeft: 50, paddingRight:50}}>
            <TouchableOpacity onPress={() =>DeleteAllAccountsFromDb()} style={{backgroundColor:'#42EC95', padding:20, borderRadius:10, marginBottom:30}}>
                <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#fff'}}>
                    Remove all accounts from the db
                </Text>
            </TouchableOpacity>
            </View> */}
            <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
                <Text>New to the App?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{color:'#42EC95', fontWeight:'700'}}>  Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
