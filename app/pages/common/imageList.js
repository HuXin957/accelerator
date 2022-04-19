import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import y from 'react-native-line-style';
import {observer} from "mobx-react";
import {Grid, Button} from 'app/components';
import withMixin from 'app/utils/withMixin';
import CameraRoll from "@react-native-community/cameraroll";
import Permissions from 'app/utils/permissions';
import {RESULTS} from "react-native-permissions";
import {List} from "app/components";
import {getUserList} from "app/server/userApi";
import UserStore from "app/store/user";

class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false
    }
  }

  componentDidMount() {
    // this.listRef.load()
    // this._getImages()
    // this._getAlbums()
  }

  _getImages = async () => {
    try {
      const res = await CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
        groupName: ''
      })

    } catch (e) {

    }

  }

  _getAlbums = () => {
    Permissions.PHOTO_LIBRARY().catch(e => {
      if (e.code === RESULTS.BLOCKED) {
        Permissions.openSettings();
      }
      throw e;
    });
    CameraRoll.getAlbums({
      assetType: 'All',
    }).then(albums => {
      console.log('albums', albums)
    });
  }


  getData = async (pageIndex, pageSize) => {
    const {data} = await getUserList({
      pageIndex,
      pageSize
    })

    return {data}
  }

  render() {
    return (
      <View style={[y.uf1, y.ba(1)]}>
        <List
          ref={ref => this.listRef = ref}
          getData={this.getData}
          itemLayoutHeight={51}
          renderItem={(props) => <Item {...props}/>}
        />
      </View>
    )
  }
}

export default withMixin(ImageList)

const Item = observer(({item, index}) => {
  return (
    <Button
      style={[y.ba(1), y.h(50)]}
      onPress={() => {
        UserStore.setValue('test', !UserStore.test)
      }}
    >
      <Text>{item.name}</Text>
    </Button>
  )
})
