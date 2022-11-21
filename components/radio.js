import React,{Component} from 'react'

import {
    Text,
    StyleSheet,
    View,
    Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Radio extends Component{
    constructor (props) {
        super(props);
        this.state = {
            isSelect: props.status,
        }
    }
    onRadio(){
        // 如果判断已经选中，则不执行任何方法
        if(this.state.isSelect == 0){
            this.setState(state=>({
                 isSelect: 1,
            }))
            //如果有props事件则执行，没有则不执行
            if(this.props.onRadio){
                this.props.onRadio();
            }
        }
    }
    render () {
        const isSelect = this.state.isSelect;
        let radio;
        if(isSelect === 1){
            radio = <Text style={[styles.radioboxBase,styles.radioboxSelect]}>
                 <Icon name="check" size={12} color="#fff" />
            </Text>;
        }else{
            radio = <Text style={[styles.radioboxBase,styles.radioboxDefault]} onPress={()=>{this.onRadio()}}></Text>;
        }
        return (
            <View style={styles.radiobox} >
               {radio}
            </View>
        )
    }                
}
const styles = StyleSheet.create({
    radiobox: {
        textAlign: 'right'
    },
    radioboxBase: {
        width: 25,
        height: 25,
        lineHeight: 25,
        borderRadius: 12.5,
    },
    radioboxDefault: {
        borderColor: '#fc5531',
        borderWidth: 1,
        borderStyle: 'solid' 
    },
    radioboxSelect: {
        textAlign: 'center',
        backgroundColor: '#bbb',
        color: '#fff',
    }
})
export default Radio;