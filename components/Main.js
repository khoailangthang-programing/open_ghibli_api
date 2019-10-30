/**
 * Main Component
 * Auth: Kamui23
 */

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './navigation/HomeScreen';
import GhibliScreen from './navigation/GhibliScreen';
import DetailScreen from './navigation/DetailScreen';

const MainNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		Ghibli: GhibliScreen,
    Detail: DetailScreen
	},
	{
		initialRouteName: 'Home'
	}
);

const Main = createAppContainer(MainNavigator);

export default Main;
