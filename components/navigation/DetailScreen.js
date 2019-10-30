/**
 * Navigation Detail Component
 * Auth: Kamui23
 */

import React, {Component} from 'react';
import {View, ActivityIndicator, Text, FlatList, Image, StyleSheet, ScrollView, Button } from 'react-native';

import naviStyles from '../../resource/css/Navigation';

const url = 'https://ghibliapi.herokuapp.com/films/';

class DetailScreen extends Component {
	constructor(props) {
		super(props);
    this.state = {loading: true};
	}

  componentDidMount(){
    let { navigation } = this.props;
    let u7ri = url + navigation.getParam('ghibliId');
    return fetch(u7ri)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {loading: false, dataSource: responseJson},
          function() {}
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }

	render() {
    let {loading, dataSource} = this.state;

    if (loading) {
      return (
        <Text style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          Loading resource...
        </Text>
      );
    }

    let renderItemFunc = ({item}) => {
      return(
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'center', fontWeight: '700',fontSize: 18,color: '#222'}}>
            {item.title} - {item.release_date}
          </Text>
          <Text style={{direction: 'rtl', textAlign: 'right'}}>
            Director: {item.director}
          </Text>
          <Text style={{direction: 'rtl', textAlign: 'right'}}>
            Producer: {item.producer}
          </Text>
          <Text style={{textAlign: 'justify'}}>{item.description}</Text>
        </View>
      );
    }
    let keyExtractorFunc = ({id}, index) => id;
		return(
      <View style={{flex: 1, padding: 0, margin: 0}}>
        <View style={{flex: 1, padding: 20}}>
          <Image source={require('../../resource/images/ghibli-logo.png')} style={{maxWidth: '100%'}}/>
        </View>
        <View style={{flex: 1, padding: 20}}>
          <FlatList
            data={[dataSource]}
            renderItem={renderItemFunc}
            keyExtractor={keyExtractorFunc} />
        </View>
        <View style={{margin: 0, paddingLeft: 20, paddingRight: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            style={{flex: 1}}
            title="Ghibli Films"
            onPress={() => this.props.navigation.goBack()} />
          <Button
            style={{flex: 1}}
            title="Home"
            onPress={() => this.props.navigation.push('Home')} />
        </View>
      </View>
		);
	}
}

export default DetailScreen;
