import firebase from "react-native-firebase";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

export default async function notification(){
  let device_token = '';

  const messaging = firebase.messaging();

  const enabled = await messaging.hasPermission();

  if (enabled) {
    device_token = await messaging.getToken();
  } else {
    messaging.requestPermission()
      .then(() => { /* got permission */ })
      .catch(error => { /* handle error */ });
  }


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

  return device_token;
};
