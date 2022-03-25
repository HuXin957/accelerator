import React from 'react';
import {View, Text, TextInput, ScrollView, StatusBar} from 'react-native';
import y from '../../utils/style';
import Calendar from "../../components/calendar";


export default class index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Calendar
          isShowAll={false}
          renderItem={()=>{

          }}
        />
      </View>
    );
  }
}



