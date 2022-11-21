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
    DeviceEventEmitter,
    FlatList
} from 'react-native';

// import { CommonActions } from '@react-navigation/native';

import {
    TodoDb,
    DataDb,
    writeData,
    queryData,
    deleteAllData,
    deleteRowData,
    updateData
} from '../common/db'

import Header from '../layout/header'
import Statusbar from '../layout/statusBar'

import {Themes} from '../common/themes'

const Item = ({content,date,status,theme}) => {
    return (
         <View style={[styles.item,{backgroundColor: theme.viewColor}]}>
            <Text style={[styles.itemText,{color: theme.fontColor}]}>{content}</Text>
            <View style={styles.itemInfo}>
                <Text style={styles.itemDate}>创建：{date.substring(0,9)}</Text>
                <Text style={[styles.itemDate,{color:status == 2 ? "#5de4a9":"#fc5531"}]}>类型： {status == 2? '已完成':'未完成'}</Text>
                <Text style={[styles.itemDate,{color:status > 1 ? "#fc5531":"#5de4a9"}]}>状态： {status > 1? '已删除':'待完成'}</Text>
            </View>
        </View>
           
    )
}

class Record extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            navigation: this.props.navigation
        }
    }
    componentDidMount(){
        this.getData()
         // 监听获取数据的触发事件
        this.state.listener = DeviceEventEmitter.addListener('getData',()=>{
            this.getData()
        })
    }
    getData(){
        queryData(TodoDb).then((res)=>{
            // 按时间排序
            let data = res.sort((a,b)=>{
                let aTime = a.create_time.replace(/-/g,'/');
                let bTime = b.create_time.replace(/-/g,'/');
                const dateA = new Date(aTime).valueOf();
                const dateB = new Date(bTime).valueOf();
                if(dateA < dateB){
                    return 1;
                }else{
                    return -1;
                }
            })
            this.setState({
                data: data
            })
        })
    }

    goBack(){
        const navigation = this.state.navigation
        navigation.goBack();
    }
    render() {
        const data = this.state.data
        return (
            <Themes.Consumer>
                {({theme})=>(
                    <View style={[styles.record,{backgroundColor:theme.bgColor}]}>
                        <Statusbar bgColor={theme.bgColor}/>
                        <Header isCenter={true} title="历史记录"  bgColor={theme.viewColor} color={theme.fontColor} onBack={()=>this.goBack()}/>
                        <FlatList
                        data={data}
                        renderItem={(item)=>{
                            return <Item content={item.item.content} date={item.item.create_time} status={item.item.status} theme={theme}/>
                        }}
                        keyExtractor={item => item.id}
                        >
                        </FlatList>
                    </View> 
                 )}
            </Themes.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    record: {
        width: '100%',
        height: '100%',
        backgroundColor: '#eee'
    },
    item: {
        margin: 10,
        marginTop: 0,
        boxSizing: 'border-box',
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 5
    },
    itemText: {
        fontSize: 17,
        color: '#333333',
        lineHeight:25
    },
    itemInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    itemDate: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center'
    }

})

export default Record;