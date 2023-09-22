import * as React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation/AppStack.js';


function App(){
    return(
        <AppStack/>
    );
}

export default App;
