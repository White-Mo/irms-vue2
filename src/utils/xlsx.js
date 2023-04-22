import { Message } from 'element-ui'
import { status } from 'nprogress'
import logdepthbuf_fragmentGlsl from 'three/src/renderers/shaders/ShaderChunk/logdepthbuf_fragment.glsl'
import item from '@/layout/components/Sidebar/Item'
import XLSX from 'xlsx'

/**
 * 上传excel文件并转化为json
 * @param obj
 * @param head
 * @returns {Promise<unknown>}
 */
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
        if(head === "信息资产统计综合表"){
          // const outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {defval:"无数据"})
          resolve(outdata)
        }else {
          resolve(outdata)
        }
      } else {
        console.log('请选择正确的文件类型！')
        console.log('应导入', head)
        console.log('当前导入', filetype)//excel第一个单元格
      }
    }
  })
}

/**
 * 将解析的详情表json组装成指定的json样式
 * @param outdata
 * @param postName
 * @returns {{readStatus: number, equipment: {}}}
 */
export function getEquipment(outdata, postName ,userInfo) {
  const equipment = {}
  let excelIndex = 11
  const { equipmentBaseInfo, readStatus: readStatus } = getBaseinfo(outdata, postName ,userInfo)
  equipment.equipmentBaseInfo = equipmentBaseInfo

  const { softwares, configs, excelIndex: configIndex } = getConfig(outdata, excelIndex)
  excelIndex = configIndex
  equipment.config = configs
  equipment.software = softwares

  const { networks, excelIndex: portagreementIndex, protocolPorts } = getPortagreement(outdata, excelIndex)
  equipment.network = networks
  equipment.protocolPort = protocolPorts
  excelIndex = portagreementIndex

  const {
    appSoftwares,
    appStores,
    appSystemUsers,
    appBusinesses,
    appNativeStore,
    softwareFirIndex
  } = appSoftwareFir(outdata, excelIndex)
  equipment.appNativeStore = appNativeStore
  equipment.appSystemUser = appSystemUsers
  equipment.appBusiness = appBusinesses
  equipment.appSoftware = appSoftwares
  equipment.appStore = appStores
  excelIndex = softwareFirIndex
  const { appLinksInfo, appAccessRights } = appSoftwareSeLi(outdata, excelIndex)

  equipment.appLinksInfo = appLinksInfo
  equipment.appAccessRights = appAccessRights

  return { equipment, readStatus }
}

// 基本信息
function getBaseinfo(outdata, postName ,userInfo) {
  const equipmentBaseInfo = {
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

  equipmentBaseInfo.insertUserId=userInfo.userid

  equipmentBaseInfo.postName = postName
  const {
    status: equipmentName,
    readStatus: readStatus1
  } = underfindTrans(Object.values(outdata[0])[2] + Object.values(outdata[0])[3], '设备名称', 0)// 设备名称
  equipmentBaseInfo.equipmentName = equipmentName

  const {
    status: businessSystem,
    readStatus: readStatus2
  } = underfindTrans(Object.values(outdata[0])[6] + Object.values(outdata[0])[7], '所属系统', readStatus1)// 所属系统
  equipmentBaseInfo.businessSystem = businessSystem

  const {
    status: hostName,
    readStatus: readStatus3
  } = underfindTrans(Object.values(outdata[1])[1] + Object.values(outdata[1])[2], '主机名', readStatus2) // 主机名
  equipmentBaseInfo.hostName = hostName

  const {
    status: departmentName,
    readStatus: readStatus4
  } = underfindTrans(Object.values(outdata[1])[4] + Object.values(outdata[1])[5], '部门', readStatus3) // 部门
  equipmentBaseInfo.departmentName = departmentName

  // debugger;
  const Serial = Object.values(outdata[1])[8].split('-')
  if (Serial.length != 4) {
    Message({
      type: 'error',
      message: '编号格式错误'
    })
  } else {
    equipmentBaseInfo.basicInfoId = Object.values(outdata[1])[8] // 编号
    equipmentBaseInfo.equipmentTypeName = Serial[1] // 设备类型
  }
  const {
    status: equipmentAdminName,
    readStatus: readStatus5
  } = underfindTrans(Object.values(outdata[2])[1], '设备管理员', readStatus4 + Serial.length) // 设备管理员
  equipmentBaseInfo.equipmentAdminName = equipmentAdminName

  const {
    status: equipmentAdminPhone,
    readStatus: readStatus6
  } = underfindTrans(Object.values(outdata[2])[4], '设备管理员电话号码', readStatus5)
  equipmentBaseInfo.equipmentAdminPhone = equipmentAdminPhone

  const {
    status: appAdminName,
    readStatus: readStatus7
  } = underfindTrans(Object.values(outdata[2])[6], '应用管理员', readStatus6) // 应用管理员
  equipmentBaseInfo.appAdminName = appAdminName

  const {
    status: appAdminPhone,
    readStatus: readStatus8
  } = underfindTrans(Object.values(outdata[2])[8], '应用管理员电话号码', readStatus7)
  equipmentBaseInfo.appAdminPhone = appAdminPhone

  equipmentBaseInfo.businessOrExperimental = statusTrans(Object.values(outdata[3])[1])// 业务机试验机
  equipmentBaseInfo.mainOrBackup = statusTrans(Object.values(outdata[3])[4]) // 主机 备机
  equipmentBaseInfo.tureOrVirtual = statusTrans(Object.values(outdata[3])[6]) // 实体机虚拟机
  equipmentBaseInfo.migratable = statusTrans(Object.values(outdata[3])[8]) // 是否迁移

  const {
    status: brandName,
    readStatus: readStatus9
  } = underfindTrans(Object.values(outdata[6])[0] + Object.values(outdata[6])[1] + Object.values(outdata[6])[2], '品牌', readStatus8) // 品牌
  equipmentBaseInfo.brandName = brandName

  const {
    status: brandModelName,
    readStatus: readStatus10
  } = underfindTrans(Object.values(outdata[6])[3] + Object.values(outdata[6])[4], '型号', readStatus9) // 型号
  equipmentBaseInfo.brandModelName = brandModelName

  const {
    status: machineRoomName,
    readStatus: readStatus11
  } = underfindTrans(Object.values(outdata[6])[5] + Object.values(outdata[6])[6], '安装位置', readStatus10) // 安装位置
  equipmentBaseInfo.machineRoomName = machineRoomName
  var cabinetName = Object.values(outdata[6])[7] + Object.values(outdata[6])[8]
  const data = cabinetName.split('-')
  if (data.length != 3) {
    // Message({
    //   type:'error',
    //   message:"机柜号格式错误"
    // })
    equipmentBaseInfo.cabinetName = cabinetName
  } else {
    equipmentBaseInfo.cabinetUStart = data[1]
    equipmentBaseInfo.cabinetUEnd = data[2]
    equipmentBaseInfo.cabinetName = data[0]
  }

  const {
    status: serialNumber,
    readStatus: readStatus12
  } = underfindTrans(Object.values(outdata[8])[0] + Object.values(outdata[8])[1], '序列号', readStatus11 + data.length) // 序列号
  equipmentBaseInfo.serialNumber = serialNumber

  const {
    status: guaranteePeriod,
    readStatus: readStatus13
  } = underfindTrans(Object.values(outdata[8])[3] + Object.values(outdata[8])[4], '保修期', readStatus12) // 保修期
  equipmentBaseInfo.guaranteePeriod = guaranteePeriod

  const {
    status: onlineTime,
    readStatus: readStatus14
  } = underfindTrans(Object.values(outdata[8])[5] + Object.values(outdata[8])[6], '上线时间', readStatus13) // 上线时间
  equipmentBaseInfo.onlineTime = onlineTime

  const {
    status: offlineTime,
    readStatus: readStatus15
  } = underfindTrans(Object.values(outdata[8])[7] + Object.values(outdata[8])[8], '下线时间', readStatus14) // 下线时间
  equipmentBaseInfo.offlineTime = offlineTime
  // console.log(equipmentBaseInfo)
  // debugger
  return { equipmentBaseInfo, readStatus: readStatus15 }
}

// 配置信息  通用软件信息
function getConfig(outdata, excelIndex) {
  const configs = []
  const softwares = []
  let index = excelIndex
  for (; index < outdata.length; index++) {
    if (Object.values(outdata[index])[0] !== '网络信息') {
      // console.log(Object.values(outdata[index]))
      var config = {
        frequency: '', // 频率
        projectName: '', // 项目
        corenessOrCapacity: '', // 核数
        type: '', // 类型
        quantity: '' // 数量
      }
      config.projectName = Object.values(outdata[index])[0] // 项目
      config.type = Object.values(outdata[index])[1] // 类型
      config.frequency = Object.values(outdata[index])[2] // 性能指标
      config.corenessOrCapacity = Object.values(outdata[index])[3] // 数量指标
      config.quantity = Object.values(outdata[index])[4] // 实配数量
      configs.push(config)
      var software = {
        type: '', // 类型
        edition: '', // 版本
        project: '', // 项目
        projectName: '' // 名称
      }
      if (Object.values(outdata[index])[5] !== '') {
        software.project = Object.values(outdata[index])[5]
        software.projectName = Object.values(outdata[index])[6]
        software.edition = Object.values(outdata[index])[7]
        software.type = Object.values(outdata[index])[8]
        softwares.push(software)
      }
    } else {
      break
    }
  }
  // console.log(softwares)
  // console.log(configs)
  return {
    softwares,
    configs,
    excelIndex: index
  }
}

// 网络信息 协议端口信息
function getPortagreement(outdata, excelIndex) {
  const networks = []
  const protocolPorts = []
  let indexs = excelIndex + 2
  for (; indexs < outdata.length; indexs++) {
    // console.log(Object.values(outdata[indexs]))
    var networkCoinfig = {
      networkCardName: '', // 网卡
      networkCardPort: '', // 端口
      macAddress: '', // MAC地址
      switchInfo: '', // 交换机
      ipAddress: '' // IP地址
    }

    var protocolPortConfig = {
      networkCardPort: '', // 端口
      appName: '', // 应用名称
      protocolName: '' // 协议
    }
    // console.log(Object.values(outdata[indexs]))
    if (Object.values(outdata[indexs])[0] !== '业  务  应  用  信  息') {
      if (Object.values(outdata[indexs])[0] !== '') {
        networkCoinfig.networkCardName = Object.values(outdata[indexs])[0]
        networkCoinfig.ipAddress = Object.values(outdata[indexs])[1]
        networkCoinfig.switchInfo = Object.values(outdata[indexs])[2]
        networkCoinfig.macAddress = Object.values(outdata[indexs])[3]
        networkCoinfig.networkCardPort = Object.values(outdata[indexs])[4]
        networks.push(networkCoinfig)
      }
      if (Object.values(outdata[indexs])[5] !== '') {
        // console.log(outdata[i])
        protocolPortConfig.protocolName = Object.values(outdata[indexs])[5]
        protocolPortConfig.appName = Object.values(outdata[indexs])[6]
        protocolPortConfig.networkCardPort = Object.values(outdata[indexs])[8]
        protocolPorts.push(protocolPortConfig)
      }
    } else {
      break
    }
  }
  // console.log(networks, protocolPorts)
  return {
    networks,
    protocolPorts,
    excelIndex: indexs
  }
  // console.log('端口协议', this.protocolPort)
}

// 业务应用信息
function appSoftwareFir(outdata, excelIndex) {
  const appSoftwares = []
  const appSystemUsers = []
  const appBusinesses = []
  const appStores = []
  const appNativeStore = {}

  var index = excelIndex + 1
  let softwareFirIndex
  while (index < outdata.length) {
    if (Object.values(outdata[index])[0] === '专用软件信息') {
      // console.log('专用软件信息', outdata[index])
      // console.log(index)
      index = index + 2
      for (; index < outdata.length; index++) {
        if (Object.values(outdata[index])[0] !== '系统用户信息') {
          // console.log(Object.values(outdata[index]))
          // debugger
          var appSoftwareData = {
            softwareName: '', // 名称
            softwareEdition: '', // 版本
            softwarePort: '', // 端口
            softwareOnlineTime: '', // 上线时间
            softwareDevelopCompany: '', // 研发单位
            softwareLiaison: '', // 联系人
            softwareLiaisonPhone: '' // 联系人电话号码
          }
          appSoftwareData.softwareName = Object.values(outdata[index])[0]
          appSoftwareData.softwareEdition = Object.values(outdata[index])[3]
          appSoftwareData.softwarePort = Object.values(outdata[index])[4]
          appSoftwareData.softwareOnlineTime = Object.values(outdata[index])[5]
          appSoftwareData.softwareDevelopCompany = Object.values(outdata[index])[6]
          appSoftwareData.softwareLiaison = Object.values(outdata[index])[4]
          appSoftwareData.softwareLiaisonPhone = Object.values(outdata[index])[8]
          appSoftwares.push(appSoftwareData)
        } else {
          break
        }
        // console.log('系统用户信息', this.appSoftware)
      }
    }
    if (Object.values(outdata[index])[0] === '系统用户信息') {
      index = index + 3
      for (; index < outdata.length; index++) {
        // console.log(Object.values(outdata[index]))
        // debugger
        if (Object.values(outdata[index])[0] !== '业务应用') {
          var appSystemUserData = {
            userName: '', // 用户名
            realName: '', // 使用人
            localAccessMode: '', // 本地
            userLevel: '', // 级别权限
            remoteAccessMode: '', // 远程
            createDate: '', // 创建时间
            other: '' // 其他
          }
          appSystemUserData.userName = Object.values(outdata[index])[0]
          appSystemUserData.realName = Object.values(outdata[index])[1]
          appSystemUserData.userLevel = Object.values(outdata[index])[3]
          appSystemUserData.remoteAccessMode = Object.values(outdata[index])[6]
          appSystemUserData.localAccessMode = Object.values(outdata[index])[5]
          appSystemUserData.createData = Object.values(outdata[index])[7]
          appSystemUserData.other = Object.values(outdata[index])[8]
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
      for (; index < outdata.length; index++) {
        if (Object.values(outdata[index])[0] !== '存  储' && Object.values(outdata[index])[0] !== '') {
          // console.log(Object.values(outdata[index]))
          // debugger
          var appBusinessData = {
            ICPNum: '', // ICP
            userScope: '', // 用户范围
            domainName: '', // HTTP/FTP
            businessName: '' // 域名地址
          }
          appBusinessData.businessName = Object.values(outdata[index])[0]
          appBusinessData.domainName = Object.values(outdata[index])[1]
          appBusinessData.userScope = Object.values(outdata[index])[3]
          appBusinessData.ICPNum = Object.values(outdata[index])[4]
          appBusinesses.push(appBusinessData)
        } else {
          break
        }
      }
    }
    if (Object.values(outdata[index])[0] === '存  储') {
      index = index + 2
      for (; index < outdata.length; index++) {
        if (Object.values(outdata[index])[0] !== '本  机  存  储' && Object.values(outdata[index])[0] !== '') {
          // console.log(Object.values(outdata[index]))
          // debugger
          var appStoreConfig = {
            volume: '', // 卷
            SAN_NAS: '',
            capacity: '' // 已用信息
          }
          var appStoredata = Object.values(outdata[index])
          // console.log(appStoredata)
          appStoreConfig.volume = appStoredata[0]
          appStoreConfig.SAN_NAS = appStoredata[3]
          appStoreConfig.capacity = appStoredata[4]
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
      if (outdata[index] !== undefined) {
        for (; index < outdata.length; index++) {
          if (outdata[index] !== undefined) {
            // console.log(Object.values(outdata[index])[0])
            if (Object.values(outdata[index])[0] !== '') {
              var NativeStoredata = Object.values(outdata[index])
              appNativeStore.totalCapacity = NativeStoredata[0]
              appNativeStore.usedSpace = NativeStoredata[1]
              appNativeStore.unusedSpace = NativeStoredata[4]
              appNativeStore.annualGrowthSpace = NativeStoredata[5]
            }
          }
        }
      }
    }
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

// 业务应用信息 右一列
function appSoftwareSeLi(outdata, rightIndex) {
  const appAccessRights = {}
  const appLinksInfo = []
  let index = rightIndex
  // console.log(index)
  // console.log(outdata)
  // debugger
  while (index < outdata.length) {
    if (Object.values(outdata[index])[5] === '访问权限') {
      for (; index < outdata.length; index++) {
        if (Object.values(outdata[index])[5] !== '服务用户信息') {
          // console.log(Object.values(outdata[index]))
          // debugger
          appAccessRights.intranet = Object.values(outdata[index])[5]
          appAccessRights.industryNetwork = Object.values(outdata[index])[6]
          appAccessRights.internet = Object.values(outdata[index])[7]
          appAccessRights.other = Object.values(outdata[index])[8]
        } else {
          break
        }
      }
      // console.log(index)
    }
    // console.log(outdata)
    // console.log(Object.values(outdata[index]))
    if (Object.values(outdata[index])[5] === '服务用户信息') {
      index = index + 2
      for (; index < outdata.length; index++) {
        if (Object.values(outdata[index])[5] !== '') {
          var appLinksData = {
            company: '',
            userName: '',
            ipAddress: '',
            other: ''
          }
          appLinksData.company = Object.values(outdata[index])[5]
          appLinksData.userName = Object.values(outdata[index])[6]
          appLinksData.ipAddress = Object.values(outdata[index])[7]
          appLinksData.other = Object.values(outdata[index])[8]
          // console.log(appLinksData)
          appLinksInfo.push(appLinksData)
        } else {
          break
        }
      }
    }
    index += 1
    // console.log(index)
    // console.log(outdata.length)
  }
  // console.log('访问权限', appAccessRights)
  // console.log('服务用户信息', appLinksInfo)
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
function underfindTrans(status, part, readStatus) {
  if (status === '' && part !== '') {
    Message({
      type: 'error',
      message: part + '不能为空'
    })
    return { status, readStatus }
  } else {
    readStatus += 1
    return { status, readStatus }
  }
}

/**
 * 横表单元格验证
 * @param status
 * @param part
 * @param readStatus
 * @returns {{readStatus, status}}
 */
function underfindTransRow(status, part, readStatus) {
  if (status === '') {
    const message = {}
    message.erro=part + '不能为空'
    // readStatus.push(message)
    return { status, readStatus }
  } else {
    // console.log(readStatus)
    return { status, readStatus }
  }
}


export function analysisReply(data) {
  //这个数组的元素是对象
  let analysisData = []
  let result_data = []
  if(data.status !=200){
    let item={};
    item.key="错误信息"
    item.values=JSON.stringify(data)
    result_data.push(item)
    return result_data
  }
  //每张小表是一个对象
  analysisData.push(getReplayData(data.AddAppAccessRights))
  analysisData.push(getReplayData(data.AddAppBusiness))
  analysisData.push(getReplayData(data.AddAppLinksInfo))
  analysisData.push(getReplayData(data.AddAppSoftware))
  analysisData.push(getReplayData(data.AddAppStore))
  analysisData.push(getReplayData(data.AddAppSystemUser))
  analysisData.push(getReplayData(data.AddConfig))
  analysisData.push(getReplayData(data.AddNetWork))
  analysisData.push(getReplayData(data.AddPortocolPort))
  analysisData.push(getReplayData(data.AddNativeStore))
  // analysisData.push(getReplayData(data.equipmentBasicInfo.cabinetU))
  // analysisData.push(getReplayData(data.equipmentBasicInfo.equipment))
  // analysisData.push(getReplayData(data.equipmentBasicInfo.equipmentBusinessRelInfo))

  console.log('大数组', analysisData)
  analysisData.forEach(function(items) {
    if (items !== undefined) {
      items.forEach(function(item) { // 少写了item
        if (item.key !== '' && item.key !== ' ') {
          result_data.push(item)
        }
      })
    }
    // console.log('!',result_data)
  })
  return result_data
}

export function getReplayData(data) {
  console.log('data', data)
  let backdata = []
  if (data !== undefined) {
    //keys是数组
    const keys = Object.keys(data) //硬盘、电源
    const values = Object.values(data)  //update、update
    // debugger
    if (keys !== undefined) {
      keys.forEach(function(key, index) {
        const obj = {
          key: keys[index],
          values: values[index]
        }
        backdata.push(obj)
        console.log('$', backdata)
        return backdata
      })
    }
    return backdata
  }
}

//反馈信息表
export function getUploadData(data, message) {
  let backdata = []
  const obj = {
    key: data.equipmentBasicInfo.equipmentBusinessRelInfo['设备编号'],
    value: message
  }
  backdata.push(obj)
  return backdata
}

/**
 * 横表解析
 */
export function getRowEquipment(outdata,userInfo) {
  // console.log(outdata)
  const equipment = {}
  const { equipmentBaseInfo, readStatus: readStatus } = getRowBaseinfo(outdata)
  equipmentBaseInfo.insertUserId=userInfo.userid
  equipment.equipmentBaseInfo = equipmentBaseInfo

  const { softwares, configs } = getRowConfig(outdata)
  equipment.config = configs
  equipment.software = softwares

  const { networks, excelIndex: portagreementIndex, protocolPorts } = getRowPortagreement(outdata)
  equipment.network = networks
  equipment.protocolPort = protocolPorts

  const {
    appSoftwares,
    appStores,
    appSystemUsers,
    appBusinesses,
    appNativeStore,
  } = getRowAppSoftwareFir(outdata)
  equipment.appNativeStore = appNativeStore
  equipment.appSystemUser = appSystemUsers
  equipment.appBusiness = appBusinesses
  equipment.appSoftware = appSoftwares
  equipment.appStore = appStores
  const { appLinksInfo, appAccessRights } = getRowAppSoftwareSeLi(outdata)

  equipment.appLinksInfo = appLinksInfo
  equipment.appAccessRights = appAccessRights

  return { equipment, readStatus }
}

// 基本信息
function getRowBaseinfo(outdata) {
  console.log(outdata)
  const equipmentBaseInfo = {
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
    businessSystem: '', // 所属二级系统
    businessSystemLevel:'',//所属二级系统等保等级
    businessSystemFirstName:'',//所属一级业务系统
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
    offlineTime: '', // 下线时间
    //新增字段
    accessLocation:'',//接入位置
    singleAndDoublePowerSupply:'',//单双电源
    agreedToTemporaryShutdown:'',//是否同意临时关停（是/否）
    installSafetyMonitoringSoftware:'',//是否安装安全监测软件
    deployStrongPassword:'',//是否部署强口令
    cloudServiceUnit:'',//云服务单位
    leasedComputingResources:'',//租用计算资源情况（CPU核数）（个）
    leasedStorageResources:'',//租用存储资源情况（TB）
    leasedNetworkBandwidth:'',//租用网络带宽（兆）
    termOfLease:'',//租用期限（年）
    domainName:'',//域名
    domainNameRegistrationService:'',//域名注册服务商
    ns:'',//NS记录
    cname:'',//CNAME记录（别名）
    useCDN:'',//是否使用CDN
    deploymentEnvironment:''//部署环境
  }

  equipmentBaseInfo.hostName = ' '
  equipmentBaseInfo.remarks = Object.values(outdata[0])[27]
  equipmentBaseInfo.dataSources = 'EXCEL批量导入'

  //新增字段
  equipmentBaseInfo.deploymentEnvironment = Object.values(outdata[0])[24]
  equipmentBaseInfo.accessLocation = Object.values(outdata[0])[16]
  equipmentBaseInfo.singleAndDoublePowerSupply = Object.values(outdata[0])[17]
  equipmentBaseInfo.agreedToTemporaryShutdown = Object.values(outdata[0])[21]
  equipmentBaseInfo.installSafetyMonitoringSoftware = Object.values(outdata[0])[22]
  equipmentBaseInfo.deployStrongPassword = Object.values(outdata[0])[23]
  equipmentBaseInfo.cloudServiceUnit = Object.values(outdata[0])[36]
  equipmentBaseInfo.leasedComputingResources = Object.values(outdata[0])[37]
  equipmentBaseInfo.leasedStorageResources = Object.values(outdata[0])[38]
  equipmentBaseInfo.leasedNetworkBandwidth = Object.values(outdata[0])[39]
  equipmentBaseInfo.termOfLease = Object.values(outdata[0])[40]
  equipmentBaseInfo.domainName = Object.values(outdata[0])[41]
  equipmentBaseInfo.domainNameRegistrationService = Object.values(outdata[0])[42]
  equipmentBaseInfo.ns = Object.values(outdata[0])[43]
  equipmentBaseInfo.cname = Object.values(outdata[0])[44]
  equipmentBaseInfo.useCDN = Object.values(outdata[0])[45]




  let readStatus0=[]
  // const { status: equipmentName, readStatus: readStatus1 } = underfindTransRow(Object.values(outdata[0])[3], '设备名称', readStatus0)// 设备名称
  equipmentBaseInfo.equipmentName = Object.values(outdata[0])[3]

  const {
    status: businessSystem,
    readStatus: readStatus2
  } = underfindTransRow(Object.values(outdata[0])[19], '所属系统', readStatus0)// 所属系统
  equipmentBaseInfo.businessSystem = businessSystem
  equipmentBaseInfo.businessSystemLevel=Object.values(outdata[0])[20]
  equipmentBaseInfo.businessSystemFirstName=Object.values(outdata[0])[18]

  const {
    status: postName,
    readStatus: readStatus3
  } = underfindTransRow(Object.values(outdata[0])[4], '单位', readStatus2) // 单位
  equipmentBaseInfo.postName = postName

  const {
    status: departmentName,
    readStatus: readStatus4
  } = underfindTransRow(Object.values(outdata[0])[5], '部门', readStatus3) // 部门
  equipmentBaseInfo.departmentName = departmentName

  // debugger;
  const Serial = Object.values(outdata[0])[0].split('-')
  if (Serial.length != 4) {
    Message({
      type: 'error',
      message: '编号格式错误'
    })
  } else {
    equipmentBaseInfo.basicInfoId = Object.values(outdata[0])[0] // 编号
    equipmentBaseInfo.equipmentTypeName = Serial[1] // 设备类型
    equipmentBaseInfo.tureOrVirtual = (Serial[2] === 'S' || Serial[2] === 's') ? 0 : 1//实体机为0，虚拟机为1
  }
  const {
    status: equipmentAdminName,
    readStatus: readStatus5
  } = underfindTransRow(Object.values(outdata[0])[6], '设备管理员', readStatus4) // 设备管理员
  equipmentBaseInfo.equipmentAdminName = equipmentAdminName

  const {
    status: equipmentAdminPhone,
    readStatus: readStatus6
  } = underfindTransRow('0', '设备管理员电话号码', readStatus5)
  equipmentBaseInfo.equipmentAdminPhone = equipmentAdminPhone

  const {
    status: appAdminName,
    readStatus: readStatus7
  } = underfindTransRow(Object.values(outdata[0])[6], '应用管理员', readStatus6) // 应用管理员
  equipmentBaseInfo.appAdminName = appAdminName

  const { status: appAdminPhone, readStatus: readStatus8 } = underfindTransRow(' ', '应用管理员电话号码', readStatus7)
  equipmentBaseInfo.appAdminPhone = appAdminPhone

  equipmentBaseInfo.businessOrExperimental = Object.values(outdata[0])[11]// 业务机试验机
  equipmentBaseInfo.mainOrBackup = ' ' // 主机 备机
  equipmentBaseInfo.migratable = ' ' // 是否迁移

  const {
    status: brandName,
    readStatus: readStatus9
  } = underfindTransRow(Object.values(outdata[0])[8], '品牌', readStatus8) // 品牌
  equipmentBaseInfo.brandName = brandName

  const {
    status: brandModelName,
    readStatus: readStatus10
  } = underfindTransRow(Object.values(outdata[0])[9], '型号', readStatus9) // 型号
  equipmentBaseInfo.brandModelName = brandModelName

  const {
    status: machineRoomName,
    readStatus: readStatus11
  } = underfindTransRow(Object.values(outdata[0])[12], '安装位置', readStatus10) // 安装位置
  equipmentBaseInfo.machineRoomName = machineRoomName
  equipmentBaseInfo.cabinetUStart = Object.values(outdata[0])[14]
  equipmentBaseInfo.cabinetUEnd = Object.values(outdata[0])[15]
  equipmentBaseInfo.cabinetName = Object.values(outdata[0])[13]

  const {
    status: serialNumber,
    readStatus: readStatus12
  } = underfindTransRow(Object.values(outdata[0])[10], '序列号', readStatus11) // 序列号
  equipmentBaseInfo.serialNumber = serialNumber


  const dateRegex = /^\d{4}\d{2}\d{2}$/ //日期正则
  const {
    status: onlineTime,
    readStatus: readStatus13
  } = underfindTransRow(Object.values(outdata[0])[26], '上线时间', readStatus12) // 上线时间

  if (dateRegex.test(onlineTime)||onlineTime=='') {
    equipmentBaseInfo.onlineTime = onlineTime
  } else {
    const onlineTimeRegex = {}
    onlineTimeRegex.erro="设备上线安装时间格式错误"
    readStatus13.push(onlineTimeRegex)
  }

  const {
    status: offlineTime,
    readStatus: readStatus14
  } = underfindTransRow(Object.values(outdata[0])[25], '下线时间', readStatus13) // 下线时间

  if (dateRegex.test(offlineTime)||offlineTime=='') {
    equipmentBaseInfo.offlineTime = offlineTime
  } else {
    const offlineTimeRegex = {}
    offlineTimeRegex.erro="维保结束时间格式错误"
    readStatus14.push(offlineTimeRegex)
  }
  const { status: guaranteePeriod, readStatus: readStatus15 } = underfindTransRow(equipmentBaseInfo.onlineTime+"-"+equipmentBaseInfo.offlineTime, '保修期', readStatus14) // 保修期
  equipmentBaseInfo.guaranteePeriod = guaranteePeriod

  // console.log(equipmentBaseInfo)
  // debugger
  return { equipmentBaseInfo, readStatus: readStatus15 }

}

// 配置信息  通用软件信息
function getRowConfig(outdata) {
  const configs = []
  const softwares = []
  let index = 0
  var configCPU = {
    frequency: '', // 频率
    projectName: '', // 项目
    corenessOrCapacity: '', // 核数
    type: '', // 类型
    quantity: '' // 数量
  }

  var configMemory= {
    frequency: '', // 频率
    projectName: '', // 项目
    corenessOrCapacity: '', // 核数
    type: '', // 类型
    quantity: '' // 数量
  }
  configCPU.projectName = 'CPU' // 项目(CPU)
  configCPU.type = Object.values(outdata[index])[28] // 类型
  configCPU.frequency = '' // 性能指标
  configCPU.corenessOrCapacity = '' // 数量指标
  configCPU.quantity = '' // 实配数量
  configs.push(configCPU)
  configMemory.projectName = '内存（GB）'//项目(内存)
  configMemory.type = ''
  configMemory.frequency = '' //性能指标
  configMemory.corenessOrCapacity = Object.values(outdata[index])[29] //数量指标
  configMemory.quantity = ''
  configs.push(configMemory)
  var softwareOperatingSystem = {
    type: '', // 类型
    edition: '', // 版本
    project: '', // 项目
    projectName: '', // 名称
    buildDate: '' //建设时间
  }
  var softwareDatabase = {
    type: '', // 类型
    edition: '', // 版本
    project: '', // 项目
    projectName: '', // 名称
    buildDate: '' //建设时间
  }
  var softwareMiddleware = {
    type: '', // 类型
    edition: '', // 版本
    project: '', // 项目
    projectName: '', // 名称
    buildDate: '' //建设时间
  }
  softwareOperatingSystem.project = '操作系统'
  softwareOperatingSystem.projectName = Object.values(outdata[index])[30]
  softwareOperatingSystem.edition = Object.values(outdata[index])[30]
  softwareOperatingSystem.type = ''
  softwareOperatingSystem.buildDate = Object.values(outdata[index])[31]
  softwares.push(softwareOperatingSystem)

  softwareDatabase.project = '数据库'
  softwareDatabase.projectName = Object.values(outdata[index])[32]
  softwareDatabase.edition = Object.values(outdata[index])[32]
  softwareDatabase.type = ''
  softwareDatabase.buildDate = Object.values(outdata[index])[33]
  softwares.push(softwareDatabase)

  softwareMiddleware.project = '中间件'
  softwareMiddleware.projectName = Object.values(outdata[index])[34]
  softwareMiddleware.edition = Object.values(outdata[index])[34]
  softwareMiddleware.type =""
  softwareMiddleware.buildDate = Object.values(outdata[index])[35]
  softwares.push(softwareMiddleware)
  return {
    softwares,
    configs
  }
}

// 网络信息 协议端口信息
function getRowPortagreement(outdata) {
  const networks = []
  const protocolPorts = []
  let indexs = 0
  var networkCoinfig = {
    networkCardName: '', // 网卡
    networkCardPort: '', // 端口
    macAddress: '', // MAC地址
    switchInfo: '', // 交换机
    ipAddress: '' // IP地址
  }

  var protocolPortConfig = {
    networkCardPort: '', // 端口
    appName: '', // 应用名称
    protocolName: '' // 协议
  }

  networkCoinfig.networkCardName = "默认网卡"
  networkCoinfig.ipAddress = Object.values(outdata[indexs])[1]
  networkCoinfig.switchInfo = ""
  networkCoinfig.macAddress = Object.values(outdata[indexs])[2]
  networkCoinfig.networkCardPort = ""
  networks.push(networkCoinfig)

  protocolPortConfig.protocolName = ""
  protocolPortConfig.appName = ""
  protocolPortConfig.networkCardPort = ""
  protocolPorts.push(protocolPortConfig)

  // console.log(networks, protocolPorts)
  return {
    networks,
    protocolPorts
  }
  // console.log('端口协议', this.protocolPort)
}

// 业务应用信息
function getRowAppSoftwareFir(outdata) {
  const appSoftwares = []
  const appSystemUsers = []
  const appBusinesses = []
  const appStores = []
  const appNativeStore = {}
  const index = 0
  var appSoftwareData = {
    softwareName: '', // 名称
    softwareEdition: '', // 版本
    softwarePort: '', // 端口
    softwareOnlineTime: '', // 上线时间
    softwareDevelopCompany: '', // 研发单位
    softwareLiaison: '', // 联系人
    softwareLiaisonPhone: '' // 联系人电话号码
  }
  appSoftwareData.softwareName = ""
  appSoftwareData.softwareEdition = ""
  appSoftwareData.softwarePort = ""
  appSoftwareData.softwareOnlineTime = ""
  appSoftwareData.softwareDevelopCompany = ""
  appSoftwareData.softwareLiaison = ""
  appSoftwareData.softwareLiaisonPhone = ""
  appSoftwares.push(appSoftwareData)

  var appSystemUserData = {
    userName: '', // 用户名
    realName: '', // 使用人
    localAccessMode: '', // 本地
    userLevel: '', // 级别权限
    remoteAccessMode: '', // 远程
    createDate: '', // 创建时间
    other: '' // 其他
  }
  appSystemUserData.userName = ""
  appSystemUserData.realName = ""
  appSystemUserData.userLevel = ""
  appSystemUserData.remoteAccessMode = ""
  appSystemUserData.localAccessMode = ""
  appSystemUserData.createData = ""
  appSystemUserData.other = ""
  appSystemUsers.push(appSystemUserData)

  var appBusinessData = {
    ICPNum: '', // ICP
    userScope: '', // 用户范围
    domainName: '', // HTTP/FTP
    businessName: '' // 域名地址
  }
  appBusinessData.businessName = ""
  appBusinessData.domainName = ""
  appBusinessData.userScope = ""
  appBusinessData.ICPNum = ""
  appBusinesses.push(appBusinessData)

  var appStoreConfig = {
    volume: '', // 卷
    SAN_NAS: '',
    capacity: '' // 已用信息
  }
  var appStoredata = Object.values(outdata[index])
  // console.log(appStoredata)
  appStoreConfig.volume = ""
  appStoreConfig.SAN_NAS = ""
  appStoreConfig.capacity = ""
  appStores.push(appStoreConfig)

  // var NativeStoredata = Object.values(outdata[index])
  // appNativeStore.totalCapacity = NativeStoredata[0]
  // appNativeStore.usedSpace = NativeStoredata[1]
  // appNativeStore.unusedSpace = NativeStoredata[4]
  // appNativeStore.annualGrowthSpace = NativeStoredata[5]

  appNativeStore.totalCapacity = " "
  appNativeStore.usedSpace = " "
  appNativeStore.unusedSpace = " "
  appNativeStore.annualGrowthSpace = " "

  return {
    appSoftwares,
    appSystemUsers,
    appBusinesses,
    appStores,
    appNativeStore,
  }
}

// 业务应用信息
function getRowAppSoftwareSeLi(outdata) {
  const appAccessRights = {}
  const appLinksInfo = []
  let index = 0

  appAccessRights.intranet = Object.values(outdata[index])[24]
  appAccessRights.industryNetwork = Object.values(outdata[index])[24] //行业网
  appAccessRights.internet = Object.values(outdata[index])[24] //互联网
  appAccessRights.other = Object.values(outdata[index])[24]

  var appLinksData = {
    company: '',
    userName: '',
    ipAddress: '',
    other: ''
  }
  appLinksData.company = ""
  appLinksData.userName = ""
  appLinksData.ipAddress = ""
  appLinksData.other = ""
  // console.log(appLinksData)
  appLinksInfo.push(appLinksData)

  // console.log('访问权限', appAccessRights)
  // console.log('服务用户信息', appLinksInfo)
  return {
    appAccessRights,
    appLinksInfo
  }
}



