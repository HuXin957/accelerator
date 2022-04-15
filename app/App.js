import React from 'react';
import AppNavigator from './AppNavigator'
import Portal from "@huxin957/react-native-portal";
import Toast from "@huxin957/react-native-toast";

const App = () => {
  return (
    <Portal.Host>
      <AppNavigator/>
    </Portal.Host>
  );
};


export default App;
