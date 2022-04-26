import React, {useEffect} from 'react';
import AppNavigator from './AppNavigator';
import Portal from "@huxin957/react-native-portal";
import NetInfo from "@react-native-community/netinfo";
import Toast from "@huxin957/react-native-toast";
import ConfigureStore from 'app/store/configure'

const App = () => {
  useEffect(() => {
    return NetInfo.addEventListener(({isConnected}) => {
      ConfigureStore.setValue('hasNetwork', isConnected);
      !isConnected && Toast.error('网络连接失败');
    });
  }, [])

  return (
    <Portal.Host>
      <AppNavigator/>
    </Portal.Host>
  );
};


export default App;
