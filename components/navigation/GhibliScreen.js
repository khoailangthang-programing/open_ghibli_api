/**
 * Navigation Ghibli Component
 * Auth: Kamui23
 */

import React, {Component} from 'react';
import {View, ActivityIndicator, Text, FlatList, Image, StyleSheet, ScrollView, Button } from 'react-native';

import naviStyles from '../../resource/css/Navigation';

const styles = StyleSheet.create({
    fullFlex: {
      flex: 1,
      padding: 20
    },
    itemFlex: {
      flex: 1,
      paddingBottom: 20
    },
    textFromRight: {
      direction: 'rtl',
      textAlign: 'right'
    },
    textHeader: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 18,
      color: '#222'
    },
    imageFullView: {
      maxWidth: '100%'
    },
    normalText: {
      margin: 0
    },
    card: {
      marginBottom: 3,
      padding: 10
    },
    cardHeader: {
      paddingBottom: 4
    },
    cardContent: {
      textAlign: 'justify'
    }
});


export default class GhibliScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    return fetch('https://ghibliapi.herokuapp.com/films')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {isLoading: false, dataSource: responseJson},
          function() {}
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    var {dataSource, isLoading} = this.state;
    if (isLoading) {
      return(
        <View style={styles.fullFlex}>
          <Text>Loading resource...</Text>
        </View>
      );
    }
    // Progress data resource
    let renderItemFunc = ({item}) => {
      let filmTitle = item.title + '-' + item.release_date;
      return (
        <View style={styles.fullFlex, styles.card}>
          <View style={styles.itemFlex, styles.cardHeader}>
            <Button
              title={filmTitle}
              onPress={() => this.props.navigation.push('Detail', {ghibliId: item.id})} />
          </View>
        </View>
      );
    }

    let keyExtractorFunc = ({id}, index) => id;
    return(
        <ScrollView>
          <View style={styles.fullFlex}>
            <Image source={require('../../resource/images/ghibli-logo.png')} style={styles.imageFullView}/>
          </View>
          <View style={styles.fullFlex}>
            <FlatList
              data={dataSource}
              renderItem={renderItemFunc}
              keyExtractor={keyExtractorFunc} />
          </View>
          <Button
            title="Home"
            onPress={() => this.props.navigation.goBack()} />
        </ScrollView>
    );
  }
}
