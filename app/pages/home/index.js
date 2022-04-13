import React from 'react';
import {View, Text, Platform, ScrollView, StatusBar} from 'react-native';
import y from 'react-native-line-style';
import {Grid} from 'app/components';
import {statusHeight} from 'app/utils/platform';
import withMixin from 'app/utils/withMixin';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 2
    }
  }


  render() {

    return (
      <View style={[y.mt(10)]}>
          <Grid
            gutter={[10, 10]}
            marginLR={20}
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
        <Text onPress={() => {
          this.props.navigation.navigate('ImageList')
        }}>sfmodjfio</Text>
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


