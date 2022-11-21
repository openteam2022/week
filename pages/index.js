import React from 'react';

import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Statusbar from '../layout/statusBar'
import Header from '../layout/header'
import List from '../components/list'

import {Themes} from '../common/themes'

const Home = ()=> {
    return (
        <Themes.Consumer>
            {({theme})=>(
                <View style={[styles.home,{backgroundColor: theme.bgColor}]}>
                    <Header leftTitle="Week" bgColor={theme.viewColor} color={theme.fontColor} />
                    <List/>
                </View>
            )}
        </Themes.Consumer>  
    )
}


const styles = StyleSheet.create({
    home: {
        height: '100%',
        width: '100%'
    },
    text: {
        fontSize: 17,
        color: '#333333',
        height: 50,
        lineHeight: 50,
        textAlign: 'center'
    }

})
export default Home;