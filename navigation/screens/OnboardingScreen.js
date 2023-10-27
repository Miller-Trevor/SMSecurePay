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
                            <View style={{width:300, height:400}}>
                                <LottieView source={require("../../assets/animations/animation_lnxoe0by.json")} autoPlay loop />
                            </View>
                        ),
                        title: 'Welcome to SMSecure Pay!',
                        subtitle: 'Tap Next to Learn More and Start!'
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                <Text>Onboarding</Text>
                            </View>
                        ),
                        title: 'SMSecure Pay is a Mimic Cash App',
                        subtitle: 'The Intended Functionality is the Same as a Cash App and is not Intended to be Used on the Market',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                <Text>Onboarding</Text>
                            </View>
                        ),
                        title: 'Start Now!',
                        subtitle: 'Click next to Get Started with Account Creation!'
                    },
                
                ]}
            />
        </SafeAreaView>
    );
};

