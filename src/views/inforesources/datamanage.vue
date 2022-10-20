<template>
  <div class="dashboard-container">
    <el-col :span="24">
      <el-card shadow="always" class="card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-upload2" /> 数据库管理</span>
        </div>
        <el-row :gutter="20" style="margin-bottom: 2vh">
          <el-col :span="4"><el-button type="primary" size="small" @click="dialogFormVisible = true">导入Excel文件</el-button></el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%"
          show-header
          border
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
        >
          <el-table-column
            label="序号"
            width="250"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="数据库"
            width="250"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button size="mini"><i class="el-icon-edit" />数据同步</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-dialog title=" 数据导入详情" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm">
        <el-form-item label="数据来源" :label-width="formLabelWidth">
          <el-cascader :props="props" placeholder="请选择单位和部门" style="width: 50%" />
        </el-form-item>
        <el-form-item label="文件类型" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择文件类型" style="width: 30%">
            <el-option
              v-for="item in fileTaypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <div class="uploadCard">
          <el-upload
            ref="myUpload"
            class="upload-demo"
            action=""
            :multiple="true"
            :on-change="handleChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过5个。</div>
          </el-upload>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { importExcel } from '@/api/import'
let id = 0
export default {
  name: 'Dashboard',
  data() {
    return {
      value: '',
      fileTaypes: [{
        value: '信息资产基础信息表',
        label: '资产信息表'
      }, {
        value: '汇总表',
        label: '汇总表'
      }],
      name: '',
      dialogFormVisible: false,
      tableData: [{
        date: '1',
        name: 'irms'
      }],
      dialogForm: {},
      formLabelWidth: '120px',
      fileList: [],
      excelData: {
        total: 0,
        equipments: {}
      },
      equipments: [],
      equipment: {
        equipmentBaseInfo: {},
        software: [],
        network: [],
        config: [],
        protocolPort: [],
        appLinksInfo: [],
        appAccessRights: [],
        appNativeStore: [],
        appSystemUser: [],
        appBusiness: [],
        appSoftware: [],
        appStore: []
      },
      // 基础性
      equipmentBaseInfo: {
        equipmentId: '', //  设备id
        equipmentTypeName: '', // 设备类型
        postName: '', // 单位名称
        cabinetUStart: '', // 机柜起点
        cabinetUEnd: '', // 机柜终点
        shelfOff: '', // 是否可下架
        dataSources: '', // 数据来源
        insertUserId: '', // 数据插入用户
        remarks: '', // 备注
        status: '', // 标志位
        equipmentName: '', // 设备名称
        hostName: '', // 主机名
        departmentName: '', // 部门
        basicInfoId: '', // 编号
        equipmentAdminName: '', // 设备管理员
        equipmentAdminPhone: '',
        appAdminName: '', // 应用管理员
        appAdminPhone: '',
        businessOrExperimental: '', // 业务机试验机
        mainOrBackup: '', // 主机 备机
        tureOrVirtual: '', // 实体机虚拟机
        migratable: '', // 是否可迁移
        brandName: '', // 品牌
        brandModelName: '', // 型号
        machineRoomName: '', // 安装位置
        cabinetName: '', // 机柜号
        serialNumber: '', // 序列号
        guaranteePeriod: '', // 保修期
        onlineTime: '', // 上线时间
        offlineTime: '' // 下线时间
      },
      config: [], // 配置信息
      software: [], // 通用软件信息
      network: [], // 网络信息
      protocolPort: [], // 端口协议
      appSoftware: [], // 专用软件信息
      appSystemUser: [], // 系统用户信息
      appBusiness: [], // 业务应用
      appStore: [], // 存储
      appNativeStore: { // 本机存储
        unusedSpace: '', // 未用空间
        totalCapacity: '', // 总容量
        usedSpace: '', // 已用空间
        annualGrowthSpace: '' // 年度增长空间
      },
      appAccessRights: {
        intranet: '', // 内网
        industryNetwork: '', // 行业网
        internet: '', // 互联网
        other: '' // 其他
      },
      appLinksInfo: [], // 服务用户信息
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 })
              .map(item => ({
                value: ++id,
                label: `单位${id}`,
                leaf: level >= 2
              }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      }
    }
  },
  methods: {
    // 选择文件
    handleChange(file, fileList) {
      // let file = file.files[0] // 使用传统的input方法需要加上这一步
      // const self = this
      const types = file.name.split('.')[1]
      // const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
      //   item => item === types
      // )
      this.fileTemp = file.raw
      if (this.fileTemp) {
        if ((types === 'xlsx') || (types === 'xlc') || (types === 'xlm') || (types === 'xls') || (types === 'xlt') || (types ===
          'xlw') || (types === 'csv')) {
          this.fileList.push(file.raw)
        } else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请重新上传！'
          })
          this.$refs.myUpload.clearFiles() // 清空 filelist
          // this.dialogFormVisible = false // 关闭痰喘
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
      }
      // console.log(this.fileList)
    },
    // 上传文件
    submitUpload() {
      if (this.fileList.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择文件！'
        })
      } else if (this.filetype === '') {
        this.$message({
          type: 'error',
          message: '请选择文件类型！'
        })
        this.$refs.myUpload.clearFiles()
        // this.dialogFormVisible = false // 关闭痰喘
      } else {
        for (var i = 0; i < this.fileList.length; i++) {
          this.importfile(this.fileList[i])
        }
      }
    },
    // 读取文件
    importfile(obj) {
      const reader = new FileReader()
      const _this = this
      reader.readAsArrayBuffer(obj)
      reader.onload = function() {
        const buffer = reader.result
        const bytes = new Uint8Array(buffer)
        const length = bytes.byteLength
        let binary = ''
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        const XLSX = require('xlsx')
        const wb = XLSX.read(binary, {
          type: 'binary'
        })
        // console.log(wb)
        const outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        var filetype = Object.keys(outdata[0])[0]
        // 获取 Excel 表头 判断 是否为同一文件类型
        if (_this.value === filetype) {
          // console.log(outdata)
          _this.getBaseinfo(outdata)
          _this.getConfig(outdata)
          _this.getPortagreement(outdata)
          _this.appSoftwareFir(outdata)
          _this.appSoftwareSeLi(outdata)
          _this.equipment.equipmentBaseInfo = _this.equipmentBaseInfo
          _this.equipment.software = _this.software
          _this.equipment.network = _this.network
          _this.equipment.config = _this.config
          _this.equipment.protocolPort = _this.protocolPort
          _this.equipment.appLinksInfo = _this.appLinksInfo
          _this.equipment.appAccessRights = _this.appAccessRights
          _this.equipment.appNativeStore = _this.appNativeStore
          _this.equipment.appSystemUser = _this.appSystemUser
          _this.equipment.appBusiness = _this.appBusiness
          _this.equipment.appSoftware = _this.appSoftware
          _this.equipment.appStore = _this.appStore
          _this.equipments.push(_this.equipment)
          _this.excelData.equipments = _this.equipments
          _this.excelData.total = _this.equipments.length
          console.log('所有数据', _this.equipments)
          importExcel(_this.excelData).then((res) => {
            console.log(res.data)
            _this.dialogFormVisible = false
          })
          _this.equipments = []
          _this.$refs.myUpload.clearFiles()
          _this.fileList = []
          // console.log(_this.equipmentBaseInfo)
        } else {
          _this.$message({
            type: 'error',
            message: '请选择正确的文件类型！'
          })
          _this.$refs.myUpload.clearFiles()
          _this.fileList = []
        }
        // const ws = wb.Sheets[workbook.SheetNames[0]]
      }
    },
    // 获取专用软件信息
    appSoftwareFir(outdata) {
      // console.log('专用软件信息', outdata)
      var index = 27
      while (index < outdata.length) {
        if (Object.values(outdata[index])[0] === '专用软件信息') {
          // console.log('专用软件信息', outdata[index])
          // console.log(index)
          index = index + 2
          for (;index < outdata.length; index++) {
            // console.log(outdata[index])
            if (Object.values(outdata[index])[0] !== '系统用户信息') {
              var appSoftwareData = {
                softwareLiaison: '', // 联系人
                softwareOnlineTime: '', // 上线时间
                softwareName: '', // 名称
                softwarePort: '', // 端口
                softwareDevelopCompany: '', // 研发单位
                softwareEdition: '' // 版本
              }
              appSoftwareData.softwareName = outdata[index].信息资产基础信息表
              appSoftwareData.softwareEdition = outdata[index].__EMPTY_4
              appSoftwareData.softwarePort = outdata[index].__EMPTY_6
              appSoftwareData.softwareOnlineTime = outdata[index].__EMPTY_8
              appSoftwareData.softwareDevelopCompany = outdata[index].__EMPTY_9
              appSoftwareData.softwareLiaison = outdata[index].__EMPTY_10
              this.appSoftware.push(appSoftwareData)
            } else {
              break
            }
            // console.log('系统用户信息', this.appSoftware)
          }
        }
        if (Object.values(outdata[index])[0] === '系统用户信息') {
          index = index + 3
          for (;index < outdata.length; index++) {
            // console.log(outdata[index])
            if (Object.values(outdata[index])[0] !== '业务应用') {
              var appSystemUserData = {
                userName: '', // 用户名
                realName: '', // 使用人
                localAccessMode: '', // 本地
                userLevel: '', // 级别权限
                remoteAccessMode: '', // 远程
                createData: '', // 创建时间
                other: '' // 其他
              }
              appSystemUserData.userName = outdata[index].信息资产基础信息表
              appSystemUserData.realName = outdata[index].__EMPTY_3
              appSystemUserData.userLevel = outdata[index].__EMPTY_4
              appSystemUserData.remoteAccessMode = outdata[index].__EMPTY_8
              appSystemUserData.localAccessMode = outdata[index].__EMPTY_9
              appSystemUserData.createData = outdata[index].__EMPTY_10
              appSystemUserData.other = outdata[index].__EMPTY_11
              this.appSystemUser.push(appSystemUserData)
            } else {
              break
            }
          }
          // console.log('系统用户信息', this.appSystemUser)
        }
        if (Object.values(outdata[index])[0] === 'HTTP应用') {
          index = index + 1
          for (;index < outdata.length; index++) {
            if (Object.values(outdata[index])[0] !== 'FTP应用') {
              var appBusinessData = {
                ICPNum: '', // ICP
                userScope: '', // 用户范围
                domainName: 'HTTP', // HTTP/FTP
                businessName: '' // 应用
              }
              appBusinessData.businessName = outdata[index].信息资产基础信息表
              appBusinessData.userScope = outdata[index].__EMPTY_6
              appBusinessData.ICPNum = outdata[index].__EMPTY_4
              this.appBusiness.push(appBusinessData)
            } else {
              break
            }
          }
        }
        if (Object.values(outdata[index])[0] === 'FTP应用') {
          index = index + 1
          for (;index < outdata.length; index++) {
            if (Object.values(outdata[index])[0] !== '存  储') {
              var appBusinessDatas = {
                ICPNum: '', // ICP
                userScope: '', // 用户范围
                domainName: 'FTP', // HTTP/FTP
                businessName: '' // 应用
              }
              appBusinessDatas.businessName = outdata[index].信息资产基础信息表
              appBusinessDatas.userScope = outdata[index].__EMPTY_6
              appBusinessDatas.ICPNum = outdata[index].__EMPTY_4
              this.appBusiness.push(appBusinessDatas)
            } else {
              break
            }
          }
        }
        if (Object.values(outdata[index])[0] === '存  储') {
          index = index + 2
          for (;index < outdata.length; index++) {
            // console.log(outdata[index])
            if (Object.values(outdata[index])[0] !== '本  机  存  储') {
              var appStoreConfig = {
                volume: '', // 卷
                SAN_NAS: '',
                capacity: '' // 已用信息
              }
              var appStoredata = Object.values(outdata[index])
              // console.log(appStoredata)
              appStoreConfig.volume = appStoredata[0]
              appStoreConfig.SAN_NAS = appStoredata[1]
              appStoreConfig.capacity = appStoredata[2]
              this.appStore.push(appStoreConfig)
            } else {
              break
            }
          }
        }
        // console.log('存储', this.appStore)
        if (Object.values(outdata[index])[0] === '本  机  存  储') {
          index = index + 2
          var NativeStoredata = Object.values(outdata[index])
          this.appNativeStore.totalCapacity = NativeStoredata[0]
          this.appNativeStore.usedSpace = NativeStoredata[1]
          this.appNativeStore.unusedSpace = NativeStoredata[2]
          this.appNativeStore.annualGrowthSpace = NativeStoredata[3]
        }
        // console.log('本机存储', this.appNativeStore)
        // debugger
        index += 1
      }
    },
    // 右一列专用软件信息
    appSoftwareSeLi(outdata) {
      var index = 27
      while (index < outdata.length) {
        if (Object.values(outdata[index])[1] === '访问权限') {
          index = index + 2
          // console.log(outdata[index])
          this.appAccessRights.intranet = outdata[index].__EMPTY_8
          this.appAccessRights.industryNetwork = outdata[index].__EMPTY_9
          this.appAccessRights.internet = outdata[index].__EMPTY_10
          this.appAccessRights.other = outdata[index].__EMPTY_11
        }
        if (outdata[index].__EMPTY_8 === '服务用户信息') {
          // console.log(index)
          index = index + 2
          for (;index < outdata.length; index++) {
            if (outdata[index].__EMPTY_8 !== undefined) {
              var appLinksData = {
                company: '',
                userName: '',
                ipAddress: '',
                other: ''
              }
              appLinksData.company = outdata[index].__EMPTY_8
              appLinksData.userName = outdata[index].__EMPTY_9
              appLinksData.ipAddress = outdata[index].__EMPTY_10
              appLinksData.other = outdata[index].__EMPTY_11
              // console.log(appLinksData)
              this.appLinksInfo.push(appLinksData)
            }
          }
        }
        index += 1
      }
      // console.log('访问权限', this.appAccessRights)
      // console.log('服务用户信息', this.appLinksInfo)
      // debugger
    },
    // 网路信息 端口协议信息
    getPortagreement(outdata) {
      // console.log('获取配置信息')
      var j = 23
      for (var index = 20; index < 22; index++) {
        var networkCoinfig = {
          networkCardName: '', // 网卡
          networkCardPort: '', // 端口
          macAddress: '', // MAC地址
          switchInfo: '', // 交换机
          ipAddress: '' // IP地址
        }
        networkCoinfig.networkCardName = outdata[index].信息资产基础信息表
        networkCoinfig.ipAddress = outdata[index].__EMPTY_2
        networkCoinfig.macAddress = outdata[index].__EMPTY_6
        networkCoinfig.switchInfo = outdata[j].__EMPTY_2
        networkCoinfig.networkCardPort = outdata[j].__EMPTY_5
        this.network.push(networkCoinfig)
        j++
      }
      var networkCoinfigs = {
        networkCardName: '', // 网卡
        networkCardPort: '', // 端口
        macAddress: '', // MAC地址
        switchInfo: '', // 交换机
        ipAddress: '' // IP地址
      }
      networkCoinfigs.networkCardName = outdata[25].信息资产基础信息表
      networkCoinfigs.switchInfo = outdata[25].__EMPTY_2
      networkCoinfigs.networkCardPort = outdata[25].__EMPTY_5
      this.network.push(networkCoinfigs)
      // console.log(this.network)
      // 获取协议端口信息
      for (var i = 20; i < 26; i++) {
        var protocolPortConfig = {
          networkCardPort: '', // 端口
          appName: '', // 应用名称
          protocolName: '' // 协议
        }
        if (outdata[i].__EMPTY_8 !== undefined) {
          // console.log(outdata[i])
          protocolPortConfig.protocolName = outdata[i].__EMPTY_8
          protocolPortConfig.appName = outdata[i].__EMPTY_9
          protocolPortConfig.networkCardPort = outdata[i].__EMPTY_11
          this.protocolPort.push(protocolPortConfig)
        }
      }
      // console.log(this.protocolPort)
    },
    // 获取配置信息  通用软件信息
    getConfig(outdata) {
      for (var i = 11; i < 18; i++) {
        var config = {
          frequency: '', // 频率
          projectName: '', // 项目
          corenessOrCapacity: '', // 核数
          quantity: '' // 数量
        }
        config.frequency = outdata[i].__EMPTY_3 // 频率
        config.projectName = outdata[i].信息资产基础信息表 // 项目
        config.corenessOrCapacity = outdata[i].__EMPTY_4 // 核数
        config.quantity = outdata[i].__EMPTY_6 // 数量
        this.config.push(config)
        var software = {
          type: '', // 类型
          edition: '', // 版本
          project: '', // 项目
          projectName: '' // 名称
        }
        // 排除空数据
        if (outdata[i].__EMPTY_8 !== undefined) {
          software.project = outdata[i].__EMPTY_8
          software.projectName = outdata[i].__EMPTY_9
          software.edition = outdata[i].__EMPTY_10
          software.type = outdata[i].__EMPTY_11
          this.software.push(software)
        }
      }
      // console.log(this.config)
      // console.log('software', this.software)
    },
    // 获取基本信息
    getBaseinfo(outdata) {
      this.equipmentBaseInfo.equipmentName = Object.values(outdata[0])[1] // 设备名称
      this.equipmentBaseInfo.hostName = Object.values(outdata[1])[1] // 主机名
      this.equipmentBaseInfo.departmentName = Object.values(outdata[1])[3] // 部门
      this.equipmentBaseInfo.basicInfoId = Object.values(outdata[1])[5] // 编号
      this.equipmentBaseInfo.equipmentAdminName = Object.values(outdata[2])[1] // 设备管理员
      this.equipmentBaseInfo.equipmentAdminPhone = Object.values(outdata[2])[3]
      this.equipmentBaseInfo.appAdminName = Object.values(outdata[2])[5] // 应用管理员
      this.equipmentBaseInfo.appAdminPhone = Object.values(outdata[2])[7] // 是否可// 迁移
      this.equipmentBaseInfo.businessOrExperimental = this.statusTrans(Object.values(outdata[3])[1])// 业务机试验机
      this.equipmentBaseInfo.mainOrBackup = this.statusTrans(Object.values(outdata[3])[3]) // 主机 备机
      this.equipmentBaseInfo.tureOrVirtual = this.statusTrans(Object.values(outdata[3])[5]) // 实体机虚拟机
      this.equipmentBaseInfo.migratable = this.statusTrans(Object.values(outdata[3])[7]) // 是否迁移
      this.equipmentBaseInfo.brandName = Object.values(outdata[6])[0] // 品牌
      this.equipmentBaseInfo.brandModelName = Object.values(outdata[6])[1] // 型号
      this.equipmentBaseInfo.machineRoomName = Object.values(outdata[6])[2] // 安装位置
      this.equipmentBaseInfo.cabinetName = Object.values(outdata[6])[3]
      this.equipmentBaseInfo.serialNumber = Object.values(outdata[8])[0] // 序列号
      this.equipmentBaseInfo.guaranteePeriod = Object.values(outdata[8])[1] // 保修期
      this.equipmentBaseInfo.onlineTime = Object.values(outdata[8])[2] // 上线时间
      this.equipmentBaseInfo.offlineTime = Object.values(outdata[8])[3] // 下线时间
    },
    // 解析判断状态
    statusTrans(status) {
      status = Array.from(status)
      if (status[-1] === '□') {
        return '0'
      } else {
        return '1'
      }
    },
    // 手动移除
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 点击文件
    handlePreview(file) {
      // console.log('1111', file)
      // this.tableData.push()
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  position: absolute;
  top: 5vh;
  bottom: 5vh;
  left: 2vw;
  right: 2vw;
}
.clearfix{
  font-size: 20px;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: transparent !important;
}

.uploadCard{
  width: 80%;
  padding-left: 7%;
}
.upload-demo{
  height: 80%;
}

//.el-row {
//  margin-bottom: 20px;
//  &:last-child {
//    margin-bottom: 0;
//  }
//}
//.el-col {
//  border-radius: 4px;
//}
//.bg-purple-dark {
//  background: #99a9bf;
//}
//.bg-purple {
//  background: #d3dce6;
//}
//.bg-purple-light {
//  background: #e5e9f2;
//}
//.grid-content {
//  border-radius: 4px;
//  min-height: 36px;
//}
//.row-bg {
//  padding: 10px 0;
//  background-color: #f9fafc;
//}

</style>
