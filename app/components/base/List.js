import React, {Component} from "react";
import {StyleSheet, Text, View, RefreshControl, FlatList} from "react-native";
import y from 'react-native-line-style';
import EmptyData from "app/components/empty";

const PAGE_SIZE = 10;//每页获取条数
const DEFAULT_INDEX = 1;//

class List extends Component {

  constructor(props) {
    super(props);

    this.pageIndex = 1;
    this.isFirst = true;
    this.statusCode = null;
    this.dataArr = [];

    this.state = {
      refresh: false,//刷新loading
    }
  }

  componentDidMount() {
    this._getData(DEFAULT_INDEX);
  }

  //获取数据
  _getData = (pageIndex) => {
    const {getData} = this.props;

    this.setState({refresh: true});
    getData(pageIndex, PAGE_SIZE)
      .then(({data, total}) => {


        if (pageIndex === DEFAULT_INDEX) {//刷新or首次
          this.dataArr = data
        } else {//加载更多
          this.dataArr = this.dataArr.concat(data)
        }


        this.setState({
          data: this.dataArr
        })

        this.pageIndex++;
      })
      .catch(err => {
        //错误处理
        this.statusCode = err.code;

      })
      .finally(() => {
        this.isFirst = false;
        this.setState({refresh: false})
      })
  }

  //下拉刷新
  _onRefresh = () => {
    const {onRefresh} = this.props;

    if (onRefresh) {//自定义下拉刷新动作
      onRefresh();
      return;
    }

    this._getData(DEFAULT_INDEX);
  }

  //上拉加载更多
  _onEndReached = () => {
    const {onEndReached} = this.props;

    if (onEndReached) {
      onEndReached();
      return;
    }

    this._getData(this.pageIndex);
  }

  render() {
    const {refresh, data} = this.state;
    const {onRefresh, renderItem} = this.props;

    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        progressViewOffset={50}
        //列表为空时渲染该组件
        ListEmptyComponent={<EmptyData code={this.statusCode}/>}
        refreshControl={
          <RefreshControl
            title={"Loading"} //android中设置无效
            colors={'#333'} //android
            tintColor={'#333'} //ios
            titleColor={'#333'}
            refreshing={refresh}
            progressViewOffset={20}
            ListFooterComponent={<Text>footer</Text>}
            onRefresh={this._onRefresh}
            onEndReached={this._onEndReached}
          />
        }
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
