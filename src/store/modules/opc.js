

import * as types from '../mutation-types'
import { getOpcDatas } from '@/api/getData'

export default {
    state: {
        connect: false,
        opcItem: null,
        opcData: [],
    },
    actions: {
        
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

            state.opcData.find(item => item.id === data.id).value = data.value;
            state.opcData.find(item => item.id === data.id).timer = data.timer;

        }
    }
}