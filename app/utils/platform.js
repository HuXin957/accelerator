import {Platform, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

export const OS = Platform.OS;

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export const statusHeight = setStatusHeight();


function setStatusHeight() {
  if (isIOS) {
    return getStatusBarHeight()
  }

  if (isAndroid) {
    return StatusBar.currentHeight;
  }

  return 0
}
