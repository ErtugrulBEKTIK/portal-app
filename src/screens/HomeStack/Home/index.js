import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

import AnnounceSlide from './AnnounceSlide'
import ShortCuts from './ShortCuts'
import Info from './Info'

export default class SignIn extends Component {


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AnnounceSlide navigation={this.props.navigation}/>
        <ShortCuts navigation={this.props.navigation}/>
        <Info navigation={this.props.navigation}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});