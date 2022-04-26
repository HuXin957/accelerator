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
    this.state = {
      value: 'hello'
    }
  }

  render() {
    return (
      <View>
        <Grid
          gutter={[10, 10]}
          marginLR={16}
          dataSource={data}
          columnCount={3}
          renderCell={(item) => {
            return (
              <View style={[y.ujc, y.uac, y.ba(1)]}>
                <Text>{item.name}</Text>
              </View>
            )
          }}
        />
        <Text
          style={[y.h(200), y.utxc, y.utxvc, y.ba(1), {textTransform: 'uppercase'}]}
          onPress={() => {
            this.props.navigation.navigate('ImageList')
          }}>跳转</Text>
      </View>
    );
  }
}

export default withMixin(Home)


const data = [
  {name: "张三", age: 19},
  {name: "张三", age: 19},
  {name: "张三", age: 19},
  {name: "张三", age: 19},
  {name: "张三", age: 19},
  {name: "张三", age: 19},
  {name: "张三", age: 19},
  {name: "张三", age: 19},
  {name: "张三", age: 19},
]
