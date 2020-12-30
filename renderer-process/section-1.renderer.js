const section1btn = document.getElementById('section-1-btn')

section1btn.addEventListener('click', () => {
  myAPI.ipcSend('section-1-get-app-path')
})

myAPI.ipcOn('section-1-got-app-path', (event, path) => {
  const message = `This app is located at: ${path}`
  document.getElementById('section-1-text').innerHTML = message
})