/*
 * @Description: 获取数据
 * @Author:  王瑞
 * @Date: 2022-10-20 00:38:12
 * @LastEditTime: 2022-11-24 18:34:01
 */
import {getList, getdataCount, getNetWorkList} from '@/api/table'
export const hunhe1 = {
  methods: {
    fetchData() {
      this.listLoading = true
      if (this.DataName === 'all' || this.DataName.length === 0) {
        console.log(this.DataName)
        this.initname = ['111']
      } else {
        this.initname = JSON.parse(JSON.stringify(this.DataName))
      }
      console.log(this.tab_name)
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: this.tab_name,
        start: this.start,
        limit: this.limit
      }
      const NetWork_params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: this.tab_name,
        start: this.start,
        qinfo_input:'.',
        limit: 10
      }
      const numparams = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: this.tab_name
      }
      getdataCount(numparams).then((response) => {
        this.total = response.data.total
        console.log(this.total)
        this.listLoading = false
      })
      getList(params).then((response) => {

        response.data.items.forEach(element => {
          element.isEdit = false;
        });
        //数据的空值处理，有需要就用吧
        // for (let i = 0; i < response.data.items.length; i++) {
        //   if (response.data.items[i] == null) {
        //     response.data.items.splice(i,1);
        //   }else{
        //     response.data.items[i]["isEdit"] = false;
        //   }
          
        // }
        this.list = response.data.items
        console.log(this.list)
        this.listLoading = false
      })
      getNetWorkList(NetWork_params).then((response) => {

        response.data.items.forEach(element => {
          element.isEdit = false;
        });
       let list_n = response.data.items
        console.log(list_n)
        // 数据类型转换
        let arr=[]
        for(let i=0;i<list_n.length;i++){
         let tryss = Object.assign(list_n[i][0],list_n[i][1])
          // list_n[i][0].push(list_n[i][1])
          arr.push(tryss)

          // arr1.concat(arr2);
        }
        console.log(arr)
        this.list_network = arr
        this.total_N = arr.length
        this.listLoading = false
      })
    }
  }
}
