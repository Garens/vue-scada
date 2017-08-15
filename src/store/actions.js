/**
 * Vuex action
 * @author garens
 * date: 2017年8月15日10:01:20
 */

import * as types from './mutation-types'
import { getOpcDatas } from '@/api/getData'

/**
 * 获取opcData数据
 * @param {Object} commit 
 */
export const getOpcData = async ({ commit }) => {
    try {
        const res = await getOpcDatas();
        if (res.status === 1) {
            commit('saveOpcData', res.data);
        } else {
            throw new Error(res);
        }
    } catch (err) {
        console.log('有问题！', err);
    }
}