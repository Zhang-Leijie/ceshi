export const getMyInfo = ({
  commit,
  state
}) => {
  commit('IS_LOGIN', true)
  commit('SET_MY_INFO', "张三（100012）")
}

export const loginOut = ({
  commit,
  state
}) => {
  commit('IS_LOGIN', false)
  commit('SET_MY_INFO', "")
}
