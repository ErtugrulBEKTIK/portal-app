import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import {res} from "../../helpers";

export default class _Text extends Component {
  render() {
    return (
      <Text {...this.props} style={[s.text, this.props.style]} >
        { this.props.children }
      </Text>
    );
  }
}

const s = StyleSheet.create({
  text: {
    fontSize: res(16),
    color: 'black'
  }
});