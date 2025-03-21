import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
          color="#007BFF"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Parent Result"
          onPress={() => navigation.navigate('ParentResult')}
          color="#007BFF"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Test Result"
          onPress={() => navigation.navigate('TestResult')}
          color="#007BFF"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Multiple Choices"
          onPress={() => navigation.navigate('Multiple')}
          color="#28A745"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Short Answer"
          onPress={() => navigation.navigate('Manual')}
          color="#28A745"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C0E7FF', // พื้นหลังสีฟ้าอ่อน
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: 200,
  },
});

export default HomeScreen;
