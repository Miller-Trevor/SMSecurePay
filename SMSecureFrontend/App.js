import * as React from 'react';
import AppNav from './navigation/AppNav';
import {StripeProvider} from '@stripe/stripe-react-native'
import TestStripe from './navigation/screens/testStripe';
import { View, SafeAreaView } from 'react-native';


function App(){
    return(
        <SafeAreaView>
            <StripeProvider publishableKey='pk_test_51N0q1vEnSZgQUDu6HZgM9mXP2t0K02f8cv6fD0Y7UV8G61iw1JPWmtyNF5foXm7scc2QVp88j464dS5AVKsubhmy00PeOQhLwX'>
                <TestStripe/>
            </StripeProvider>
        </SafeAreaView>
    );
}

export default App;