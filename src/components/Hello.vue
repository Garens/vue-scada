<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Button type="info" @click="open(false)">信息按钮</Button>
    <Button type="info" @click="test">test</Button>
    <opc-table></opc-table>
  </div>
</template>

<script>
// import PageTable from '@/components/PageTable'
import OpcTable from '@/components/OpcTable'

export default {
  name: 'hello',
  components: {
    OpcTable
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    open(nodesc) {
      this.$Notice.open({
        title: '这是通知标题',
        desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
      });
    },
    test() {
      this.open(true);
      console.log(this);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
