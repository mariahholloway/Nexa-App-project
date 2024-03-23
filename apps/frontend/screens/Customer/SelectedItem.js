import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import styles from './sass/BusinessProfile';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Currency from 'react-currency-formatter';
import {
  useRestaurantState,
  addToBasket,
  selectBasketItems,
  useBasketState,
  selectBasketTotal,
  removeFromBasket,
  useBasketDispatch,
} from '@min-two/business-web';
import Toast from 'react-native-toast-message';

const SelectedItem = ({ isVisible, item, onClose, setShowItemPopup }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const basketState = useBasketState();
  const dispatch = useBasketDispatch();

  const goodCartChange = () => {
    Toast.show({
      type: 'success',
      text1: 'Sucessfully Added',
      text2: 'Your cart has been updated',
      position: 'bottom',
      bottomOffset: 120,
    });
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {item && (
          <View style={styles.popUpContent}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
            <Image source={{ uri: item.image_url }} style={styles.itemImage} />
            <View style={styles.itemNameandPrice}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>
                <Currency quantity={item.price} currency='USD' />
              </Text>
            </View>
            <TouchableOpacity
              style={styles.itemFavorite}
              onPress={toggleFavorite}
            >
              <MaterialIcons
                name={isFavorite ? 'favorite' : 'favorite-outline'}
                size={15}
                color='#f2998d'
              />
              <Text style={styles.itemFavoriteWords}>Favorite (22) </Text>
            </TouchableOpacity>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                addToBasket(dispatch, item);
                setShowItemPopup(false);
                goodCartChange();
              }}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default SelectedItem;
