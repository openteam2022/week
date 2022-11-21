import {createContext} from 'react'

//配置了默认的light主题和dark黑夜主题
export const themeList = {
    light: {
        appColor: '#fc5531',
        bgColor: '#EDEDED',
        viewColor: '#ffffff',
        fontColor: '#333',
        tipColor: '#aaa',
        removeColor: '#f8f8f8'
    },
    dark: {
        appColor: '#eee',
        bgColor: '#000',
        viewColor: '#151515',
        fontColor: '#f4f4f4',
        tipColor: '#666',
        removeColor: '#252525'
    }


} 

//创建上下文
export const Themes = createContext({
    theme: '',
    changeTheme: ()=>{}
})

