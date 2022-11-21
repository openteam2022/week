import React,{Component} from 'react'

import {
    TodoDb,
    DataDb,
    DateDb,
    writeData,
    queryData,
    updateNumberData,
    updateDayData,
    updateIdData,
    updateDateData
} from '../common/db'

import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    Button,
    DeviceEventEmitter 
} from 'react-native'

import Toast from 'react-native-easy-toast';
import Statusbar from '../layout/statusBar'
import Header from '../layout/header'

import {Themes} from '../common/themes'

class Add extends Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            title: '',//标题
            content: '',//内容
            selected: 0,//选中的颜色
        }
    }
    onChange(e){
        this.setState({
            selected: e,
        })
    }
    //获取标题内容
    getTitle(e){
        this.setState({
            title: e
        })
    }
    //获取文本内容
    getContent(e){
        this.setState({
            content: e
        })
    }
    addData(data){
        let id ;
        queryData(DateDb).then((res)=>{
            id = res[0].id + 1;
        })
        queryData(TodoDb).then((res)=>{
            let length = res.length;
            let newData = {id: id,...data};
            writeData(newData,TodoDb).then(( )=>{
                this.ref.current.show('添加成功');
                this.setState({
                    title: '',
                    content: ''
                })
                //添加记录条数
                updateNumberData();
                //添加记录id
                updateIdData();
                queryData(DateDb).then((res)=>{
                    if(res.length > 0){
                        let date = res[0];
                        let date_time = date.date_time.toString();
                        let date_now = this.getDate().date.toString();
                        if(date_time !== date_now) {
                            // 更新数据库当前记录的日期
                            updateDateData(date_now)
                            // 添加累计天数
                            updateDayData();
                        }
                    }else{
                        let data = {
                            id: 1,
                            date_time: this.getDate().date
                        }
                        // 创建date工具表
                        writeData(data,DateDb);
                        // 添加累计天数
                        updateDayData();                        
                    }
                    // 触发首页获取数据
                    DeviceEventEmitter.emit('getData');
                    // 触发个人中心获取数据
                    DeviceEventEmitter.emit('getMeData');

                })
            }).catch((error)=>{
                this.ref.current.show('程序异常，请重新保存');
            })
        })
    }
    onSave(){
        let time = this.getDate().time;
        let type = this.state.selected;
        let title = this.state.title;
        let content = this.state.content.replace(/\s+/g, '');
        if(!content){
            this.ref.current.show('请填写内容');
            return false;
        }
        let data = {
            content: content,
            type: type,
            create_time: time,
            status: 0
        }
        this.addData(data);
        
    }
    // 获取当前日期
    getDate() {
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = (date.getMonth()+1).toString();
        let day = date.getDate().toString();
        let hour =  date.getHours().toString();
        let m = date.getMinutes().toString();
        let s = date.getSeconds().toString();
        m = m.length == 1 ? `0${m}`: m;
        s = s.length == 1 ? `0${s}`: s;
        return {
            date: `${year}-${month}-${day}`,
            time:  `${year}-${month}-${day} ${hour}:${m}:${s}`
        }
    }
    render () {
        return (
            <View>
                <Themes.Consumer>
                    {({theme})=>(
                        <View style={[styles.add,{backgroundColor: theme.bgColor}]}>
                            <View>
                                <Statusbar bgColor={theme.bgColor}/>
                                <Header leftTitle="添加" bgColor={theme.bgColor} color={theme.fontColor}/>
                            </View>
                            <View style={styles.addInput}> 
                                <View style={[styles.addInputBox,{backgroundColor: theme.viewColor}]}> 
                                    <TextInput 
                                    placeholder="请输入待办内容120字内"
                                    multiline={true}
                                    numberOfLines={8}
                                    maxLength={120}
                                    textAlignVertical='top'
                                    style={[styles.addInputBoxText,{color: theme.fontColor}]}
                                    placeholderTextColor={theme.tipColor}
                                    value={this.state.content}
                                    onChangeText={(e)=>{this.getContent(e)}}
                                    ></TextInput>  
                                </View>    
                            </View>  
                            <View style={[styles.addColor,{backgroundColor:theme.viewColor}]}>
                                <TouchableOpacity 
                                onPress={()=>{this.onChange(0)}}>
                                    <View style={styles.addColorItem} >
                                        <Text style={[styles.addColorDefault,styles.addColorBase,this.state.selected == 0 ? styles.addColorSelect : '']}></Text>
                                        <Text style={[styles.addColorText,{color:theme.fontColor}]}>普通</Text>
                                    </View>
                                </TouchableOpacity>
                                 <TouchableOpacity 
                                onPress={()=>{this.onChange(1)}}>
                                    <View style={styles.addColorItem} >
                                        <Text style={[styles.addColorGreen,styles.addColorBase,this.state.selected == 1 ? styles.addColorSelect : '']}></Text>
                                        <Text style={[styles.addColorText,{color:theme.fontColor}]}>重要</Text>
                                    </View>
                                </TouchableOpacity>
                                 <TouchableOpacity 
                                onPress={()=>{this.onChange(2)}}>
                                    <View style={styles.addColorItem} >
                                        <Text style={[styles.addColorYellow,styles.addColorBase,this.state.selected == 2 ? styles.addColorSelect : '']}></Text>
                                        <Text style={[styles.addColorText,{color:theme.fontColor}]}>紧急</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={()=>{this.onChange(3)}}>    
                                    <View style={styles.addColorItem} >
                                        <Text style={[styles.addColorRed,styles.addColorBase,this.state.selected == 3 ? styles.addColorSelect : '']}></Text>
                                        <Text style={[styles.addColorText,{color:theme.fontColor}]}>重要紧急</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.addBtn}>  
                                <TouchableOpacity
                                  onPress={() => {this.onSave()}}>
                                  <Themes.Consumer>
                                        {({theme}) => (
                                            <Text style={[styles.addBtnText,{backgroundColor: theme.viewColor,color: theme.fontColor}]}>提交</Text>
                                        )}
                                  </Themes.Consumer>
                                </TouchableOpacity>
                            </View> 
                        </View> 
                    )}
                </Themes.Consumer>
                <Toast ref={this.ref} position={'center'}/>
            </View>
                
        )
    }
}

const styles = StyleSheet.create({
    add: {
        width: '100%',
        height: '100%'
    },
    addInput: {
        marginLeft: 10,
        marginRight: 10,
        boxSizing: 'border-box',
        paddingBottom: 10,
    },
    addInputBox: {
        padding: 10,
        borderRadius: 5
    },
    addInputBoxText: {
        fontSize: 16
    },
    addColor: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 5
    },
    addColorItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addColorBase: {
        width: 25,
        height: 25,
        borderRadius:12.5,
    },
    addColorYellow: {
        backgroundColor: '#ffc954'
    },
    addColorRed: {
        backgroundColor: '#f45453'
    },
    addColorGreen: {
        backgroundColor: '#93cf50'
    },
    addColorDefault: {
        backgroundColor: '#eee'
    },
    addColorText: {
        marginLeft: 5
    },
    addColorSelect: {
        width: 29,
        height: 29,
        borderRadius: 14.5,
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'solid'
    },
    addBtn: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        width: '100%',
        boxSizing: 'border-box',
        padding: 20,
        paddingTop: 50
    },
    addBtnText: {
        lineHeight: 40,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 5,

    }

})

export default Add;