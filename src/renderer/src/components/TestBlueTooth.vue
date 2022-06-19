<script setup lang="ts">
import {ref} from 'vue';

const deviceName = ref('');

async function testIt() {
  console.log('testIt----');
  // 需要安装@types/web-bluetooth  并按如下形式使用，否则会报类型“Navigator”上不存在属性“bluetooth”。ts(2339)

  // https://stackoverflow.com/questions/51298406/property-bluetooth-does-not-exist-on-type-navigator
  // https://www.npmjs.com/package/@types/web-bluetooth
  let mobileNavigatorObject: any = window.navigator;


  // requestDevice这个异步方法等待时间比较久  所以可能出现长时间无响应的情况
  const device = await mobileNavigatorObject.bluetooth.requestDevice({
    acceptAllDevices: true
  })
  console.log('device----', device);
  deviceName.value = device.name || `ID: ${device.id}`
}

</script>

<template>
<section>
   <h1>Web Bluetooth API</h1>

    <a @click="testIt">Test Bluetooth</a>

    <p>Currently selected bluetooth device: <strong id="device-name">{{ deviceName }}</strong></p>
</section>
</template>

