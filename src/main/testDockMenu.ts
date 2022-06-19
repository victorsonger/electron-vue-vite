import { app, Menu } from "electron";

const dockMenu = Menu.buildFromTemplate([
  {
    label: "新窗口",
    sublabel: "副标签",
    click() {
      console.log("新窗口");
    },
  },
  {
    label: "带设置的新窗口",
    submenu: [
      {
        label: "Basic",
      },
      {
        label: "Pro",
      },
    ],
  },
  {
    label: "New Command",
  },
]);

export const setDockMenu = () => {
  if (process.platform === "darwin") {
    app.dock.setMenu(dockMenu);
  }
};
