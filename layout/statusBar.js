import React from 'react';


import {
    StatusBar,
} from 'react-native';


const Statusbar = (props)=> {
    const bgColor = props.bgColor || '#EDEDED';
    const style = props.bgColor === '#EDEDED' ? 'dark-content' : 'light-content';
    return (
        <StatusBar backgroundColor={bgColor} barStyle={style}/>
    )
}

export default Statusbar;