/**
 * Navigation Home Component
 * Auth: Kamui23
 */

import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';

import naviStyles from '../../resource/css/Navigation';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<View style={naviStyles.naviItem}>
        <Button
          title="Ghibli Films"
          onPress={() => this.props.navigation.navigate('Ghibli')} />
			</View>
		);
	}
}

export default HomeScreen;
