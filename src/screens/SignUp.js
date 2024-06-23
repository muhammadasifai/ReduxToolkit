import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import MyButton from '../components/MyButton';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/features/AuthSlice';

const SignUp = () => {
  // states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');

  // hooks
  const dispatch = useDispatch();
  const {userData, isLoading} = useSelector(state => state.auth);

  // functions
  const handlingSignUp = () => {
    const params = {
      firstName: firstName,
      lastName: lastName,
      username: email,
      password: password,
      number: number,
    };
    console.log('params:', params);
    dispatch(login(params));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <TextInput
        value={firstName}
        placeholder="Enter First Name"
        onChangeText={setFirstName}
        style={styles.input}
        placeholderTextColor="grey"
        autoCapitalize="none"
      />
      <TextInput
        value={lastName}
        placeholder="Enter Last Name"
        onChangeText={setLastName}
        style={styles.input}
        placeholderTextColor="grey"
        autoCapitalize="none"
      />
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
      <TextInput
        value={number}
        placeholder="Enter Number"
        onChangeText={setNumber}
        style={styles.input}
        placeholderTextColor="grey"
      />
      <MyButton isLoading={isLoading} title="SignUp" onPress={handlingSignUp} />
    </View>
  );
};

export default SignUp;

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
