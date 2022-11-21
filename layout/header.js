import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const Header = (props)=> {
    const isCenter = props.isCenter || false;
    const title = props.title || '标题';
    const leftTitle = props.leftTitle || '';
    const rightTitle = props.rightTitle  || '';

    const goBack = ()=>{
        props.onBack()
    }

    if(isCenter){
        return  <View style={[styles.headerCenter,{background:props.viewColor || '#EDEDED'}]} >
                    <TouchableOpacity 
                    style={styles.icon}
                    activeOpacity={0.5}
                    underlayColor="#ffffff"
                    onPress={goBack}>
                        <Text ><Icon name="angle-left" size={25} color={props.color} /></Text>
                    </TouchableOpacity> 
                    <Text style={[styles.text,{color:props.color || '#333'}]}>{title}</Text>
                </View>
    }else{
        return  <View style={[styles.headerSides,{background:props.viewColor || '#EDEDED'}]}>
                    <Text style={[styles.text,{color:props.color || '#333'}]}>{leftTitle}</Text>
                    <Text style={[styles.text,{color:props.color || '#333'}]}>{rightTitle}</Text>
                </View>
    }
}

const styles = StyleSheet.create({
    headerSides: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box',
        paddingLeft: 15,
        paddingRight: 15,
        // borderBottomWidth: 0.5,
        // borderColor: '#ededed',
        // borderStyle: 'solid',
        minHeight: 48,
    },
    headerCenter: {
        width: '100%',
        minHeight: 48,
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        position: 'absolute',
        left: 15,
        width: 30
    },
    text:{
        fontSize: 17,
    }

})
export default Header;