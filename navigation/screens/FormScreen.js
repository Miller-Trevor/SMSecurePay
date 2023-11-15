import * as React from 'react';
import {Text, TextInput, View, Button, SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useState, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import { useGlobalState, setGlobalState } from '../../Globals';

import * as SMS from 'expo-sms';


export default function FormScreen({navigation}){

    const [mobileNumber, setMobileNumber] = useState('');
    const [email] = useGlobalState('loggedInUser');
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('')
    const [isAvailable, setIsAvailable] = useState(false);
    const db = SQLite.openDatabase('main.db');
    

    useEffect( () => {
        async function checkAvailability() {
            const isAvailable = await SMS.isAvailableAsync();
            setIsAvailable(isAvailable);
        }
        checkAvailability();
        db.transaction(tx =>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS Transactions (ID INTEGER PRIMARY KEY AUTOINCREMENT, Sender TEXT, Receiver TEXT, Amount REAL);');
        });
    }, []);

    const sendSms = async () => {
        try {
            db.transaction((tx) => {
              tx.executeSql(
                'INSERT INTO Transactions (Sender, Receiver, Amount) VALUES (?, ?, ?);',
                [email, mobileNumber, amount],
                (tx, results) => {
                  console.log('SQL executed');
      
                  if (results.rowsAffected > 0) {
                    // Insertion was successful
                    console.log('Transaction saved to transaction history in DB');
                  } else {
                    // Insertion failed
                    console.error('Failed to save the transaction');
                  }
                },
                (error) => {
                  console.error('Error during SQL execution:', error);
                }
              );
            });
          } catch (error) {
            console.error('Error while saving transaction', error);
          }

        let tempAmount = "Amount: " + amount;
        let tempCardNumber = "\nCard Number: " + cardNumber;

        let message = tempAmount.concat(" ", tempCardNumber);

        const {result} = await SMS.sendSMSAsync(
            [mobileNumber],
            message,
        );

        console.log(result);
    };



    

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{flex: 3, alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Thonburi-Bold' }}>
                    {email}
                </Text>
                <Text style={{fontSize: 20, fontFamily: 'Thonburi-Bold'}}>
                Please Fill Out The Following Fields:
                </Text>
                <View style={{}}>
                    <TextInput value={mobileNumber} onChangeText={
                        (mobileNumber) => setMobileNumber(mobileNumber)
                    } style={{backgroundColor: '#1632C1', width: 200, padding: 10, borderRadius: 20,}} clearTextOnFocus={true} keyboardType='numeric' placeholder="Phone Number"/>
                </View>
                <View>
                    <TextInput value={amount} onChangeText={
                        (amount) => setAmount(amount)
                    } style={{backgroundColor: '#1632C1', width:200, padding: 10, borderRadius: 20}} clearTextOnFocus={true} keyboardType='numeric' placeholder="Amount"/>
                </View>
                <View>
                    <TextInput value={cardNumber} onChangeText={
                        (cardNumber) => setCardNumber(cardNumber)
                    } style={{backgroundColor: '#1632C1', width:200, padding:10, borderRadius: 20}} keyboardType='numeric' placeholder="Customer Card Number"/>
                </View>
                <View>
                    {isAvailable ? <Button onPress={sendSms} title='Send Message'/> : <Text>No SMS Available</Text>}
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
