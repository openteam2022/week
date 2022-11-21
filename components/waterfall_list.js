import React,{Component} from 'react'

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Alert,
    TouchableOpacity,
} from 'react-native';


import Radio from './radio'



class WaterfallList extends Component {
    constructor (props) {
        super();
        this.state = {
         
        }
    }
    componentDidMount() {

    }
    onClick(){
        Alert.alert("点击了")
    }
    onRouter(){
        if(this.props.onRouter != null){
            this.props.onRouter()
        }
    }
    render() {
        let leftBox;
        let rightBox;

        return (
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
                <View style={styles.listBox}>
                    <View style={styles.listBoxBase}>
                        <TouchableOpacity 
                            activeOpacity={0.5} 
                            onPress={()=>this.props.onRouter()}
                        >
                            <View style={[styles.listBoxBaseCss]}>
                                <Text style={[styles.listBoxTitle]}>待办</Text>
                                <Text style={[styles.listBoxContent]} numberOfLines={1} ellipsizeMode="tail">我是待办第一条哈哈有意思</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            onPress={()=>{this.onRouter()}}
                        >
                            <View style={[styles.listBoxBaseCss]}>
                                <Text style={[styles.listBoxTitle]}>清单</Text>
                                <Text style={[styles.listBoxContent]} numberOfLines={1} ellipsizeMode="tail">清单</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listBoxBase}>
                        <View style={[styles.listBoxBaseCss]}>
                            <Text style={[styles.listBoxTitle]}>清单</Text>
                            <Text style={[styles.listBoxContent]} numberOfLines={1} ellipsizeMode="tail">清单</Text>
                        </View>
                        <View style={[styles.listBoxBaseCss]}>
                            <Text style={[styles.listBoxTitle]}>默认模板</Text>
                            <Text style={[styles.listBoxContent]} numberOfLines={1} ellipsizeMode="tail">默认模板</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.listBottom}></View>
            </ScrollView>  
        )
    }
}
const styles = StyleSheet.create({
    list: {
        width: '100%',
        height: 500,
        boxSizing: 'border-box',
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
    },
    listBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listBoxTitle: {
        fontSize: 16,
        height: 27
    },
    listBoxContent: {
        fontSize: 15
    },
    listBoxBase: {
        width: '48.7%',
    },
    listBoxBaseCss: {
        boxSizing: 'border-box',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 200,
        marginBottom: 10
    },

    listBottom: {
        height: 20
    }
})
export default WaterfallList;