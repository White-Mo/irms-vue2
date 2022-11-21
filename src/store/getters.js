import machineRoom from "@/store/modules/machineRoom";

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  realname: state => state.user.realname,
  roles: state => state.user.roles,
  userid: state => state.user.userid,
  permission_routes: state => state.permission.routes,
  unit: state => state.machineRoom.state.unit
}
export default getters
