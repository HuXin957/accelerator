import React, {useState} from 'react';
import {View, Text, TextInput, ScrollView, StatusBar} from 'react-native';
import y from 'react-native-line-style';
import {Grid} from 'app/components';
import {statusHeight} from 'app/utils/platform';
import withMixin from 'app/utils/withMixin';
import ConfigureStore from 'app/store/configure';
import {SearchBar} from 'react-native-screens';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>

      </View>
    )
  }
}

export default withMixin(Home)

