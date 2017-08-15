/**
 * vuex 总入口文件
 * @author garens
 * date: 2017年8月14日18:05:31
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import opc from './modules/opc'


Vue.use(Vuex)

export default new Vuex.Store({
	getters,
	actions,
	modules: {
		opc
	},
});