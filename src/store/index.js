/**
 * vuex 总入口文件
 * @author garens
 * date: 2017年8月14日18:05:31
 */

import Vue from 'vue'
import Vuex from 'vuex'

import { getOpcDatas } from '@/api/getData'

Vue.use(Vuex)



const state = {
	connect: false,
	opcItem: null,
	opcData: [],
	dataMap: new Map()
}

const mutations = {
	/**
	 * 连接socket.io时触发
	 */
	SOCKET_CONNECT: (state, status) => {
		console.log('socket.io connected');
		state.connect = true;
		this.a.dispatch('getOpcData');
	},
	/**
	 * 收到主题为device类型的数据时候
	 */
	SOCKET_DEVICE: (state, data) => {
		state.opcItem = data;

		state.opcData.find(item => item.id === data.id).value = data.value;
		state.opcData.find(item => item.id === data.id).timer = data.timer;

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

/**
 * getters方法
 */
const getters = {
	opcItem: state => {
		if (state.opcItem) {
			return state.opcItem;
		}
	}
}

const actions = {
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
			console.log('有问题！');
		}
	}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
});