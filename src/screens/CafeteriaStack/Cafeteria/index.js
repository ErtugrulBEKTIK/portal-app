import React, { Component } from 'react';
import {StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import { Card, CardItem, Body, Icon, Right, List, ListItem, Left, Thumbnail, Text } from 'native-base';
import moment from 'moment';
import { T, res } from '../../../helpers'
import axios from "../../../Api";
import _ from "lodash";

export default class Cafeteria extends Component {
  state = {
    menu: [],
    date: moment()
  };

  componentDidMount(){
    this.getMenu();
  }

  getMenu = async () => {
    const { data } = await axios.post('Anasayfa/YemekListesi');

    const menu = data.filter(item => item.Date === this.state.date.format('DD.MM.YYYY') + ' 00:00:00');

    this.setState({
      menu,
      loading: false,
    });
  };

  nextDay = () => {
    const date = this.state.date.add(1, 'days');
    this.setState({ date });
    this.getMenu();
  };

  previousDay = () => {
    const date = this.state.date.subtract(1, 'days');
    this.setState({ date });
    this.getMenu();
  };

  render() {

    const { date } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={s.container}>
          <View style={s.segmentContainer}>
            <TouchableOpacity
              onPress={this.previousDay}
              style={s.segmentItem}>
              <Text style={s.segmentText}>Geri</Text>
            </TouchableOpacity>
            <View style={[s.segmentItem, {borderLeftWidth: res(1), borderRightWidth: res(1)}]}>
              <Text style={s.segmentText}>{date.format('DD.MM.YYYY')}</Text>
            </View>
            <TouchableOpacity
              onPress={this.nextDay}
              style={s.segmentItem}>
              <Text style={s.segmentText}>İleri</Text>
            </TouchableOpacity>
          </View>

          <Card style={s.card}>
            <CardItem header bordered>
              <Text>MENÜ</Text>
            </CardItem>
            {
              this.state.menu.map((item, index) => (
                <CardItem style={{flexDirection: 'row'}} bordered key={index.toString()}>
                  <Thumbnail square source={{ uri: item.Filepath }} style={s.mealImage} />
                  <Text>{item.Foodname}</Text>
                </CardItem>
              ))
            }

          </Card>

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
  segmentContainer: {
    flexDirection: 'row',
    borderWidth: res(1),
    borderColor: '#3c9fb7',
    borderRadius: res(5)
  },
  segmentText: {
    color: '#3c9fb7',
    textAlign: 'center'

  },
  segmentItem: {
    flex: 1,
    padding: res(10),
    borderColor: '#3c9fb7',
  },
  card: {
    marginTop: res(20)
  },
  mealImage: {
    marginRight: res(10)
  }

});