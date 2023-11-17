import * as React from 'react';
import {Text, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AccountScreen({navigation, route}) {

    const userEmail = route.params?.userEmail || 'Guest'; // Default to 'Guest' if no email is provided
    return(
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Thonburi-Bold' }}>
                Welcome, {userEmail}
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{
                backgroundColor: '#42EC95', 
                padding: 20,
                width:270,
                borderRadius:5, 
                flexDirection:'row', 
                justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight:'bold', fontSize:18, color: '#fff', fontFamily:'Thonburi-Bold'}}>Login to Account</Text>
                <Ionicons name="cash-outline" size={22} color="#fff"/>
            </TouchableOpacity>
        </SafeAreaView>
    );
}