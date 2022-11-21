import React,{Component} from 'react';

import TabNavigator from 'react-native-tab-navigator';

import Home from '../pages/home'
import Add from '../pages/add'
import Me from '../pages/me'
import Index from '../pages/index'

import {
    StyleSheet,
    Image
} from 'react-native';

import {Themes} from '../common/themes'

class Tabbar extends Component {
    constructor(props){
        super();
        this.state = {
            selectedTab: 'Home'
        }
    }

    render() {
        return( 
            <Themes.Consumer>
                {({theme})=>(
                    <TabNavigator hidesTabTouch={true} tabBarStyle={[styles.tabbar,{backgroundColor: theme.viewColor}]}>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Home'}
                            title="首页"
                            selectedTitleStyle={styles.font}
                            renderIcon={() => <Image style={styles.img}  source={require('../assets/home.png')} />}
                            renderSelectedIcon={() => <Image style={styles.img} source={require('../assets/home_s.png')} />}
                            onPress={() => this.setState({ selectedTab: 'Home' })}>
                            <Home navigation={this.props.navigation} />
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Add'}
                            selectedTitleStyle={styles.font}
                            renderIcon={() => <Image style={styles.add}  source={require('../assets/add.png')} />}
                            renderSelectedIcon={() => <Image style={styles.add} source={require('../assets/add.png')} />}
                            onPress={() => this.setState({ selectedTab: 'Add' })}>
                            <Add navigation={this.props.navigation}/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Me'}
                            title="我的"
                            selectedTitleStyle={styles.font}
                            renderIcon={() => <Image style={styles.img} source={require('../assets/me.png')} />}
                            renderSelectedIcon={() => <Image style={styles.img} source={require('../assets/me_s.png')} />}
                            onPress={() => this.setState({selectedTab: 'Me' })}>
                            <Me navigation={this.props.navigation}/>
                        </TabNavigator.Item>
                    </TabNavigator>
                )}
            </Themes.Consumer>  
        )
    }
}

const styles = StyleSheet.create({
    img: {
        width: 24,
        height: 24
    },
    add: {
        width: 48,
        height: 48,
        position: 'relative',
        top: 13
    },
    font: {
        color: '#fc5531'
    },
    tabbar: {
        backgroundColor: '#f4f4f4',
        borderColor: 'white',
        borderWidth: 0
    }
})
export default Tabbar;