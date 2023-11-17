import * as React from 'react';
import {SafeAreaView, View, TextInput, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';
import{useState, useEffect} from 'react'
import * as Crypto from 'expo-crypto';

export default function RegisterScreen({navigation}) {
    const db = SQLite.openDatabase('main.db');
    const [isLoading, setIsLoading] = useState(true);
    const [password, setPassword] = useState(undefined);
    const[email, setEmail] = useState(undefined);

    useEffect(() => {
        db.transaction(tx =>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS Accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT);');
        });
    }, []);
    const SHA256Digest = async (input) => {
        try {
          const hash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            input
          );
          console.log('Hash of password: '+ hash);
          return hash;
        } catch (error) {
          console.error('Error calculating SHA-256 hash:', error);
          throw error;
        }
      };

      const SaveUserInfo = async () => {
        console.log('SaveUserInfo function called');
        console.log('Email: '+ email + ' Password: ' + password);
        console.log('Hashing given password...')
        try {
          const hashedPassword = await SHA256Digest(password);
    
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO Accounts (email, password) VALUES (?, ?);',
              [email, hashedPassword],
              (tx, results) => {
                console.log('SQL executed');
    
                if (results.rowsAffected > 0) {
                  // Insertion was successful
                  console.log('User information saved successfully');
                } else {
                  // Insertion failed
                  console.error('Failed to save user information');
                }
              },
              (error) => {
                console.error('Error during SQL execution:', error);
              }
            );
          });
        } catch (error) {
          console.error('Error while hashing password:', error);
        }
      };

    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 28, fontWeight:500, color:'#333', marginBottom:30, paddingLeft:20}}>
                Register
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
            </View>
            <View style={{paddingLeft: 50, paddingRight:50}}>
            <TouchableOpacity onPress={() => SaveUserInfo()} style={{backgroundColor:'#42EC95', padding:20, borderRadius:10, marginBottom:30}}>
                <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#fff'}}>
                    Register
                </Text>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
                <Text>Already Registered?</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{color:'#42EC95', fontWeight:'700'}}>  Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}