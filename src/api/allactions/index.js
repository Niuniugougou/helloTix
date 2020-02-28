import request from '@/plugin/axios'

//自定义模块start
export function updateAdminInfo(data) {
  return request({
    url: '/admin/updateadmininfo',
    method: 'post',
    data
  })
}
export function getAdminInfo(data) {
  return request({
    url: '/admin/getadmininfo',
    method: 'post',
    data
  })
}

//自定义模块end

export function LoginUser (params) {
  return request({
    url: '/admin/userlogin',
    method: 'post',
    params
  })
}
export function GetMenus () {
  return request({
    url: '/api/getmenu'
  })
}
export function addMarkData (data) {
  return request({
    url: '/admin/addmarkdata',
    method: 'post',
    data
  })
}

export const articlesManage = {
  editeOneMarkSubmit (data) {
    return request({
      url: '/admin/markdowndata',
      method: 'post',
      data
    })
  },
  editeOneMark (data) {
    return request({
      url: '/admin/editeonemark',
      method: 'post',
      data
    })
  },
  findSearchMarkResult (data) {
    return request({
      url: '/admin/findsearchmarkresult',
      method: 'post',
      data
    })
  },
  delOneMark (data) {
    return request({
      url: '/admin/delonemark',
      method: 'post',
      data
    })
  },
  delMoreMark (data) {
    return request({
      url: '/admin/delmoremark',
      method: 'post',
      data
    })
  },
  getAllMarkNum (data) {
    return request({
      url: '/admin/getallmarknum',
      method: 'post',
      data
    })
  },
  getAllMark (data) {
    return request({
      url: '/admin/getallmark',
      method: 'post',
      data
    })
  },
  disableOneMark (data) {
    return request({
      url: '/admin/disableonemark',
      method: 'post',
      data
    })
  }
}
export const tabs = {
  clearAllMessage (data) {
    return request({
      url: '/admin/clearallmessage',
      method: 'post',
      data
    })  
  },
  readTheMessage (params) {
    return request({
      url: '/admin/readthemessage',
      method: 'post',
      params
    })  
  },
  readAllTheMessage (data) {
    return request({
      url: '/admin/readallthemessage',
      method: 'post',
      data
    })  
  },
  returnTheMessage (data) {
    return request({
      url: '/admin/returnthemessage',
      method: 'post',
      data
    })  
  },
  delTheMessage (data) {
    return request({
      url: '/admin/delthemessage',
      method: 'post',
      data
    })  
  },
  delAllMes (data) {
    return request({
      url: '/admin/delallmessage',
      method: 'post',
      data
    }) 
  },
  creatNewMessage (data) {
    return request({
      url: '/admin/creatnewmessage',
      method: 'post',
      data
    })  
  },
  getMessageNotRead () {
    return request({
      url: '/admin/getmessagenotread'
    })
  },
  getMessageAlreadyRead () {
    return request({
      url: '/admin/getmessagealreadyread'
    })
  },
  getMessageIsdel () {
    return request({
      url: '/admin/getmessageisdel'
    })
  }
  
}
