const slides = [
  {
    key: 1,
    title: 'Wear a mask.',
    text:
      'Wear a mask covering \nover your mouth and \nnose when around others.',
    animation: require('../../assets/animations/face-mask.json'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Maintain safe distance.',
    text:
      'Keep at least 6 feet \nbetween yourself and others \nif you must be in public.',
    animation: require('../../assets/animations/social-distancing.json'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Clean your hands.',
    text:
      'Wash your hands often \nwith soap and water \nfor at least 20 seconds.',
    animation: require('../../assets/animations/wash-hands.json'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 4,
    title: 'Get vaccinated.',
    text: 'Getting vaccinated is safer \nthan getting infected',
    animation: require('../../assets/animations/vaccination.json'),
    backgroundColor: '#22bcb5',
  },
];

import React, {Component} from 'react';
import {Text, View, Animated, Easing} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import Theme from '../theme.js';

const {
  Colors,
  Fonts: {Hind},
} = Theme;

export class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  renderSlide = ({item}) => {
    return (
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <LottieView
          style={styles.animation}
          source={item.animation}
          loop={true}
          speed={2.5}
          autoPlay
        />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  renderButton = ({iconName}) => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name={iconName} color={Colors.Background.White} size={24} />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.screen}>
        <AppIntroSlider
          data={slides}
          renderItem={this.renderSlide}
          renderDoneButton={() =>
            this.renderButton({
              iconName: 'checkmark-outline',
            })
          }
          renderNextButton={() =>
            this.renderButton({
              iconName: 'chevron-forward-outline',
            })
          }
          renderSkipButton={() => <Text style={styles.label}>Skip</Text>}
          showSkipButton={true}
          onDone={() => this.props.navigation.navigate('Main')}
          activeDotStyle={styles.dots}
        />
      </View>
    );
  }
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: Colors.Background.White,
    paddingVertical: '20%',
  },
  animation: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: Hind.SemiBold,
    textAlign: 'center',
    color: Colors.Text.Primary,
  },
  text: {
    fontSize: 20,
    fontFamily: Hind.Medium,
    textAlign: 'center',
    color: Colors.Text.Primary,
  },
  label: {
    fontSize: 18,
    fontFamily: Hind.Regular,
    textDecorationLine: 'underline',
    padding: 10,
    color: Colors.Text.Primary,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: Colors.Background.Primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    backgroundColor: Colors.Background.Primary,
  },
};

export default StartScreen;
