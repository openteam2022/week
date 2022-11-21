/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import type {Node} from 'react';

// 路由容器
import {NavigationContainer} from '@react-navigation/native';

// 栈式导航
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Router from './router/index'

import {Themes,themeList} from './common/themes'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

const Stack = createNativeStackNavigator();



class App extends Component{
    constructor(props){
        super(props);
        this.changeTheme = () => {
            this.setState(state => ({
            theme:
              state.theme === themeList.dark
                ? themeList.light
                : themeList.dark,
          }));
        };

        // State 也包含了更新函数，因此它会被传递进 context provider。
        this.state = {
            theme: themeList.light,//设置默认为light主题
            changeTheme: this.changeTheme, //方法
        };
    }
    render () {
        return (
        
            <Themes.Provider value={this.state}>
                <View style={{width: '100%',height: '100%'}}>
                    <Router/>
                </View>
            </Themes.Provider>
        )
    }
    
};

export default App;
