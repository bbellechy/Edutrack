import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Edutrack</Text>

      {/* ปุ่ม Dashboard */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Dashboard')}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Dashboard</Text>

          <Ionicons name="bar-chart-outline" size={30} color="#0D47A1" />
        </View>
      </TouchableOpacity>

      {/* ปุ่ม Parent Result */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ParentResult')}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Parent Result</Text>

          <Ionicons name="people-outline" size={30} color="#0D47A1" />
        </View>
      </TouchableOpacity>

      {/* ปุ่ม Test Result */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TestResult')}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Test Result</Text>

          <Ionicons name="document-text-outline" size={30} color="#0D47A1" />
        </View>
      </TouchableOpacity>

      {/* ปุ่ม Multiple Choices (สีเขียว) */}
      <TouchableOpacity style={[styles.card, styles.greenCard]} onPress={() => navigation.navigate('Multiple')}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Multiple Choices</Text>

          <Ionicons name="list-outline" size={30} color="#2E7D32" />
        </View>
      </TouchableOpacity>

      {/* ปุ่ม Short Answer (สีเขียว) */}
      <TouchableOpacity style={[styles.card, styles.greenCard]} onPress={() => navigation.navigate('Manual')}>
        <View style={styles.cardContent}>

          <Ionicons name="create-outline" size={30} color="#2E7D32" />
        </View>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C0E7FF', // พื้นหลังสีฟ้าอ่อน
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0D47A1',
  },
  card: {
    backgroundColor: '#90CAF9',
    padding: 15,
    borderRadius: 10,
    width: 250,
    marginVertical: 10,
    alignItems: 'center',
  },
  greenCard: {
    backgroundColor: '#66BB6A',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
});

export default HomeScreen;
