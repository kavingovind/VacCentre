import AsyncStorage from '@react-native-community/async-storage';

const authKey = '@App:Auth';

const isAuthenticated = async () => {
  const auth = JSON.parse(await AsyncStorage.getItem(authKey));
  if (!auth) {
    return false;
  } else if (!auth.token) {
    return false;
  } else if (
    !auth.expiryTimeStamp ||
    new Date(auth.expiryTimeStamp) < new Date()
  ) {
    return false;
  }
  return true;
};

const setAuth = async (auth) => {
  await AsyncStorage.setItem(authKey, JSON.stringify(auth));
};

const getAuth = async () => {
  const auth = await AsyncStorage.getItem(authKey);
  return JSON.parse(auth);
};

const clearAuth = async () => {
  await AsyncStorage.removeItem(authKey);
};

export {isAuthenticated, setAuth, getAuth, clearAuth};
