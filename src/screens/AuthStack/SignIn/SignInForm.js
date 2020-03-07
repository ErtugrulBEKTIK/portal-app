import React, { Component } from 'react';
import { Alert } from "react-native";
import {Button, Label, Input, Item, Spinner, Text, Icon} from "native-base";
import {Formik} from "formik";
import {res} from '../../../helpers';
import axios from '../../../Api';
import validations from './validations';
import firebase from "react-native-firebase";

import {inject, observer} from 'mobx-react';

@inject('AuthStore')
@observer
export default class SignInForm extends Component {

  _handleSubmit = async ({ username, password }, bag) => {
    try {
      const response = await axios.post('Login/Login',
        {
          Username: username,
          UserPass: password,
        }
      );

      if (!response.data) {
        Alert.alert(
          'Hata',
          'Giriş bilgileri hatalı.'
        );
        return false;
      }

      // Save user's device token
      const tokenResult = await axios.post('Login/ImeiNoControl',
        {
          Username: username,
          UserPass: password,
          EmpId: username,
          device_token: this.props.AuthStore.deviceToken,
          tokenkey: response.data[0].Tokenkey
        }
      );

      if (!tokenResult.data) {
        Alert.alert(
          'Hata',
          'Sorun oluştu.'
        );
        return false;
      }


      bag.setSubmitting(false);
      this.props.AuthStore.saveUser(username, response.data[0]);
    }catch (e) {
      bag.setSubmitting(false);
      Alert.alert(
        'Hata',
        'Bağlantı hatası.'
      );
      console.log(e);
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={this._handleSubmit}
        validationSchema={validations}
      >
        {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
            isValid,
            isSubmitting
          }) => (
          <React.Fragment>

              <Item error={errors.username && touched.username} floatingLabel>
                <Label>Kullanıcı adı</Label>
                <Input
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordRef._root.focus()}
                  onChangeText={handleChange('username')}
                  value={values.username}
                  onBlur={() => setFieldTouched('username')}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                />

                { (errors.username && touched.username) && <Icon style={{fontSize: 17}} name='close-circle' />}
              </Item>

              <Item
                error={errors.password && touched.password}
                floatingLabel
                style={{marginTop: res(10)}}
              >
                <Label>Şifre</Label>
                <Input
                  getRef={ref => this.passwordRef = ref}
                  returnKeyType={'go'}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  onBlur={() => setFieldTouched('password')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                />

                { (errors.password && touched.password) && <Icon style={{fontSize: 17}} name='close-circle' />}
              </Item>

              <Button
                block
                disabled={!isValid || isSubmitting}
                onPress={handleSubmit}
                style={{marginTop: res(30)}}>

                { isSubmitting && <Spinner size={'small'} color={'white'} /> }
                <Text style={{fontSize: res(15)}}>GİRİŞ YAP</Text>
              </Button>


          </React.Fragment>
        )}
      </Formik>
    );
  }
}

