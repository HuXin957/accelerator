import {Platform, NativeModules, StatusBar} from 'react-native';

export const OS = Platform.OS;

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export const statusHeight = setStatusHeight();

import {getStatusBarHeight} from 'react-native-iphone-x-helper'

function setStatusHeight() {
  if (isIOS) {
    return getStatusBarHeight()
  }

  if (isAndroid) {
    return StatusBar.currentHeight;
  }

  return 0
}
