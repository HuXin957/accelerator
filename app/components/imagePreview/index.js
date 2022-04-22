import Modal from "@huxin957/react-native-modal";
import {Image, View} from "react-native";
import y from "react-native-line-style";
import React from "react";


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

export default ImagePreview;
