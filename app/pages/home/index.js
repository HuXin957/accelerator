import React, {useState} from 'react';
import {View, Text, PanResponder, NativeModules} from 'react-native';
import y from 'react-native-line-style';
import {Grid, Button} from 'app/components';
import Slider from '@react-native-community/slider';
import {statusHeight} from 'app/utils/platform';
import withMixin from 'app/utils/withMixin';
import ConfigureStore from 'app/store/configure';
import {SearchBar} from 'react-native-screens';

const {ToastExample} = NativeModules

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.top = 0;
    this.left = 0;


    this.state = {
      position: {
        top: 0,
        left: 0
      },
      backColor: '#333'
    }

    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        this.setState({
          backColor: 'red'
        })
        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: ({nativeEvent: {locationX, pageX, pageY}}, gestureState) => {
        const left0 = (gestureState.dx + this.left) <= 0;
        const right0 = this.left + gestureState.dx + y.calc(100) >= y.winw;

        this.setState({
          position: {
            top: gestureState.dy + this.top,
            left: left0 ? 0 : right0 ? 260 : gestureState.dx + this.left
          }
        })

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.top = this.state.position.top;
        this.left = this.state.position.left;
        this.setState({
          backColor: '#333'
        })
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }


  render() {
    const {position} = this.state;
    return (
      <View style={[y.uf1, y.upr]}>
        {/*<View*/}
        {/*  {...this._panResponder.panHandlers}*/}
        {/*  style={[y.ba(1), y.h_(100), y.w_(100), y.bgColor(this.state.backColor), y.ujc, y.uac, y.upa, y.top(position.top), y.left_(position.left)]}>*/}
        {/*  <Text>拖动我</Text>*/}
        {/*</View>*/}
        <Button
          style={[y.ba(1),y.size(200)]}
          onPress={()=>{
            console.log(this.props.navigation.jumpTo)
        }}>
          <Text  style={[{includeFontPadding:false,letterSpacing:12},y.fSize(22)]}>跳转</Text>
          <Text  style={[{includeFontPadding:false},y.fSize(22)]}>跳转</Text>
          <Text  style={[{includeFontPadding:false},y.fSize(22)]}>跳转</Text>
          <Text style={[y.fSize(22)]}>跳转</Text>
          <Text style={[y.fSize(22)]}>跳转</Text>
        </Button>
      </View>
    )
  }
}



export default withMixin(Home)

