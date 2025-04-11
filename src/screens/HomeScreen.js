import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const userTypes = ['student', 'teacher', 'parent'];

const HomeScreen = ({ navigation }) => {
  const [userType, setUserType] = useState('student');
  const [showDropdown, setShowDropdown] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
          <Text style={{ color: '#0D47A1', fontWeight: 'bold', marginRight: 10 }}>
            {userType.toUpperCase()}
          </Text>
          <TouchableOpacity onPress={() => setShowDropdown(true)}>
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: '#90CAF9',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ color: '#0D47A1', fontWeight: 'bold' }}>
                {userType === 'student' ? 'S' : userType === 'teacher' ? 'T' : 'P'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, userType]);

  return (
    <View style={styles.container}>

      {/* Dropdown Modal */}
      <Modal transparent={true} visible={showDropdown} animationType="fade">
        <TouchableOpacity style={styles.dropdownOverlay} onPress={() => setShowDropdown(false)}>
          <View style={styles.dropdown}>
            {userTypes.map((item) => (
              <TouchableOpacity key={item} style={styles.dropdownItem} onPress={() => {
                setUserType(item);
                setShowDropdown(false);
              }}>
                <Text>{item.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Text style={styles.title}>Welcome to Edutrack</Text>

      {userType === 'student' && (
        <>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TestResult')}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Test Result</Text>
              <Ionicons name="document-text-outline" size={30} color="#0D47A1" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.greenCard]}
            onPress={() => navigation.navigate('SubjectSelect', { testType: 'PreTest' })}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Pre Test</Text>
              <Ionicons name="list-outline" size={30} color="#2E7D32" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.greenCard]}
            onPress={() => navigation.navigate('SubjectSelect', { testType: 'PostTest' })}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Post Test</Text>
              <Ionicons name="create-outline" size={30} color="#2E7D32" />
            </View>
          </TouchableOpacity>
        </>
      )}

      {userType === 'teacher' && (
        <>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Dashboard')}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Dashboard</Text>
              <Ionicons name="bar-chart-outline" size={30} color="#0D47A1" />
            </View>
          </TouchableOpacity>

<<<<<<< HEAD
          {/* ปุ่ม Delete pre test */}
=======
>>>>>>> 036faf8a4f7885252d37661503202d2d089d2f51
          <TouchableOpacity
            style={[styles.card, styles.greenCard]}
            onPress={() => navigation.navigate('DeletePreTest', { testType: 'PreTest' })}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Delete Pre Test</Text>
              <Ionicons name="create-outline" size={30} color="#2E7D32" />
            </View>
          </TouchableOpacity>

<<<<<<< HEAD
          {/* ปุ่ม Delete post test */}
=======
>>>>>>> 036faf8a4f7885252d37661503202d2d089d2f51
          <TouchableOpacity
            style={[styles.card, styles.greenCard]}
            onPress={() => navigation.navigate('DeletePostTest', { testType: 'PostTest' })}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Delete Post Test</Text>
              <Ionicons name="create-outline" size={30} color="#2E7D32" />
            </View>
          </TouchableOpacity>
        </>
      )}

<<<<<<< HEAD

      {
        userType === 'parent' && (
          <>
            {/* ปุ่ม Parent Result */}
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ParentResult')}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Parent Result</Text>

                <Ionicons name="people-outline" size={30} color="#0D47A1" />
              </View>
            </TouchableOpacity>
          </>
        )
      }
    </View >
=======
      {userType === 'parent' && (
        <>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ParentResult')}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Parent Result</Text>
              <Ionicons name="people-outline" size={30} color="#0D47A1" />
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
>>>>>>> 036faf8a4f7885252d37661503202d2d089d2f51
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#C0E7FF',
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
  dropdownOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdown: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    width: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;