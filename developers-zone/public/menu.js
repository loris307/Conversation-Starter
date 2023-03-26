import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Menu = ({ menuItems, navigation }) => {
    return (
      <View style={styles.menuContainer}>
        {menuItems.map((menuItem, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(menuItem.label)}
          >
            <Feather name={menuItem.iconName} size={24} color="black" />
            <Text style={styles.menuItemText}>{menuItem.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  
  const styles = StyleSheet.create({
    menuContainer: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      //position: 'absolute',
      //top: '150%',
      left: 0,
      right: 0,
      height: 80,
      paddingHorizontal: 32,
    },
    menuItem: {
      alignItems: 'center',
    },
    menuItemText: {
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 4,
      marginRight: 10,
    },
  });
  
  export default Menu;