const {app, BrowserWindow} = require('electron')
const path = require('node:path')

const createWindow = () =>{
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
          }
    })
    win.loadFile('index.html')
}

// Open the window when ready 
app.whenReady().then(() =>{
    createWindow()
})

// Quit the app when all windows are closed 
app.on('window-all-closed', () =>{
    if (process.platform !== 'darwin') app.quit()
})

// Open a window if none are open
app.whenReady().then(() =>{
    createWindow()

    app.on('activate', () =>{
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})