import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SettingsScreen({navigation}) {
    return(
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#42EC95'}}>Settings Screen</Text>
        <Ionicons name="chatbox-ellipses-outline" size={100} color='#42EC95'/>
        <TouchableOpacity 
        onPress={() => navigation.navigate('TransactionHistory')}
        style={{
            backgroundColor: '#42EC95', 
            padding: 20,
            width:210,
            borderRadius:5, 
            flexDirection:'row', 
            justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight:'bold', fontSize:18, color: '#fff', fontFamily:'Thonburi-Bold'}}>View Transactions</Text>
            <Ionicons name="arrow-redo-outline" size={22} color='#fff'/>
        </TouchableOpacity>
    </SafeAreaView>
    );
}
