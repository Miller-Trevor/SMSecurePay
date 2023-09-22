import * as React from 'react';
import {SafeAreaView, View, TextInput, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function BuyerAccountScreen({navigation}) {
    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 28, fontWeight:500, color:'#333', marginBottom:30, paddingLeft:20}}>
                Login
            </Text>
            <View style={{
                flexDirection:'row', 
                borderBottomColor:'#ccc', 
                borderBottomWidth:1, 
                paddingBottom:8, 
                marginBottom:25,
                marginLeft:25,
                marginRight:25
            }}>
                <Ionicons 
                    name="mail" 
                    size={20} 
                    color="#666" 
                    style={{marginRight: 5}} 
                />
                <TextInput 
                    placeholder="Email" 
                    style={{flex:1, paddingVertical:0}} 
                    keyboardType='email-address'
                />
            </View>
            <View style={{
                flexDirection:'row', 
                borderBottomColor:'#ccc', 
                borderBottomWidth:1, 
                paddingBottom:8, 
                marginBottom:25,
                marginLeft:25,
                marginRight:25
            }}>
                <Ionicons 
                    name="ios-lock-closed-outline" 
                    size={20} 
                    color="#666" 
                    style={{marginRight: 5}} 
                />
                <TextInput 
                    placeholder="Password" 
                    style={{flex:1, paddingVertical:0}} 
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => {}}>
                    <Text style={{color:'#42EC95', fontWeight:'700'}}>
                        Forgot?
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingLeft: 50, paddingRight:50}}>
            <TouchableOpacity onPress={() =>{}} style={{backgroundColor:'#42EC95', padding:20, borderRadius:10, marginBottom:30}}>
                <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#fff'}}>
                    Login
                </Text>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
                <Text>New to the App?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{color:'#42EC95', fontWeight:'700'}}>  Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
