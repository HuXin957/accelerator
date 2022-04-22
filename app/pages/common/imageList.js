import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import y from 'react-native-line-style';
import {observer} from "mobx-react";
import Modal from "@huxin957/react-native-modal";
import {Grid, Button, Detail} from 'app/components';
import withMixin from 'app/utils/withMixin';
import CameraRoll from "@react-native-community/cameraroll";
import Permissions from 'app/utils/permissions';
import {RESULTS} from "react-native-permissions";
import {List} from "app/components";
import {getUserList} from "app/server/userApi";
import UserStore from "app/store/user";

//它不能是一个页面，得做成一个组件
class ImageList extends React.Component {

  constructor(props) {
    super(props);

    this.after = undefined;
    this.previewImg = '';
    this.state = {
      visible: false,
      selectedList: [],
    }
  }

  componentDidMount() {
    // this.listRef.load()
    // this._getImages()
    // this._getAlbums()
  }

  _getImages = async (pageIndex, pageSize) => {
    const res = await CameraRoll.getPhotos({
      first: pageSize,
      assetType: 'Photos',
      groupName: '',//相册分类(ios获取不到所有相册)
      after: this.after
    })

    const data = res.edges.map(v => v.node);

    this.after = res.page_info.end_cursor;

    return {data}
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


  _getData = async (pageIndex, pageSize) => {
    const {data} = await getUserList({
      pageIndex,
      pageSize
    })
    return {data}
  }

  _placeholder() {
    return <Text>placehlod</Text>
  }

  _onClose = () => {
    this.setState({
      visible: false
    })
  }

  _renderItem = ({item, index}) => {
    const {selectedList} = this.state;
    const isChecked = selectedList.some(v => v.modified === item.modified);

    const handleSelect = () => {
      this.setState(prev => {
        if (isChecked) {
          return {
            selectedList: prev.selectedList.filter(v => v.modified !== item.modified)
          }
        }
        return {
          selectedList: prev.selectedList.concat(item)
        }
      })
    }

    return (
      <Button
        key={index}
        style={[y.upr, y.ba(1), y.bdColor('rgba(0,0,0,.9)'), y.h_(y.winw / 4), y.wRatio(25)]}
        onPress={() => {
          //预览
          this.previewImg = item.image.uri;
          this.setState({visible: true});
        }}
      >
        <Image style={[y.w100, y.h100]} source={{uri: item.image.uri}}/>
        <Button
          onPress={handleSelect}
          style={[y.upa, y.pl(10), y.pb(10), y.pt(5), y.pr(5), y.right(0), y.top(0)]}>
          {
            isChecked ?
              <Image style={[y.size(20)]} source={require('app/images/checked.png')}/>
              :
              <View style={[y.size(18), y.ba(2), y.bdColor('#fff'), y.radiusA(9)]}/>
          }
        </Button>
      </Button>
    )
  }

  render() {
    const {visible} = this.state;
    return (
      <>
        <List
          ref={ref => this.listRef = ref}
          style={[y.bgColor('rgba(0,0,0,.9)')]}
          pageSize={20}
          numColumns={4}
          getData={this._getImages}
          itemLayoutHeight={51}
          disableRefresh={true}
          footerTip={'已加载全部图片'}
          // renderItem={(props) => <Item {...props}/>}
          renderItem={this._renderItem}
        />
        <ImagePreview
          visible={visible}
          src={this.previewImg}
          onClose={this._onClose}
        />
      </>
    )
  }
}

export default withMixin(ImageList);

const ImagePreview = ({visible, onClose, src}) => (
  <Modal
    animationType={'fade'}
    visible={visible}
    onClose={onClose}
  >
    <View style={[y.w_(y.winw), y.ba(10), y.bdColor('#fff')]}>
      <Image style={[y.h(300),]} source={{uri: src}}/>
    </View>
  </Modal>
)

const Item = memo(observer(({item, index}) => {
  return (
    <Button
      style={[y.ba(1), y.bdColor('rgba(0,0,0,.9)'), y.h_(y.winw / 4), y.wRatio(25)]}
      onPress={() => {
      }}
    >
      <Image style={[y.w100, y.h100]} source={{uri: item.image.uri}}/>
    </Button>
  )
}))
