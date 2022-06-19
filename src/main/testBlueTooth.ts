import { app } from "electron";

// 为了解决 User cancelled the requestDevice() chooser.
// https://stackoverflow.com/questions/59568260/electron-web-bluetooth-api-requestdevice-error
export const enableWebBluetooth = () => {
  if (process.platform === "linux") {
    app.commandLine.appendSwitch(
      "enable-experimental-web-platform-features",
      "true"
    );
  } else {
    app.commandLine.appendSwitch("enable-web-bluetooth", "true");
  }
};

export const selectBluetoothDiviceHandle = (
  event: Event,
  deviceList: Array<any>,
  callback: (deviceId: any) => void
) => {
  console.log("selectBluetoothDiviceHandle event---", event);
  event.preventDefault();

  console.log("deviceList---", deviceList);
  if (deviceList && deviceList.length > 0) {
    callback(deviceList[0].deviceId);
  }
};
