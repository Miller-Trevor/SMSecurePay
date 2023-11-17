import * as React from 'react';
import {Text, TextInput, View, Button, SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useState, useEffect} from 'react';

import * as SMS from 'expo-sms';


export default function FormScreen({navigation}){

    const [mobileNumber, setMobileNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect( () => {
        async function checkAvailability() {
            const isAvailable = await SMS.isAvailableAsync();
            setIsAvailable(isAvailable);
        }
        checkAvailability();
    }, []);

    /* const DismissKeyboard = ({children}) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    )
 */
    const sendSms = async () => {

        /* if(mobileNumber != 10){
            alert('You must enter a 10 digit phone number');
            return;
        } */

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
                    {/* {isAvailable ? <Button onPress={sendSms} title='Send Message'/> : <Text>No SMS Available</Text>} */}
                    <Button onPress={() => navigation.navigate('Payment')} title='Pay Now' />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}