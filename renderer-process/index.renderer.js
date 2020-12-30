const appInfoBtn = document.getElementById('app-info')

appInfoBtn.addEventListener('click', () => {
  myAPI.ipcSend('get-app-path')
})

myAPI.ipcOn('got-app-path', (event, path) => {
  const message = `This app is located at: ${path}`
  document.getElementById('got-app-info').innerHTML = message
})