<template>
  <div class="update_detail">
    <el-row class="tile-content shadows">
      <el-col :span="23"><div>详细信息</div></el-col>
      <el-col :span="1"><el-button size="mini" @click="back">返回</el-button></el-col>
    </el-row>
    <el-tabs v-model="tab_name" type="border-card" @tab-click="changeTab">
      <el-tab-pane label="综合表" name="0">
        <el-form ref="form" :model="form = row" label-width="120px" :inline="true" class="demo-form-inline">
          <el-row v-show="currentShow === '2'">
            <el-form-item label="单位">
              <el-input v-model="form.postName" />
            </el-form-item>
            <el-form-item label="部门">
              <el-input v-model="form.departmentName" />
            </el-form-item>
            <el-form-item label="设备类型">
              <el-input v-model="form.equipmentTypeName" />
            </el-form-item>
          </el-row>
          <el-row v-show="currentShow === '3'">
            <el-col :span="5" :offset="1">
              <div class="selectLabel">单位</div>
              <el-select v-model="form.postName" placeholder="请选择" @change="changePost">
                <el-option
                  v-for="item in postAll"
                  :key="item.value"
                  :value="item.postName"
                />
              </el-select>
            </el-col>
            <el-col :span="5">
              <div class="selectLabel">部门</div>
              <el-select v-model="form.departmentName" placeholder="请选择">
                <el-option
                  v-for="item in departmentAll"
                  :key="item.value"
                  :value="item.departmentName"
                />
              </el-select>
            </el-col>
            <el-col :span="5">
              <div class="selectLabel">设备类型</div>
              <el-select v-model="form.equipmentTypeName" placeholder="请选择">
                <el-option
                  v-for="item in equipmentTypeAll"
                  :key="item.value"
                  :value="item.equipmentTypeName"
                />
              </el-select>
            </el-col>
          </el-row>
          <el-form-item v-for="(value,key,index) in labels" :key="index" :label="value">
            <el-input v-model="form[key]" />
          </el-form-item>
        </el-form>
        <el-row v-show="currentShow === '3'">
          <el-col :span="2" :offset="11"><el-button type="primary" @click="back">取消</el-button></el-col>
          <el-col :span="2"><el-button type="primary" @click="commit">提交</el-button></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="详情表" name="1">
        <div class="detail-content">
          <div class="detail-table">
            <el-row>
              <el-col :span="24"><div class="grid-content bg-blue"><h4><b>信息资产基础信息表</b></h4></div></el-col>
            </el-row>
            <div class="basic-info shadows">
              <div class="basic-table">
                <el-row>
                  <el-col>
                    <div class="padding-shipx shadows">基本信息</div>
                  </el-col>
                </el-row>
                <el-form ref="form" :model="form = row" label-width="120px" :inline="true" class="gray-bg">
                  <el-row>
                    <el-col :span="2"><div class="label-style">设备名称</div></el-col>
                    <el-col :span="22"><div class="label-style"><el-input v-model="form.equipmentName" size="medium" /></div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2"><div class="label-style">主机名</div></el-col>
                    <el-col :span="22"><div class="label-style"><el-input v-model="form.hostName" size="medium" /></div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2"><div class="label-style">设备管理员</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-input v-model="form.equipmentAdminName" size="medium" /></div></el-col>
                    <el-col :span="2"><div class="label-style">电 话</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-input v-model="form.equipmentAdminPhone" size="medium" /></div></el-col>
                    <el-col :span="2"><div class="label-style">应用管理员</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-input v-model="form.appAdminName" size="medium" /></div></el-col>
                    <el-col :span="2"><div class="label-style">电 话</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-input v-model="form.appAdminPhone" size="medium" /></div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6"><div class="label-style">
                      <el-radio-group v-model="form.businessOrExperimental">
                        <el-radio label="1">业 务 机</el-radio>
                        <el-radio label="0">实 验 机</el-radio>
                      </el-radio-group>
                    </div></el-col>
                    <el-col :span="6"><div class="label-style">
                      <el-radio-group v-model="form.mainOrBackup">
                        <el-radio label="1">主 机</el-radio>
                        <el-radio label="0">备 机</el-radio>
                      </el-radio-group>
                    </div></el-col>
                    <el-col :span="6"><div class="label-style">
                      <el-radio-group v-model="form.tureOrVirtual">
                        <el-radio label="1">实 体 机</el-radio>
                        <el-radio label="0">虚 拟 机</el-radio>
                      </el-radio-group>
                    </div></el-col>
                    <el-col :span="6"><div class="label-style">
                      <el-radio-group v-model="form.migratable">
                        <el-radio label="1">可 迁 移</el-radio>
                        <el-radio label="0">不可迁移</el-radio>
                      </el-radio-group>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-blue-dark"><h4>基本信息</h4></div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2"><div class="label-style">品 牌</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-input v-model="form.brandName" size="medium" /></div></el-col>
                    <el-col :span="2"><div class="label-style">型 号</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-input v-model="form.brandModelName" size="medium" /></div></el-col>
                    <el-col :span="2"><div class="label-style">安装位置</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-input v-model="form.machineRoomName" size="medium" /></div></el-col>
                    <el-col :span="2"><div class="label-style">机柜号</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-input v-model="form.cabinetName" size="medium" /></div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2"><div class="label-style">序列号</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-input v-model="form.serialNumber" size="medium" /></div></el-col>
                    <el-col :span="2"><div class="label-style">保修期</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-input v-model="form.guaranteePeriod" size="medium" /></div></el-col>
                    <el-col :span="2"><div class="label-style">上线时间</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-date-picker v-model="form.onlineTime" size="medium" :clearable="false" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"/></div></el-col>
                    <el-col :span="2"><div class="label-style">下线时间</div></el-col>
                    <el-col :span="4"><div class="label-style"><el-date-picker v-model="form.offlineTime" size="medium" :clearable="false" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"/></div></el-col>
                  </el-row>
                </el-form>
                <el-row :gutter="20">
                  <el-col :span="12"><othertable :hh="currentShow" :form="equipment.config" :lable="configLable">配置信息</othertable></el-col>
                  <el-col :span="12"><othertable :hh="currentShow" :form="equipment.software" :lable="softwareLable">通用软件信息</othertable></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12"><othertable :hh="currentShow" :form="equipment.network" :lable="networkLable">网络信息</othertable></el-col>
                  <el-col :span="12"><othertable :hh="currentShow" :form="equipment.protocolPort" :lable="protocolPortLable">协议端口信息</othertable></el-col>
                </el-row>
              </div>
            </div>
            <div class="business-info shadows">
              <el-row>
                <el-col :span="24"><div class="grid-content bg-blue"><h4><b>业 务 应 用 信 息</b></h4></div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><othertable :hh="currentShow" :form="equipment.appSoftware" :lable="appSoftwareLable">专用软件信息</othertable></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><othertable :hh="currentShow" :form="equipment.appSystemUser" :lable="appSystemUserLable">系统用户信息</othertable></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><othertable :hh="currentShow" :form="equipment.appBusiness" :lable="appBusinessLable">业务应用</othertable></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12"><othertable :hh="currentShow" :form="equipment.appAccessRights" :lable="appAccessRightsLable">访问权限</othertable></el-col>
                <el-col :span="12"><othertable :hh="currentShow" :form="equipment.appLinksInfo" :lable="appLinksInfoLable">链接（服务）用户信息</othertable></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12"><othertable :hh="currentShow" :form="equipment.appStore" :lable="appStoreLable">存 储</othertable></el-col>
                <el-col :span="12"><othertable :hh="currentShow" :form="equipment.appNativeStore" :lable="appNativeStoreLable">本 机 存 储</othertable></el-col>
              </el-row>
            </div>
          </div>
        </div>
        <el-row v-show="currentShow === '3'">
          <el-col :span="2" :offset="11"><el-button type="primary" @click="back">取消</el-button></el-col>
          <el-col :span="2"><el-button type="primary" @click="commit">提交</el-button></el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Othertable from '@/components/Infomanage/otherTable'
import { getPost, getDepartment, getEquipmentType } from '@/api/select'
import { addEquipment, getbasic } from '@/api/table'
import user from '@/store/modules/user'

export default {
  components: {
    Othertable
  },
  props: {
    row: {
      type: Object,
      required: true
    },
    currentShow: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tab_name: '0',
      roleid: user.state.roleid,
      department: {},
      equipmentType: {},
      equipment: {
        equipmentBaseInfo: { postName: '', cabinetUEnd: '', shelfOff: '', brandModelName: '', cabinetUStart: '', basicInfoId: '1223',
          businessOrExperimental: '1', appAdminPhone: '', dataSources: '', departmentName: '', tureOrVirtual: '1', mainOrBackup: '1',
          serialNumber: '', equipmentAdminPhone: '', brandName: '', hostName: '', appAdminName: '', cabinetName: '', migratable: '1',
          machineRoomName: '', equipmentName: '', guaranteePeriod: '', onlineTime: '', insertUserId: '', equipmentTypeName: '', offlineTime: '',
          remarks: '', status: '', equipmentAdminName: '', equipmentId: '' },
        config: [{ projectName: '', frequency: '', corenessOrCapacity: '', quantity: '' }],
        software: [{ project: '', projectName: '', edition: '', type: '' }],
        network: [{ networkCardName: '', ipAddress: '', switchInfo: '', networkCardPort: '', macAddress: '' }],
        protocolPort: [{ protocolName: '', appName: '', networkCardPort: '' }],
        appSoftware: [{ softwareName: '', softwareEdition: '', softwarePort: '', softwareOnlineTime: '', softwareDevelopCompany: '', softwareLiaison: '' }],
        appSystemUser: [{ userName: '', realName: '', userlevel: '', localAccessMode: '', remoteAccessMode: '', createdate: '', other: '' }],
        appBusiness: [{ businessName: '', domainName: '', userScope: '', ICPNum: '' }],
        appAccessRights: [{ lanIntranet: '', industryNetwork: '', intranet: '', other: '' }],
        appLinksInfo: [{ company: '', userName: '', IPAddress: '', other: '' }],
        appStore: [{ volume: '', SAN_NAS: '', capacity: '' }],
        appNativeStore: [{ totalCapacity: '', usedSpace: '', unusedSpace: '', annualGrowthSpace: '' }]
      },
      // configLable: { project_name: '项目', frequency: '频率', corenessOrCapacity: '核数/容量', quantity: '数量' },
      // softwareLable: { project: '项目', projectName: '名称', edition: '版本', type: '类型' },
      // networkLable: { network_card_name: '网卡', ip_address: 'IP地址', switch_info: '端口', network_card_port: '交换机', mAC_address: 'MAC地址' },
      // protocolPortLable: { protocol_name: '协议', app_name: '应用名称', network_card_port: '端口' },
      // appSoftwareLable: { softwareName: '名称', softwareEdition: '版本', softwarePort: '端口', softwareOnlineTime: '上线时间', softwareDevelopCompany: '研发单位', softwareLiaison: '联系人' },
      // appSystemUserLable: { userName: '用户名', realName: '使用人', userlevel: '级别权限', localAccessMode: '本地访问方式', remoteAccessMode: '远程访问方式', createdate: '创建时间', other: '其他' },
      // appBusinessLable: { businessName: 'HTTP应用 / FTP应用', domainName: '域名/地址', userScope: 'ICP号', ICPNum: '用户范围' },
      // appAccessRightsLable: { lan_intranet: '内网', industry_network: '行内网', intranet: '互联网', other: '其他' },
      // appLinksInfoLable: { company: '单位', userName: '用户名', IPAddress: '其他', other: 'IP地址' },
      // appStoreLable: { volume: '卷信息', SAN_NAS: 'SAN/NAS', capacity: '已用/分配容量(G)' },
      // appNativeStoreLable: { total_capacity: '总容量', used_space: '已用空间', unused_space: '未用空间', annual_growth_space: '年增长空间' },
      configLable: { projectName: '项目', frequency: '频率', corenessOrCapacity: '核数/容量', quantity: '数量' },
      softwareLable: { project: '项目', projectName: '名称', edition: '版本', type: '类型' },
      networkLable: { networkCardName: '网卡', ipAddress: 'IP地址', switchInfo: '端口', networkCardPort: '交换机', macAddress: 'MAC地址' },
      protocolPortLable: { protocolName: '协议', appName: '应用名称', networkCardPort: '端口' },
      appSoftwareLable: { softwareName: '名称', softwareEdition: '版本', softwarePort: '端口', softwareOnlineTime: '上线时间', softwareDevelopCompany: '研发单位', softwareLiaison: '联系人' },
      appSystemUserLable: { userName: '用户名', realName: '使用人', userlevel: '级别权限', localAccessMode: '本地访问方式', remoteAccessMode: '远程访问方式', createdate: '创建时间', other: '其他' },
      appBusinessLable: { businessName: 'HTTP应用 / FTP应用', domainName: '域名/地址', userScope: 'ICP号', ICPNum: '用户范围' },
      appAccessRightsLable: { lanIntranet: '内网', industryNetwork: '行内网', intranet: '互联网', other: '其他' },
      appLinksInfoLable: { company: '单位', userName: '用户名', IPAddress: '其他', other: 'IP地址' },
      appStoreLable: { volume: '卷信息', SAN_NAS: 'SAN/NAS', capacity: '已用/分配容量(G)' },
      appNativeStoreLable: { totalCapacity: '总容量', usedSpace: '已用空间', unusedSpace: '未用空间', annualGrowthSpace: '年增长空间' },
      // KeySet: {
      //   config: ['project_name', 'frequency', 'corenessOrCapacity', 'quantity'],
      //   software: ['project', 'projectame', 'edition', 'type'],
      //   network: ['network_card_name', 'ip_address', 'switch_info', 'network_card_port', 'mAC_address'],
      //   protocolPort: ['protocol_name', 'app_name', 'network_card_port' ],
      //   appSoftware: ['softwareName', 'softwareEdition', 'softwarePort', 'softwareOnlineTime', 'softwareDevelopCompany', 'softwareLiaison'],
      //   appSystemUser: ['userName', 'realName', 'userlevel', 'localAccessMode', 'remoteAccessMode', 'createdate', 'other' ],
      //   appBusiness: ['businessName', 'domainName', 'userScope', 'ICPNum'],
      //   appAccessRights: ['lan_intranet', 'industry_network', 'intranet', 'other' ],
      //   appLinksInfo: ['company', 'userName', 'IPAddress', 'other'],
      //   appStore: ['volume', 'SAN_NAS', 'capacity'],
      //   appNativeStore: ['total_capacity', 'used_space', 'unused_space', 'annual_growth_space' ]
      // },
      KeySet: {
        config: ['projectName', 'frequency', 'corenessOrCapacity', 'quantity'],
        software: ['project', 'projectName', 'edition', 'type'],
        network: ['networkCardName', 'ipAddress', 'switchInfo', 'networkCardPort', 'macAddress'],
        protocolPort: ['protocolName', 'appName', 'networkCardPort'],
        appSoftware: ['softwareName', 'softwareEdition', 'softwarePort', 'softwareOnlineTime', 'softwareDevelopCompany', 'softwareLiaison'],
        appSystemUser: ['userName', 'realName', 'userlevel', 'localAccessMode', 'remoteAccessMode', 'createdate', 'other'],
        appBusiness: ['businessName', 'domainName', 'userScope', 'ICPNum'],
        appAccessRights: ['lanIntranet', 'industryNetwork', 'intranet', 'other'],
        appLinksInfo: ['company', 'userName', 'IPAddress', 'other'],
        appStore: ['volume', 'SAN_NAS', 'capacity'],
        appNativeStore: ['totalCapacity', 'usedSpace', 'unusedSpace', 'annualGrowthSpace']
      },
      postAll: [],
      departmentAll: [],
      equipmentTypeAll: [],
      active: 0,
      labels:
        { 'businessSystemName': '业务系统', 'cabinetUStart': '柜内U位start', 'shelfOff': '是否可下架',
          'remarks': '备注', 'dataSources': '数据来源', 'cabinetUEnd': '柜内U位end' }
    }
  },
  // watch: {
  //   currentShow(val, oldVal) {
  //     const inputDom = document.getElementsByTagName('input')
  //     console.log(val)
  //     if (val === '2') {
  //       inputDom.forEach(e => {
  //         const parentNode = e.parentNode
  //         e.disabled = true
  //         parentNode.classList.add('is-disabled')
  //       })
  //     } else {
  //       inputDom.forEach(e => {
  //         const parentNode = e.parentNode
  //         e.disabled = false
  //         parentNode.classList.remove('is-disabled')
  //       })
  //     }
  //   }
  // },
  created() {
    this.fetchData()
    console.log(this.currentShow)
  },
  mounted() {
    console.log(this.currentShow+"---------------------------------")
    const list = document.getElementsByClassName('update_detail')[0]
    const inputDom = list.getElementsByTagName('input')
    if (this.currentShow === '2') {
      inputDom.forEach(e => {
        const parentNode = e.parentNode
        e.disabled = true
        parentNode.classList.add('is-disabled')
      })
    } else {
      inputDom.forEach(e => {
        const parentNode = e.parentNode
        parentNode.classList.remove('is-disabled')
      })
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPost().then(response => {
        console.log(response)
        this.postAll = response.data.items
        this.postAll.forEach(element => {
          if (element.postId === this.roleid) {
            console.log(element.postName)
            this.equipment.equipmentBaseInfo.postName = element.postName
          }
        })
      })
      getDepartment(this.roleid).then(response => {
        this.departmentAll = response.data.items
        this.equipment.equipmentBaseInfo.departmentName = this.departmentAll[0].departmentName
      })
      getEquipmentType().then(response => {
        this.equipmentTypeAll = response.data.items
        this.equipment.equipmentBaseInfo.equipmentTypeName = this.equipmentTypeAll[0].equipmentTypeName
      })
      getbasic(this.row.equipmentId).then(response => {
        const item = response.data.items
        for (const key in item) {
          if (Object.hasOwnProperty.call(item, key)) {
            const e = item[key]
            if (e !== null && e.length !== 0) {
              this.checkKey(key, e)
            }
          }
        }
      })
    },
    commit() {
      const equipments = []
      console.log(this.form)
      const equip = { ...this.equipment }
      console.log(equip)
      const equipmentBaseInfo = equip.equipmentBaseInfo
      Object.keys(equipmentBaseInfo).forEach(key => {
        equipmentBaseInfo[key] = this.row[key] === undefined ? '' : this.row[key]
      })
      equip.appAccessRights = equip.appAccessRights[0]
      equip.appNativeStore = equip.appNativeStore[0]
      equipments.push(equip)
      console.log(equipments)
      addEquipment({ equipments: equipments }).then(res => {
        this.$alert(res.data, '提示', {
          confirmButtonText: '确定',
          type: 'info',
          showClose: false
        }).then(() => {
          this.$router.go(0)
        })
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    changePost(val) {
      console.log(val)
      this.postAll.forEach(element => {
        if (element.postName === val) {
          getDepartment(element.postId).then(response => {
            this.departmentAll = response.data.items
            this.equipment.equipmentBaseInfo.departmentName = this.departmentAll[0].departmentName
          })
        }
      })
    },
    changeTab(name) {
    },
    back() {
      this.$emit('changeDiv', '0')
    },
    checkKey(listname, value) {
      console.log(value)
      const a = this.handleList(listname)
      const arr = []
      if (a !== -1) {
        const objKey = { ...this.equipment[a][0] }
        value.forEach(e => {
          const obj = { ...objKey }
          for (const k in obj) {
            if (Object.hasOwnProperty.call(obj, k)) {
              obj[k] = e[k] === undefined ? '' : e[k]
            }
          }
          console.log(obj)
          arr.push(obj)
        })
        this.equipment[a] = arr
      }
    },
    handleList(listname) {
      for (const key in this.equipment) {
        if (Object.hasOwnProperty.call(this.equipment, key)) {
          if (listname.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            return key
          }
        }
      }
      return -1
    }
  }
}
</script>

<style lang="less" scoped>
*,el-form-item__label{
    font-size: 18px;
}
.tile-content{
  padding: 9px;
  margin-bottom: 20px;
}
.shadows{
  box-shadow: 0 0 4px #0000004d !important;
}
.el-form-item__label{
  font-size: 18px !important;
}
.selectLabel{
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 35px;
  font-weight: 700;
  font-size: 14px;
    color: #606266;
}
.detail-content{
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
  margin: 10px;
}
.detail-table{
  padding: 10px;
  border: 1px solid #dcd7d7;
}
.el-row {
  // margin-bottom: 20px;
  line-height: 33px;
  margin-bottom: 0px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-blue {
  background: #5db2ff;
  height: 55px;
  h4{
    text-align: center;
    margin: 0;
    line-height: 55px;
    color: white;
  }
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.label-style{
  border-right: 1px solid #eee;
  border-top: 1px solid #eee;
  padding: 12px;
  text-align: center;
}
.gray-bg{
  background: #D6DCE4;
}
.padding-shipx{
  padding: 10px;
}
.el-radio{
  margin-right: 0px;
}
/deep/.el-radio__label{
  font-size: 18px;
  font-weight: 500;
}
.bg-blue-dark{
  background: #1F4E78;
  height: 55px;
  h4{
    text-align: center;
    margin: 0;
    line-height: 55px;
    color: white;
  }
}
.business-info{
  margin-top: 50px;
}
.el-radio:nth-of-type(1){
    margin-right: 35px;
}
/deep/.el-input.is-disabled .el-input__inner{
  color: #898585;
}
</style>
