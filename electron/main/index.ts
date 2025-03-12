// import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';
import { BrowserWindow, app, globalShortcut, ipcMain, shell } from 'electron';
// const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 禁用 GPU 加速
app.commandLine.appendSwitch('disable-gpu');
// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..');

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1'))
  app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32')
  app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}
// 读取配置文件
function readConfig() {
  let configPath;
  // 在本地开发环境中，使用 VITE_PUBLIC 路径
  if (process.env.VITE_DEV_SERVER_URL) {
    configPath = path.join(process.env.VITE_PUBLIC, 'config.json');
  }
  else {
    // 在打包后的环境中，使用 APP_ROOT 路径
    configPath = path.resolve(
      path.dirname(app.getPath('exe')),
      'public/config.json',
    );
  }

  try {
    const rawConfig = fs.readFileSync(configPath);
    // 将 Buffer 转换为字符串
    const configString = rawConfig.toString();
    // 解析 JSON 字符串为对象
    return JSON.parse(configString);
  }
  catch (error) {
    console.error('Error reading config file:', error);
    return {}; // 如果配置文件不存在或有错误，返回一个空对象
  }
}

const config = readConfig();
let win: BrowserWindow | null = null;
const preload = path.join(__dirname, '../preload/index.mjs');
const indexHtml = path.join(RENDERER_DIST, 'index.html');

// 需要无效化的键位
const keysDisabled = ['f11'];

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    // icon: "resources/app/resources/icon/logo.icon",
    icon: path.join(process.env.VITE_PUBLIC, 'icon/icon.ico'),
    width: config.width,
    height: config.height,
    frame: true, // 边框显示
    disableAutoHideCursor: false, // 隐藏鼠标
    fullscreen: config.fullscreen, // 全屏
    autoHideMenuBar: true, // 隐藏工具栏
    center: true,
    // alwaysOnTop: true,//置顶
    // useContentSize: true,
    webPreferences: {
      contextIsolation: true, // 隔离上下文
      webSecurity: false, // 开发环境禁止同源策略，否则跨越失败
      allowRunningInsecureContent: false, // 确保此项为 false
      nodeIntegration: true,
      images: true, // 支持图片
      textAreasAreResizable: false, // 文本域可拉伸
      webgl: false, // 支持webgl/canvas
      backgroundThrottling: true, // 页面隐藏时节能
      // devTools: config.devTools,
      preload,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools({ mode: "detach" });
  }
  else {
    win.loadFile(indexHtml);
  }
  // 控制台
  if (config.devTools)
    win.webContents.openDevTools(); // 调试工具

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:'))
      shell.openExternal(url);
    return { action: 'deny' };
  });
  keysDisabled.map((key) => {
    globalShortcut.register(key, () => {
      console.log(key);
    });
    return null;
  });

  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin')
    app.quit();
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  }
  else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`);
  }
  else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
// 读配置文件
ipcMain.handle('get-config', async () => {
  return config;
});
// 修改配置文件
ipcMain.handle('modify-config', async (key, value) => {
  let configPath;
  if (process.env.VITE_DEV_SERVER_URL) {
    configPath = path.join(process.env.VITE_PUBLIC, 'config.json');
  }
  else {
    configPath = path.resolve(
      path.dirname(process.execPath),
      'resources/app/public/config.json',
    );
  }

  try {
    const rawConfig = fs.readFileSync(configPath);
    const config = JSON.parse(rawConfig.toString());

    // 确保 key 是一个字符串
    if (typeof key !== 'string') {
      console.error('Key must be a string');
      return false;
    }

    // 修改指定键的值
    config[key] = value;

    // 确保没有将对象作为键覆盖已有的键
    const configString = JSON.stringify(
      config,
      (k, v) => {
        if (typeof k === 'object')
          return undefined; // 忽略对象作为键
        return v;
      },
      2,
    );

    fs.writeFileSync(configPath, configString);
    console.log('Config file modified successfully');
    return true; // 返回 true 表示修改成功
  }
  catch (error) {
    console.error('Error modifying config file:', error);
    return false; // 返回 false 表示修改失败
  }
});
// 监听渲染进程发送的退出事件
ipcMain.on('quit-app', () => {
  app.quit();
});
