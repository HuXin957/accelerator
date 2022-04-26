import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import y from 'react-native-line-style';
import {observer} from "mobx-react";
import {Grid, Detail, Button} from 'app/components';
import withMixin from 'app/utils/withMixin';
import CameraRoll from "@react-native-community/cameraroll";
import Permissions from 'app/utils/permissions';
import {RESULTS} from "react-native-permissions";
import {List} from "app/components";
import {getUserList} from "app/server/userApi";
import UserStore from "app/store/user";

class DetailDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false
    }
  }

  componentDidMount() {

  }


  _getData = async () => {
    const {data} = await getUserList({
      pageIndex: 1,
      pageSize: 10
    })

    return {data}
  }
  _placeholder(){
    return <Text>placeholder</Text>
  }
  render() {
    console.log(this.isPass)
    return (
      <Detail
        getData={this._getData}
        placeholder={this._placeholder}
        render={(data) => {
          return (
           <View>
             <Text selectable style={[y.fSize(14),{includeFontPadding:false}]}>
               数学
             </Text>
           </View>
          )
        }}
      />
    )
  }
}

export default withMixin(DetailDemo)

