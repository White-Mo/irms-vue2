/*
 * @Description: 获取数据
 * @Author:  王瑞
 * @Date: 2022-10-20 00:38:12
 * @LastEditTime: 2022-11-04 17:55:33
 */
import { getList, getdataCount } from '@/api/table'
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
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
