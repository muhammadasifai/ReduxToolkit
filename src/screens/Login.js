import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyButton from '../components/MyButton';
import {useDispatch, useSelector} from 'react-redux';
import {login, resetErrorMessage} from '../redux/features/AuthSlice';

const Login = () => {
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // hooks
  const dispatch = useDispatch();
  const {userData, isLoading, errorMessage} = useSelector(state => state.auth);
  console.debug('🟢 ~ Login ~ errorMessage:', errorMessage);

  // functions
  const handlingLogin = () => {
    const params = {
      email: 'muhammad@gmail.com',
      password: '12345678',
    };
    console.log('params:', params);
    if (errorMessage) {
      dispatch(resetErrorMessage());
    }
    dispatch(login(params));
  };

  useEffect(() => {
    if (errorMessage) {
      Alert.alert(errorMessage);
    }
  }, [errorMessage]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.title}>Error: {errorMessage}</Text>
      <TextInput
        value={email}
        placeholder="Enter Email"
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="grey"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        placeholder="Enter Password"
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="grey"
      />
      <MyButton isLoading={isLoading} title="Login" onPress={handlingLogin} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingTop: 150,
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'coral',
    paddingHorizontal: 20,
  },
});
