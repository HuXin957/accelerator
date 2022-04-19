import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import y from 'react-native-line-style';
import {observer} from "mobx-react";
import {Grid,Detail, Button} from 'app/components';
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
      pageIndex:1,
      pageSize:10
    })

    return {data}
  }

  render() {
    return (
      <Detail
        getData={this._getData}
        render={(data)=>{
          return <Text>3</Text>
        }}
      />
    )
  }
}

export default withMixin(DetailDemo)

