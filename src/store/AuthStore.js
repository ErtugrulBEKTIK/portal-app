import {observable, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../Api';
import { API_KEY } from '../../config';

// navigation service
import NavigationService from '../NavigationService';

const defaultUser = {
  Name: '',
  Eposta: '',
  ProfilResmi: '',
};

const defaultToken = {
  Username: '',
  tokenkey: '',
};

class AuthStore{
  @observable token = defaultToken;
  @observable deviceToken = '';
  @observable user = defaultUser;

  @action async saveUser(username, user){
    try{
      const token = {
        Username: username,
        tokenkey: user.Tokenkey
      };

      await AsyncStorage.setItem('token', JSON.stringify(token));
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await this.setupAuth();
    }catch (e) {
      console.log(e);
    }
  }

  @action async removeUser(){
    try{
      const { Username } = this.token;
      await axios.post('Login/DeleteImeiNo',
        {
          EmpId: Username,
          device_token: this.deviceToken,
        }
      );

      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      this.token = defaultToken;
      this.deviceToken = '';
      await this.setupAuth();
      this.user = defaultUser;

    }catch (e) {
      console.log(e);
    }
  }

  @action async setupAuth(){
    await this.setToken();
    await this.setUser();
  }

  @action async setToken(){
    try{
      let token = await AsyncStorage.getItem('token');
      token = JSON.parse(token);
      if (!token) {
        NavigationService.navigate('Auth');
        return false;
      }

      axios.defaults.transformRequest = [...axios.defaults.transformRequest, (data) => {
        let newData = {...token, ...JSON.parse(data)};
        return JSON.stringify(newData);
      }];

      this.token = token;
      NavigationService.navigate('App');
    }catch (e) {
      console.log(e);
    }
  }

  @action async setDeviceToken(token){
    this.deviceToken = token;
  }

  @action async setUser(){
    try{
      const user = await AsyncStorage.getItem('user');
      this.user = JSON.parse(user);

    }catch (e) {
      console.log(e);
    }
  }
}

export default new AuthStore();