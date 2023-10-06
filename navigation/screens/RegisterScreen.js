import * as React from 'react';
import {SafeAreaView, View, TextInput, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';
import{useState, useEffect} from 'react'

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

    const SaveUserInfo = () => {
        console.log('SaveUserInfo function called'); // Add this line to check if the function is being called
    
        db.transaction((tx) => {
            console.log('Transaction started'); // Add this line to check if the transaction is started
    
            tx.executeSql(
                'INSERT INTO Accounts (email, password) VALUES (?, ?);',
                [email, password],
                (tx, results) => {
                    console.log('SQL executed'); // Add this line to check if the SQL statement is executed
    
                    if (results.rowsAffected > 0) {
                        // Insertion was successful
                        console.log('User information saved successfully');
                    } else {
                        // Insertion failed
                        console.error('Failed to save user information');
                    }
                },
                (error) => {
                    console.error('Error during SQL execution:', error); // Add this line to check for any SQL execution errors
                }
            );
        });
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
