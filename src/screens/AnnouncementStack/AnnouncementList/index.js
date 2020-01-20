import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Image, TouchableOpacity, Linking, Text} from 'react-native';
import {Icon} from 'native-base';
import {inject} from "mobx-react";
import _ from 'lodash';
import moment from 'moment';
import axios from '../../../Api';
import { res, T } from '../../../helpers';
import NavigationService from "../../../NavigationService";


@inject('AuthStore')
export default class AnnouncementList extends Component {
  state = {
    text: '',
    page: 1,
    announcements: [],
    loading: true,
  };

  componentDidMount() {
    this.getAnnouncements();
  }

  getAnnouncements = async () => {

    const {data} = await axios.post('Anasayfa/AylikDuyurular');
    data.reverse();
    this.setState({
      announcements: data,
      loading: false,
    });
  };


  renderContactsItem = ({item, index}) => {
    const { Title, Desc1, CreateDate } = item;
    const date = moment(CreateDate, 'D.MM.YYYY HH:mm:ss');
    return (
      <TouchableOpacity
        onPress={() => { NavigationService.navigate('Detail', {item}) }}
        style={ styles.itemContainer }
      >
        <Text style={styles.header}>{Title}</Text>
        <Text style={styles.textContainer}>
          {T.wordLimiter(Desc1, 150)}
        </Text>
        <Text style={styles.date}>
          <Icon name='calendar' style={styles.calendarIcon}/> {date.format('DD.MM.YYYY')}
        </Text>
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          renderItem={this.renderContactsItem}
          keyExtractor={item => item.$id}
          data={this.state.announcements}
        />
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    paddingVertical: 15
  },
  itemContainer: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#eee',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5
  },
  header: {
    fontSize: res(16),
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3e95a8'
  },
  textContainer: {
    paddingVertical: 3,
    fontSize: res(12)
  },
  date: {
    marginTop: 5,
    fontSize: res(11),
    color: '#606060'
  },
  calendarIcon: {
    fontSize: res(14),
    color: '#48aec4'
  },

});