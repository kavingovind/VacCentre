import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.onComplete();
    }, 1000);
  }

  async onComplete() {
    this.props.navigation.dispatch(StackActions.replace('Start'));
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.logo.container}>
          <Image
            style={styles.logo.image}
            resizeMode="contain"
            source={require('../../assets/images/start.jpg')}
          />
          <Text style={styles.logo.caption}>VacCentre</Text>
        </View>
      </View>
    );
  }
}

SplashScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

const styles = {
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    image: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    caption: {
      fontSize: 26,
      fontFamily: 'Hind-SemiBold',
      color: '#1E3d59',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
  },
};

export default SplashScreen;
