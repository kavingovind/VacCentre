import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {sha256} from 'react-native-sha256';
import Pdf from 'react-native-pdf';
import AppHeader from '../components/AppHeader';
import Loading from '../components/Loading';
import {
  CONFIRM_OTP,
  DOWNLOAD_CERTIFICATE,
  GENERATE_OTP,
} from '../../app.constant';
import {request, certificateRequest} from '../../utils/request';
import Theme from '../theme';
import {setAuth} from '../../utils/auth';

const {
  Colors,
  Fonts: {Hind},
} = Theme;

export class CertificateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfVisible: false,
      loading: false,
      mobile: '',
      otp: '',
      beneficiary_reference_id: '',
      step: 'mobile',
      pdfSource: {},
    };
  }

  onSendOTP = async () => {
    this.setState({loading: true});
    try {
      const {mobile} = this.state;
      const response = await request(GENERATE_OTP, {
        method: 'post',
        body: JSON.stringify({mobile}),
      });

      if (response.txnId) {
        this.setState(response);
        console.log('OTP sent successfully');
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({loading: false, step: 'otp'});
  };

  onConfirmOTP = async () => {
    this.setState({loading: true});
    try {
      const {otp, txnId} = this.state;
      const encryptedOTP = await sha256(otp);

      const response = await request(CONFIRM_OTP, {
        method: 'post',
        body: JSON.stringify({otp: encryptedOTP, txnId}),
      });

      if (response.token) {
        console.log('OTP verified successfully');
        this.setState(response);
        await setAuth({token: response.token});
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({loading: false, step: 'certificate'});
  };

  getCertificate = async () => {
    this.setState({loading: true});
    try {
      const {token, beneficiary_reference_id} = this.state;
      const response = await certificateRequest(
        `${DOWNLOAD_CERTIFICATE}?beneficiary_reference_id=${beneficiary_reference_id}`,
        {
          method: 'get',
        },
      );

      if (response) {
        this.setState({pdfSource: response});
        console.log('Received PDF Response');
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({loading: false, pdfVisible: true});
  };

  render() {
    const {
      mobile,
      otp,
      step,
      beneficiary_reference_id,
      pdfVisible,
      pdfSource,
    } = this.state;

    /* const source = {
      uri: `blob:${pdfSource?._bodyBlob?._data.blobId}?offset=${pdfSource?._bodyBlob?._data.offset}&size=${pdfSource?._bodyBlob?._data.size}`,
    }; */

    const source = {
      uri: `${pdfSource?.url}`,
    };

    return (
      <>
        {!pdfVisible && (
          <View style={styles.screen}>
            <AppHeader
              title={'Download Vaccine Certificate'}
              type="certificate"
            />
            <Text style={styles.form.label}>Mobile Number</Text>
            <View style={styles.form.container}>
              <TextInput
                placeholder="9876543210"
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={10}
                style={styles.form.input}
                value={mobile}
                onChangeText={mobile => this.setState({mobile})}
              />
            </View>
            {step === 'otp' && (
              <>
                <Text style={styles.form.label}>OTP</Text>
                <View style={styles.form.container}>
                  <TextInput
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={6}
                    style={styles.form.input}
                    value={otp}
                    onChangeText={otp => this.setState({otp})}
                  />
                </View>
              </>
            )}
            {step === 'certificate' && (
              <>
                <Text style={styles.form.label}>Beneficiary Number</Text>
                <View style={styles.form.container}>
                  <TextInput
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    style={styles.form.input}
                    value={beneficiary_reference_id}
                    onChangeText={beneficiary_reference_id =>
                      this.setState({beneficiary_reference_id})
                    }
                  />
                </View>
              </>
            )}
            <View>
              <TouchableOpacity
                onPress={
                  step === 'mobile'
                    ? this.onSendOTP
                    : step === 'otp'
                    ? this.onConfirmOTP
                    : this.getCertificate
                }
                style={styles.form.button.container}>
                <Text style={styles.form.button.text}>
                  {step === 'mobile'
                    ? 'Get OTP'
                    : step === 'otp'
                    ? 'Verify OTP'
                    : 'Get Certificate'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {pdfVisible && (
          <View style={pdfStyles.container}>
            <Pdf
              source={source}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
              onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={pdfStyles.pdf}
            />
          </View>
        )}
      </>
    );
  }
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: Colors.Background.White,
    paddingHorizontal: '5%',
  },
  form: {
    label: {
      fontSize: 16,
      fontFamily: Hind.Medium,
      marginTop: 20,
    },
    container: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: Colors.Text.LightGrey,
      justifyContent: 'center',
    },
    input: {
      fontSize: 18,
      fontFamily: Hind.Medium,
      height: 60,
      width: 300,
      letterSpacing: 1,
      marginVertical: -5,
      paddingHorizontal: 15,
    },
    button: {
      container: {
        alignSelf: 'center',
        marginVertical: 20,
        paddingVertical: 7,
        width: '50%',
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

const pdfStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default CertificateScreen;
