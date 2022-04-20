import React, {PureComponent} from "react";
import {Text, RefreshControl, ScrollView} from "react-native";
import y from 'react-native-line-style';
import EmptyData from "app/components/empty";
import Toast from '@huxin957/react-native-toast';


const FIRST = 'FIRST'//首次
const REFRESH = 'REFRESH';//刷新


class Detail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: null,
      isFirst: true,
      statusCode: null
    }
  }

  componentDidMount() {
    this.load()
  }

  load = () => {
    this._getData(FIRST)
  }

  _getData = (loadType) => {
    const {getData, placeholder} = this.props;
    const {isFirst} = this.state;

    if ((isFirst && !placeholder) || loadType === REFRESH) {
      this.setState({loading: true});
    }

    getData()
      .then(({data}) => {
        if (!data) {
          throw new Error("The 'getData' method must return data");
        }
        this.setState({
          data
        })

      })
      .catch(err => {
        this.setState({
          statusCode: err.code
        })

        if (!isFirst) {
          Toast.error('加载失败')
        }
      })
      .finally(() => {
        this.setState({
          loading: false,
          isFirst: false
        });
      })
  }

  //下拉刷新
  _onRefresh = () => {
    const {onRefresh} = this.props;

    if (onRefresh) {
      onRefresh();
      return;
    }

    this._getData(REFRESH);
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

  _content = () => {
    const {render, placeholder} = this.props;
    const {data, statusCode, isFirst} = this.state;

    if (isFirst && placeholder) {
      return placeholder()
    }

    if (statusCode && !data) {
      return <EmptyData code={statusCode}/>
    }

    return render(data)
  }

  render() {
    return (
      <ScrollView
        refreshControl={this._refreshControl()}
      >
        {this._content()}
      </ScrollView>
    );
  }
}

export default Detail;
