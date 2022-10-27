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
        <!--        <el-form-item label="数据来源" :label-width="formLabelWidth">-->
        <!--          <el-cascader :props="props" placeholder="请选择单位和部门" style="width: 50%" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="文件类型" :label-width="formLabelWidth">-->
        <!--          <el-select v-model="value" placeholder="请选择文件类型" style="width: 30%">-->
        <!--            <el-option-->
        <!--              v-for="item in fileTaypes"-->
        <!--              :key="item.value"-->
        <!--              :label="item.label"-->
        <!--              :value="item.value"-->
        <!--            />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <div class="uploadCard">
          <el-upload
            :limit="2"
            :on-exceed="handleExceed"
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
export default {
  name: 'Dashboard',
  data() {
    return {
      value: '信息资产基础信息表',
      excelIndex: 11,
      // fileTaypes: [{
      //   value: '信息资产基础信息表',
      //   label: '资产信息表'
      // }, {
      //   value: '汇总表',
      //   label: '汇总表'
      // }],
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
        postName: '中国地震局台网中心', // 单位名称
        cabinetUStart: '', // 机柜起点
        cabinetUEnd: '', // 机柜终点
        shelfOff: '', // 是否可下架
        dataSources: '', // 数据来源
        insertUserId: '', // 数据插入用户
        remarks: '', // 备注
        status: '', // 标志位
        equipmentName: '', // 设备名称
        businessSyste: '', // 所属系统
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
      appLinksInfo: [] // 服务用户信息
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
        const sheet2JSONOpts = {
          /** Default value for null/undefined values */
          defval: ''// 给defval赋值为空的字符串
        }
        const outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], sheet2JSONOpts)
        var filetype = Object.keys(outdata[0])[0]
        // console.log(Object.keys(outdata[0]))
        // debugger
        // 获取 Excel 表头 判断 是否为同一文件类型
        if (_this.value === filetype) {
          _this.getBaseinfo(outdata)
          // console.log(_this.equipmentBaseInfo)
          // debugger
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
          // debugger
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
      var index = this.excelIndex + 1
      while (index < outdata.length) {
        if (Object.values(outdata[index])[0] === '专用软件信息') {
          // console.log('专用软件信息', outdata[index])
          // console.log(index)
          index = index + 2
          for (;index < outdata.length; index++) {
            if (Object.values(outdata[index])[0] !== '系统用户信息') {
              var appSoftwareData = {
                softwareLiaisonName: '', // 联系人
                softwareLiaisonNum: '', // 联系人电话号码
                softwareOnlineTime: '', // 上线时间
                softwareName: '', // 名称
                softwarePort: '', // 端口
                softwareDevelopCompany: '', // 研发单位
                softwareEdition: '' // 版本
              }
              appSoftwareData.softwareName = Object.values(outdata[index])[0]
              appSoftwareData.softwareEdition = Object.values(outdata[index])[2]
              appSoftwareData.softwarePort = Object.values(outdata[index])[3]
              appSoftwareData.softwareOnlineTime = Object.values(outdata[index])[4]
              appSoftwareData.softwareDevelopCompany = Object.values(outdata[index])[5]
              appSoftwareData.softwareLiaison = Object.values(outdata[index])[6]
              this.appSoftware.push(appSoftwareData)
            } else {
              break
            }
            // console.log('系统用户信息', this.appSoftware)
          }
        }
        if (Object.values(outdata[index])[0] === '系统用户信息') {
          // console.log(Object.values(outdata[index]))
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
              appSystemUserData.userName = Object.values(outdata[index])[0]
              appSystemUserData.realName = Object.values(outdata[index])[1]
              appSystemUserData.userLevel = Object.values(outdata[index])[2]
              appSystemUserData.remoteAccessMode = Object.values(outdata[index])[5]
              appSystemUserData.localAccessMode = Object.values(outdata[index])[4]
              appSystemUserData.createData = Object.values(outdata[index])[6]
              appSystemUserData.other = Object.values(outdata[index])[7]
              this.appSystemUser.push(appSystemUserData)
            } else {
              break
            }
          }
          this.excelIndex = index
        }
        // console.log(index)
        if (Object.values(outdata[index])[0] === '业务应用') {
          index = index + 2
          for (;index < outdata.length; index++) {
            if (Object.values(outdata[index])[0] !== '存  储' && Object.values(outdata[index])[0] !== '') {
              var appBusinessData = {
                ICPNum: '', // ICP
                userScope: '', // 用户范围
                domainName: '', // HTTP/FTP
                businessName: '' // 域名地址
              }
              appBusinessData.domainName = Object.values(outdata[index])[0]
              appBusinessData.businessName = Object.values(outdata[index])[1]
              appBusinessData.userScope = Object.values(outdata[index])[2]
              appBusinessData.ICPNum = Object.values(outdata[index])[3]
              this.appBusiness.push(appBusinessData)
            } else {
              break
            }
          }
        }
        // console.log(index)
        // console.log(this.appBusiness)
        // debugger
        // if (Object.values(outdata[index])[0] === 'FTP应用') {
        //   index = index + 1
        //   for (;index < outdata.length; index++) {
        //     if (Object.values(outdata[index])[0] !== '存  储') {
        //       var appBusinessDatas = {
        //         ICPNum: '', // ICP
        //         userScope: '', // 用户范围
        //         domainName: 'FTP', // HTTP/FTP
        //         businessName: '' // 应用
        //       }
        //       appBusinessDatas.businessName = outdata[index].信息资产基础信息表
        //       appBusinessDatas.userScope = outdata[index].__EMPTY_6
        //       appBusinessDatas.ICPNum = outdata[index].__EMPTY_4
        //       this.appBusiness.push(appBusinessDatas)
        //     } else {
        //       break
        //     }
        //   }
        // }
        if (Object.values(outdata[index])[0] === '存  储') {
          index = index + 2
          for (;index < outdata.length; index++) {
            if (Object.values(outdata[index])[0] !== '本  机  存  储' && Object.values(outdata[index])[0] !== '') {
              var appStoreConfig = {
                volume: '', // 卷
                SAN_NAS: '',
                capacity: '' // 已用信息
              }
              var appStoredata = Object.values(outdata[index])
              // console.log(appStoredata)
              appStoreConfig.volume = appStoredata[0]
              appStoreConfig.SAN_NAS = appStoredata[2]
              appStoreConfig.capacity = appStoredata[3]
              this.appStore.push(appStoreConfig)
            } else {
              break
            }
          }
          // console.log(this.appStore)
          // debugger
        }
        if (Object.values(outdata[index])[0] === '本  机  存  储') {
          index = index + 2
          // console.log(index)
          // console.log(outdata[index])
          // debugger
          if (outdata[index] !== undefined) {
            if (Object.values(outdata[index])[0] !== '') {
              var NativeStoredata = Object.values(outdata[index])
              this.appNativeStore.totalCapacity = NativeStoredata[0]
              this.appNativeStore.usedSpace = NativeStoredata[1]
              this.appNativeStore.unusedSpace = NativeStoredata[2]
              this.appNativeStore.annualGrowthSpace = NativeStoredata[3]
            }
          }
        }
        // console.log('本机存储', this.appNativeStore)
        index += 1
      }
    },
    // 右一列专用软件信息
    appSoftwareSeLi(outdata) {
      var index = this.excelIndex
      // console.log(Object.values(outdata[index]))
      while (index < outdata.length) {
        if (Object.values(outdata[index])[4] === '访问权限') {
          index = index + 2
          // console.log(Object.values(outdata[index]))
          this.appAccessRights.intranet = Object.values(outdata[index])[4]
          this.appAccessRights.industryNetwork = Object.values(outdata[index])[5]
          this.appAccessRights.internet = Object.values(outdata[index])[6]
          this.appAccessRights.other = Object.values(outdata[index])[7]
        }
        if (Object.values(outdata[index])[4] === '服务用户信息') {
          index = index + 2
          for (;index < outdata.length; index++) {
            if (Object.values(outdata[index])[4] !== '') {
              var appLinksData = {
                company: '',
                userName: '',
                ipAddress: '',
                other: ''
              }
              appLinksData.company = Object.values(outdata[index])[4]
              appLinksData.userName = Object.values(outdata[index])[5]
              appLinksData.ipAddress = Object.values(outdata[index])[6]
              appLinksData.other = Object.values(outdata[index])[7]
              // console.log(appLinksData)
              this.appLinksInfo.push(appLinksData)
            }
          }
          // console.log(this.appLinksInfo)
          // debugger
        }
        index += 1
      }
      // console.log('访问权限', this.appAccessRights)
      // console.log('服务用户信息', this.appLinksInfo)
    },
    // 网络信息 端口协议信息
    getPortagreement(outdata) {
      var j = this.excelIndex + 5
      var index = this.excelIndex + 2
      var endIndex = this.excelIndex + 4
      for (; index < endIndex; index++) {
        var networkCoinfig = {
          networkCardName: '', // 网卡
          networkCardPort: '', // 端口
          macAddress: '', // MAC地址
          switchInfo: '', // 交换机
          ipAddress: '' // IP地址
        }
        networkCoinfig.networkCardName = Object.values(outdata[index])[0]
        networkCoinfig.ipAddress = Object.values(outdata[index])[1]
        networkCoinfig.macAddress = Object.values(outdata[index])[2] + Object.values(outdata[index])[3]
        networkCoinfig.switchInfo = Object.values(outdata[j])[1] + Object.values(outdata[j])[2]
        networkCoinfig.networkCardPort = Object.values(outdata[j])[3]
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
      networkCoinfigs.networkCardName = Object.values(outdata[j])[0]
      networkCoinfigs.switchInfo = Object.values(outdata[j])[1] + Object.values(outdata[j])[2]
      networkCoinfigs.networkCardPort = Object.values(outdata[j])[3]
      this.network.push(networkCoinfigs)
      // console.log('网络信息', this.network)
      // debugger
      // 获取协议端口信息
      for (var indexs = this.excelIndex + 2; indexs < outdata.length; indexs++) {
        var protocolPortConfig = {
          networkCardPort: '', // 端口
          appName: '', // 应用名称
          protocolName: '' // 协议
        }
        // console.log(Object.values(outdata[indexs]))
        if (Object.values(outdata[indexs])[0] !== '业  务  应  用  信  息') {
          if (Object.values(outdata[indexs])[4] !== '') {
            // console.log(outdata[i])
            protocolPortConfig.protocolName = Object.values(outdata[indexs])[4]
            protocolPortConfig.appName = Object.values(outdata[indexs])[5]
            protocolPortConfig.networkCardPort = Object.values(outdata[indexs])[7]
            this.protocolPort.push(protocolPortConfig)
          }
        } else {
          break
        }
      }
      this.excelIndex = indexs
      // console.log('端口协议', this.protocolPort)
    },
    // 获取配置信息  通用软件信息
    getConfig(outdata) {
      // console.log(Object.values(outdata[11]))
      var index = 11
      // console.log(Object.values(outdata[10])[1])
      for (;index < outdata.length; index++) {
        // console.log(outdata[index])
        if (Object.values(outdata[index])[0] !== '网络信息') {
          // console.log(Object.values(outdata[index]))
          var config = {
            frequency: '', // 频率
            projectName: '', // 项目
            corenessOrCapacity: '', // 核数
            quantity: '' // 数量
          }
          // console.log(outdata[index])
          config.frequency = this.underfindTrans(Object.values(outdata[index])[1]) // 性能指标 频率
          config.projectName = this.underfindTrans(Object.values(outdata[index])[0]) // 项目
          config.corenessOrCapacity = this.underfindTrans(Object.values(outdata[index])[2]) // 容量 核数
          config.quantity = this.underfindTrans(Object.values(outdata[index])[3]) // 数量
          this.config.push(config)
          var software = {
            type: '', // 类型
            edition: '', // 版本
            project: '', // 项目
            projectName: '' // 名称
          }
          if (Object.values(outdata[index])[4] !== '') {
            software.project = Object.values(outdata[index])[4]
            software.projectName = Object.values(outdata[index])[5]
            software.edition = Object.values(outdata[index])[6]
            software.type = Object.values(outdata[index])[7]
            this.software.push(software)
          }
        } else {
          break
        }
      }
      this.excelIndex = index
      // console.log(index)
      // console.log('配置信息', this.config)
      // console.log('通用软件信息', this.software)
    },
    // 获取基本信息
    getBaseinfo(outdata) {
      this.equipmentBaseInfo.equipmentName = this.underfindTrans(Object.values(outdata[0])[2] + Object.values(outdata[0])[3], '设备名称')// 设备名称
      this.equipmentBaseInfo.businessSyste = this.underfindTrans(Object.values(outdata[0])[6] + Object.values(outdata[0])[7], '所属系统')// 所属系统
      this.equipmentBaseInfo.hostName = this.underfindTrans(Object.values(outdata[1])[1] + Object.values(outdata[1])[2], '主机名') // 主机名
      this.equipmentBaseInfo.departmentName = this.underfindTrans(Object.values(outdata[1])[4] + Object.values(outdata[1])[5], '部门') // 部门
      this.equipmentBaseInfo.basicInfoId = this.underfindTrans(Object.values(outdata[1])[7], '编号') // 编号
      this.equipmentBaseInfo.equipmentTypeName = Object.values(outdata[1])[7].split('-')[1] // 涉笔类型
      this.equipmentBaseInfo.equipmentAdminName = this.underfindTrans(Object.values(outdata[2])[1], '设备管理员') // 设备管理员
      this.equipmentBaseInfo.equipmentAdminPhone = this.underfindTrans(Object.values(outdata[2])[3], '设备管理员电话号码')
      this.equipmentBaseInfo.appAdminName = this.underfindTrans(Object.values(outdata[2])[5], '应用管理员') // 应用管理员
      this.equipmentBaseInfo.appAdminPhone = this.underfindTrans(Object.values(outdata[2])[7], '应用管理员电话号码') // 是否可// 迁移
      this.equipmentBaseInfo.businessOrExperimental = this.statusTrans(Object.values(outdata[3])[1])// 业务机试验机
      this.equipmentBaseInfo.mainOrBackup = this.statusTrans(Object.values(outdata[3])[3]) // 主机 备机
      this.equipmentBaseInfo.tureOrVirtual = this.statusTrans(Object.values(outdata[3])[5]) // 实体机虚拟机
      this.equipmentBaseInfo.migratable = this.statusTrans(Object.values(outdata[3])[7]) // 是否迁移
      this.equipmentBaseInfo.brandName = this.underfindTrans(Object.values(outdata[6])[0] + Object.values(outdata[6])[1], '品牌') // 品牌
      this.equipmentBaseInfo.brandModelName = this.underfindTrans(Object.values(outdata[6])[2] + Object.values(outdata[6])[3], '型号') // 型号
      this.equipmentBaseInfo.machineRoomName = this.underfindTrans(Object.values(outdata[6])[4] + Object.values(outdata[6])[5], '安装位置') // 安装位置
      var cabinetName = Object.values(outdata[6])[6] + Object.values(outdata[6])[7]
      cabinetName = cabinetName.split('-')[0]
      this.equipmentBaseInfo.cabinetName = this.underfindTrans(cabinetName, '机柜号')
      this.equipmentBaseInfo.serialNumber = this.underfindTrans(Object.values(outdata[8])[0] + Object.values(outdata[8])[1], '序列号') // 序列号
      this.equipmentBaseInfo.guaranteePeriod = this.underfindTrans(Object.values(outdata[8])[2] + Object.values(outdata[8])[3], '保修期') // 保修期
      this.equipmentBaseInfo.onlineTime = this.underfindTrans(Object.values(outdata[8])[4] + Object.values(outdata[8])[5], '上线时间') // 上线时间
      this.equipmentBaseInfo.offlineTime = this.underfindTrans(Object.values(outdata[8])[6] + Object.values(outdata[8])[7], '下线时间') // 下线时间
      // console.log(this.equipmentBaseInfo)
      // debugger
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
    // underfind值转换
    underfindTrans(status, part) {
      if (status === '' && part !== '') {
        this.$message({
          type: 'error',
          message: part + '不能为空'
        })
        this.$refs.myUpload.clearFiles()
        this.fileList = []
        this.excelData = {
          total: 0,
          equipments: {}
        }
      } else if (status === undefined) {
        return ''
      } else {
        return status
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
    },
    // 数量限制
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      this.equipments = []
      this.$refs.myUpload.clearFiles()
      this.fileList = []
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

</style>
