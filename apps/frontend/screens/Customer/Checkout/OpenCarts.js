import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import styles from './sass/BasketScreen.scss';
import { useNavigation } from '@react-navigation/native';
import { CartRow } from './CartRow';
import {
  useRestaurantState,
  selectBasketItems,
  useBasketState,
  selectBasketTotal,
} from '@min-two/business-web';

const OpenCarts = () => {
  const navigation = useNavigation();
  const noCarts =
    'https://cdn.dribbble.com/users/295908/screenshots/2834564/media/805c806c3abfd012b6833e2cb290f47c.png?resize=800x600&vertical=center';
  const restaurant = useBasketState();
  console.log(restaurant, 'rr');

  return (
    <SafeAreaView style={styles.safeAreaViewParent}>
      <View style={styles.screenContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <ScrollView style={styles.scrollViewParent}>
          <Text style={styles.openCartsTitle}>Current Carts</Text>
          <View style={styles.cartsContainer}>{/* <CartRow /> */}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export { OpenCarts };
