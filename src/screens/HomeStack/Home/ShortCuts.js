import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import {Icon} from 'native-base';
import {res} from "../../../helpers";
import NavigationService from "../../../NavigationService";

export default class ShortCuts extends Component {
  render() {
    return (
      <View style={s.container}>
        <View style={s.row}>
          <TouchableOpacity
            onPress={() => { NavigationService.navigate('Profile')}}
            style={s.item}>
            <Icon type="AntDesign" name="user" style={s.icon} />
            <Text style={s.text}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { NavigationService.navigate('Contacts')}}
            style={s.item}>
            <Icon type="AntDesign" name="book" style={s.icon} />
            <Text style={s.text}>Rehber</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { NavigationService.navigate('Announcements')}}
            style={s.item}>
            <Icon type="AntDesign" name="notification" style={s.icon} />
            <Text style={s.text}>Duyurular</Text>
          </TouchableOpacity>
        </View>
        <View style={s.row}>
          <TouchableOpacity
            onPress={() => { NavigationService.navigate('Documents')}}
            style={s.item}>
            <Icon type="FontAwesome" name="copy" style={s.icon} />
            <Text style={s.text}>Belgeler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('Cafeteria')}}
            style={s.item}>
            <Icon type="MaterialIcons" name="restaurant" style={s.icon} />
            <Text style={s.text}>Yemekhane</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { Linking.openURL('http://tugva.org/')}}
            style={s.item}>
            <Icon type="MaterialIcons" name="language" style={s.icon} />
            <Text style={s.text}>Web Site</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 2,
    padding: res(5),
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    borderWidth: 1,
    borderColor: '#49aec3',
    margin: res(5),
    padding: res(15),
  },
  icon:{
    fontSize: res(40),
    color: '#49aec3',
    marginBottom: 5
  }
});