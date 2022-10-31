export function importfile(obj, head) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // const _this = this
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
      // 获取 Excel 表头 判断 是否为同一文件类型
      if (head === filetype) {
        resolve(outdata)
      } else {
        reject('请选择正确的文件类型！')
      }
    }
  })
}

export function getEquipment(outdata) {
  const equipment = {}
  let excelIndex = 11
  equipment.equipmentBaseInfo = getBaseinfo(outdata)

  const { softwares, configs, excelIndex: configIndex } = getConfig(outdata, excelIndex)
  excelIndex = configIndex
  equipment.config = configs
  equipment.software = softwares

  const { networks, excelIndex: portagreementIndex, protocolPorts } = getPortagreement(outdata, excelIndex)
  equipment.network = networks
  equipment.protocolPort = protocolPorts
  excelIndex = portagreementIndex

  const { appSoftwares, appStores, appSystemUsers, appBusinesses, appNativeStore, softwareFirIndex } = appSoftwareFir(outdata, excelIndex)
  equipment.appNativeStore = appNativeStore
  equipment.appSystemUser = appSystemUsers
  equipment.appBusiness = appBusinesses
  equipment.appSoftware = appSoftwares
  equipment.appStore = appStores
  excelIndex = softwareFirIndex

  const { appLinksInfo, appAccessRights } = appSoftwareSeLi(outdata, excelIndex)

  equipment.appLinksInfo = appLinksInfo
  equipment.appAccessRights = appAccessRights

  return equipment
}

function getBaseinfo(outdata) {
  const equipmentBaseInfo = {
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
    businessSystem: '', // 所属系统
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
  }
  equipmentBaseInfo.equipmentName = underfindTrans(Object.values(outdata[0])[2] + Object.values(outdata[0])[3], '设备名称')// 设备名称
  equipmentBaseInfo.businessSyste = underfindTrans(Object.values(outdata[0])[6] + Object.values(outdata[0])[7], '所属系统')// 所属系统
  equipmentBaseInfo.hostName = underfindTrans(Object.values(outdata[1])[1] + Object.values(outdata[1])[2], '主机名') // 主机名
  equipmentBaseInfo.departmentName = underfindTrans(Object.values(outdata[1])[4] + Object.values(outdata[1])[5], '部门') // 部门
  equipmentBaseInfo.basicInfoId = underfindTrans(Object.values(outdata[1])[7], '编号') // 编号
  equipmentBaseInfo.equipmentTypeName = underfindTrans(Object.values(outdata[1])[7].split('-')[1]) // 设备类型
  equipmentBaseInfo.equipmentAdminName = underfindTrans(Object.values(outdata[2])[1], '设备管理员') // 设备管理员
  equipmentBaseInfo.equipmentAdminPhone = underfindTrans(Object.values(outdata[2])[3], '设备管理员电话号码')
  equipmentBaseInfo.appAdminName = underfindTrans(Object.values(outdata[2])[5], '应用管理员') // 应用管理员
  equipmentBaseInfo.appAdminPhone = underfindTrans(Object.values(outdata[2])[7], '应用管理员电话号码') // 是否可// 迁移
  equipmentBaseInfo.businessOrExperimental = statusTrans(Object.values(outdata[3])[1])// 业务机试验机
  equipmentBaseInfo.mainOrBackup = statusTrans(Object.values(outdata[3])[3]) // 主机 备机
  equipmentBaseInfo.tureOrVirtual = statusTrans(Object.values(outdata[3])[5]) // 实体机虚拟机
  equipmentBaseInfo.migratable = statusTrans(Object.values(outdata[3])[7]) // 是否迁移
  equipmentBaseInfo.brandName = underfindTrans(Object.values(outdata[6])[0] + Object.values(outdata[6])[1], '品牌') // 品牌
  equipmentBaseInfo.brandModelName = underfindTrans(Object.values(outdata[6])[2] + Object.values(outdata[6])[3], '型号') // 型号
  equipmentBaseInfo.machineRoomName = underfindTrans(Object.values(outdata[6])[4] + Object.values(outdata[6])[5], '安装位置') // 安装位置
  var cabinetName = Object.values(outdata[6])[6] + Object.values(outdata[6])[7]
  cabinetName = cabinetName.split('-')[0]
  equipmentBaseInfo.cabinetName = underfindTrans(cabinetName, '机柜号')
  equipmentBaseInfo.serialNumber = underfindTrans(Object.values(outdata[8])[0] + Object.values(outdata[8])[1], '序列号') // 序列号
  equipmentBaseInfo.guaranteePeriod = underfindTrans(Object.values(outdata[8])[2] + Object.values(outdata[8])[3], '保修期') // 保修期
  equipmentBaseInfo.onlineTime = underfindTrans(Object.values(outdata[8])[4] + Object.values(outdata[8])[5], '上线时间') // 上线时间
  equipmentBaseInfo.offlineTime = underfindTrans(Object.values(outdata[8])[6] + Object.values(outdata[8])[7], '下线时间') // 下线时间
  // debugger
  return equipmentBaseInfo
}

function getConfig(outdata, excelIndex) {
  const configs = []
  const softwares = []
  // console.log(Object.values(outdata[11]))
  // console.log(Object.values(outdata[10])[1])
  let index = excelIndex
  for (; index < outdata.length; index++) {
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
      config.frequency = Object.values(outdata[index])[1] // 性能指标 频率
      config.projectName = Object.values(outdata[index])[0] // 项目
      config.corenessOrCapacity = Object.values(outdata[index])[2] // 容量 核数
      config.quantity = Object.values(outdata[index])[3] // 数量
      configs.push(config)
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
        softwares.push(software)
      }
    } else {
      break
    }
  }
  return {
    softwares,
    configs,
    excelIndex: index
  }

  // console.log(index)
  // console.log('配置信息', this.config)
  // console.log('通用软件信息', this.software)
}

function getPortagreement(outdata, excelIndex) {
  const networks = []
  const protocolPorts = []
  var j = excelIndex + 5
  var index = excelIndex + 2
  var endIndex = excelIndex + 4
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
    networks.push(networkCoinfig)
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
  networks.push(networkCoinfigs)
  // console.log('网络信息', this.network)
  // debugger
  // 获取协议端口信息
  for (var indexs = excelIndex + 2; indexs < outdata.length; indexs++) {
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
        protocolPorts.push(protocolPortConfig)
      }
    } else {
      break
    }
  }
  return {
    networks,
    protocolPorts,
    excelIndex: indexs
  }
  // console.log('端口协议', this.protocolPort)
}

function appSoftwareFir(outdata, excelIndex) {
  const appSoftwares = []
  const appSystemUsers = []
  const appBusinesses = []
  const appStores = []
  const appNativeStore = {}
  // console.log('专用软件信息', outdata)
  var index = excelIndex + 1
  let softwareFirIndex
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
          appSoftwares.push(appSoftwareData)
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
          appSystemUsers.push(appSystemUserData)
        } else {
          break
        }
      }
      softwareFirIndex = index
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
          appBusinesses.push(appBusinessData)
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
          appStores.push(appStoreConfig)
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
          appNativeStore.totalCapacity = NativeStoredata[0]
          appNativeStore.usedSpace = NativeStoredata[1]
          appNativeStore.unusedSpace = NativeStoredata[2]
          appNativeStore.annualGrowthSpace = NativeStoredata[3]
        }
      }
    }
    // console.log('本机存储', this.appNativeStore)
    index += 1
  }
  return {
    appSoftwares,
    appSystemUsers,
    appBusinesses,
    appStores,
    appNativeStore,
    softwareFirIndex
  }
}

function appSoftwareSeLi(outdata, excelIndex) {
  const appAccessRights = {}
  const appLinksInfo = []
  var index = excelIndex
  // console.log(Object.values(outdata[index]))
  while (index < outdata.length) {
    if (Object.values(outdata[index])[4] === '访问权限') {
      index = index + 2
      // console.log(Object.values(outdata[index]))
      appAccessRights.intranet = Object.values(outdata[index])[4]
      appAccessRights.industryNetwork = Object.values(outdata[index])[5]
      appAccessRights.internet = Object.values(outdata[index])[6]
      appAccessRights.other = Object.values(outdata[index])[7]
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
          appLinksInfo.push(appLinksData)
        }
      }
      // console.log(this.appLinksInfo)
      // debugger
    }
    index += 1
  }
  // console.log('访问权限', this.appAccessRights)
  // console.log('服务用户信息', this.appLinksInfo)
  return {
    appAccessRights,
    appLinksInfo
  }
}

// 解析判断状态
function statusTrans(status) {
  status = Array.from(status)
  if (status[-1] === '□') {
    return '0'
  } else {
    return '1'
  }
}
// underfind值转换
function underfindTrans(status, part) {
  // console.log(status, part)
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
}
