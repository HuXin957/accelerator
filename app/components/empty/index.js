import React, {Component} from "react";
import {Text, View} from "react-native";


const EmptyData = ({code}) => {
  switch (code) {
    case 0:
      return <NoData/>;
    case 500:
      return <NetError/>;
    default:
      return <NoData/>
  }
}

export default EmptyData;

const NoData = () => {
  return (
    <View>
      <Text>暂无数据</Text>
    </View>
  )
}

const NetError = () => {
  return (
    <View>
      <Text>网络错误</Text>
    </View>
  )
}
