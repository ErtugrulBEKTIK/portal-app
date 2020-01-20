import React, { Component } from 'react';
import {StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Linking} from 'react-native';
import moment from 'moment';
import { res } from '../../../helpers'

export default class AnnouncementDetail extends Component {


  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item');
    console.log(this.props);
  }

  renderLink = () => (
    <TouchableOpacity
      onPress={() => { Linking.openURL('http://tugva.org/')}}>
        <Text style={s.link}>Haber sayfasına gitmek için tıklayınız...</Text>
    </TouchableOpacity>
  );

  render() {
    const { Title, Desc1, CreateDate } = this.item;
    const date = moment(CreateDate, 'D.MM.YYYY HH:mm:ss');
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={s.container}>
          <Text style={s.title}>{Title}</Text>
          <Text style={s.content}>{Desc1}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: res(15),
    paddingVertical: res(25),
  },
  title: {
    fontWeight: 'bold',
    marginBottom: res(10),
    fontSize: res(16),
  },
  link: {
    marginTop: res(10),
    marginBottom: res(25),
    color: '#3e95a8',
    fontWeight: 'bold',
  }
});