import React from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import VaccineScreen from './VaccineScreen.js';
import AboutScreen from './AboutScreen.js';
import Theme from '../theme.js';

const {Colors, Fonts} = Theme;

const staticIcons = {
  Vaccine: require('../../assets/images/vaccine.png'),
  About: require('../../assets/images/info.png'),
};

const activeIcons = {
  Vaccine: require('../../assets/images/vaccine-active.png'),
  About: require('../../assets/images/info-active.png'),
};

const Tab = createBottomTabNavigator();
const TabBarComponent = props => <BottomTabBar {...props} />;

export default function MainScreen(props) {
  return (
    <View style={styles.screen}>
      <StatusBar
        backgroundColor={Colors.Background.Grey}
        barStyle={'dark-content'}
      />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let imageSrc;

            if (focused) {
              imageSrc = activeIcons[route.name];
            } else {
              imageSrc = staticIcons[route.name];
            }
            return (
              <Image
                source={imageSrc}
                resizeMode="contain"
                style={focused ? styles.iconImageActive : styles.iconImage}
              />
            );
          },
        })}
        tabBarComponent={props => (
          <TabBarComponent {...props} style={{borderTopColor: '#dddddd'}} />
        )}
        tabBarOptions={{
          activeTintColor: Colors.Text.Black,
          inactiveTintColor: Colors.Text.Black,
          labelStyle: {
            fontSize: 14,
            fontFamily: Fonts.Hind.Medium,
          },
          style: {
            height: 60,
          },
        }}>
        <Tab.Screen name="Vaccine" component={VaccineScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  iconImage: {
    width: 28,
    height: 28,
    marginTop: 5,
  },
  iconImageActive: {
    width: 32,
    height: 32,
    marginTop: 5,
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
