import React, {Component} from "react";
import {StyleSheet, Text, View, RefreshControl, FlatList} from "react-native";
import y from 'react-native-line-style';
import EmptyData from "app/components/empty";
import Toast from '@huxin957/react-native-toast'

const PAGE_SIZE = 10;//每页获取条数
const DOWN_PAGE_INDEX = 1;//上拉默认页数
const UP_PAGE_INDEX = -1;//下拉拉默认页数

const REFRESH = 'REFRESH';//刷新
const DOWN_LOAD = 'DOWN_LOAD';//下拉加载
const UP_LOAD = 'UP_LOAD';//上拉加载
const FIRST = 'FIRST'//首次


class List extends Component {
  constructor(props) {
    super(props);

    this.pageUpIndex = -1;//上拉加载
    this.pageDownIndex = 1;//下拉加载
    this.dataArr = [];

    this.state = {
      data: [],
      refresh: false,//刷新loading
      isFirst: true,//是否首次渲染
      isMore: false,//是否还有数据
      statusCode: null
    }
  }

  load = () => {
    this._getData(DOWN_PAGE_INDEX, FIRST);
  }

  //数据拼装方式
  _concatData = (data, type) => {
    switch (type) {
      case REFRESH:
        this.dataArr = data;
        this.pageDownIndex++;
        break;
      case DOWN_LOAD:
        this.dataArr = data.concat(this.dataArr);
        this.pageDownIndex++;
        break;
      case UP_LOAD:
        this.dataArr = this.dataArr.concat(data);
        this.pageUpIndex--
        break;
      default:
        this.dataArr = data;
        this.pageDownIndex++;
    }
  }

  _errorToast = (type) => {
    let msg = '';
    switch (type) {
      case FIRST:
        return
      case REFRESH:
        msg = '刷新失败';
        break
      case DOWN_LOAD:
      case UP_LOAD:
        msg = '加载失败';
        break
      default:
        msg = '加载失败';
    }
    Toast.error(msg)
  }

  //获取数据
  _getData = (pageIndex, loadType) => {
    const {getData, pageSize = PAGE_SIZE} = this.props;

    this.setState({refresh: true});

    getData(pageIndex, pageSize)
      .then(({data, total}) => {
        if (!Array.isArray(data)) {
          throw new Error("'data' must be a array")
        }
        if (typeof total !== 'number') {
          throw new Error("'number' must be a number")
        }

        //数据拼装
        this._concatData(data, loadType)

        this.setState({
          isFirst: false,
          data: this.dataArr,
          isMore: this.dataArr.length !== total,
        })
      })
      .catch(err => {
        this.setState({
          isFirst: false,
          statusCode: err.code
        });

        this._errorToast(loadType)

      })
      .finally(() => {
        this.setState({refresh: false})
      })
  }

  //下拉刷新
  _onRefresh = () => {
    const {onRefresh, isPullLoad} = this.props;

    if (onRefresh) {
      onRefresh();
      return;
    }
    if (isPullLoad) {//下拉加载更多
      this._getData(UP_PAGE_INDEX, DOWN_LOAD);
      return
    }
    this._getData(DOWN_PAGE_INDEX, REFRESH);
  }

  //上拉加载更多
  _onEndReached = () => {
    const {isMore} = this.state;
    const {onEndReached} = this.props;

    if (!isMore) return

    if (onEndReached) {
      onEndReached();
      return;
    }

    this._getData(this.pageDownIndex, UP_LOAD);
  }

  //empty
  _listEmptyComponent = () => {
    const {isFirst} = this.state;
    const {ListEmptyComponent} = this.props;

    //可在这里做骨架屏或首次渲染loading

    if (!isFirst) {
      return ListEmptyComponent || <EmptyData code={this.statusCode}/>
    }

    return null
  }

  //底部组件
  _listFooterComponent = () => {
    const {isMore, statusCode} = this.state;

    if (!this.dataArr.length) return null

    if (statusCode) {
      return <Text style={[y.color('#999'), y.uSelfCenter]}>加载失败</Text>
    }

    return <Text style={[y.color('#999'), y.uSelfCenter]}>{isMore ? '正在加载' : '暂无更多数据'}</Text>
  }


  //下拉刷新器
  _refreshControl = () => {
    const {refresh} = this.state;

    return (
      <RefreshControl
        title={"Loading"} //android中设置无效
        colors={'#333'} //android
        tintColor={'#333'} //ios
        titleColor={'#333'}
        refreshing={refresh}
        progressViewOffset={20}
        onRefresh={this._onRefresh}
      />
    )
  }

  render() {
    const {data} = this.state;
    const {ListHeaderComponent, renderItem, keyExtractor} = this.props;

    return (
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        progressViewOffset={50}
        //列表为空时渲染该组件
        ListEmptyComponent={this._listEmptyComponent()}
        //头部组件
        ListHeaderComponent={ListHeaderComponent || null}
        //底部组件
        ListFooterComponent={this._listFooterComponent()}
        refreshControl={this._refreshControl()}
        //上拉加载
        onEndReached={this._onEndReached}
      />
    );
  }

}

export default List;

//错误情况：

//原来无数据时
//首次进页面：显示对应错误页面

//当前有数据时
//上拉加载：显示加载失败，请重新加载
//下拉刷新：有数据时提示失败,页面显示重试按钮
