/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, ActivityIndicator, Text, FlatList, Image, StyleSheet, ScrollView} from 'react-native';

import { Main } from './components/Main';

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
      borderWidth: 1,
      borderRadius: 2,
      marginBottom: 8,
      padding: 10
    },
    cardHeader: {
      borderBottomWidth: 1,
      paddingBottom: 4,
      marginBottom: 5
    },
    cardContent: {
      textAlign: 'justify'
    }
});

export default class App extends Component {

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
    var renderItemFunc = ({item}) => {
      return (
        <View style={styles.fullFlex, styles.card}>
          <View style={styles.itemFlex, styles.cardHeader}>
            <Text style={styles.textHeader}>
              {item.title} - {item.release_date}
            </Text>
            <Text style={styles.textFromRight}>
              Director: {item.director}
            </Text>
            <Text style={styles.textFromRight}>
              Producer: {item.producer}
            </Text>
          </View>
          <View style={styles.itemFlex}>
            <Text style={styles.cardContent}>
              {item.description}
            </Text>
          </View>
        </View>
      );
    }

    var keyExtractorFunc = ({id}, index) => id;
    return(
        <ScrollView>
          <View style={styles.fullFlex}>
            <Image source={require('./resource/images/ghibli-logo.png')} style={styles.imageFullView}/>
          </View>
          <View style={styles.fullFlex}>
            <FlatList 
              data={dataSource} 
              renderItem={renderItemFunc} 
              keyExtractor={keyExtractorFunc} />
          </View>
        </ScrollView>
    );
  }
}
