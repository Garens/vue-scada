<template>
    <div class="page-table">
        <Table :data="tableData" :columns="tableColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageTotal" :current="1" @on-change="changePage" show-sizer></Page>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    data() {
        return {
            pageTotal: 10,
            tableData: [],
            tableColumns: [
                {
                    title: '名称',
                    key: 'tagName'
                },
                {
                    title: '类别',
                    key: 'type'
                },
                {
                    title: '值',
                    key: 'value'
                },
                {
                    title: '描述',
                    key: 'desc'
                },
                {
                    title: '更新时间',
                    key: 'timer',
                    // render: (h, params) => {
                    //     return h('div', this.formatDate(this.tableData[params.index].update));
                    // }
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        const row = params.row;
                        row.status = 2;
                        const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red';
                        const text = row.status === 1 ? '连接中' : row.status === 2 ? '正常' : '错误';

                        return h('Tag', {
                            props: {
                                type: 'dot',
                                color: color
                            }
                        }, text);
                    }
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            opcItem: 'opcItem'
        })
    },
    watch: {
        opcItem: 'watchOpcItem'
    },
    mounted() {
        this.getOpcDataTable();
        // this.$mqtt.subscribe('device/#');
        console.log(this);
        // this.$store.state.opcData.forEach((item, key) => {
        //     this.tableData.push(item);
        // });
        // if (this.opcItem) {
        //     this.tableData.push(this.opcItem);
        // }
        // this.tableData = this.$store.state.opcData;

        // this.tableData.push(this.$store.state.opcItem);
        //this.$store.state.opcItem;
    },
    /**
     * 使用vue-socket.io连接方式
     */
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        device: (val) => {

            this.opcItem = val;
        }
    },
    /**
     * 使用vue-mqtt连接方式
     */
    // mqtt: {
    //     'device/#'(data) {
    //         // console.log(data.toString());
    //         let obj = JSON.parse(data.toString());
    //         // console.log(this.tableData);

    //         if (this.tableData.length > 20) {
    //             this.tableData.splice();
    //         }
    //         this.tableData = obj;
    //     }
    // },
    methods: {
        watchOpcItem(val, old) {
            if (val) {
                this.tableData = [];
                this.tableData.push(val);
            }
        },
        /**
         * 从数据库中获取数据列表
         */
        getOpcDataTable() {
            console.log(this);
            var _this = this;
            this.$http.get('/api/getOpcDataTable', { params: {} }).then((ret) => {
                console.log(ret.data);
                if(!ret.data.flag) {
                    console.log('请求数据出错。');
                }
                var data = ret.data.data;
                _this.tableData = data;
            }).catch(function(err) {
                console.log(err);
            });
        },
        opcTableData() {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    name: '商圈' + Math.floor(Math.random() * 100 + 1),
                    status: Math.floor(Math.random() * 3 + 1),
                    portrayal: ['城市渗透', '人群迁移', '消费指数', '生活指数', '娱乐指数'],
                    people: [
                        {
                            n: '客群' + Math.floor(Math.random() * 100 + 1),
                            c: Math.floor(Math.random() * 1000000 + 100000)
                        },
                        {
                            n: '客群' + Math.floor(Math.random() * 100 + 1),
                            c: Math.floor(Math.random() * 1000000 + 100000)
                        },
                        {
                            n: '客群' + Math.floor(Math.random() * 100 + 1),
                            c: Math.floor(Math.random() * 1000000 + 100000)
                        }
                    ],
                    time: Math.floor(Math.random() * 7 + 1),
                    update: new Date()
                })
            }
            return data;
        },
        formatDate(date) {
            const y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        },
        changePage() {
            // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
            // this.tableData = this.mockTableData();
        }
    }
}
</script>

<style>
.page-table {
    padding: 10px;
}
</style>
