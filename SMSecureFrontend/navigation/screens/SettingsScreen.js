import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({navigation}) {
    return(
        <ScrollView style={{backgroundColor: 'White'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Info')}>
                <View style={{paddingHorizontal:20, paddingBottom:20, paddingTop:20}}>
                    <Text style={{fontSize: 17}}>My Info</Text>
                    <Text style={{fontSize:14, paddingTop: 5, opacity:0.6}}>Setup Profile</Text>
                </View>
                <View style={{height:0.5, backgroundColor:'Grey'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
                <View style={{paddingHorizontal:20, paddingBottom:20, paddingTop:20}}>
                    <Text style={{fontSize: 17}}>Transaction History</Text>
                    <Text style={{fontSize:14, paddingTop: 5, opacity:0.6}}>View your transaction history</Text>
                </View>
                <View style={{height:0.5, backgroundColor:'Grey'}}/>
            </TouchableOpacity>
        </ScrollView>
    );
}