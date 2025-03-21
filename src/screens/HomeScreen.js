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

      {/* Action Buttons */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Dashboard')}>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>Dashboard</Text>
            <Text style={styles.cardDescription}>View Dashboard</Text>
          </View>
          <Ionicons name="bar-chart-outline" size={40} color="#0D47A1" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ParentResult')}>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>Parent Result</Text>
            <Text style={styles.cardDescription}>View as a Parent</Text>
          </View>
          <Ionicons name="people-outline" size={40} color="#0D47A1" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.greenCard]} onPress={() => navigation.navigate('Multiple')}>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>MultipleChoice Form</Text>
            <Text style={styles.cardDescription}>View Multiple Choice Form</Text>
          </View>
          <Ionicons name="document-text-outline" size={40} color="#2E7D32" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.greenCard]} onPress={() => navigation.navigate('Manual')}>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>Manual Scoring Form</Text>
            <Text style={styles.cardDescription}>View Manual Scoring Form</Text>
          </View>
          <Ionicons name="document-text-outline" size={40} color="#2E7D32" />
        </View>
      </TouchableOpacity>

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
