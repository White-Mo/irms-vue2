const ExcelJS = require('exceljs')
import { getbasic } from '@/api/table'
import Store from '@/store'

function timeFormat(time) {
      if (time==''||time==0||time==null){
        return null
      }

      let date = new Date(time)
      let year = date.getFullYear()
      /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
      let month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      let day =
        date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let hours =
        date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minutes =
        date.getMinutes() < 10
          ? '0' + date.getMinutes()
          : date.getMinutes()
      let seconds =
        date.getSeconds() < 10
          ? '0' + date.getSeconds()
          : date.getSeconds()
      // 拼接
      // return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      console.log(year + month + day)
      return year + month + day
}

export async function getExcelDemo1(data) {
  //创建工作簿↓
  const workbook = new ExcelJS.Workbook()
  //设置工作簿属性↓
  workbook.creator = '中国地震台网中心信息资源管理系统'
  // workbook.lastModifiedBy = 'Her';
  workbook.created = new Date()
  workbook.modified = new Date()
  workbook.lastPrinted = new Date()
  workbook.properties.date1904 = true
  workbook.calcProperties.fullCalcOnLoad = true
  //工作簿视图 ？？啥玩意
  workbook.views = [{
    x: 0,
    y: 0,
    width: 10000,
    height: 20000,
    firstSheet: 0,
    activeTab: 1,
    visibility: 'visible'
  }]
  //添加工作表
  const sheet = workbook.addWorksheet('1')
  const row = sheet.getRow(1)

  let header = []
  let items = []
  let c_to_e_obj = {
    'basicInfoId': '编号-总编号',
    'ipAddress': 'ip地址',
    'macAddress': 'MAC地址',
    'equipmentName': '设备名称',
    'postName': '单位',
    'departmentName': '部门',
    'appAdminName': '应用管理员',
    'equipmentTypeName': '设备类型',
    'brandName': '品牌',
    'brandModelName': '型号',
    'serialNumber': '序列号',
    'businessOrExperimental': '业务机/测试机',
    'machineRoomName': '安装位置',
    'cabinetName': '机柜号',
    'cabinetUStart': '机柜开始U位',
    'cabinetUEnd': '机柜结束U位',
    'accessLocation': '接入位置',
    'singleAndDoublePowerSupply': '单双电源',
    "businessSystemFirstName": "对应等保系统名称（父名称）",
    "businessSystem": "对应等保系统名称（子名称）",
    "businessSystemLevel": "等保系统级别（三级/二级/一级）",
    'agreedToTemporaryShutdown': '是否同意临时关停（是/否）',
    'installSafetyMonitoringSoftware': '是否安装安全监测软件',
    'deployStrongPassword': '是否部署强口令',
    "deploymentEnvironment": '部署环境（互联网/地震行业网/政务外网/应急指挥信息网/其他）',
    'offlineTime': '维保结束日期',
    'onlineTime': '设备上线安装日期',
    'remarks': '备注',
    "type": "CPU型号规格",
    "configMemoryCorenessOrCapacity": "内存容量（GB）",
    "softwareOperatingSystemEdition": "操作系统品牌规格",
    "softwareOperatingSystemBuildDate": "操作系统建设时间",
    "softwareDatabaseEdition": "数据库品牌规格",
    "softwareDatabaseBuildDate": "数据库建设时间",
    "edition": '中间件品牌规格',
    "softwareMiddlewareBuildDate": "中间件建设时间",
    'cloudServiceUnit': '云服务单位',
    'leasedComputingResources': '租用计算资源情况（CPU核数）（个）',
    'leasedStorageResources': '租用存储资源情况（TB）',
    'leasedNetworkBandwidth': '租用网络带宽（兆）',
    'termOfLease': '租用期限（年）',
    'domainName': '域名',
    'domainNameRegistrationService': '域名注册服务商',
    'ns': 'NS记录',
    'cname': 'CNAME记录（别名）',
    'useCDN': '是否使用CDN'
  }
  Object.keys(c_to_e_obj).map(key => {
    header.push(c_to_e_obj[key])
  })
  for (let i of data) {
    let i_list = []
    Object.keys(c_to_e_obj).map(key => {
      i_list.push(i[key])
    })
    items.push(i_list)
  }
  // for
  let num = 0
  for (let i = 0; i < data.length; i++) {
    Object.keys(data[i]).map(key => {
      sheet.getColumn(++num).width = 22
    })
  }
  // data = items
  // 表头
  sheet.mergeCells('A1:AT1')
  const title_row = sheet.getCell('A1')
  title_row.alignment = { vertical: 'middle', horizontal: 'center' }
  title_row.font = {
    name: 'Arial Black',
    color: { argb: '000000' },
    family: 2,
    size: 18
  }
  title_row.value = '信息资产统计综合表'

  const header_row = sheet.getRow(2)
  header_row.values = header
  header_row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
    // //console.log('Cell ' + colNumber + ' = ' + cell.value);
    cell.alignment = { vertical: 'middle', horizontal: 'center' }
    cell.font = {
      name: 'Arial Black',
      color: { argb: '000' },
      family: 2,
      size: 12,
      bold: true
    }

  })
  header_row.commit()
  // 表格内容
  for (let i = 0; i < items.length; i++) {
    let row = sheet.getRow(i + 3)
    row.values = items[i]
    row.numFmt = '0'
    console.log(row.getCell(26).value)
    row.getCell(26).value = timeFormat(row.getCell(26).value)
    row.getCell(27).value = timeFormat(row.getCell(27).value)
    row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
      // //console.log('Cell ' + colNumber + ' = ' + cell.value);
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
      cell.font = {
        name: 'Black',
        color: { argb: '000' },
        family: 2,
        size: 10,
        bold: false
      }
    })
    row.commit()
  }
  //导出下载
  const buffer = await workbook.xlsx.writeBuffer();
  let blob = new Blob([buffer])
  let link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.download = "总表.xlsx";
  link.click();
  document.body.removeChild(link);
}

export async function getExcelDemo2(data_list, data_num = 1) {
  let progress_item_num = 0
  let data_len = data_list.length
  let file_list = []
  let data_index = 0
  for (let i = 0; i < parseInt(data_len / data_num); i++) {
    file_list.push(data_num)
  }
  if (data_len % data_num) file_list.push(data_len % data_num)
  let progress_list = []
  for (let i in file_list) {
    progress_list.push(0)
  }
  //样式
  const content_row = { vertical: 'middle', horizontal: 'center' }
  const table_header = {
    name: 'Arial Black',
    color: { argb: 'ffffff' },
    family: 2,
    size: 12,
    bold: true
  }
  const table_header2 = {
    name: 'Arial Black',
    color: { argb: '000' },
    family: 2,
    size: 11,
    bold: true
  }
  const table_header3 = {
    name: 'Black',
    color: { argb: '000' },
    family: 2,
    size: 11,
    bold: false
  }
  const table_header4 = {
    name: '宋体',
    color: { argb: 'ffffff' },
    family: 2,
    size: 11,
    bold: false
  }
  const table_fill1 = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '1f4e78' }
  }
  const table_fill2 = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd6dce4' }
  }
  const table_fill3 = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffffff' }
  }
  const table_fill4 = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ddebf7' }
  }
  const table_fill5 = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'f2f2f2' }
  }
  const black = { style: 'thick', color: { argb: '000' } }
  const red = { style: 'thick', color: { argb: 'ff0000' } }
  const white = { style: 'thin', color: { argb: 'ffffff' } }
  // 生成表
  for (let file_num of file_list) {
    let workbook = new ExcelJS.Workbook()
    //设置工作簿属性↓
    workbook.creator = '中国地震台网中心信息资源管理系统'
    // workbook.lastModifiedBy = 'Her';
    workbook.created = new Date()
    workbook.modified = new Date()
    workbook.lastPrinted = new Date()
    workbook.properties.date1904 = true
    workbook.calcProperties.fullCalcOnLoad = true
    //工作簿视图
    workbook.views = [{
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: 'visible'
    }]
    for (let sheet_num = 1; sheet_num < file_num + 1; sheet_num++) {
      // 填充数据准备
      let item_data = data_list[data_index]
      let basic_data = await getbasic(item_data['equipmentId'])
      basic_data = basic_data['data']['items']
      // continue
      // basicInfoAppBusiness_list 业务应用
      // basicInfoAppAccessRights_list 应用访问 权限
      // basicInfoAppLinksInfo_list 链接用户信息
      // basicInfoAppStore_list 存储
      // basicInfoAppNativeStore_list 本机存储
      // basicInfoAppSoftware_list 专用软件信息
      // basicInfoAppSystemUser_list 系统用户信息
      // basicInfoConfig_list 配置信息
      // basicInfoNetwork_list 网络信息
      // basicInfoProtocolPort_list 协议端口信息
      // basicInfoSoftware_list 通用软件信息
      // //console.log(basic_data,"-------244----",item_data['equipmentId'])
      // if(!basic_data.basicInfo) continue
      let n = basic_data['basicInfoSoftware_list'].length > basic_data['basicInfoConfig_list'].length ? basic_data['basicInfoSoftware_list'].length : basic_data['basicInfoConfig_list'].length  // n是配置信息或者通用软件信息中的信息最大条数
      let x = 1 + basic_data['basicInfoAppSoftware_list'].length // x是专用软件信息中信息最大条数 第一行是表头
      let z = basic_data['basicInfoAppSystemUser_list'].length // z是系统用户信息中信息的最大条数
      let a = basic_data['basicInfoAppBusiness_list'].length - 3 > 0 ? basic_data['basicInfoAppBusiness_list'].length - 3 : 0 // a是业务应用中数据条数超过3条的数量
      let c = basic_data['basicInfoAppStore_list'].length // c是’存储’信息中的最大条数
      let c2 = basic_data['basicInfoAppNativeStore_list'].length // c2是’本机存储’信息中的最大条数
      let y = basic_data['basicInfoAppLinksInfo_list'].length // y是’链接（服务）用户信息’中的最大条数
      // let n =  3
      let n2 = basic_data['basicInfoNetwork_list'].length > basic_data['basicInfoProtocolPort_list'].length ? basic_data['basicInfoNetwork_list'].length : basic_data['basicInfoProtocolPort_list'].length// n2是网络信息或端口协议信息中的最大条数0
      // let x = 3
      // let z = 3
      // let a = 3
      // let c = 3
      // let c2 =3
      // let y = 10
      //添加工作表
      let sheet = workbook.addWorksheet('' + sheet_num)
      //设置列宽
      sheet.getColumn('A').width = 2.3
      sheet.getColumn('B').width = 2.3
      let col_i = 'CEFGHIJK'
      for (let i = 0; i < col_i.length; i++) {
        sheet.getColumn(col_i[i]).width = 16
      }
      sheet.getColumn('D').width = 9
      sheet.getColumn('E').width = 10
      //表头 信息资产基础信息表
      sheet.mergeCells('C1:K2')
      let C1 = sheet.getCell('C1')
      C1.alignment = content_row
      C1.font = {
        name: 'Arial Black',
        color: { argb: '000000' },
        family: 2,
        size: 18
      }
      C1.value = '信息资产基础信息表'
      let item_row = sheet.getRow(1)
      item_row.height = 24
      item_row = sheet.getRow(2)
      item_row.height = 14.25
      //第三行
      sheet.getRow(3).height = 37.5
      sheet.mergeCells('C3:E3')
      let C3 = sheet.getCell('C3')
      C3.value = '设备名称'
      C3.alignment = content_row
      C3.font = table_header
      C3.fill = table_fill1


      sheet.mergeCells('F3:G3')
      let F3 = sheet.getCell('F3')
      F3.alignment = content_row
      F3.font = table_header4
      F3.fill = table_fill1

      sheet.mergeCells('H3:I3')
      let H3 = sheet.getCell('H3')
      H3.value = '所属系统'
      H3.alignment = content_row
      H3.font = table_header
      H3.fill = table_fill1


      sheet.mergeCells('J3:K3')
      let J3 = sheet.getCell('J3')
      J3.alignment = content_row
      J3.font = table_header4
      J3.fill = table_fill1
      // 第四行
      sheet.getRow(4).height = 34.5
      let C4 = sheet.getCell('C4')
      C4.value = '主 机 名'
      C4.alignment = content_row
      C4.font = table_header2
      C4.fill = table_fill2

      sheet.mergeCells('D4:E4')
      let D4 = sheet.getCell('D4')
      D4.alignment = content_row
      D4.font = table_header3
      D4.fill = table_fill2

      sheet.mergeCells('F4:G4')
      let F4 = sheet.getCell('F4')
      F4.value = '部  门'
      F4.alignment = content_row
      F4.font = table_header2
      F4.fill = table_fill2

      sheet.mergeCells('H4:I4')
      let H4 = sheet.getCell('H4')
      H4.alignment = content_row
      H4.font = table_header3
      H4.fill = table_fill2

      let J4 = sheet.getCell('J4')
      J4.value = '编  号'
      J4.alignment = content_row
      J4.font = table_header2
      J4.fill = table_fill2

      let K4 = sheet.getCell('K4')
      K4.alignment = content_row
      K4.font = table_header3
      K4.fill = table_fill2

      // 第五行
      sheet.getRow(5).height = 30
      let C5 = sheet.getCell('C5')
      C5.value = '设备管理员'
      C5.alignment = content_row
      C5.font = table_header2
      C5.fill = table_fill2

      sheet.mergeCells('D5:E5')
      let D5 = sheet.getCell('D5')
      D5.alignment = content_row
      D5.font = table_header3
      D5.fill = table_fill2

      let F5 = sheet.getCell('F5')
      F5.value = '电  话'
      F5.alignment = content_row
      F5.font = table_header2
      F5.fill = table_fill2

      let G5 = sheet.getCell('G5')
      G5.alignment = content_row
      G5.font = table_header3
      G5.fill = table_fill2

      let H5 = sheet.getCell('H5')
      H5.value = '应用管理员'
      H5.alignment = content_row
      H5.font = table_header2
      H5.fill = table_fill2

      let I5 = sheet.getCell('I5')
      I5.alignment = content_row
      I5.font = table_header3
      I5.fill = table_fill2

      let J5 = sheet.getCell('J5')
      J5.value = '电  话'
      J5.alignment = content_row
      J5.font = table_header2
      J5.fill = table_fill2

      let K5 = sheet.getCell('K5')
      K5.alignment = content_row
      K5.font = table_header3
      K5.fill = table_fill2

      // 第六行
      sheet.getRow(6).height = 42.75
      // 垂直左右居中加上自动换行
      let content_row_item = { vertical: 'middle', horizontal: 'center', wrapText: true }

      let C6 = sheet.getCell('C6')
      C6.value = '业  务  机\r\n实  验  机'
      C6.alignment = content_row_item
      C6.font = table_header2
      C6.fill = table_fill2

      sheet.mergeCells('D6:E6')
      let D6 = sheet.getCell('D6')
      D6.alignment = content_row_item
      D6.font = table_header3
      D6.fill = table_fill2

      let F6 = sheet.getCell('F6')
      F6.value = '主  机\n备  机'
      F6.alignment = content_row_item
      F6.font = table_header2
      F6.fill = table_fill2

      let G6 = sheet.getCell('G6')
      G6.alignment = content_row_item
      // G6.value = '√\n□'
      G6.font = table_header3
      G6.fill = table_fill2

      let H6 = sheet.getCell('H6')
      H6.value = '实  体  机\n虚  拟  机'
      H6.alignment = content_row_item
      H6.font = table_header2
      H6.fill = table_fill2

      let I6 = sheet.getCell('I6')
      I6.alignment = content_row_item
      I6.font = table_header3
      I6.fill = table_fill2

      let J6 = sheet.getCell('J6')
      J6.alignment = content_row_item
      J6.font = table_header2
      J6.fill = table_fill2
      J6.value = '是    否\n可迁移'

      let K6 = sheet.getCell('K6')
      K6.alignment = content_row_item
      K6.font = table_header3
      K6.fill = table_fill2

      // 第七行
      sheet.getRow(7).height = 22.5
      sheet.mergeCells('C7:K7')
      let C7 = sheet.getCell('C7')
      C7.value = '基   本   信   息'
      C7.alignment = content_row
      C7.font = table_header
      C7.fill = table_fill1
      // 第八行
      sheet.getRow(8).height = 22.5

      sheet.mergeCells('C8:E8')
      let C8 = sheet.getCell('C8')
      C8.value = '品  牌'
      C8.alignment = content_row
      C8.font = table_header2
      C8.fill = table_fill2

      sheet.mergeCells('F8:G8')
      let F8 = sheet.getCell('F8')
      F8.value = '型  号'
      F8.alignment = content_row
      F8.font = table_header2
      F8.fill = table_fill2

      sheet.mergeCells('H8:I8')
      let H8 = sheet.getCell('H8')
      H8.value = '安装位置'
      H8.alignment = content_row
      H8.font = table_header2
      H8.fill = table_fill2

      sheet.mergeCells('J8:K8')
      let J8 = sheet.getCell('J8')
      J8.value = '机柜号'
      J8.alignment = content_row
      J8.font = table_header2
      J8.fill = table_fill2
      // 第九行
      sheet.getRow(9).height = 19.5
      sheet.mergeCells('C9:E9')
      let C9 = sheet.getCell('C9')
      C9.alignment = content_row
      C9.font = table_header2
      C9.fill = table_fill3

      sheet.mergeCells('F9:G9')
      let F9 = sheet.getCell('F9')
      F9.alignment = content_row
      F9.font = table_header2
      F9.fill = table_fill3

      sheet.mergeCells('H9:I9')
      let H9 = sheet.getCell('H9')
      H9.alignment = content_row
      H9.font = table_header2
      H9.fill = table_fill3

      sheet.mergeCells('J9:K9')
      let J9 = sheet.getCell('J9')
      J9.alignment = content_row
      J9.font = table_header2
      J9.fill = table_fill3
      // 第十行
      sheet.getRow(10).height = 22.5

      sheet.mergeCells('C10:E10')
      let C10 = sheet.getCell('C10')
      C10.value = '序列号'
      C10.alignment = content_row
      C10.font = table_header2
      C10.fill = table_fill2

      sheet.mergeCells('F10:G10')
      let F10 = sheet.getCell('F10')
      F10.value = '保修期'
      F10.alignment = content_row
      F10.font = table_header2
      F10.fill = table_fill2

      sheet.mergeCells('H10:I10')
      let H10 = sheet.getCell('H10')
      H10.value = '上线时间'
      H10.alignment = content_row
      H10.font = table_header2
      H10.fill = table_fill2

      sheet.mergeCells('J10:K10')
      let J10 = sheet.getCell('J10')
      J10.value = '下线时间'
      J10.alignment = content_row
      J10.font = table_header2
      J10.fill = table_fill2
      // 第十一行
      sheet.getRow(11).height = 19.5

      sheet.mergeCells('C11:E11')
      let C11 = sheet.getCell('C11')
      C11.alignment = content_row
      C11.font = table_header2
      C11.fill = table_fill3

      sheet.mergeCells('F11:G11')
      let F11 = sheet.getCell('F11')
      F11.alignment = content_row
      F11.font = table_header2
      F11.fill = table_fill3

      sheet.mergeCells('H11:I11')
      let H11 = sheet.getCell('H11')
      H11.alignment = content_row
      H11.font = table_header2
      H11.fill = table_fill3

      sheet.mergeCells('J11:K11')
      let J11 = sheet.getCell('J11')
      J11.alignment = content_row
      J11.font = table_header2
      J11.fill = table_fill3

      // 绘制边框
      //里面的
      let inside = [D4, F4, H4, J4,
        D5, F5, G5, H5, I5, J5,
        D6, F6, G6, H6, I6, J6,
        F8, H8,
        F9, H9,
        F10, H10
      ]
      for (let i of inside) {
        i.border = {
          top: white,
          left: white,
          bottom: white,
          right: white
        }
      }
      // 中间的
      C7.border = {
        top: white,
        left: red,
        bottom: white,
        right: red
      }
      // 四边的
      let t = [F3, H3]
      for (let i of t) {
        i.border = {
          top: red,
          left: white,
          bottom: white,
          right: white
        }
      }
      let l = [
        C4, C5, C6, C8, C9, C10
      ]
      for (let i of l) {
        i.border = {
          top: white,
          left: red,
          bottom: white,
          right: white
        }
      }
      let r = [
        K4, K5, K6, J8, J9, J10
      ]
      for (let i of r) {
        i.border = {
          top: white,
          left: white,
          bottom: white,
          right: red
        }
      }
      let b = [F11, H11]
      for (let i of b) {
        i.border = {
          top: white,
          left: white,
          bottom: red,
          right: white
        }
      }
      // 四角
      C3.border = {
        top: red,
        left: red,
        bottom: white,
        right: white
      }
      J3.border = {
        top: red,
        left: white,
        bottom: white,
        right: red
      }
      C11.border = {
        top: white,
        left: red,
        bottom: red,
        right: white
      }
      J11.border = {
        top: white,
        left: white,
        bottom: red,
        right: red
      }

      // 第十二行
      sheet.getRow(12).height = 5.25
      sheet.mergeCells('C12:K12')
      let C12 = sheet.getCell('C12')
      C12.fill = table_fill3

      // 第十三行
      sheet.getRow(13).height = 22.5
      sheet.mergeCells('C13:G13')
      let C13 = sheet.getCell('C13')
      C13.value = '配置信息'
      C13.alignment = content_row
      C13.font = table_header
      C13.fill = table_fill1

      sheet.mergeCells('H13:K13')
      let H13 = sheet.getCell('H13')
      H13.value = '通用软件信息'
      H13.alignment = content_row
      H13.font = table_header
      H13.fill = table_fill1

      // 第十四行
      sheet.getRow(14).height = 15.75 // 15.25
      let C14 = []
      sheet.getRow(num).height = 15.75
      for (let i of 'CDEFGHIJK') {
        let item_cell = sheet.getCell(i + 14)
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill4
        C14.push(item_cell)
      }
      let tables = ['项  目', '类型', '性能指标', '数量指标', '实配数量', '项  目', '名称', '版本', '类型']
      for (let i in tables) {
        C14[i].value = tables[i]
      }

      // 第15到第15+n-1行
      // let n = 5 // n是配置信息或者通用软件信息中的信息最大条数
      // debugger
      let cols = 'CDEFGHIJK'
      let C15 = [] // 存放第15到第15+n行的单元格
      for (let i = 1; i <= n; i++) {
        sheet.getRow(14 + i).height = 15.25
        let item_row = []
        for (let col of cols) {
          let cell = sheet.getCell(col + (14 + i))
          cell.alignment = content_row
          cell.font = table_header3
          if (i % 2 == 0) {
            cell.fill = table_fill5
          } else {
            cell.fill = table_fill3
          }
          item_row.push(cell)
        }
        C15.push(item_row)
      }

      // 第16+n-1行
      let num = 16 + n - 1
      sheet.getRow(num).height = 18.75
      let C16 = []
      sheet.mergeCells('C' + num + ':' + 'G' + num)
      sheet.mergeCells('H' + num + ':' + 'K' + num)
      for (let i of 'CH') {
        let item_cell = sheet.getCell(i + num)
        item_cell.alignment = content_row
        item_cell.font = table_header
        item_cell.fill = table_fill1
        C16.push(item_cell)
      }
      C16[0].value = '网络信息'
      C16[1].value = '协议端口信息'

      // 第17+n-1行
      num = 17 + n - 1
      let C17 = []
      sheet.getRow(num).height = 14.25
      sheet.mergeCells('I' + num + ':' + 'J' + num)
      for (let i of 'CDEFGHIK') {
        let item_cell = sheet.getCell(i + num)
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill4
        C17.push(item_cell)
      }
      tables = ['网卡', 'ip地址', '交换机', 'MAC地址', '端口', '协  议', '应用名称', '端口']
      for (let i in tables) {
        C17[i].value = tables[i]
      }

      // 第18+n-1到18+n-1+n2-1行
      num = 18 + n - 1
      let C18 = []
      for (let item = 0; item < n2; item++) {
        sheet.mergeCells('I' + num + ':' + 'J' + num)
        sheet.getRow(num).height = 14.25
        let item_list = []
        for (let i of 'CDEFGHIK') {
          let item_cell = sheet.getCell(i + num)
          item_cell.alignment = content_row
          item_cell.font = table_header3
          if (item % 2 == 0) {
            item_cell.fill = table_fill5
          } else {
            item_cell.fill = table_fill3
          }
          item_list.push(item_cell)
        }
        C18.push(item_list)
        num++
      }

      // 第20+n-1行

      // 第21～23 +n-1行

      // 绘制边框
      //里面的
      inside = [].concat(C14.slice(1, C14.length - 1))
      if (C15[0])
        for (let i of C15) {
          inside = inside.concat(i.slice(1, i.length - 1))
        }
      if (C17[0])
        inside = inside.concat(C17.slice(1, C17.length - 1))
      if (C18[0])
        for (let i of C18.slice(0, C18.length - 1)) {
          inside = inside.concat(i.slice(1, i.length - 1))
        }
      for (let i of inside) {
        i.border = {
          top: white,
          left: white,
          bottom: white,
          right: white
        }
      }
      // 中间的
      C16[0].border = {
        top: white,
        left: black,
        bottom: white,
        right: white
      }
      C16[1].border = {
        top: white,
        left: white,
        bottom: white,
        right: black
      }
      // 四边的
      l = [
        C14[0],
        C17[0]
      ]
      if (C15[0])
        for (let i in C15) {
          l.push(C15[i][0])
        }
      if (C18[0])
        for (let i in C18) {
          l.push(C18[i][0])
        }

      for (let i of l) {
        i.border = {
          top: white,
          left: black,
          bottom: white,
          right: white
        }
      }
      r = [
        C14[C14.length - 1],
        C17[C17.length - 1]
      ]
      if (C15[0])
        for (let i in C15) {
          r.push(C15[i][C15[i].length - 1])
        }
      if (C18[0])
        for (let i in C18) {
          r.push(C18[i][C18[i].length - 1])
        }
      for (let i of r) {
        i.border = {
          top: white,
          left: white,
          bottom: white,
          right: black
        }
      }
      let b_temp = C18[C18.length - 1]
      b = b_temp.slice(1, b_temp.length - 1)
      for (let i of b) {
        i.border = {
          top: white,
          left: white,
          bottom: black,
          right: white
        }
      }
      // 四角
      C13.border = {
        top: black,
        left: black,
        bottom: white,
        right: white
      }
      H13.border = {
        top: black,
        left: white,
        bottom: white,
        right: black
      }
      b_temp[0].border = {
        top: white,
        left: black,
        bottom: black,
        right: white
      }
      b_temp[b_temp.length - 1].border = {
        top: white,
        left: white,
        bottom: black,
        right: black
      }

      // 第19 +n-1 +n2-1行
      num = 19 + n - 1 + n2 - 1
      sheet.getRow(num).height = 5.25
      sheet.mergeCells('C' + num + ':' + 'K' + num)
      sheet.getCell('C' + num).fill = table_fill3

      // 第20 +n-1 +n2-1行
      num = 20 + n - 1 + n2 - 1
      sheet.getRow(num).height = 24.75
      sheet.mergeCells('C' + num + ':' + 'K' + num)
      let C20 = sheet.getCell('C' + num)
      C20.value = '业  务  应  用  信  息'
      C20.alignment = content_row
      C20.font = {
        name: 'Arial Black',
        color: { argb: 'ffffff' },
        family: 2,
        size: 14,
        bold: true
      }
      C20.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5b9bd5' }
      }
      // 第21 +n-1 +n2-1行
      num = 21 + n - 1 + n2 - 1
      sheet.getRow(num).height = 21.75
      sheet.mergeCells('C' + num + ':' + 'K' + num)
      let C21 = sheet.getCell('C' + num)
      C21.value = '专用软件信息'
      C21.alignment = content_row
      C21.font = table_header2
      C21.fill = table_fill4

      // 第27 +n-1 +n2-1到27 +n-1 +n2-1 + x-1行
      num = 22 + n - 1 + n2 - 1
      // let x = 1 + 2 // x是专用软件信息中信息最大条数 第一行是表头
      let C22 = []
      for (let item = 0; item < x; item++) {
        let item_list = []
        sheet.getRow(num).height = 15
        sheet.mergeCells('C' + num + ':' + 'E' + num)
        sheet.mergeCells('J' + num + ':' + 'K' + num)
        for (let i of 'CFGHIJ') {
          let item_cell = sheet.getCell(i + num)
          item_cell.alignment = content_row
          if (item == 0) {
            item_cell.font = table_header2
          } else {
            item_cell.font = table_header3
          }
          if (item % 2 == 0) {
            item_cell.fill = table_fill5
          } else {
            item_cell.fill = table_fill3
          }
          item_list.push(item_cell)
        }
        C22.push(item_list)
        num++
      }
      tables = ['名称', '版本', '端口', '上线时间', '研发单位', '联系人']
      for (let i in tables) {
        C22[0][i].value = tables[i]
      }

      // 第23 +n-1 +n2-1 + x-1行
      num = 23 + n - 1 + n2 - 1 + x - 1
      sheet.getRow(num).height = 21.75
      sheet.mergeCells('C' + num + ':' + 'K' + num)
      let C23 = sheet.getCell('C' + num)
      C23.value = '系统用户信息'
      C23.alignment = content_row
      C23.font = table_header2
      C23.fill = table_fill4

      // 第24 ～ 25 +n-1 +n2-1 + x-1行
      num = 24 + n - 1 + n2 - 1 + x - 1
      let C24 = []
      sheet.getRow(num).height = 15
      sheet.mergeCells('C' + num + ':' + 'C' + (num + 1))
      sheet.mergeCells('D' + num + ':' + 'E' + (num + 1))
      sheet.mergeCells('F' + num + ':' + 'G' + (num + 1))
      sheet.mergeCells('H' + num + ':' + 'I' + num)
      sheet.mergeCells('J' + num + ':' + 'J' + (num + 1))
      sheet.mergeCells('K' + num + ':' + 'K' + (num + 1))
      tables = ['C', 'D', 'F', 'H', 'J', 'K']
      let tables_i = ['用户名', '使用人', '级别权限', '访问方式', '创建时间', '其他']
      for (let i in tables) {
        let item_cell = sheet.getCell(tables[i] + num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill5
        C24.push(item_cell)
      }
      num++
      sheet.getRow(num).height = 15
      tables = ['H', 'I']
      tables_i = ['本地', '远程(登录方式)']
      for (let i in tables) {
        let item_cell = sheet.getCell(tables[i] + num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill5
        C24.push(item_cell)
      }

      // 第26 +n-1 +n2-1 + x-1到31 +n-1 +n2-1 + x-1 + z-1行
      num = 26 + n - 1 + n2 - 1 + x - 1
      // let z = 4 // z是系统用户信息中信息的最大条数
      let C26 = []
      for (let item = 0; item < z; item++) {
        sheet.getRow(num).height = 15
        sheet.mergeCells('D' + num + ':' + 'E' + num)
        sheet.mergeCells('F' + num + ':' + 'G' + num)
        let item_list = []
        for (let i of 'CDFHIJK') {
          let item_cell = sheet.getCell(i + num)
          item_cell.alignment = content_row
          item_cell.font = table_header3
          item_cell.fill = table_fill5
          item_list.push(item_cell)
        }
        C26.push(item_list)
        num++
      }
      // 第27 +n-1 +n2-1 + x-1 + z-1行
      num = 27 + n - 1 + n2 - 1 + x - 1 + z - 1
      let C27 = []
      sheet.getRow(num).height = 18
      sheet.mergeCells('C' + num + ':' + 'G' + num)
      sheet.mergeCells('H' + num + ':' + 'K' + num)
      tables = ['C', 'H']
      tables_i = ['业务应用', '访问权限']
      for (let i in tables) {
        let item_cell = sheet.getCell(tables[i] + num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill4
        C27.push(item_cell)
      }

      // 第28 +n-1 +n2-1 + x-1 + z-1行
      num = 28 + n - 1 + n2 - 1 + x - 1 + z - 1
      let C28 = []
      sheet.getRow(num).height = 14.25
      sheet.mergeCells('D' + num + ':' + 'E' + num)
      tables = ['C', 'D', 'F', 'G']
      tables_i = ['应用类型', '域名/地址', 'ICP号', '用户范围']
      for (let i in tables) {
        let item_cell = sheet.getCell(tables[i] + num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        C28.push(item_cell)
      }
      tables = ['H', 'I', 'J', 'K']
      tables_i = ['内网', '行业网', '互联网', '其它']
      for (let i in tables) {
        let item_cell = sheet.getCell(tables[i] + num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill5
        C28.push(item_cell)
      }

      // 第29 +n-1 +n2-1 + x-1 + z-1行
      num = 29 + n - 1 + n2 - 1 + x - 1 + z - 1
      let C29 = []
      sheet.mergeCells('D' + num + ':' + 'E' + num)
      for (let i of 'CDFGHIJK') {
        let item_cell = sheet.getCell(i + num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C29.push(item_cell)
      }
      // 第30 +n-1 +n2-1 + x-1 + z-1行
      num = 30 + n - 1 + n2 - 1 + x - 1 + z - 1
      sheet.getRow(num).height = 14.25
      sheet.mergeCells('D' + num + ':' + 'E' + num)
      sheet.mergeCells('H' + num + ':' + 'K' + num)
      let C30 = []
      tables = ['C', 'D', 'F', 'G']
      for (let i in tables) {
        let item_cell = sheet.getCell(tables[i] + num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C30.push(item_cell)
      }
      C30.push(sheet.getCell('H' + num))
      C30[C30.length - 1].alignment = content_row
      C30[C30.length - 1].font = table_header2
      C30[C30.length - 1].fill = table_fill4
      C30[C30.length - 1].value = '服务用户信息'
      // 第31 +n-1 +n2-1 + x-1 + z-1行
      num = 31 + n - 1 + n2 - 1 + x - 1 + z - 1
      sheet.getRow(num).height = 14.25
      sheet.mergeCells('D' + num + ':' + 'E' + num)
      let C31 = []
      for (let i of 'CDFG') {
        let item_cell = sheet.getCell(i + num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C31.push(item_cell)
      }
      tables = ['H', 'I', 'J', 'K']
      tables_i = ['单位', '用户名', 'IP地址', '其它']
      for (let i in tables) {
        let item_cell = sheet.getCell(tables[i] + num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill5
        C31.push(item_cell)
      }
      // 第32 +n-1 +n2-1 + x-1 + z-1行到第33 +n-1 +n2-1 + x-1 + z-1 + a-1
      num = 32 + n - 1 + n2 - 1 + x - 1 + z - 1
      // let a = 0 // a是业务应用中数据条数超过3条的数量
      let C32 = []
      for (let item = 0; item < a; item++) {
        sheet.getRow(num).height = 14.25
        sheet.mergeCells('D' + num + ':' + 'E' + num)
        let item_list = []
        for (let i of 'CDFGHIJK') {
          let item_cell = sheet.getCell(i + num)
          item_cell.alignment = content_row
          item_cell.font = table_header3
          item_cell.fill = table_fill5
          item_list.push(item_cell)
        }
        C32.push(item_list)
        num++
      }
      // 第33 +n-1 +n2-1 + x-1 + z-1行
      num = 33 + n - 1 + n2 - 1 + x - 1 + z - 1 + a - 1
      sheet.getRow(num).height = 18
      sheet.mergeCells('C' + num + ':' + 'G' + num)
      let C33 = []
      C33.push(sheet.getCell('C' + num))
      C33[0].value = '存  储'
      C33[0].alignment = content_row
      C33[0].font = table_header2
      C33[0].fill = table_fill4
      for (let i in tables) {
        let item_cell = sheet.getCell(tables[i] + num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C33.push(item_cell)
      }
      // 第34 +n-1 +n2-1 + x-1 + z-1行
      num = 34 + n - 1 + n2 - 1 + x - 1 + z - 1 + a - 1
      sheet.getRow(num).height = 14.25
      sheet.mergeCells('C' + num + ':' + 'E' + num)
      let C34 = []
      tables = ['C', 'F', 'G']
      tables_i = ['卷信息', 'SAN/NAS', '已用/分配容量(G)']
      for (let i in tables) {
        let item_cell = sheet.getCell(tables[i] + num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        C34.push(item_cell)
      }
      for (let i of 'HIJK') {
        let item_cell = sheet.getCell(i + num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C34.push(item_cell)
      }

      // 第35 +n-1 +n2-1 + x + z-1 + a-1到35 +n-1 +n2-1 + x-1 + z-1 + a-1 + c-1行
      num = 35 + n - 1 + n2 - 1 + x - 1 + z - 1 + a - 1
      // let c = 5 // c是’存储’信息中的最大条数
      let C35 = []
      for (let item = 0; item < c; item++) {
        sheet.getRow(num).height = 14.25
        sheet.mergeCells('C' + num + ':' + 'E' + num)
        let item_list = []
        for (let i of 'CFG') {
          let item_cell = sheet.getCell(i + num)
          item_cell.alignment = content_row
          item_cell.font = table_header3
          item_list.push(item_cell)
        }
        for (let i of 'HIJK') {
          let item_cell = sheet.getCell(i + num)
          item_cell.alignment = content_row
          item_cell.font = table_header3
          item_cell.fill = table_fill5
          item_list.push(item_cell)
        }
        C35.push(item_list)
        num++
      }
      // 第36 +n-1 +n2-1 + x-1 + z-1 + a-1 + c-1行
      num = 36 + n - 1 + n2 - 1 + x - 1 + z - 1 + a - 1 + c - 1
      sheet.getRow(num).height = 18
      sheet.mergeCells('C' + num + ':' + 'G' + num)
      let C36 = []
      C36.push(sheet.getCell('C' + num))
      C36[0].value = '本  机  存  储'
      C36[0].alignment = content_row
      C36[0].font = table_header2
      C36[0].fill = table_fill4
      tables = ['H', 'I', 'J', 'K']
      for (let i in tables) {
        let item_cell = sheet.getCell(tables[i] + num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C36.push(item_cell)
      }
      // 第37 +n-1 +n2-1 + x-1 + z-1 + a-1 + c-1行
      num = 37 + n - 1 + n2 - 1 + x - 1 + z - 1 + a - 1 + c - 1
      sheet.getRow(num).height = 14.25
      sheet.mergeCells('D' + num + ':' + 'E' + num)
      let C37 = []
      tables = ['C', 'D', 'F', 'G']
      tables_i = ['总容量', '已用空间', '未用空间', '年增长空间']
      for (let i in tables) {
        let item_cell = sheet.getCell(tables[i] + num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        C37.push(item_cell)
      }
      for (let i of 'HIJK') {
        let item_cell = sheet.getCell(i + num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C37.push(item_cell)
      }
      // 第38 +n-1 +n2-1 + x-1 + z-1 + a-1 + c-1到38 +n-1 +n2-1 + x-1 + z-1 + a-1 + c-1 + c2-1行
      num = 38 + n - 1 + n2 - 1 + x - 1 + z - 1 + a - 1 + c - 1
      // let c2 = 5 // c2是’本机存储’信息中的最大条数
      let C38 = []
      for (let item = 0; item < c2; item++) {
        sheet.getRow(num).height = 14.25
        let item_list = []
        sheet.mergeCells('D' + num + ':' + 'E' + num)
        for (let i of 'CDFG') {
          let item_cell = sheet.getCell(i + num)
          item_cell.alignment = content_row
          item_cell.font = table_header3
          item_list.push(item_cell)
        }
        for (let i of 'HIJK') {
          let item_cell = sheet.getCell(i + num)
          item_cell.alignment = content_row
          item_cell.font = table_header3
          item_cell.fill = table_fill5
          item_list.push(item_cell)
        }
        C38.push(item_list)
        num++
      }
      //第39 +n-1 +n2-1 + x-1 + z-1 + a-1 + c-1 + c2-1到39 +n-1 +n2-1 + x + z-1 + a-1 + c-1 + c2-1 + c3行 如果有的话
      let C39 = []
      // let y = 5 // y是’链接（服务）用户信息’中的最大条数
      let c3 = 0 //表格超出数
      if (c + a + c2 < y) {
        c3 = y - (c + a + c2)
        for (let item = 0; item < c3; item++) {
          sheet.getRow(num).height = 14.25
          sheet.mergeCells('D' + num + ':' + 'E' + num)
          let item_list = []
          for (let i of 'CDFG') {
            let item_cell = sheet.getCell(i + num)
            item_cell.alignment = content_row
            item_cell.font = table_header2
            item_list.push(item_cell)
          }
          for (let i of 'HIJK') {
            let item_cell = sheet.getCell(i + num)
            item_cell.alignment = content_row
            item_cell.font = table_header3
            item_cell.fill = table_fill5
            item_list.push(item_cell)
          }
          C39.push(item_list)
          num++
        }
      }

      // 绘制边框
      //里面的
      inside = [
        C24[1], C24[2], C24[3], C24[4], C24[6], C24[7],
        C28[4], C28[5], C28[5],
        C29[1], C29[2], C29[3], C29[4], C29[5], C29[6],
        C30[1], C30[2], C30[3],
        C31[1], C31[2], C31[3], C31[4], C31[5], C31[6],
        C34[3], C34[4], C34[5],
        C36[1], C36[2], C36[3],
        C37[4], C37[5], C37[6]
      ]
      for (let i in C22) {
        for (let item = 1; item < 4; item++) {
          inside.push(C22[i][item])
        }
      }
      for (let i in C26) {
        for (let item = 1; item < 6; item++) {
          inside.push(C26[i][item])
        }
      }

      for (let j in C32) {
        for (let item = 1; item < 7; item++) {
          inside.push(C32[j][item])
        }
      }
      for (let item = 1; item < 4; item++) {
        inside.push(C33[item])
      }
      for (let j in C35) {
        for (let item = 3; item < 6; item++) {
          inside.push(C35[j][item])
        }
      }
      // 边框样式可以覆盖，这写的不严谨，直接白菜萝卜一把抓全弄一个样式
      for (let j in C38) {
        if (j == C38.length - 1) break
        for (let item = 4; item < 7; item++) {
          inside.push(C38[j][item])
        }
      }
      // 中间的
      for (let i of [C21, C23]) {
        i.border = {
          top: white,
          left: black,
          bottom: white,
          right: black
        }
      }
      // 四边的
      l = [C24[0], C27[0], C29[0], C30[0], C31[0], C33[0], C36[0]]
      C28[0].border = { left: black }
      for (let item of [C22, C26, C32]) {
        for (let i of item) {
          l.push(i[0])
        }
      }
      for (let i of l) {
        i.border = {
          top: white,
          left: black,
          bottom: white,
          right: white
        }
      }
      for (let i of C35) {
        i[0].border = {
          left: black
        }
      }
      for (let i of C38) {
        i[0].border = {
          left: black
        }
        i[7].border = {
          top: white,
          left: white,
          bottom: white,
          right: black
        }
      }
      for (let i of [C34[0], C37[0]]) {
        i.border = {
          left: black
        }
      }
      C20.border = {
        top: black,
        left: black,
        bottom: white,
        right: black
      }
      r = [
        C24[5],
        C27[1],
        C28[C28.length - 1],
        C29[C29.length - 1],
        C30[C30.length - 1],
        C31[C31.length - 1],
        C33[C33.length - 1],
        C34[C34.length - 1],
        C36[C36.length - 1],
        C37[C37.length - 1]
      ]
      for (let item of [C22, C26, C32, C35]) {
        for (let i of item) {
          r.push(i[i.length - 1])
        }
      }
      for (let i of r) {
        i.border = {
          top: white,
          left: white,
          bottom: white,
          right: black
        }
      }
      if (C39.length > 0) {
        for (let i = 0; i < C39.length - 1; i++) {
          for (let item = 4; item < 7; item++) {
            inside.push(C39[i][item])
          }
        }
        for (let item in C39[C39.length - 1]) {
          if (item > 0 || item < 4) {
            C39[C39.length - 1][item].border = {
              bottom: black
            }
          } else if (item >= 4 || item < 7) {
            C39[C39.length - 1][item].border = {
              top: white,
              left: white,
              bottom: black,
              right: white
            }
          }
        }
        for (let i of C39) {
          i[0].border = {
            left: black
          }
          i[7].border = {
            top: white,
            left: white,
            bottom: white,
            right: black
          }
        }
        C39[C39.length - 1][0].border = {
          left: black,
          bottom: black
        }
        C39[C39.length - 1][C39[C39.length - 1].length - 1].border = {
          top: white,
          left: white,
          bottom: black,
          right: black
        }
      } else {
        for (let item in C38[C38.length - 1]) {
          // //console.log(item)
          if (item > 0 || item < 4) {
            C38[C38.length - 1][item].border = {
              bottom: black
            }
          } else if (item >= 4 || item < 7) {
            C38[C38.length - 1][item].border = {
              top: white,
              left: white,
              bottom: black,
              right: white
            }
          }
        }
        C38[C38.length - 1][0].border = {
          left: black,
          bottom: black
        }
        C38[C38.length - 1][C38[C38.length - 1].length - 1].border = {
          top: white,
          left: white,
          bottom: black,
          right: black
        }
      }
      for (let i of inside) {
        i.border = {
          top: white,
          left: white,
          bottom: white,
          right: white
        }
      }
      // 填入数据
      const git_time = (s) => {
        if (!s) return '无'
        let date = new Date(parseInt(s))  // 参数需要毫秒数，所以这里将秒数乘于 1000
        return date.getFullYear() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0')
      }
      F3.value = item_data['equipmentName']
      // J3.value = item_data['businessSystemName']
      J3.value = '无'
      D4.value = item_data['hostName']
      H4.value = item_data['departmentName']
      K4.value = item_data['basicInfoId']
      D5.value = item_data['equipmentAdminName']
      G5.value = item_data['equipmentAdminPhone']
      I5.value = item_data['appAdminName']
      K5.value = item_data['appAdminPhone']
      D6.value = item_data['businessOrExperimental'] == '0' ? '■\n□' : '□\n■'
      G6.value = item_data['mainOrBackup'] == '0' ? '■\n□' : '□\n■'
      I6.value = item_data['tureOrVirtual'] == '0' ? '■\n□' : '□\n■'
      K6.value = item_data['migratable'] == '0' ? '是■\n否□' : '是□\n否■'
      C9.value = item_data['brandName']
      F9.value = item_data['brandModelName']
      H9.value = item_data['machineRoomName']
      J9.value = item_data['cabinetName']
      C11.value = item_data['serialNumber']
      F11.value = item_data['guaranteePeriod']
      H11.value = git_time(item_data['onlineTime'])
      J11.value = git_time(item_data['offlineTime'])
      let n_list = []
      let x_list = []
      let z_list = []
      let a_list = []
      let y_list = []
      let c_list = []
      let c2_list = []
      // 配置信息和通用软件信息
      for (let i = 0; i < n; i++) {
        let item = []
        if (typeof basic_data['basicInfoConfig_list'][i] == 'undefined') {
          item = item.concat(['', '', '', '', ''])
        } else {
          item.push(basic_data['basicInfoConfig_list'][i]['projectName'])
          item.push(basic_data['basicInfoConfig_list'][i]['type'])
          item.push(basic_data['basicInfoConfig_list'][i]['frequency'])
          item.push(basic_data['basicInfoConfig_list'][i]['quantity'])
          item.push(basic_data['basicInfoConfig_list'][i]['corenessOrCapacity'])
        }
        if (typeof basic_data['basicInfoSoftware_list'][i] == 'undefined') {
          item = item.concat(['', '', '', ''])
        } else {
          item.push(basic_data['basicInfoSoftware_list'][i]['project'])
          item.push(basic_data['basicInfoSoftware_list'][i]['projectName'])
          item.push(basic_data['basicInfoSoftware_list'][i]['edition'])
          item.push(basic_data['basicInfoSoftware_list'][i]['type'])
        }
        n_list.push(item)
      }
      for (let i in C15) {
        for (let j in C15[i]) {
          C15[i][j].value = n_list[i][j]
        }
      }
      // 网络信息
      for (let i in basic_data['basicInfoNetwork_list']) {
        i = parseInt(i)
        C18[i][0].value = basic_data['basicInfoNetwork_list'][i]['networkCardName']
        C18[i][1].value = basic_data['basicInfoNetwork_list'][i]['ipAddress']
        C18[i][2].value = basic_data['basicInfoNetwork_list'][i]['switchInfo']
        C18[i][3].value = basic_data['basicInfoNetwork_list'][i]['macAddress']
        C18[i][4].value = basic_data['basicInfoNetwork_list'][i]['networkCardPort']
      }
      // 协议端口信息
      //console.log(basic_data['basicInfoProtocolPort_list'])
      for (let i in basic_data['basicInfoProtocolPort_list']) {
        i = parseInt(i)
        //console.log(C18)
        C18[i][5].value = basic_data['basicInfoProtocolPort_list'][i]['protocolName']
        C18[i][6].value = basic_data['basicInfoProtocolPort_list'][i]['appName']
        C18[i][7].value = basic_data['basicInfoProtocolPort_list'][i]['networkCardPort']
      }
      // 专用软件信息
      for (let i = 0; i < x - 1; i++) {
        let item_field = ['softwareName', 'businessName', 'softwarePort', 'softwareOnlineTime', 'softwareDevelopCompany', 'softwareLiaison']
        let item = []
        for (let f of item_field) {
          item.push(typeof basic_data['basicInfoAppSoftware_list'][i][f] == 'undefined' ? '' : basic_data['basicInfoAppSoftware_list'][i][f])
        }
        x_list.push(item)
      }
      for (let i in x_list) {
        for (let j in C22[i]) {
          i = parseInt(i)
          j = parseInt(j)
          C22[i + 1][j].value = x_list[i][j]

        }
      }
      // 系统用户信息
      for (let i = 0; i < z; i++) {
        let item_field = ['userName', 'realName', 'userLevel', 'localAccessMode', 'remoteAccessMode', 'createDate', 'other']
        let item = []
        for (let f of item_field) {
          item.push(basic_data['basicInfoAppSystemUser_list'][i][f])
        }
        z_list.push(item)
      }
      for (let i in z_list) {
        for (let j in C26[i]) {
          i = parseInt(i)
          j = parseInt(j)
          C26[i][j].value = z_list[i][j]

        }
      }
      // 业务应用
      for (let i = 0; i < basic_data['basicInfoAppBusiness_list'].length; i++) {
        let item_field = ['businessName', 'domainName', 'ICPNum', 'userScope']
        let item = []
        for (let f of item_field) {
          item.push(basic_data['basicInfoAppBusiness_list'][i][f])
        }
        a_list.push(item)
      }
      for (let i in a_list) {
        let item
        if (i < 3) {
          if (i == 0) item = C29
          if (i == 1) item = C30
          if (i == 2) item = C31
        } else if (i >= 3) {
          item = C32[i - 3]
        }
        for (let j in a_list[i]) {
          item[j].value = a_list[i][j]
        }
      }
      // 访问权限
      C29[4].value = basic_data['basicInfoAppAccessRights_list'][0]['intranet']
      C29[5].value = basic_data['basicInfoAppAccessRights_list'][0]['industryNetwork']
      C29[6].value = basic_data['basicInfoAppAccessRights_list'][0]['internet']
      C29[7].value = basic_data['basicInfoAppAccessRights_list'][0]['other']
      // 链接用户信息
      for (let i = 0; i < y; i++) {
        let item_field = ['company', 'userName', 'ipAddress', 'other']
        let item = []
        for (let f of item_field) {
          item.push(basic_data['basicInfoAppLinksInfo_list'][i][f])
        }
        y_list.push(item)
      }
      for (let i in y_list) {
        let item
        let C32_len = C32.length
        if (typeof C32[i] != 'undefined') {
          for (let j in y_list[i]) {
            C32[i][4 + parseInt(j)].value = y_list[i][j]
          }
        } else if (i == C32_len) {
          for (let j in y_list[i]) {
            C33[1 + parseInt(j)].value = y_list[i][j]
          }
        } else if (i == C32_len + 1) {
          for (let j in y_list[i]) {
            C34[3 + parseInt(j)].value = y_list[i][j]
          }
        } else if (i > C32_len + 1 && i <= C32_len + 1 + c) {
          for (let j in y_list[i]) {
            C35[i - (C32_len + 1) - 1][3 + parseInt(j)].value = y_list[i][j]
          }
        } else if (i == C32_len + 1 + c + 1) {
          for (let j in y_list[i]) {
            C36[1 + parseInt(j)].value = y_list[i][j]
          }
        } else if (i == C32_len + 1 + c + 1 + 1) {
          for (let j in y_list[i]) {
            C37[4 + parseInt(j)].value = y_list[i][j]
          }
        } else if (i > C32_len + 1 + c + 1 + 1 && i <= C32_len + 1 + c + 1 + 1 + c2) {
          for (let j in y_list[i]) {
            C38[i - (C32_len + 1 + c + 1 + 1) - 1][4 + parseInt(j)].value = y_list[i][j]
          }
        } else if (c3 > 0) {
          for (let j in y_list[i]) {
            C39[i - (C32_len + 1 + c + 1 + 1 + c2) - 1][4 + parseInt(j)].value = y_list[i][j]
          }
        }
      }
      // 存储
      for (let i = 0; i < c; i++) {
        let item_field = ['volume', 'SAN_NAS', 'capacity']
        let item = []
        for (let f of item_field) {
          item.push(basic_data['basicInfoAppStore_list'][i][f])
        }
        c_list.push(item)
      }
      for (let i in c_list) {
        for (let j in c_list[i]) {
          C35[i][j].value = c_list[i][j]
        }
      }
      // 本机存储
      for (let i = 0; i < c2; i++) {
        let item_field = ['totalCapacity', 'usedSpace', 'unusedSpace', 'annualGrowthSpace']
        let item = []
        for (let f of item_field) {
          item.push(basic_data['basicInfoAppNativeStore_list'][i][f])
        }
        c2_list.push(item)
      }
      for (let i in c2_list) {
        for (let j in c2_list[i]) {
          C38[i][j].value = c2_list[i][j]
        }
      }

      data_index++
      progress_list[progress_item_num]++
      // //console.log(progress_list)
      window.localStorage.setItem('report_form_info', file_list.toString() + ';' + progress_list.toString())
    }
    //导出下载
    let buffer = await workbook.xlsx.writeBuffer()
    let blob = new Blob([buffer])
    let link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.download = data_list[progress_item_num]['basicInfoId'] + '.xlsx'
    link.click()
    document.body.removeChild(link)

    progress_item_num++
  }
  setTimeout(() => {
    window.localStorage.setItem('report_form_info', '')
  }, 200)
  return
}

export async function getExcelDemo3(StatisticsData) {
  //创建工作簿↓
  const workbook = new ExcelJS.Workbook()
  //设置工作簿属性↓
  workbook.creator = '中国地震台网中心信息资源管理系统'
  // workbook.lastModifiedBy = 'Her';
  workbook.created = new Date()
  workbook.modified = new Date()
  workbook.lastPrinted = new Date()
  workbook.properties.date1904 = true
  workbook.calcProperties.fullCalcOnLoad = true
  //工作簿视图 ？？啥玩意
  workbook.views = [{
    x: 0,
    y: 0,
    width: 10000,
    height: 20000,
    firstSheet: 0,
    activeTab: 1,
    visibility: 'visible'
  }]
  //添加工作表
  const sheet = workbook.addWorksheet('1')
  // 设置padding 列宽
  sheet.getColumn('A').width = 1.88
  let col_i = 'BCDE'
  for (let i = 0; i < col_i.length; i++) {
    sheet.getColumn(col_i[i]).width = 13
  }
  //样式
  const content_row = { vertical: 'middle', horizontal: 'center' }
  const table_header2 = {
    name: 'Arial Black',
    color: { argb: '000' },
    family: 2,
    size: 14,
    bold: true
  }
  const table_header3 = {
    name: 'Black',
    color: { argb: '000' },
    family: 2,
    size: 14,
    bold: false
  }
  const black = { style: 'medium', color: { argb: '000' } }

  // 第2到n行
  let name_list = [
    '名称',
    '总设备数量(台)',
    '总设备类型(种)',
    '保修期内设备数量(台)',
    '总应用系统数量(台)',
    '应用管理员数量(个)',
    '设备管理员数量(个)'
  ]
  let B2 = []
  for (let i in name_list) {
    let item_list = []
    let num = 2 + parseInt(i)
    if (i == 0) {
      sheet.getRow(num).height = 30
    } else {
      sheet.getRow(num).height = 25.5
    }
    sheet.mergeCells('B' + num + ':C' + num)
    sheet.mergeCells('D' + num + ':E' + num)
    item_list.push(sheet.getCell('B' + num))
    item_list.push(sheet.getCell('D' + num))
    for (let cell in item_list) {
      if (cell == 0) {
        item_list[cell].value = name_list[i]
      }
      if (i == 0 && cell == 1) {
        item_list[cell].value = '数量'
      } else if (cell == 1) {
        item_list[cell].value = StatisticsData[i - 1]
      }
      if (i == 0) {
        item_list[cell].font = table_header2
      } else {
        item_list[cell].font = table_header3
      }
      item_list[cell].alignment = content_row
      item_list[cell].border = {
        top: black,
        left: black,
        bottom: black,
        right: black
      }
    }
    B2.push(item_list)

  }

  //导出下载
  const buffer = await workbook.xlsx.writeBuffer()
  let blob = new Blob([buffer])
  let link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.download = '统计报表.xlsx'
  link.click()
  document.body.removeChild(link)
}
