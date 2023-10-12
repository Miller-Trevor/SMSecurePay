import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OnboardingScreen({navigation}) {
    return (
        <SafeAreaView
        style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#fff',
        }}
        >
            <View style={{marginTop:20}}>
                <Text style={{fontWeight:'bold', fontSize:30, color:'#42EC95'}}>
                    Welcome to SMSecurePay
                </Text>
            </View>
            <TouchableOpacity style={{backgroundColor: '#42EC95', padding: 20, width:'90%', borderRadius:10, marginBottom:50, flexDirection:'row', justifyContent:'space-between'}} onPress={() => navigation.navigate('Register')}>
                <Text style={{color:'white', fontSize:18, textAlign:'center', fontWeight:'bold'}}>
                    Let's Start
                </Text>
                <Ionicons name="arrow-forward" size={22} color="#fff"/>
            </TouchableOpacity>

        </SafeAreaView>
    );
};
