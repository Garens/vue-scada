import Vue from 'vue'
import Vuex from 'vuex'
// import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)



const state = {
	connect: false,
	opcItem: null,
	opcData: new Map(),
}

const mutations = {
	SOCKET_CONNECT: (state, status) => {
		console.log('socket.io connected');
		state.connect = true;
	},
	SOCKET_DEVICE: (state, data) => {
		// console.log(state, message);
		state.opcItem = data;
		var has = state.opcData.has(data.id);
		// console.log(1111, item);
		state.opcData.set(data.id, data);
	}
}

const getters = {
	opcItem: state => {
		if (state.opcItem) {
			return state.opcItem;
		}
	}
}

const actions = {
	async getOpcData({ commit }) {
		try {
			const res = await getAdminInfo();
			if (res.status == 1) {
				commit('saveOpcItem', res.data);
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