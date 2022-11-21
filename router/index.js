import React from 'react';

// 路由容器
import {NavigationContainer} from '@react-navigation/native';

// 堆栈栈式导航
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Index from '../pages/index'
import Record from '../pages/record'
import Tabbar from '../layout/tabbar'


const Stack = createNativeStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Router = () => {
    return (
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false,
                        cardStyleInterpolator: forFade,
                        animation: 'slide_from_right'
                    }}
                >
                    <Stack.Screen 
                        name="home" 
                        component={Tabbar}
                       />
                    <Stack.Screen 
                        name="index" 
                        component={Index}
                    />
                    <Stack.Screen 
                        name="record" 
                        component={Record}
                    />
                </Stack.Navigator>
            </NavigationContainer>
    );
};

export default Router;
