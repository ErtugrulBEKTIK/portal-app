import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import initNotifications from '../../../Notifications'
import {inject} from 'mobx-react';


@inject('AuthStore')
export default class Redirector extends Component {
  async componentDidMount() {

    const deviceToken = await initNotifications;
    await this.props.AuthStore.setDeviceToken(deviceToken);
    this.props.AuthStore.setupAuth();


  }

  render() {
    return (
      <View style={{ flex:1 }}/>
    );
  }
}
