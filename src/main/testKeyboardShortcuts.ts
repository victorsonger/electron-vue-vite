// 系统快捷键 & 键盘快捷键
// https://www.electronjs.org/zh/docs/latest/tutorial/keyboard-shortcuts
import { Menu, MenuItem, globalShortcut, Input } from "electron";

const menu = new Menu();

// 这个操作会把状态栏上的菜单变成只有一个electron， 点击后只有一个help选项
menu.append(
  new MenuItem({
    label: "Electron",
    submenu: [
      {
        role: "help",
        accelerator:
          process.platform === "darwin" ? "Alt+Cmd+E" : "Alt+Shift+E",
        click: () => {
          console.log("触发了本地快捷键");
        },
      },
    ],
  })
);

// 设置一下本地快捷键
const setApplicationMenu = () => {
  // Menu.setApplicationMenu(menu);
};

// 注册全局快捷键
const gloablShortcutsRegistr = () => {
  //  CommandOrControl 意指在 macOS 上使用 Command ，在 Windows/Linux 上使用 Control 。
  // globalShortcut.register("Alt+CommandOrControl+I", () => {
  //   console.log("全局快捷键!");
  // });
};

// 拦截主进程中的事件
// 开启之后，在electron程序中同时按control + i，就可以看到终端打印 Pressed Control+I"
const beforeInputEvent = (event: Event, input: Input) => {
  // console.log('input', input);
  // 上面的console打印如下
/*   input {
    type: 'keyDown',
    key: 'Control',
    code: 'ControlLeft',
    isAutoRepeat: false,
    isComposing: false,
    shift: false,
    control: true,
    alt: false,
    meta: false,
    location: 1,
    _modifiers: 2050,
    modifiers: [ 'control', 'left' ]
  }
  input {
    type: 'keyDown',
    key: 'i',
    code: 'KeyI',
    isAutoRepeat: false,
    isComposing: false,
    shift: false,
    control: true,
    alt: false,
    meta: false,
    location: 0,
    _modifiers: 2,
    modifiers: [ 'control' ]
  } */

  if (input.control && input.key.toLowerCase() === "i") {
    console.log("Pressed Control+I");
    event.preventDefault();
  }
};

export { setApplicationMenu, gloablShortcutsRegistr, beforeInputEvent };
