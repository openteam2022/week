import React,{Component} from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import {
    TodoDb,
    DataDb,
    writeData,
    queryData,
    deleteAllData,
    deleteRowData,
    updateData
} from '../common/db'

import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../layout/header'
import Statusbar from '../layout/statusBar'

import {Themes} from '../common/themes'

class Me extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:{},
        }
    }
    componentDidMount() {
        this.getData();
        // 监听获取数据的触发事件
        this.state.listener = DeviceEventEmitter.addListener('getMeData',()=>{
            this.getData()
        })
    }
    getData(){
        //获取数据
        queryData(DataDb).then((res)=>{
            if(res.length > 0){
                this.setState({
                    data: res[0]
                })
            }else{
                let data = {
                    id: 1,
                    total_day: 0,
                    total_number: 0,
                    total_finish: 0,
                }
                writeData(data,DataDb);
            }
        })
    }
    goRecord(){
        const navigata = this.props.navigation
        navigata.push('record')
    }
    render() {
        let data = this.state.data;
        return (
            <Themes.Consumer>
                {({theme,changeTheme})=>(
                    <View style={{backgroundColor:theme.bgColor,width:'100%',height: '100%'}}>
                        <Statusbar bgColor={theme.bgColor}/>
                        <View style={styles.meHeader}>
                            <View style={styles.meHeaderAvator}>
                                <Image style={styles.meHeaderAvatorImg} source={require('../assets/logo.png')}></Image>
                                <Text style={styles.meHeaderAvatorName}>欢迎您的使用</Text>
                            </View>
                            {/*<View style={styles.meHeaderSet}>
                                <Icon name="angle-right" size={22} color="#ccc" />
                            </View>*/}
                        </View>
                        <View style={[styles.meView,{backgroundColor: theme.viewColor}]}>
                            <View style={[styles.meEntryBox]}>
                                <Text style={[styles.meEntryTitle,{color: theme.fontColor}]}>数据统计</Text>
                            </View>
                            <View style={styles.meViewBox}>
                                <View style={styles.meViewBoxItem}>
                                    <Text style={[styles.meViewBoxItemNumber,{color: theme.fontColor}]}>{data.total_day || 0}</Text>
                                    <Text style={styles.meViewBoxItemTip}>累计(天)</Text>
                                </View>
                                <View style={styles.meViewBoxItem}>
                                    <Text style={[styles.meViewBoxItemNumber,{color: theme.fontColor}]}>{data.total_number || 0}</Text>
                                    <Text style={styles.meViewBoxItemTip}>记录(次)</Text>
                                </View>
                                <View style={styles.meViewBoxItem}>
                                    <Text style={[styles.meViewBoxItemNumber,{color: theme.fontColor}]}>{data.total_finish || 0}</Text>
                                    <Text style={styles.meViewBoxItemTip}>已完成</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.meEntry,{backgroundColor: theme.viewColor}]}>
                            {/*<View style={[styles.meEntryBox,styles.meEnterLine]}>
                                <Text style={[styles.meEntryTitle,{color: theme.fontColor}]}>分类管理</Text>
                                <Text><Icon name="angle-right" size={20} color="#ccc" /></Text>
                            </View>*/}
                            <TouchableOpacity 
                            activeOpacity={0.5}
                            underlayColor="#ffffff"
                            onPress={()=>{this.goRecord()}}>
                                <View style={styles.meEntryBox}>
                                    <Text style={[styles.meEntryTitle,{color: theme.fontColor}]}>历史记录</Text>
                                    <Text><Icon name="angle-right" size={20} color="#ccc" /></Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.meEntry,{backgroundColor: theme.viewColor}]}>
                            <TouchableOpacity 
                            activeOpacity={0.5}
                            underlayColor="#ffffff"
                            onPress={changeTheme}>
                                <View style={[styles.meEntryBox]}>
                                    <Text style={[styles.meEntryTitle,{color: theme.fontColor}]}>主题</Text>
                                    <Text><Icon name="angle-right" size={20} color="#ccc" /></Text>
                                </View>
                            </TouchableOpacity>
                            {/*<View style={styles.meEntryBox}>
                                <Text style={[styles.meEntryTitle,{color: theme.fontColor}]}>设置</Text>
                                <Text><Icon name="angle-right" size={20} color="#ccc" /></Text>
                            </View>*/}
                        </View>
                    </View>
                )}
            </Themes.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    meHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        padding: 20,
        paddingTop: 50,
        paddingBottom: 10
    },
    meHeaderAvator: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    meHeaderAvatorImg: {
        width: 65,
        height: 65,
        borderRadius: 32,
        marginRight: 5
    },
    meHeaderAvatorName: {
        fontSize: 17,
        color: '#555',
        marginLeft: 3 
    },
    meView: {
        boxSizing: 'border-box',
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10
    },
    meViewBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box',
        paddingBottom: 30
    },
    meViewBoxItemNumber: {
        fontSize: 17,
        marginBottom: 10,
        textAlign: 'left',
        color: '#333',
        fontWeight: '500'

    },
    meViewBoxItemTip: {
        fontSize: 12,
        color: '#999'
    },
    meEntry: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,

    },
    meEntryBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 15,
    },
    meEntryTitle: {
        fontSize: 17,
        color: '#444'
    },
    meEnterLine: {
        borderBottomWidth: 0.5,
        borderColor: '#eee',
        borderStyle: 'solid'
    }

})
export default Me;