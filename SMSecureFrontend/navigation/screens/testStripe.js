import * as React from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useStripe} from '@stripe/stripe-react-native'
import { Alert } from 'react-native';

export default function TestStripe({navigation}) {
    const [number, setNumber] = React.useState("");
    const [amount, setAmount] = React.useState("1");
    const stripe = useStripe();

    const pay = async () => {
        try {
          const finalAmount = parseInt(amount);
          if (finalAmount < 1) return Alert.alert("You cannot pay below 1 USD");
          const response = await fetch("http://localhost:3000/pay", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: finalAmount, number }),
          });
          const data = await response.json();
          if (!response.ok) {
            return Alert.alert(data.message);
          }
          const initSheet = await stripe.initPaymentSheet({
            paymentIntentClientSecret: data.clientSecret,
          });
          if (initSheet.error) {
            console.error(initSheet.error);
            return Alert.alert(initSheet.error.message);
          }
          const presentSheet = await stripe.presentPaymentSheet({
            clientSecret: data.clientSecret,
          });
          if (presentSheet.error) {
            console.error(presentSheet.error);
            return Alert.alert(presentSheet.error.message);
          }
          Alert.alert("Paid successfully! Thank you.");
        } catch (err) {
          console.error(err);
          Alert.alert("Payment failed!");
        }
      };

    return(
       <SafeAreaView>
            <TextInput placeholder="Number"
                style={{padding: 10, borderColor: "black", borderWidth: 1}}
                value={number}
                onChangeText={(e) => setNumber(e)}
            />
            <TextInput
                placeholder='Amount'
                keyboardType="numeric"
                style={{padding: 10, borderColor: "black", borderWidth: 1}}
                value={amount}
                onChangeText={(e) => setAmount(e)}
            />
            <Button title="Pay" onPress={pay}/>
       </SafeAreaView>
    );
};