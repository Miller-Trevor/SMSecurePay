import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import SettingsScreen from './screens/SettingsScreen';
import FormScreen from './screens/FormScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';


const HomeStack = createNativeStackNavigator();

function HomeStackScreen(){
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen}/>
            <HomeStack.Screen name="Form" component={FormScreen}/>
        </HomeStack.Navigator>
    );
}

const AccountStack = createNativeStackNavigator();

function AccountStackScreen(){
    return(
        <AccountStack.Navigator>
            <AccountStack.Screen name="Account" component={AccountScreen}/>
            <AccountStack.Screen name="BuyerAccount" component={LoginScreen}/>
            <AccountStack.Screen name="Register" component={RegisterScreen}/>
        </AccountStack.Navigator>
    );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen(){
    return(
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsScreen}/>
        </SettingsStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function AppStack() {
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeStackScreen} options={{
                    headerShown: false, 
                    title: "Home", 
                    tabBarIcon: ({focused, color, size}) => (
                    <Ionicons name="home-outline" size={size} color={color}/>
                    ),
                    }}/>
                <Tab.Screen name="Account" component={AccountStackScreen} options={{
                    headerShown: false,
                    title: "Account",
                    tabBarIcon: ({focused, color, size}) => (
                        <Ionicons name="person-circle-outline" size={size} color={color}/>
                        ),
                    }}/>
                <Tab.Screen name="Settings" component={SettingsStackScreen} options={{
                    headerShown: false,
                    title: "Settings",
                    tabBarIcon: ({focused, color, size}) => (
                        <Ionicons name="settings-outline" size={size} color={color}/>
                        ),
                    }}/>
            </Tab.Navigator>
        </NavigationContainer>

    );
}
