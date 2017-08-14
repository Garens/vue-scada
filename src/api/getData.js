/**
 * Vuex中获取数据入口
 * @author garens
 * date: 2017年8月14日10:09:01
 */

import axios from 'axios'
import fetch from '@/config/fetch'

export const getOpcDatas = data => fetch('get', '/api/getAllOpcData');
