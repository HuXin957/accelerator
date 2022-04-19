import React, {PureComponent} from "react";
import {Text, RefreshControl, ScrollView} from "react-native";
import y from 'react-native-line-style';
import EmptyData from "app/components/empty";
import Toast from '@huxin957/react-native-toast'

const FIRST = 'FIRST'//首次
const REFRESH = 'REFRESH';//刷新


class Detail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: {}
    }
  }

  componentDidMount() {
    this.load()
  }

  load = () => {
    this._getData()
  }

  _getData = () => {
    const {getData} = this.props;

    this.setState({loading: true});

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

      })
      .finally(() => {
        this.setState({loading: false});
      })
  }

  _onRefresh = () => {

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

  render() {
    const {render} = this.props;
    const {data} = this.state;

    return (
      <ScrollView
        refreshControl={this._refreshControl()}
      >
        {render(data)}
      </ScrollView>
    );
  }
}

export default Detail;
