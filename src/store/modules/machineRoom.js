import {getInfo, login, logout} from "@/api/user";
import {removeToken, setToken} from "@/utils/auth";
import {resetRouter} from "@/router";

const MachineData = () => {
  return {
    unit: '',
    department: '',
    installation_position: '',
    unitid:'',
    machineRoomId:'',
    machineArea:'',
    machineLocation:'',
    machineAdministrator:''
  }
}
const state = MachineData()

const mutations = {
  SET_MachineLocation:(state,machineLocation) => {
    state.machineLocation = machineLocation
  },
  SET_MachineAdministrator:(state,machineAdministrator) => {
    state.machineAdministrator = machineAdministrator
  },
  SET_MachineArea:(state,machineArea) => {
    state.machineArea = machineArea
  },
  SET_UnitId:(state,unitid) => {
    state.unitid = unitid
  },
  SET_Unit: (state, unit) => {
    state.unit = unit
  },
  SET_DEPARTMENT: (state,department) => {
    state.department = department
  },
  SET_InstallPosition: (state, installation_position) => {
    state.installation_position = installation_position
  },
  SET_MachineRoomId:(state,machineRoomId) => {
    state.machineRoomId = machineRoomId
  }
}


export default {
  namespaced: true,
  state,
  mutations,
}
