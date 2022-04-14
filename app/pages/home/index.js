import React from 'react';
import {View, Text, Platform, ScrollView, StatusBar} from 'react-native';
import y from 'react-native-line-style';
import {Grid} from 'app/components';
import {statusHeight} from 'app/utils/platform';
import withMixin from 'app/utils/withMixin';
import userStore from 'app/store/user';
import {SearchBar} from 'react-native-screens';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <View>
        <SearchBar
          hideWhenScrolling={true}
          obscureBackground={'red'}
          autoCapitalize={'words'}
          placeholder={'please'}
          inputType={'phone'}/>
        <Grid
          gutter={[10, 10]}
          marginLR={20}
          dataSource={data}
          columnCount={3}
          renderCell={(item) => {
            return (
              <View style={[y.ujc, y.uac, y.ba(1)]}>
                <Text>{item.name}fsdfadfds</Text>
              </View>
            )
          }}
        />
        <Text onPress={() => {
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


