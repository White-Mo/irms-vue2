<template>
  <div style="width: 100%; height: auto; background-color: rgba(158,161,161,0.23)">
    <div></div>
  </div>
</template>

<script>
import {getInfo} from "@/api/dashboard";
import {getPost} from "@/api/select";

export default {
  name: "statisticalTable",
  data(){
    return{
      roleId:this.$store.state.user.roleid,
      userName:this.$store.state.user.post_name,
      roleName:this.$store.state.user.roles,
      businessSystemNumber: [],
      businessSonSystemNumber: [],
      fixEquipmentNumber: [],
      normalEquipmentNumber:[],
      scrapEquipmentNumber: [],
      totalEquipmentNumber:[],
      tableData:[]
    }
  },
  created() {
    let params={
      postName:this.userName,
      roleId: this.roleId,
      roleName:this.roleName[0],
    }
    getInfo(params).then(res=>{
      this.businessSystemNumber = res.data.business
      this.businessSonSystemNumber = res.data.businessSon
      this.fixEquipmentNumber = res.data.fixCount
      this.normalEquipmentNumber = res.data.normalCount
      this.scrapEquipmentNumber = res.data.scrapCount
      this.totalEquipmentNumber = res.data.subCount
    })
  },
  mounted() {
    this.handleStatisticalTable()
  },
  methods:{
    async handelPostCountData() {
      let list = []
      let result = []
      await getPost().then(response => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({ postName: list[i].postName })
      }
      return result
    },
    async handleStatisticalTable(){
      const allUnitName = await this.handelPostCountData()
      this.tableData = allUnitName.map(unit=>{
        const businessSystemNumber = this.businessSystemNumber.find(item => item[0] === unit.postName)
        console.log("+++++++++",businessSystemNumber)
      })
    }
  }
}
</script>

<style scoped>

</style>
