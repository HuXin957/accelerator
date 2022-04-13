import React from 'react';
import {View, Text, TextInput, ScrollView, StatusBar} from 'react-native';
import withMixin from "app/utils/withMixin";

class Setting extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View>
        <Text>setting</Text>
      </View>
    );
  }
}

export default withMixin(Setting)




