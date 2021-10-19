import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Share from 'react-native-share';
import Theme from '../theme.js';

const {
  Colors,
  Fonts: {Hind, Sacramento},
} = Theme;
const windowWidth = Dimensions.get('window').width;

export class AboutScreen extends Component {
  constructor(props) {
    super(props);
  }

  onOpenLink = link => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      }
    });
  };

  onShareApp = () => {
    Share.open({
      title: 'Download VacCentre App',
      message:
        'Download the free VacCentre App to find Vaccines Availablity in India',
      url: 'https://play.google.com/store',
    }).catch(err => console.log(err));
  };

  render() {
    return (
      <View style={styles.screen}>
        <View>
          <Text style={styles.title}>About</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Start')}>
            <Text style={styles.subtitle}>How to use?</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() =>
              this.onOpenLink(
                'mailto:kavinyoungindia@gmail.com?subject=VacCentre App&body=Hello',
              )
            }>
            <Text style={styles.subtitle}>Write to us?</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={this.onShareApp}>
            <Text style={styles.subtitle}>Share our app</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer.container}>
          <Text style={styles.footer.text}>Kavin Govindasamy</Text>
          <Text style={styles.footer.label}>Made with ❤ from India</Text>
          <Image
            source={require('../../assets/images/footer.jpg')}
            style={styles.footer.image}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: Colors.Background.White,
    paddingHorizontal: '10%',
    paddingTop: '5%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontFamily: Hind.Bold,
    color: Colors.Text.Primary,
    alignSelf: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: Hind.Medium,
    paddingVertical: 12,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  footer: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 22,
      fontFamily: Sacramento.Regular,
      marginBottom: 20,
    },
    label: {
      fontSize: 17,
      fontFamily: Hind.Regular,
      marginBottom: 20,
    },
    image: {
      width: windowWidth - 20,
      height: 60,
      resizeMode: 'contain',
    },
  },
};

export default AboutScreen;
