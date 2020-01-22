import React from 'react';
import {Icon} from "native-base";
import { res } from './helpers';

import {
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';

import DrawerButton from './components/DrawerButton';
import DrawerMenu from './components/DrawerMenu';

import Redirector from './screens/AuthStack/Redirector';

// Stacks & Screens
import AuthStack from './screens/AuthStack';
import HomeStack from './screens/HomeStack';
import ContactStack from './screens/ContactStack';
import DocumentStack from './screens/DocumentStack';
import ProfileStack from './screens/ProfileStack';
import AnnouncementStack from './screens/AnnouncementStack';
import CafeteriaStack from './screens/CafeteriaStack';


const App = createDrawerNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Anasayfa',
      headerLeft: <DrawerButton navigation={navigation} />,
      drawerIcon: ({ tintColor }) => (
        <Icon style={{color: tintColor, fontSize: res(25)}} name='home' />
      ),
    })
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Profil',
      headerLeft: <DrawerButton navigation={navigation} />,
      drawerIcon: ({ tintColor }) => (
        <Icon style={{color: tintColor, fontSize: res(25)}} name='contact' />
      ),
    })
  },
  Contacts: {
    screen: ContactStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Rehber',
      headerLeft: <DrawerButton navigation={navigation} />,
      drawerIcon: ({ tintColor }) => (
        <Icon style={{color: tintColor, fontSize: res(25)}} name='contacts' />
      ),
    })
  },
  Cafeteria: {
    screen: CafeteriaStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Yemekhane',
      headerLeft: <DrawerButton navigation={navigation} />,
      drawerIcon: ({ tintColor }) => (
        <Icon style={{color: tintColor, fontSize: res(25)}} type="MaterialIcons" name="restaurant" />
      ),
    })
  },
  Announcements: {
    screen: AnnouncementStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Duyurular',
      headerLeft: <DrawerButton navigation={navigation} />,
      drawerIcon: ({ tintColor }) => (
          <Icon style={{color: tintColor, fontSize: res(25)}} name='megaphone' />
      ),
    })
  },
  Documents: {
    screen: DocumentStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Belgeler',
      headerLeft: <DrawerButton navigation={navigation} />,
      drawerIcon: ({ tintColor }) => (
        <Icon style={{color: tintColor, fontSize: res(25)}} name='document' />
      ),
    })
  }
}, {
  initialRouteName: 'Home',
  contentComponent: DrawerMenu,
  drawerWidth: res(250),
  overlayColor: 'rgba(0,0,0,0.67)',
  contentOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: '#3897a7',
    activeBackgroundColor: '#48aec4',
    inactiveBackgroundColor: '#fff',
    iconContainerStyle: { marginRight: 0, width: res(25)},
    labelStyle: {
      fontSize: res(14)
    }
  }
});

const SwitchNavigator = createSwitchNavigator(
  {
    Redirector,
    App,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Redirector',
  }
);

export default createAppContainer(SwitchNavigator);