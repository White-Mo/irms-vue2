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
  mounted() {
    let params={
      postName:this.userName,
      roleId: this.roleId,
      roleName:this.roleName[0],
    }
    getInfo(params).then(res=>{
      console.log("99999999999999",res.data)
    })
  },
  methods:{


  }
}
</script>

<style scoped>

</style>
