import React from 'react';
import {View, Text, TextInput, ScrollView, StatusBar} from 'react-native';
import withMixin from "app/utils/withMixin";

class My extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View>
        <Text>My</Text>
      </View>
    );
  }
}

export default withMixin(My)




