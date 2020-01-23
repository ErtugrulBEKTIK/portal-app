import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { NavigationActions} from 'react-navigation';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Icon} from 'native-base';
import _ from 'lodash';
import moment from 'moment';
require('moment/locale/tr');
import {res, T} from '../../../helpers';
import axios from "../../../Api";
import NavigationService from "../../../NavigationService";

export default class AnnounceSlide extends Component {
  state = {
    announcements: [],
  };

  componentDidMount() {
    this.getAnnouncements();
    this.swiperListError();
  }

  getAnnouncements = async () => {

    const {data} = await axios.post('Anasayfa/AylikDuyurular');
    data.reverse();

    this.setState({
      announcements: _.take(data, 5),
      loading: false,
    });
  };

  renderAnnouncement = (item, index) => {
    console.log(item);
    const colors = ['#c24c30', '#5dca56', '#378aed', '#7bb0d0', '#9636a1'];
    const date = moment(item.CreateDate, 'D.MM.YYYY HH:mm:ss');
    return(
      <TouchableHighlight
        onPress={() => { this.props.navigation.navigate('Announcements', {}, NavigationActions.navigate({ routeName: 'Detail', params: {item} }))}}
        style={[s.itemContainer, {backgroundColor: colors[index%5]}]}
        key={index.toString()}>
        <View style={{flex: 1}}>
          <View style={s.header}>
            <Text style={s.headerText}>{T.toUpperCase(date.format('dddd'))}</Text>
            <Text style={s.headerText}>
              <Icon name="calendar" type="AntDesign" style={[s.headerText, s.calendarIcon]} />&nbsp;
              {date.format('DD.MM.YYYY')}
            </Text>
          </View>
          <View style={s.content}>
            <Text style={s.title}>{item.Title}</Text>
            <Text style={s.description}>{T.wordLimiter(item.Desc1)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  };

  swiperListError = () => {
    let wait = new Promise((resolve) => setTimeout(resolve, 6000));  // Smaller number should work
    wait.then( () => {
      this.flatListRef.scrollToIndex({index: 1, animated: true});
    }).catch(() => {  });
  };

  render() {
    const { announcements } = this.state;

    return (
      <View style={s.container}>
        <SwiperFlatList
          ref={ref => this.flatListRef = ref}
          showPagination={this.state.announcements.length > 1}
          autoplay
          autoplayDelay={7}
          autoplayLoop
          onScrollToIndexFailed={()=>{}}
          data={this.state.announcements}
          renderItem={this.renderAnnouncement}
          paginationDefaultColor={"rgba(255,255,255,0.24)"}
          paginationActiveColor={"rgba(255,255,255,0.81)"}
        >
          {
            announcements.length > 0 ?
              announcements.map(this.renderAnnouncement)
              :
              <View
                style={[s.itemContainer, {backgroundColor: '#c24c30'}]}>
                <View style={{flex: 1}}>
                  <View style={s.header}>
                  </View>
                  <View style={[s.content, {justifyContent: 'center'}]}>
                    <ActivityIndicator size="large"/>
                  </View>
                </View>
              </View>
          }
        </SwiperFlatList>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white'
  },
  itemContainer: {
    flex: 1,
    width,
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: res(20),
    paddingVertical: res(10),
  },
  headerText: {
    color: '#fff',
    fontSize: res(12),
  },
  calendarIcon: {
    fontSize: res(14),
  },
  content: {
    flex: 8,
    padding: res(20),
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: res(17),
    marginBottom: res(10),
  },
  description: {
    color: '#fff',
    fontSize: res(15),
  }
});