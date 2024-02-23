import { View, Text, SafeAreaView, Span } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card } from './card';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStores } from '@min-two/business-web';

import styles from '../sass/Admin.scss';
import { useNavigation } from '@react-navigation/native';

const AdminPortalScreen = () => {
  const [adminName, setAdminName] = useState('');
  const { featured, shops, restaurants, services } = useStores();
  console.log(featured, 'hhhh');

  useEffect(() => {
    const getUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          setAdminName(value);
        } else {
          navigation.navigate('Home');
        }
      } catch (error) {
        console.log('Error checking item: ', error);
      }
    };

    getUser();
  }, []);

  const [selectedCard, setSelectedCard] = useState('Total Business');
  const navigation = useNavigation();

  const handleCardPress = (cardTitle) => {
    setSelectedCard(cardTitle);
  };

  const removeUser = async () => {
    try {
      // Removing the item from AsyncStorage
      await AsyncStorage.removeItem('user');
      // Setting the state to indicate that item is removed
    } catch (error) {
      console.log('Error removing user: ', error);
    }
  };

  const handleAdminLogout = async () => {
    navigation.navigate('Home');
    removeUser();
  };

  return (
    <SafeAreaView style={styles.adminScreenAdjustment}>
      <ScrollView style={styles.adminContent}>
        <Text style={styles.helloHeader}>Hello {adminName}</Text>
        <Text style={styles.adminSubtext}>
          Manage all businesses within Nexa
        </Text>
        <View style={styles.cardHeaders}>
          <TouchableOpacity
            style={styles.cards}
            onPress={() => handleCardPress('Total Business')}
          >
            <Text style={styles.cardNumber}>70</Text>
            <View style={styles.cardName}>
              <Ionicons name='business-outline' size={21} color='black' />
              <Text style={styles.cardTitle}>Total Business</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cards}
            onPress={() => handleCardPress('Pending Business')}
          >
            <Text style={styles.cardNumber}>3</Text>
            <View style={styles.cardName}>
              <MaterialIcons name='pending-actions' size={21} color='black' />
              <Text style={styles.cardTitle}>Pending Business</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cards}
            onPress={() => handleCardPress('Verified Business')}
          >
            <Text style={styles.cardNumber}>1</Text>
            <View style={styles.cardName}>
              <Ionicons
                name='shield-checkmark-outline'
                size={21}
                color='black'
              />
              <Text style={styles.cardTitle}>Verified Business</Text>
            </View>
          </TouchableOpacity>
        </View>
        {selectedCard && (
          <View style={styles.selectedCardContent}>
            <Text style={styles.selectedCardTitle}>{selectedCard}</Text>
            <View style={styles.businessLayout}>
              <View style={styles.selectedBusinessCard}>
                <View style={styles.Business}>
                  <Text style={{ fontSize: 16, fontWeight: 600 }}>NuVegan</Text>
                  <View style={styles.verifiedMark}>
                    <Ionicons
                      name='shield-checkmark-sharp'
                      size={15}
                      color='#f2998d'
                      style={{ marginLeft: 5 }}
                    />
                    {/* <Text
                      style={{ color: "#f2998d", marginLeft: 1, fontSize: 13 }}
                    >
                      Verified
                    </Text> */}
                  </View>
                </View>
                <Text style={styles.selectedBusinessCardAddress}>
                  2928 Georgia Ave Washington,D.C
                </Text>

                <View style={styles.selectedBusinessOptions}>
                  <TouchableOpacity style={styles.removeBusinessButton}>
                    <Text style={styles.removeBusinessText}>
                      Remove Business
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.editBusinessText}>Edit Business</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.logOutButton} onPress={handleAdminLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export { AdminPortalScreen };
