<template>
  <div class="dashboard-container">
    <div class="dashboard-text">数据报表制作</div>
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getExcelDemo2 } from '@/api/get_excel'
import { getList } from '@/api/table'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  // data () {
  //   return {
  //     list: [],
  //   }
  // },
  mounted() {
    this.get_data()
  },
  methods: {
    get_data() {
      // getList().then((res) => {
      //   console.log(res)
        // getExcelDemo1(res.data.items)
        getExcelDemo2()
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
