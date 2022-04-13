import React from 'react';
import {View, Text, Platform, ScrollView, StatusBar} from 'react-native';
import y from 'react-native-line-style';
import {Grid} from 'app/components';
import {statusHeight} from 'app/utils/platform';
import withMixin from 'app/utils/withMixin';
import CameraRoll from "@react-native-community/cameraroll";
import Permissions from 'app/utils/permissions';
import {RESULTS} from "react-native-permissions";

class ImageList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

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

  render() {
    return (
      <View style={[y.bgColor('red')]}>
        <Text>imageList</Text>
      </View>
    )
  }
}

export default withMixin(ImageList)
