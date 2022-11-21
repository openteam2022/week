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
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Radio from './radio'

import {Themes} from '../common/themes'
import { SwipeListView } from 'react-native-swipe-list-view';


const colors = ['#bbbbbb','#93cf50','#ffc954','#f45453']

const Item = ({content,time,id,type,onClick,status,theme}) => {

    return (
        <View style={[styles.listItem,{backgroundColor: theme.viewColor,borderColor: colors[type]}]} >
            <View style={styles.listItemLeft}>
                <Text style={[styles.listItemText,{color: theme.fontColor},status == 1? styles.success : '']}>{content}</Text>
                <Text style={styles.listItemTime}>{time}</Text>
            </View>
            <Radio onRadio={onClick} status={status}/>
        </View>
    )
}
 
class List extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: ''
        }
    }
    onClick(id){
        this.props.onChangeData(id);
    }
    onRemove(id){
        this.props.onRemove(id)
    }
    render() {
        let data = this.props.data ? this.props.data : [];
        return (
            <Themes.Consumer>
                {({theme}) => (
                <SwipeListView
                    style={styles.list}
                    data={data}
                    renderItem={(data, rowMap) => (
                       <Item content={data.item.content} id={data.item.id} type={data.item.type} time={data.item.create_time} status={data.item.status} theme={theme} onClick={()=>this.onClick(data.item.id)}/>
                    )}
                    renderHiddenItem={ (data, rowMap) => (
                        <View style={[styles.rowBack,{backgroundColor: theme.removeColor}]}>
                            <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={()=>this.onRemove(data.item.id)}
                            >
                                <Image style={[styles.delete,{backgroundColor: theme.removeColor}]} source={require('../assets/delete.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    )}
                    rightOpenValue={-75}
                    leftOpenValue={0}
                />
                )}
            </Themes.Consumer>
            
        )
    }
}
const styles = StyleSheet.create({
    list: {
        flex: 1,
        boxSizing: 'border-box',
        paddingLeft: 10,
        paddingRight: 10,
    },
    listItem: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 4,
        boxSizing: 'border-box',
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        // elevation: 4,
        // marginLeft: 4,
        // marginRight: 4,
        borderLeftWidth: 4,
        borderColor: 'red'
    },
    listItemLeft: {
        width: '80%'
    },
    listItemText: {
        fontSize: 16,
        color: '#333',
    },
    listItemTime: {
        fontSize: 13,
        marginTop: 7,
        color: '#ccc'
    },
    listBottom: {
        height: 20
    },
    success: {
        textDecorationLine:'line-through',
        color: '#ccc'
    },
    rowBack: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
        boxSizing: 'border-box',
        borderRadius: 5

    },
    delete: {
        width: 25,
        height: 25,
        marginRight: 23,
    }
})
export default List;