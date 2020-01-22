import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import firebase from 'react-native-firebase';

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

const messaging = firebase.messaging();

messaging.hasPermission()
  .then((enabled) => {
    if (enabled) {
      messaging.getToken()
        .then(token => { console.log(token) })
        .catch(error => { /* handle error */ });
    } else {
      messaging.requestPermission()
        .then(() => { /* got permission */ })
        .catch(error => { /* handle error */ });
    }
  })
  .catch(error => { /* handle error */ });

firebase.notifications().onNotification((notification) => {
  const { title, body } = notification;
  PushNotification.localNotification({
    title: title,
    message: body, // (required)
  });
});

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "401339463754",

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});