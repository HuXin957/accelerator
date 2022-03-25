import React from 'react';
import y from 'react-native-line-style';
import {SafeAreaView} from "react-native-safe-area-context";
import {statusHeight} from '../../utils/platform'

const SafeView = ({noEdges, children, style = []}) => {
  return (
    <SafeAreaView
      edges={noEdges ? ['left'] : ['bottom']}
      mode={'padding'}
      style={[y.pt_(statusHeight), y.uf1, y.bgColor('#fff'), y.upr, ...style]}>
      {children}
    </SafeAreaView>
  )
}
export default SafeView;
