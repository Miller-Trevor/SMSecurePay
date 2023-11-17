import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from "lottie-react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from 'expo-router';

export default function OnboardingScreen({navigation}) {

    const handleDone = () =>{
        navigation.navigate('AppStack', {screen: "Home"});
    }


    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                containerStyles={{padding: 15}}
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View style={{width:200, height:350}}>
                                <LottieView source={require("../../assets/animations/animation_lnxoe0by.json")} autoPlay loop />
                            </View>
                        ),
                        title: 'SMSecure Pay is a Mimic Cash App',
                        subtitle: 'The Intended Functionality is the Same as a Cash App and is not Intended to be Used on the Market',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View style={{width:200, height:350}}>
                               <LottieView source={require("../../assets/animations/animation_lnxoe0by.json")} autoPlay loop />
                            </View>
                        ),
                        title: 'Start Now!',
                        subtitle: 'Click next to Get Started with Account Creation!'
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View style={{width:200, height:350}}>
                                <LottieView source={require("../../assets/animations/animation_lnxoe0by.json")} autoPlay loop />
                            </View>
                        ),
                        title: (
                            <View>
                                <TouchableOpacity
                                        onPress={() => navigation.navigate('Register')}
                                        style={{
                                        backgroundColor: '#42EC95', 
                                        padding: 20,
                                        width:270,
                                        borderRadius:5, 
                                        flexDirection:'row', 
                                        justifyContent: 'space-between',
                                        }}>
                                        <Text style={{fontWeight:'bold', fontSize:18, color: '#fff', fontFamily:'Thonburi-Bold'}}>Register for Free!</Text>
                                        <Ionicons name="cash-outline" size={22} color="#fff"/>
                                </TouchableOpacity>
                            </View>
                        ),
                        subtitle: (
                            <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
                                <Text>Already Registered?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={{color:'#42EC95', fontWeight:'700'}}>  Login</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    },
                
                ]}
            />
        </SafeAreaView>
    );
};

