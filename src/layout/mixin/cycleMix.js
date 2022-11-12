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
        start: 0,
        limit: 5
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
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
