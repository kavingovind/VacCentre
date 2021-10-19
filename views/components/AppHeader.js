import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import Theme from '../theme.js';

const {Colors, Fonts} = Theme;

class AppHeader extends Component {
  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>{this.props.title}</Text>
        <SLIcon name="location-pin" size={20} style={styles.icon} />
      </View>
    );
  }
}

const styles = {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Background.White,
    marginVertical: 10,
    paddingVertical: 5,
  },
  title: {
    color: Colors.Text.Primary,
    fontFamily: Fonts.Hind.SemiBold,
    fontSize: 22,
    marginRight: 10,
  },
  icon: {
    color: Colors.Text.Primary,
    marginBottom: 5,
  },
};

export default AppHeader;
