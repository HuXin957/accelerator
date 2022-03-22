import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
let ratio = width / 375;

const styles = {
  winh: height,
  winw: width,
  h100: {
    height: '100%',
  },
  w100: {
    width: '100%',
  },
  uWrap: {
    flexWrap: 'wrap', //自动换行
  },
  uNoWrap: {
    flexWrap: 'nowrap', //截断
  },
  //主轴的排列方向
  udr: {
    //主轴为水平方向，起点在左端
    flexDirection: 'row',
  },
  udrr: {
    //主轴为水平方向，起点在右端
    flexDirection: 'row-reverse',
  },
  udc: {
    //主轴为垂直方向，起点在上沿
    flexDirection: 'column',
  },
  udcr: {
    //主轴为垂直方向，起点在下沿
    flexDirection: 'column-reverse',
  },
  //主轴的排列方向 end
  uf1: {
    flex: 1,
  },
  //次轴排序
  uas: {
    //居前
    alignItems: 'flex-start',
  },
  uac: {
    //居中
    alignItems: 'center',
  },
  uae: {
    //居后
    alignItems: 'flex-end',
  },
  ual: {
    alignItems: 'baseline',
  },
  uacs: {
    alignContent: 'flex-start'
  },
  uacc: {
    alignContent: 'center'
  },
  uacb: {
    alignContent: 'space-between'
  },
  uaca: {
    alignContent: 'space-around'
  },
  //主轴排序
  ujs: {
    //居前
    justifyContent: 'flex-start',
  },
  ujc: {
    //居中
    justifyContent: 'center',
  },
  uje: {
    //居后
    justifyContent: 'flex-end',
  },

  uja: {
    //平均分布
    justifyContent: 'space-around',
  },
  ujb: {
    //两端
    justifyContent: 'space-between',
  },
  //自身次轴对齐 alignSelf enum('auto', 'flex-start', 'flex-end', 'center', 'stretch')
  uSelfAuto: {alignSelf: 'auto'},
  uSelfStart: {alignSelf: 'flex-start'},
  uSelfEnd: {alignSelf: 'flex-end'},
  uSelfCenter: {alignSelf: 'center'},
  uSelfStretch: {alignSelf: 'stretch'},
  upa: {
    //绝对定位
    position: 'absolute',
  },
  upr: {
    position: 'relative',
  },
  uof: {
    //超出隐藏
    overflow: 'hidden',
  },
  //文字水平居中 enum('auto', 'left', 'right', 'center')
  utxc: {
    textAlign: 'center',
  },
  //水平居右
  utxr: {
    textAlign: 'right',
  },
  utxl: {
    textAlign: 'left',
  },
  //文字垂直居顶
  utxvt: {
    textAlignVertical: 'top',
  },
  //文字垂直居中
  utxvc: {
    textAlignVertical: 'center',
  },
  //文本横线-底部
  utxdu: {
    textDecorationLine: 'underline',
  },
  //文本横线-中间
  utxdt: {
    textDecorationLine: 'line-through',
  },
  //文本横线-中间和底部
  utxdut: {
    textDecorationLine: 'underline line-through',
  },
  //盒子
  uf: num => {
    return {flex: num};
  },
  //高度
  h: c => {
    return {height: c * ratio};
  },
  h_: c => {
    return {height: c};
  },
  //最小高度
  minh: c => {
    return {minHeight: c * ratio};
  },
  //最大高度
  maxh: c => {
    return {maxHeight: c * ratio};
  },
  maxh_: c => {
    return {maxHeight: c};
  },
  //宽度百分比
  wRatio: number => {
    return {width: number + '%'};
  },
  //高度百分比
  hRatio: number => {
    return {height: number + '%'};
  },
  //宽度
  w: c => {
    return {width: c * ratio};
  },
  //宽度
  w_: c => {
    return {width: c};
  },
  //宽高一样
  size: c => {
    return {height: c * ratio, width: c * ratio}
  },
  //最小宽度
  minw: c => {
    return {minWidth: c * ratio};
  },
  //最大宽度
  maxw: c => {
    return {maxWidth: c * ratio};
  },
  //内边距
  pt: c => {
    return {paddingTop: c * ratio};
  },
  pt_: c => {
    return {paddingTop: c};
  },
  pr: c => {
    return {paddingRight: c * ratio};
  },
  pl: c => {
    return {paddingLeft: c * ratio};
  },
  pb: c => {
    return {paddingBottom: c * ratio};
  },
  pb_: c => {
    return {paddingBottom: c};
  },
  ptb: c => {
    return {paddingTop: c * ratio, paddingBottom: c * ratio};
  },
  ptb_: c => {
    return {paddingTop: c, paddingBottom: c};
  },
  plr: c => {
    return {paddingRight: c * ratio, paddingLeft: c * ratio};
  },
  plr_: c => {
    return {paddingRight: c, paddingLeft: c};
  },
  pa: c => {
    return {padding: c * ratio};
  },
  bt: number => {
    return {borderTopWidth: number};
  },
  bb: number => {
    return {borderBottomWidth: number};
  },
  bl: number => {
    return {borderLeftWidth: number};
  },
  br: number => {
    return {borderRightWidth: number};
  },
  blr: number => {
    return {borderLeftWidth: number, borderRightWidth: number};
  },
  btb: number => {
    return {borderTopWidth: number, borderBottomWidth: number};
  },
  ba: number => {
    return {borderWidth: number * ratio};
  },
  ba_: number => {
    return {borderWidth: number};
  },
  mt: c => {
    return {marginTop: c * ratio};
  },
  mt_: c => {
    return {marginTop: c};
  },
  mb: c => {
    return {marginBottom: c * ratio};
  },
  ml: c => {
    return {marginLeft: c * ratio};
  },
  ml_: c => {
    return {marginLeft: c};
  },
  mr: c => {
    return {marginRight: c * ratio};
  },
  mr_: c => {
    return {marginRight: c};
  },
  mlr: c => {
    return {marginLeft: c * ratio, marginRight: c * ratio};
  },
  mtb: c => {
    return {marginTop: c * ratio, marginBottom: c * ratio};
  },
  ma: c => {
    return {margin: c * ratio};
  },
  radiusA: c => {
    return {borderRadius: c * ratio};
  },
  radiusA_: c => {
    return {borderRadius: c};
  },
  radiusTL: c => {
    return {
      borderTopLeftRadius: c * ratio,
    };
  },
  radiusTR: c => {
    return {borderTopRightRadius: c * ratio};
  },
  radiusBL: c => {
    return {borderBottomLeftRadius: c * ratio};
  },
  radiusBR: c => {
    return {borderBottomRightRadius: c * ratio};
  },
  shadowColor: c => {
    return {shadowColor: c};
  },
  shadowOffset: (w, h) => {
    return {shadowOffset: {width: w * ratio, height: h * ratio}};
  },
  shadowOpacity: c => {
    return {shadowOpacity: c};
  },
  shadowRadius: c => {
    return {shadowRadius: c};
  },
  elevation: c => {
    return {elevation: c};
  },
  //位置
  top: c => {
    return {top: c * ratio};
  },
  top_: c => {
    return {top: c};
  },
  bottom: c => {
    return {bottom: c * ratio};
  },
  bottom_: c => {
    return {bottom: c};
  },
  left: c => {
    return {left: c * ratio};
  },
  left_: c => {
    return {left: c};
  },
  right: c => {
    return {right: c * ratio};
  },
  right_: c => {
    return {right: c};
  },
  /*字体大小*/
  fSize: c => {
    return {fontSize: c * ratio};
  },
  /*字体样式 italic:字体倾斜 normal:正常*/
  fStyle: c => {
    return {fontStyle: c};
  },
  /*字体加粗*/
  fWeight: c => {
    return {fontWeight: c, fontFamily: 'System'};
  },
  /*字体*/
  fFamily: c => {
    return {fontFamily: c};
  },
  /*字体颜色*/
  color: c => {
    return {color: c};
  },
  /*背景色*/
  bgColor: c => {
    return {backgroundColor: c};
  },
  /*边框色*/
  bdColor: c => {
    return {borderColor: c};
  },
  /*左边框色*/
  blColor: c => {
    return {borderLeftColor: c};
  },
  /*右边框色*/
  brColor: c => {
    return {borderRightColor: c};
  },
  /*上边框色*/
  btColor: c => {
    return {borderTopColor: c};
  },
  /*下边框色*/
  bbColor: c => {
    return {borderBottomColor: c};
  },
  bdStyle: c => {
    return {borderStyle: c}
  },
  /*透明度*/
  opacity: c => {
    return {opacity: c};
  },
  zIndex: c => {
    return {zIndex: c};
  },
  lh: c => {
    return {lineHeight: c};
  },
  tf: c => {
    return {transform: [{skewX: c + 'deg'}, {skewY: c + 'deg'}]};
  },
  calc: c => {
    return c * ratio;
  }
};
export default styles;
