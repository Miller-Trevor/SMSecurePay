import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Text, SafeAreaView} from 'react-native';

export default function PaymentScreen({navigation}) {

    const {confirmPayment, loading} = useConfirmPayment();

    const fetchPaymentIntentClientSecret = async() => {
        const response = await fetch('${API_URL}/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                currency: 'usd',
            }),
        });
        const {clientSecret} = await response.json();

        return clientSecret;
    };

    const handlePayPress = async () => {
        // if (!card) {
        //     return;
        // }

        // const billingDetails = {
        //     email: 'jenny.rosen@example.com',
        //     //enter user email here
        // };

        const clientSecret = await fetchPaymentIntentClientSecret();

        const {paymentIntent, error} = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
            // paymentMethodData: {
            //     billingDetails,
            // },
        });
        
        if (error) {
            console.log('Payment confirmation error', error);
        } else if (paymentIntent) { 
            console.log('Success from promise', paymentIntent);
        }
    };



    return(
        <SafeAreaView>
            <CardField
                postalCodeEnabled={true}
                placeholders={{
                    number: '4242 4242 4242 4242', 
                }}

                cardStyle={{
                    backgroundcolor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
            />
            <TouchableOpacity onPress={handlePayPress}> 
                <Text>
                    Pay Now
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};