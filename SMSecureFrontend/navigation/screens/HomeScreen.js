import * as React from 'react';
import {Text, SafeAreaView} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';


export default function HomeScreen({navigation}) {
    return(
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#42EC95'}}>Welcome to SMSecurePay</Text>
            <Ionicons name="chatbox-ellipses-outline" size={100} color='#42EC95'/>
            <TouchableOpacity 
            onPress={() => navigation.navigate('Form')}
            style={{
                backgroundColor: '#42EC95', 
                padding: 20,
                width:210,
                borderRadius:5, 
                flexDirection:'row', 
                justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight:'bold', fontSize:18, color: '#fff', fontFamily:'Thonburi-Bold'}}>Start Transaction</Text>
                <Ionicons name="arrow-redo-outline" size={22} color='#fff'/>
            </TouchableOpacity>
        </SafeAreaView>
    );
}