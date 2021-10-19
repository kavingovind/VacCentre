import {format} from 'date-fns';
import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {findByPin} from 'cowin-api-client';
import LottieView from 'lottie-react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import EmptyList from '../../assets/animations/empty-list.json';
import AppHeader from '../components/AppHeader';
import Loading from '../components/Loading';
import SessionCard from '../components/SessionCard';
import Theme from '../theme';
import {startCase} from 'lodash';

const {
  Colors,
  Fonts: {Hind},
} = Theme;

export class VaccineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: '',
      date: new Date(),
      datePickerVisibility: false,
      loading: false,
      sessions: [],
      step: 0,
    };
  }

  onLoadData = async () => {
    this.setState({loading: true, step: 0});
    var reg = /^[0-9]+$/;
    if (reg.test(this.state.pincode) && this.state.pincode.length === 6) {
      const appoinmentsByPin = await findByPin(
        this.state.pincode,
        format(this.state.date, 'dd-MM-yyyy'),
      );
      this.setState({sessions: appoinmentsByPin.sessions});
    } else {
      ToastAndroid.show('Enter Valid PIN Code', ToastAndroid.SHORT);
    }
    if (this.state.sessions.length === 0) {
      this.setState({step: 1});
    }
    this.setState({loading: false});
  };

  datePickerVisibility = () => {
    this.setState({datePickerVisibility: !this.state.datePickerVisibility});
  };

  handleConfirm = date => {
    this.setState({date});
    this.datePickerVisibility();
  };

  _renderItem = ({item}) => {
    var address = item.address.split('');
    var j = 0;
    for (let i = 1; i < item.address.length; i++) {
      if (
        (item.address.charCodeAt(i) > 64 &&
          item.address.charCodeAt(i) < 91 &&
          item.address.charCodeAt(i - 1) > 96 &&
          item.address.charCodeAt(i - 1) < 123) ||
        (item.address.charCodeAt(i - 1) > 47 &&
          item.address.charCodeAt(i - 1) < 58 &&
          item.address.charCodeAt(i) > 65)
      ) {
        address.splice(i + j, 0, ', ');
        j += 1;
      }
    }

    return (
      <SessionCard
        name={startCase(item.name)}
        address={address}
        vaccine={item.vaccine}
        district={item.district_name}
        pincode={item.pincode}
        feetype={item.fee_type}
        fee={item.fee}
        agelimit={item.min_age_limit}
        dose1={item.available_capacity_dose1}
        dose2={item.available_capacity_dose2}
        total={item.available_capacity}
      />
    );
  };

  render() {
    const {
      pincode,
      date,
      sessions,
      loading,
      step,
      datePickerVisibility,
    } = this.state;

    return (
      <View style={styles.screen}>
        <AppHeader title={'Find Vaccination Centre'} />
        <View style={styles.form.row}>
          <View>
            <Text style={styles.form.label}> Pin Code</Text>
            <View style={styles.form.container}>
              <TextInput
                placeholder="600020"
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={6}
                style={styles.form.input}
                value={pincode}
                onChangeText={pincode => this.setState({pincode})}
              />
            </View>
          </View>
          <View>
            <Text style={styles.form.label}> Date</Text>
            <TouchableOpacity
              onPress={this.datePickerVisibility}
              style={styles.form.date}>
              <Text style={styles.form.dateText}>
                {format(date, 'dd-MM-yyyy')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={this.onLoadData}
            style={styles.form.button.container}>
            <Text style={styles.form.button.text}>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={sessions}
          extraData={sessions}
          renderItem={this._renderItem}
          keyExtractor={item => item.session_id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            if (loading) {
              return <Loading loading={loading} type="Wave" />;
            }
            return (
              <View style={styles.empty.container}>
                {step === 1 && (
                  <>
                    <LottieView
                      style={styles.empty.animation}
                      source={EmptyList}
                      loop={true}
                      speed={2.5}
                      autoPlay
                    />
                    <Text style={styles.empty.title}>No Search Results</Text>
                  </>
                )}

                <Text style={styles.empty.text}>
                  Enter PIN Code, Select Date and Click on Search Button for
                  getting Vaccine Availabilty in your Area
                </Text>
              </View>
            );
          }}
        />
        <DateTimePickerModal
          isVisible={datePickerVisibility}
          mode="date"
          minimumDate={new Date()}
          onConfirm={this.handleConfirm}
          onCancel={this.datePickerVisibility}
        />
      </View>
    );
  }
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: Colors.Background.White,
    paddingHorizontal: '5%',
  },
  empty: {
    animation: {
      width: '100%',
      height: 300,
      alignSelf: 'center',
    },
    title: {
      textAlign: 'center',
      marginBottom: 5,
      fontSize: 18,
      fontFamily: Hind.SemiBold,
    },
    text: {
      textAlign: 'center',
      lineHeight: 22,
      fontSize: 16,
      fontFamily: Hind.Regular,
    },
  },
  form: {
    row: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: 16,
      fontFamily: Hind.Regular,
    },
    container: {
      borderWidth: 2,
      borderRadius: 50,
      borderColor: Colors.Text.LightGrey,
      justifyContent: 'center',
    },
    input: {
      fontSize: 16,
      fontFamily: Hind.Medium,
      height: 45,
      width: 150,
      marginVertical: -5,
      paddingHorizontal: 15,
    },
    date: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: 150,
      borderWidth: 2,
      borderRadius: 50,
      borderColor: Colors.Text.LightGrey,
      paddingHorizontal: 15,
    },
    dateText: {
      fontSize: 16,
      fontFamily: Hind.Medium,
    },
    button: {
      container: {
        alignSelf: 'center',
        marginVertical: 20,
        paddingVertical: 7,
        width: '40%',
        backgroundColor: Colors.Background.Primary,
        borderRadius: 50,
      },
      text: {
        fontFamily: Hind.SemiBold,
        fontSize: 18,
        color: Colors.Text.White,
        textAlign: 'center',
      },
    },
  },
};

export default VaccineScreen;
