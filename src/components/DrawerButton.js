import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import {Icon} from 'native-base';

export default class DrawerButton extends Component {
  toggleMenu = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    const { color } = this.props;
    return (
      <TouchableOpacity
        onPress={this.toggleMenu}
        style={{ paddingHorizontal: 10 }}>
        <Icon
          name="ios-menu"
          style={{fontSize: 26, color: color ? color : '#000'}}
        />

      </TouchableOpacity>
    );
  }
}