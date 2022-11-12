<template>
    <div>
        单独文件导出进度
        <el-progress :percentage="pgs.per1" ></el-progress>
        总导出进度
        <el-progress :percentage="pgs.per2" :format="format"></el-progress>
        <h3>{{info}}</h3>
    </div>
</template>
<script>
export default {
  data () {
    return {
      pgs:{
        per1:0,
        per2:0,
      },
      info:""
    }
  },
  created() {
    this.test()
  },
  methods: {
    test(){
      let _this = this
      let num = 0
      let LocalStorage = window.localStorage
      let item = setInterval(()=>{
        num ++ 
        let report_info = LocalStorage.getItem('report_form_info')
        if(num >= 20 && !report_info){
          clearInterval(item)
          if(_this.pgs.per2 == 100){
            _this.info = "导出成功"
          }
        }
        if(!report_info) return
        let item_list = report_info.split(";")
        let now_sub = 0
        let sun_num_list = [0,0]
        report_info = [item_list[0].split(","),item_list[1].split(',')]
        for(let i in report_info[1]){
          if(report_info[1][i] != "0"){
            now_sub = parseInt(i)
          }
          sun_num_list[0] += parseInt(report_info[0][i]) 
          sun_num_list[1] += parseInt(report_info[1][i]) 
        }
        _this.pgs.per1 = parseInt((parseInt(report_info[1][now_sub]) / parseInt(report_info[0][now_sub]))*100)
        _this.pgs.per2 = parseInt((sun_num_list[1] / sun_num_list[0])*100)
      },200)
    },
    format(percentage) {
      return percentage === 100 ? '✔️️' : `${percentage}%`;
    }
  }
};
</script>