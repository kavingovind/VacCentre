import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import VaccineIcon from '../../assets/images/vaccines.png';
import HospitalIcon from '../../assets/images/hospital.png';
import LocationIcon from '../../assets/images/location.png';
import Theme from '../theme';

const {
  Colors,
  Fonts: {Hind},
} = Theme;

export class SessionCard extends Component {
  render() {
    const name = this.props.name;
    const address = this.props.address;
    const vaccine = this.props.vaccine;
    const district = this.props.district;
    const pincode = this.props.pincode;
    const agelimit = this.props.agelimit;
    const feetype = this.props.feetype;
    const fee = this.props.fee;
    const dose1 = this.props.dose1;
    const dose2 = this.props.dose2;
    const total = this.props.total;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={HospitalIcon} style={styles.icon} />
          <Text style={styles.title}> {name}</Text>
        </View>
        <View style={styles.row}>
          <Image source={LocationIcon} style={styles.icon} />
          <Text style={styles.title}> {address}</Text>
        </View>
        <View style={styles.row}>
          <Image source={VaccineIcon} style={styles.icon} />
          <Text style={styles.title}> {vaccine}</Text>
        </View>
        <View style={styles.seperator} />
        <View style={styles.row}>
          <View style={styles.grid}>
            <Text style={styles.text}>District: {district}</Text>
          </View>
          <View style={styles.grid}>
            <Text style={styles.text}>PIN Code: {pincode}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.grid}>
            <Text style={styles.text}>Type: {feetype}</Text>
            <Text style={styles.textBold}>
              {feetype === 'Paid' ? ` - ₹ ${fee}` : ''}
            </Text>
          </View>
          <View style={styles.grid}>
            <Text style={styles.text}>Age Limit: {agelimit}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.grid}>
            <Text style={styles.text}>Dose 01: {dose1}</Text>
          </View>
          <View style={styles.grid}>
            <Text style={styles.text}>Dose 02: {dose2}</Text>
          </View>
        </View>
        <Text style={styles.textCenter}>Total Doses: {total}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    marginVertical: 10,
    marginHorizontal: 2,
    borderRadius: 7,
    padding: 10,
    elevation: 2,
    backgroundColor: Colors.Background.White,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 2,
  },
  grid: {
    width: '50%',
    flexDirection: 'row',
    marginLeft: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: Hind.SemiBold,
    color: '#34495E',
  },
  text: {
    fontSize: 15,
    fontFamily: Hind.Regular,
    color: '#5D6D7E',
  },
  textBold: {
    fontSize: 15,
    fontFamily: Hind.SemiBold,
    color: '#5D6D7E',
  },
  textCenter: {
    alignSelf: 'center',
    marginVertical: 4,
    fontSize: 15,
    fontFamily: Hind.Regular,
    color: '#5D6D7E',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
  },
  seperator: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginVertical: 5,
  },
};

export default SessionCard;
