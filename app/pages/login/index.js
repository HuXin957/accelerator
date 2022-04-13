import React from 'react';
import {View, Text, TextInput, ScrollView, StatusBar} from 'react-native';
import withMixin from "app/utils/withMixin";
import y from 'react-native-line-style';
import {Input} from 'app/pageComponents/login';
import {Button} from "app/components";
import userStore from "app/store/user";
import {P} from "app/utils/pagePermissions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: ''
    }
  }

  login = () => {
    const {account, password} = this.state;
    const params = this.props.route.params;

    userStore.setValue('permissions',[P.LOGIN])

    if (params?.callback) {
      params.callback()
      return
    }
    //执行回调(eg:返回到页面刷新页面)

    this.props.navigation.replace('Home')

  }


  render() {
    const {account} = this.state;

    return (
      <View style={[y.uf1, y.plr(36), y.pt(100)]}>
        <Text style={[y.fSize(30), y.fWeight('bold')]}>登录✍</Text>
        <Input
          value={account}
          placeholder={'请输入账号'}
          onChangeText={account => this.setState({account})}
          style={[y.mt(40)]}
        />
        <Input
          value={account}
          placeholder={'请输入密码'}
          onChangeText={account => this.setState({account})}
          style={[y.mt(20)]}
        />
        <Button
          onPress={this.login}
          style={[y.bgColor('#333'), y.uSelfCenter, y.h(42), y.plr(80), y.ujc, y.radiusA(21), y.mt(100)]}>
          <Text style={[y.color('#fff'), y.fSize(18)]}>登录</Text>
        </Button>
      </View>
    );
  }
}

export default withMixin(Login)




