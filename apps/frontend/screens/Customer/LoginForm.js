import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLoginForm } from './hooks/LoginHook';

import styles from './sass/Customer.scss';

const LoginForm = () => {
  const { login, handleFormChange, loginFailed } = useLoginForm();

  return (
    <View>
      <View style={styles.loginFieldsContainer}>
        <View style={styles.fieldParent}>
          <Text style={styles.fieldHeader}>Email Address</Text>
          <TextInput
            style={
              !loginFailed ? styles.inputContainer : styles.inputContainerError
            }
            placeholder='customer@gmail.com'
            onChangeText={(newText) => handleFormChange('email', newText)}
          />
        </View>

        <View style={styles.fieldParent}>
          <Text style={styles.fieldHeader}>Password</Text>
          <TextInput
            style={
              !loginFailed ? styles.inputContainer : styles.inputContainerError
            }
            secureTextEntry
            onChangeText={(newText) => handleFormChange('password', newText)}
          />
        </View>
        {loginFailed && (
          <Text style={styles.errorLoginText}>
            Please check your login details and try again
          </Text>
        )}
      </View>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text styles={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBttn} onPress={login}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export { LoginForm };
