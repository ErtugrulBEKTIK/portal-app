import React, { Component } from 'react';
import {StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import { Thumbnail } from 'native-base';
import { Text }  from '../../../components/my-base';
import moment from 'moment';
import { T, res } from '../../../helpers'
import axios from "../../../Api";
import _ from "lodash";

export default class Cafeteria extends Component {
  state = {
    menu: [],
    date: moment(),
    loading: false
  };

  componentDidMount(){
    this.getMenu();
  }

  getMenu = async () => {
    this.setState({ loading: true });

    const date = this.state.date.format('DD.MM.YYYY');

    const { data } = await axios.post('Anasayfa/YemekListesi', {
      FoodDate: date
    });

    let menu = [];
    if(data){
       menu = data.map((item) => ({
        ...item,
        Foodname: T.capitalizeWord(item.Foodname.replace("\r\n", "").replace("/", " / "))
      }));
    }

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

    const { date, menu, loading } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={s.container}>
          <View style={s.segmentContainer}>
            <TouchableOpacity
              onPress={this.previousDay}
              style={s.segmentItem}>
              <Text style={s.segmentText}>Geri</Text>
            </TouchableOpacity>
            <View style={[s.segmentItem, s.segmentDate]}>
              <Text style={s.segmentText}>{date.format('DD.MM.YYYY')}</Text>
            </View>
            <TouchableOpacity
              onPress={this.nextDay}
              style={s.segmentItem}>
              <Text style={s.segmentText}>İleri</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={s.cardContainer}>
              <View style={s.cardHeader}>
                <Text style={s.cardHeaderText}>MENÜ</Text>
              </View>
              {
                menu.length > 0 ?
                  menu.map((item, index) => (
                    <View style={s.foodItem} key={index.toString()}>
                      <Thumbnail square source={{ uri: item.Filepath }} style={s.foodImage} />
                      <Text style={s.foodText}>{item.Foodname}</Text>
                    </View>
                  ))
                  :
                  <View style={s.footer}>
                    {
                      loading ?
                        <ActivityIndicator/>
                        :
                        <Text style={s.foodText}>Yemek bilgisi bulunamadı.</Text>
                    }

                  </View>
              }


            </View>

          </ScrollView>
        </View>
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
    borderColor: '#ddd',
    borderRadius: res(5)
  },
  segmentText: {

    textAlign: 'center',
  },
  segmentItem: {
    flex: 1,
    padding: res(10),
    borderColor: '#ddd',
  },
  segmentDate: {
    borderLeftWidth: res(1),
    borderRightWidth: res(1),
    flex: 2
  },
  cardContainer: {
    marginTop: res(20),
    borderWidth: res(1),
    borderColor: '#ddd',
  },
  cardHeader: {
    padding: res(20),
    borderBottomWidth: res(1),
    borderBottomColor: '#ddd',
  },
  cardHeaderText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: res(1),
    borderBottomColor: '#ddd',
    padding: res(10)
  },
  foodText: {
    backgroundColor: 'white',
  },
  foodImage: {
    marginRight: res(10)
  },
  footer: {
    padding: res(20),
    alignItems: 'center',
    borderBottomWidth: res(1),
    borderBottomColor: '#ddd',
  },

});