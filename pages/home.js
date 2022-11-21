import React,{Component} from 'react';

import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Alert,
    DeviceEventEmitter
} from 'react-native';

import {
    TodoDb,
    DataDb,
    writeData,
    queryData,
    deleteRowData,
    updateStatusData,
    updateFinishData
} from '../common/db'

import Statusbar from '../layout/statusBar'
import Header from '../layout/header'
import List from '../components/list'
import {Themes} from '../common/themes'
import Toast from 'react-native-easy-toast';


class Home extends Component{
    constructor(props){
        super(props);
        this.ref = React.createRef();
        this.state = {
            data: [],
            listener: ''
        }
    }
    componentDidMount() {
        //获取数据
        this.getData();
        // 监听获取数据的触发事件
        this.state.listener = DeviceEventEmitter.addListener('getData',()=>{
            this.getData()
        })
    }
    // 获取数据
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
        }).catch((error)=>{
            // Alert.alert(`${error}`)
        })
    }
    componentWillUnmount(){
        // 移除监听事件
        if(this.state.listener){
            this.state.listener.remove();
        }
    }
    // 点击完成按钮触发事件
    onChangeData(id){
        let data = this.state.data.reverse();
        data.forEach((item,index)=>{
            if(item.id == id){
                updateStatusData(index,TodoDb,1);
                updateFinishData().then(()=>{
                    // 触发首页获取数据
                    DeviceEventEmitter.emit('getMeData');
                })

            }
        })
        this.getData()
    }
    // 删除事件
    onRemove(id){
        let data = this.state.data.reverse();
        data.forEach((item,index)=>{
            if(item.id == id){
                deleteRowData(index,TodoDb);
            }
        })
        this.getData();
        this.ref.current.show('已删除');
    }
    render(){
        let data = []
        this.state.data.forEach(item=>{
            if(item.status == 0 || item.status == 1){
                data.push(item)
            }
        })
        return (
            <Themes.Consumer>
                {({theme})=>(
                    <View style={[styles.home,{backgroundColor: theme.bgColor}]}>
                        <Statusbar bgColor={theme.bgColor}/>
                        <Header leftTitle="week列表" bgColor={theme.viewColor} color={theme.fontColor}/>
                        {data.length === 0
                            ? <View style={styles.empty}><Text style={{color: theme.fontColor}}>暂无数据</Text></View>
                            : <List data={data} onChangeData={(id)=>this.onChangeData(id)} onRouter={()=>this.props.navigation.push('index')} onRemove={(id)=>this.onRemove(id)}/>
                        }
                        <Toast ref={this.ref} position={'center'}/>
                    </View>
                )}
            </Themes.Consumer>
        )
    }
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
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

})
export default Home;