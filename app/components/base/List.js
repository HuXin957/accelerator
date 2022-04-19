import React, {PureComponent} from "react";
import {Text, View, RefreshControl, FlatList} from "react-native";
import y from 'react-native-line-style';
import EmptyData from "app/components/empty";
import Toast from '@huxin957/react-native-toast'
import UserStore from "../../store/user";

const PAGE_SIZE = 2;//每页获取条数
const DOWN_PAGE_INDEX = 1;//上拉默认页数
const UP_PAGE_INDEX = -1;//下拉拉默认页数

const REFRESH = 'REFRESH';//刷新
const DOWN_LOAD = 'DOWN_LOAD';//下拉加载
const UP_LOAD = 'UP_LOAD';//上拉加载
const FIRST = 'FIRST'//首次


class List extends PureComponent {
  constructor(props) {
    super(props);

    this.pageUpIndex = 1;//上拉加载
    this.pageDownIndex = -1;//下拉加载
    this.dataArr = [];

    this.state = {
      data: [],
      loading: false,//刷新loading
      isFirst: true,//是否首次渲染
      hasMore: false,//是否还有数据
      statusCode: null
    }
  }

  componentDidMount() {
    this.load()
  }

  //外面可以通过ref调用手动刷新列表，eg：用户点击删除，然后刷新列表
  load = () => {
    this._getData(DOWN_PAGE_INDEX, FIRST);
  }

  //数据拼装方式
  _concatData = (data, type) => {
    switch (type) {
      case REFRESH:
        this.dataArr = data;
        this.pageUpIndex = 2;
        break;
      case DOWN_LOAD:
        this.dataArr = data.concat(this.dataArr);
        this.pageDownIndex--;
        break;
      case UP_LOAD:
        this.dataArr = this.dataArr.concat(data);
        this.pageUpIndex++
        break;
      default:
        this.dataArr = data;
        this.pageUpIndex = 2;
    }
  }

  _errorToast = (type) => {
    if (!this.dataArr.length) return
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

    this.setState({loading: true});

    getData(pageIndex, pageSize)
      .then(({data, total}) => {
        if (!Array.isArray(data)) {
          throw new Error("'data' must be a array")
        }

        const hasMore = total ? this.dataArr.length < total : data.length === pageSize;

        //数据拼装
        this._concatData(data, loadType)

        this.setState({
          hasMore,
          data: this.dataArr,
        })
      })
      .catch(err => {
        this.setState({
          statusCode: err.code
        });

        this._errorToast(loadType)
      })
      .finally(() => {
        this.setState({
          isFirst: false,
          loading: false
        })
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
    const {hasMore, loading} = this.state;
    const {onEndReached} = this.props;

    if (!hasMore || loading) return;//loading：解决_onEndReached重复调用

    if (onEndReached) {
      onEndReached();
      return;
    }

    this._getData(this.pageUpIndex, UP_LOAD);
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
    const {hasMore, statusCode} = this.state;

    if (!this.dataArr.length) return null

    if (statusCode) {
      return <Text style={[y.color('#999'), y.uSelfCenter]}>加载失败</Text>
    }

    return <Text style={[y.color('#999'), y.uSelfCenter]}>{hasMore ? '正在加载' : '暂无更多数据'}</Text>
  }


  //下拉刷新器
  _refreshControl = () => {
    const {loading} = this.state;

    return (
      <RefreshControl
        title={"Loading"} //android中设置无效
        colors={'#333'} //android
        tintColor={'#333'} //ios
        titleColor={'#333'}
        refreshing={loading}
        progressViewOffset={20}
        onRefresh={this._onRefresh}
      />
    )
  }

  //优化
  _getItemLayout = (_, index) => {
    const {itemLayoutHeight} = this.props;

    if (typeof itemLayoutHeight !== 'number') return

    const ITEM_HEIGHT = y.calc(itemLayoutHeight);

    return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  }

  render() {
    const {data} = this.state;
    const {ListHeaderComponent, renderItem, keyExtractor} = this.props;

    return (
      <FlatList
        data={data}
        style={[y.w100]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={this._getItemLayout}
        onEndReachedThreshold={0.2}
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
