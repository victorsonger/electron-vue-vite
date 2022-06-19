import os from "os";
import path from "path";
import { app, BrowserWindow, Input } from "electron";
import themeHandle from "./themeHandle";
import {
  selectBluetoothDiviceHandle,
  enableWebBluetooth,
} from "./testBlueTooth";
import {
  setApplicationMenu,
  gloablShortcutsRegistr,
  beforeInputEvent,
} from "./testKeyboardShortcuts";
import { setDockMenu } from "./testDockMenu";

// https://stackoverflow.com/questions/42524606/how-to-get-windows-version-using-node-js
const isWin7 = os.release().startsWith("6.1");
if (isWin7) app.disableHardwareAcceleration();

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.cjs"),
    },
  });

  // 测试蓝牙功能
  enableWebBluetooth();

  // 测试快捷键
  setApplicationMenu();
  // 测试全局快捷键
  gloablShortcutsRegistr();

  win.webContents.on("select-bluetooth-device", selectBluetoothDiviceHandle);

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  } else {
    const pkg = await import("../../package.json");
    const url = `http://${pkg.env.HOST || "127.0.0.1"}:${pkg.env.PORT}`;

    win.loadURL(url);
    console.log("win.webContents---", win.webContents);
    themeHandle();
    win.webContents.openDevTools();
  }

  console.log("注册拦截");
  // 拦截主进程中的输入事件
  win.webContents.on("before-input-event", beforeInputEvent);
}

app.whenReady().then(setDockMenu).then(createWindow);

// 在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序。
app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("second-instance", () => {
  if (win) {
    // someone tried to run a second instance, we should focus our window.
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

// 当 Linux 和 Windows 应用在没有窗口打开时退出了，macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口。
// 为了实现这一特性，监听 app 模块的 activate 事件。如果没有任何浏览器窗口是打开的，则调用 createWindow() 方法。
app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// @TODO
// auto update
/* if (app.isPackaged) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) =>
      // maybe you need to record some log files.
      console.error('Failed check update:', e)
    )
} */
