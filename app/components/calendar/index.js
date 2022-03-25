/**
 * 日历
 */
import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import moment from 'moment';
import y from '../../utils/style';
import Button from "../button";

const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

class Calendar extends Component {
  constructor(props) {
    super(props)

    const {defaultVlue} = this.props

    this.state = {
      curMonth: defaultVlue ? defaultVlue : moment(),//当前月
      activeDay: defaultVlue ? defaultVlue : moment(),//选中日期
      loading: false,
    }
  }

  /**
   * 上月数据
   */

  lastMonth() {
    const {curMonth} = this.state;
    const date = moment(curMonth).date(1);// 当前月的1号
    const count = date.day();//1号是星期几
    date.subtract(count, "day");
    let ui = []
    for (let i = 0; i < count; i++) {
      ui.push(
        <View key={'lastMonth_' + i}
              style={[y.color('#999'), y.h(50), y.wRatio(100 / 7), y.ujc, y.uac]}>
          {this.props.isShowAll && <Text style={[y.color('#c1c1c1')]}>{date.date()}</Text>}
        </View>
      )
      date.add(1, 'day')
    }
    return ui
  }

  /**
   * 下月数据
   */
  nextMonth() {
    const {curMonth} = this.state;
    //选中的时间改为1号,并且加上1个月
    const date = moment(curMonth).date(1).add(1, "months");
    const count = 7 - date.day();//7-星期几，就可知道要渲染几个下月数据
    if (count === 7) {
      return null;
    }
    let ui = []
    for (let i = 0; i < count; i++) {
      ui.push(
        <View
          style={[y.wRatio(100 / 7), y.color('#999'), y.h(50), y.ujc, y.uac]}
          key={'nextMonth_' + i}>
          {this.props.isShowAll && <Text style={[y.color('#c1c1c1')]}>{date.date()}</Text>}
        </View>
      )
      date.add(1, 'day')
    }
    return ui
  }

  /**
   * 本月数据
   */

  thisMonth() {
    const {selectedList, renderItem = () => null, onPressDay = () => null, isStatic} = this.props;
    const {activeDay, curMonth} = this.state;
    const date = moment(curMonth).date(1);//获取本月1号数据
    const count = date.daysInMonth();//当前选中月份的总条数

    let ui = []

    for (let i = 0; i < count; i++) {
      const todayMoment = moment(date);
     console.log(todayMoment.format('LTS'))
      // const isSame = activeDay && todayMoment.isSame(activeDay, "day");//判断哪一天是选中日期
      const isSigned = selectedList?.some(item => moment(date.format('YYYY-MM-DD')).isSame(moment(item?.signTime).format('YYYY-MM-DD')))
      const element = renderItem()
      ui.push(
        <View
          key={'thisMonth_' + i}
          style={[y.wRatio(100 / 7), y.h(40), y.ujc, y.uac]}>
          <Button
            style={[y.h(24), y.w(24), y.radiusA(12), y.ujc, y.uac, y.bgColor((isSigned) ? "#E75D53" : "#fff")]}
            onPress={() => {

              this.setState({
                activeDay: todayMoment
              });

              onPressDay && onPressDay(todayMoment);
            }}
          >
            <Text style={[y.color(isSigned ? "#fff" : "#888")]}>{date.date()}</Text>
          </Button>
        </View>
      )
      date.add(1, "day");
    }
    return ui
  }


  render() {
    const {bothMonth, style = [], onLastPress = () => null, onNextPress = () => null} = this.props;
    const {curMonth, activeDay} = this.state;
    const lastDate = moment().subtract(bothMonth, 'month').isSame(curMonth, 'month')
    const isCurMonth = moment().isSame(curMonth, 'month');

    return (
      <View style={[y.bgColor('#fff'), y.udc, ...style]}>
        {/* 控制按钮 */}
        <View style={[y.udr, y.uac, y.ujc]}>
          <Button
            onPress={() => {
              if (lastDate) {
                // Toast.show('notice18');
                return
              }

              this.setState({
                curMonth: curMonth.subtract(1, 'month'),
              }, () => onLastPress(this.state.curMonth))
            }}
            style={[y.plr(20), y.ptb(5)]}>
            <Image
              style={[y.h(12), y.w(7), y.bgColor('#333')]}
            />
          </Button>
          <Text
            style={[y.color('#555'), y.fSize(16), y.fWeight('bold')]}>{moment(curMonth).format('YYYY-MM')}</Text>
          <Button
            onPress={() => {
              if (isCurMonth) {
                // Toast.show('not_more_data');
                return
              }

              this.setState({
                curMonth: curMonth.add(1, 'month')
              }, () => onNextPress(this.state.curMonth))
            }}
            style={[y.plr(20), y.ptb(5)]}>
            <Image
              style={[y.h(12), y.w(7), y.bgColor('#333')]}
            />
          </Button>
        </View>
        {/*week*/}
        <View style={[y.udr, y.uac, y.mt(26)]}>
          {week.map((item, index) => {
            return (
              <Text key={'week_' + index}
                    style={[y.wRatio(100 / 7), y.color('#555'), y.utxc, y.fSize(14)]}>{item}</Text>
            )
          })}
        </View>
        {/*日期*/}
        <View style={[y.udr, y.uac, y.uWrap]}>
          {this.lastMonth()}
          {this.thisMonth()}
          {this.nextMonth()}
        </View>
      </View>
    )
  }
}

export default Calendar


