

import * as types from '../mutation-types'
import { getOpcDatas } from '@/api/getData'

export default {
    state: {
        connect: false,
        opcItem: null,
        opcData: [],
    },
    actions: {
        /**
        * 获取opcData数据
        * @param {Object} commit 
        */
        async getOpcData({ commit }) {
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
    },
    mutations: {
        /**
         * 连接socket.io时触发
         * 获取opcData数据,保存opcData数据
         */
        SOCKET_CONNECT: async (state, status) => {
            console.log('socket.io connected');
            state.connect = true;
            try {
                const res = await getOpcDatas();
                if (res.status === 1) {
                    state.opcData = res.data;
                } else {
                    state.opcData = [];
                    throw new Error(res);
                }
            } catch (err) {
                console.log('有问题！', err);
            }
        },
        /**
         * 收到主题为device类型的数据时候
         */
        SOCKET_DEVICE: (state, data) => {
            state.opcItem = data;

            let obj = state.opcData.find(item => item.id === data.id);
            if (obj) {
                obj.value = data.value;
                obj.timer = data.timer;
            }

        },
        /**
         * 有commit saveOpcData 的提交时触发
         * 保存opcData数据
         * 
         * @param {Object} state 
         * @param {Object} opcDatas 
         */
        saveOpcData(state, opcDatas) {
            state.opcData = opcDatas;
        }
    }
}