import React, {Component} from "react";
import {Text, View} from "react-native";
import y from 'react-native-line-style'

const EmptyData = ({code}) => {
  switch (code) {
    case 0:
      return <NoData/>;
    case 500:
    case 502:
      return <NetError/>;
    default:
      return <NoData/>
  }
}

export default EmptyData;

const NoData = () => {
  return (
    <View style={[y.uf1]}>
      <Text>暂无数据</Text>
    </View>
  )
}

const NetError = () => {
  return (
    <View style={[y.uac]}>
      <Text>网络错误</Text>
    </View>
  )
}
