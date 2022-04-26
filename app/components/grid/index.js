import React, {Component} from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import y from 'react-native-line-style';

export default class Grid extends Component {

  static propTypes = {
    columnCount: PropTypes.number.isRequired,
    dataSource: PropTypes.array.isRequired,
    renderCell: PropTypes.func.isRequired,
    style: PropTypes.object,
    gutter: PropTypes.array
  };

  constructor(props) {
    super(props);

    const {marginLR = 0, gutter = []} = this.props;

    this._marginLR = marginLR;
    this._gridWidth = y.winw - marginLR * 2 + (gutter[0] || 0);
    this._columnWidth = this._gridWidth / props.columnCount
  }

  render() {
    const {style} = this.props;

    return (
      <View style={style}>
        <View style={[y.udr, y.ujs, y.uas, y.uWrap, y.w_(this._gridWidth), y.ml_(this._marginLR)]}>
          {this._renderCells()}
        </View>
      </View>
    )
  }

  _renderCells() {
    const {gutter = [], dataSource = [], renderCell = () => null, columnCount = 1} = this.props;
    return dataSource.map((data, index, dataList) => {
      //最后一排
      const isEnd = (Math.ceil(dataList.length / columnCount) - 1) * columnCount <= index;
      return (
        <View style={[y.w_(this._columnWidth), y.pr(gutter[0] || 0), y.pb(isEnd ? 0 : (gutter[1] || 0))]}
              key={`cell-${(data.key != null) ? data.key : index}`}>
          {renderCell(data, index, dataList)}
        </View>
      )
    })
  }
}
