import Realm from "realm";

import {Alert} from 'react-native'

/**表定义区**/
//todolist表
export const TodoDb = 'tododb';
//累计数据记录表
export const DataDb = 'datadb';
//记录当前日期表
export const DateDb = 'datedb';

const TodoSchema = {
    name: TodoDb,
    primaryKey: 'id',
    properties: {
        id: 'int',              //id
        content: 'string',      //内容
        create_time: 'string',  //创建时间
        type: 'int',            //类型： 0不重要不紧急 1 重要 2 紧急 3 重要且紧急
        status: 'int',          //状态：0未完成，1完成,2 已删除,3 已删除未完成

    }
};

const DateSchema = {
    name: DateDb,
    primaryKey: 'id',
    properties: {
        id: 'int',
        date_time: 'string'
    }
};

const DataSchema = {
    name: DataDb,
    primaryKey: 'id',
    properties: {
        id: 'int',
        total_day: 'int',
        total_number: 'int',
        total_finish: 'int'
    }
};

let realm = new Realm({
    schema: [
        TodoSchema,
        DataSchema,
        DateSchema,
    ]
});


// const realm = Realm.open({
//     schema: [TodoSchema],
// });
 
  /**表使用区**/
export function writeData(obj,tabName) {
    return new Promise((resolve, reject) => {
        realm.write(() => {
            realm.create(tabName, obj, true)
            resolve(true)
        })

    })
}
//查询表信息
export function queryData(tabName) {
    return new Promise((resolve, reject) => {
        let data = realm.objects(tabName);
        let newData = JSON.stringify(data);
        resolve(JSON.parse(newData))
    })
}
// 更新状态信息
export function updateStatusData(index,tabName,status){
    return new Promise((resolve, reject) => {
        realm.write(() => {
            const data = realm.objects(tabName);
            data[index].status = status;
            resolve(true)
        })
    })
}
// 更新天数信息
export function updateDayData(){
    return new Promise((resolve, reject) => {
        realm.write(() => {
            const data = realm.objects(DataDb);
            data[0].total_day = data[0].total_day + 1;
            resolve(true)
        })
    })
}
// 更新记录次数信息
export function updateNumberData(tabName){
    return new Promise((resolve, reject) => {
        realm.write(() => {
            const data = realm.objects(DataDb);
            data[0].total_number = data[0].total_number + 1;
            resolve(true)
        })
    })
}
// 更新记录日期桥准记录天数
export function updateDateData(date){
    return new Promise((resolve, reject) => {
        realm.write(() => {
            const data = realm.objects(DateDb);
            data[0].date_time = date;
            resolve(true)
        })
    })
}

// 更新已完成次数统计信息
export function updateFinishData(){
    return new Promise((resolve, reject) => {
        realm.write(() => {
            const data = realm.objects(DataDb);
            data[0].total_finish = data[0].total_finish + 1;
            resolve(true)
        })
    })
}

// 更新id信息
export function updateIdData(){
    return new Promise((resolve, reject) => {
        realm.write(() => {
            const data = realm.objects(DateDb);
            data[0].id = data[0].id + 1;
            resolve(true)
        })
    })
}
//清空表
export function deleteAllData(tabName) {
    return new Promise((resolve, reject) => {
        realm.write(() => {
            let data = realm.objects(tabName);
            realm.delete(arrays);
            resolve(true)
        })
    })
}
//软删除一条信息
export function deleteRowData(index,tabName,) {
    return new Promise((resolve, reject) => {
        realm.write(() => {
            const data = realm.objects(tabName);
            // 如果等于0，表示未完成就删除
            if(data[index].status == 0){
                data[index].status = 3;
            }else{
                // 标识已完成删除
                data[index].status = 2;
            }
            resolve(true)
        })
    })
}
//删除一条信息
export function deleteData(id,tabName) {
    return new Promise((resolve, reject) => {
        realm.write(() => {
            let data = realm.objects(tabName);
            let rowData = data.filtered('id ==' + id);
            realm.delete(rowData);
            resolve(true)
        })
    })
}


