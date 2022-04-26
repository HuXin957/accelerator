import Modal from "@huxin957/react-native-modal";
import {Image, View} from "react-native";
import y from "react-native-line-style";
import React from "react";


const ImagePreview = ({visible, onClose, src}) => (
  <Modal
    animationType={'none'}
    visible={visible}
    onClose={onClose}
    style={[y.ujc]}
  >
      <View style={[y.bdColor('#fff'),y.ba(10)]}>
        <Image style={[y.h(300)]} source={{uri: src}}/>
      </View>
  </Modal>
)

export default ImagePreview;
