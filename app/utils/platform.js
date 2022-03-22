import {Platform, NativeModules, StatusBar} from 'react-native';

export const OS = Platform.OS;

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export const statusHeight = getStatusBarHeight();


function getStatusBarHeight() {
  if (isIOS) {
    NativeModules.StatusBarManager.getHeight((statusBarPaddingTop) => {
      return statusBarPaddingTop.height
    })
  }

  if (isAndroid) {
    return StatusBar.currentHeight;
  }

  return 40
}
