/**
 * 请求后台数据方法封装
 * @param {String} type 请求方式
 * @param {String} url 请求路由地址
 * @param {Object} data 要传递的参数对象
 * 
 * @author garens
 * date: 2017年8月14日11:15:19
 */

import axios from 'axios'

export default async (type = 'GET', url = '', data = {}) => {
    type = type.toUpperCase();
    if (type === 'GET') {
        var r = await axios.get(url, { params: data }).then((res) => {
            if (res.data.flag) {
                return { status: 1, data: res.data.data };
            } else {
                return { status: 0, msg: '数据操作失败' };
            }
        }).catch(err => {
            return { status: 0, msg: err };
        })
        return r;
    } else if (type === 'POST') {
        var r = await axios.post(url, data).then((res) => {
            if (res.data.flag) {
                return { status: 1, data: res.data.data };
            } else {
                return { status: 0, msg: '数据操作失败' };
            }
        }).catch(err => {
            return { status: 0, msg: err };
        })
        return r;
    }
}