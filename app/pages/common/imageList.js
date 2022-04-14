import React from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  TextInput,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import y from 'react-native-line-style';
import {Grid} from 'app/components';
import {statusHeight} from 'app/utils/platform';
import withMixin from 'app/utils/withMixin';
import CameraRoll from "@react-native-community/cameraroll";
import Permissions from 'app/utils/permissions';
import {RESULTS} from "react-native-permissions";
import {List} from "app/components";
import {SafeAreaView} from "react-native-safe-area-context";

class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'jfkdsfjds'
    }
  }

  componentDidMount() {
    // this.listRef._getData()
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

  api = () => {
    return new Promise((resolve => {
      setTimeout(() => {
        resolve([
          {name: 'zs'},
          {name: 'zs'},
          {name: 'zs'},
          {name: 'zs'},
          {name: 'zs'},
          {name: 'zs'},
          {name: 'zs'},
          {name: 'zs'},
        ])
      }, 1000)
    }))
  }

  getData = async (pageSize, pageIndex) => {

    const res = await this.api()

    return {data: res, total: 999}
  }

  render() {
    return (
      <View>
        <Text>hello</Text>
        <List
          ref={ref => this.listRef = ref}
          getData={this.getData}
          renderItem={({item, index}) => {
            return (
              <View style={[y.h(100)]}>
                <Text>{item.name}</Text>
              </View>
            )
          }}
        />
      </View>
    )
  }
}

export default withMixin(ImageList)
