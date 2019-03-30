const LdapAuth = require('ldapauth-fork')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const pathname = path.resolve(__dirname, '../../.user')

const LdapConfig = {
  url: 'ldap://adldap.abcft.com/',
  bindDN: 'cn=aop,cn=Users,dc=niub,dc=la',
  bindCredentials: 'P@55word',
  searchBase: 'dc=niub,dc=la',
  searchFilter: '(sAMAccountName={{username}})',
  reconnect: true,
  timeout: 6000,
}


exports.checkLogin = function checkLogin () {
  
}

exports.login = async function login (username, password) {
  const ldap = new LdapAuth(LdapConfig)
  return new Promise((resolve, reject) => {
    ldap.authenticate(username, password, (err, user) => {
      if (err) {
        reject(err)
      } else {
        resolve(user)
      }
    })
  })
}

exports.getUserinfo = function getUserinfo () {
  if (!fs.existsSync(pathname)) {
    console.log('用户未登录')
    return false
  }
  return JSON.parse(fs.readFileSync(pathname))
}

exports.report = async function report (data) {
  try {
    await axios.post('https://wdcp.analyst.ai/api/v1/action/log', data)
    console.log('上传成功')
  } catch (err) {
    console.log(err)
    console.log('发生了一个错误')
  }
}