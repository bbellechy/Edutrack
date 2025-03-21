import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Edutrack</Text>
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
    backgroundColor: '#E3F2FD',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  card: {
    backgroundColor: '#90CAF9',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  greenCard: {
    backgroundColor: '#66BB6A',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  cardDescription: {
    fontSize: 14,
    color: '#546E7A',
  },
});

export default HomeScreen;
