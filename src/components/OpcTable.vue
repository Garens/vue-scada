<template>
    <div class="page-table">
        <Table :data="opcData" :columns="tableColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageTotal" :current="1" @on-change="changePage" show-sizer></Page>
            </div>
        </div>
    
        <Modal v-model="isShowModal" :title="modalTitle" @on-ok="subModal" @on-cancel="cancelModal">
            <Form :model="formItem" :label-width="80">
                <Form-item label="tagName">
                    <Input v-model="formItem.tagName" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="类别">
                    <Select v-model="formItem.type" placeholder="请选择">
                        <Option value="int">Int</Option>
                        <Option value="string">String</Option>
                    </Select>
                </Form-item>
                <Form-item label="默认值">
                    <Input v-model="formItem.value" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="描述">
                    <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    data() {
        return {
            isShowModal: false,         //是否显示弹出框
            modalTitle: '编辑',           //对话框标题
            formItem: {},               //弹出框的form数据
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
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.editItem(params)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.ctrlToOpc(params)
                                    }
                                }
                            }, '控制'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.ctrlToWeb(params)
                                    }
                                }
                            }, '模拟')
                        ]);
                    }
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            opcItem: 'opcItem'
        }),
        opcData() {
            return this.$store.state.opc.opcData;
        }
    },
    watch: {
        opcItem: 'watchOpcItem'
    },
    mounted() {
        this.formItem = {
            tagName: '',
            type: '',
            value: '',
            desc: ''
        }
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
    methods: {
        /**
         * 点击对话框的取消
         */
        cancelModal() {
            console.log(2);
        },
        /**
         * 点击对话框的“确定”
         */
        subModal() {
            console.log(this.formItem);
            this.$http.post('/api/changeItem', this.formItem).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        },
        /**
         * 模拟数据至前端页面
         * @param {Object} item 当前行对象
         */
        ctrlToWeb(item) {
            console.log(item);
        },
        /**
         * 模拟数据至底层
         * @param {Object} item 当前行对象
         */
        ctrlToOpc(item) {
            console.log(item);
        },
        /**
         * 编辑数据
         * @param {Object} item 当前行对象
         */
        editItem(item) {
            console.log(item);
            this.isShowModal = true;
            this.formItem = item.row;
        },
        /**
         * 监视opcItem数据变化
         */
        watchOpcItem(val, old) {
            if (val) {
                // this.tableData = [];
                // this.tableData.push(val);
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
                if (!ret.data.flag) {
                    console.log('请求数据出错。');
                }
                var data = ret.data.data;
                _this.tableData = data;
            }).catch(function (err) {
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
