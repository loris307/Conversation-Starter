
import React, { useState } from 'react';
import { Button, StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { chunk } from 'lodash';
import { SearchBar } from 'react-native-elements';

import ConversationStarter from './src';
import Menu from './public/menu';


const icons = [
  'rocket',
  'star',
  'heart',
  'bell',
  'camera',
  'music',
  'cog',
  'home',
  'shopping-cart',
  'user',
  'film',
  'search',
  'map-marker',
  'envelope',
  'comment',
  'book',
  'rocket',
  'star',
  'heart',
  'bell',
  'camera',
  'music',
  'cog',
  'home',
  'shopping-cart',
  'user',
  'film',
  'search',
  'map-marker',
  'envelope',
  'comment',
  'book',
  'globe',
  'pencil',
  'calendar',
  'hourglass',
  'gift',
  'cutlery',
  'suitcase',
  'diamond',
  'headphones',
  'umbrella',
  'phone',
  'cloud',
  'desktop',
  'car',
  'battery-full',
  'wifi',
  'wrench',
  'sun-o',
  'moon-o',
  'medkit',
  'coffee',
  'smile-o',
  'frown-o',
  'meh-o',
  'thumbs-up',
  'thumbs-down',
  'hand-peace-o',
  'hand-rock-o',
  'hand-scissors-o',
];

const menuItems = [
  { label: 'ScollView', onPress: () => navigation.navigate('ScollView') },
  { label: 'ConversationStarter', onPress: () => navigation.navigate('ConversationStarter') },
  { label: 'HomeScreen', onPress: () => navigation.navigate('HomeScreen') },
];


function IconWrapper({icon, navigation}) {
  return (
    //I want to give the icon which is pressed to be the parameter for the navigation.navigate
    //I tried to do it like this but it doesn't work
    //I want to pass the icon name to the ConversationStarter.js
    //I tried to do it like this but it doesn't work
    
    <TouchableOpacity onPress={() => navigation.navigate('ConversationStarter', {selectedIcon: icon})}>

      <View style={styles.iconContainer}>
        <Icon name={icon} style={styles.iconstyle} color="#900" />
      </View>

    </TouchableOpacity>
  );
}

function ScollView({ navigation }) {
  const iconRows = chunk(icons, 3); // split icons into rows of 3
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIcons, setFilteredIcons] = useState(icons);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredIcons = icons.filter((icon) =>
      icon.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredIcons(filteredIcons);
  };
//hello
  return (
    <ScrollView style={styles.homebackground}>
      <SearchBar
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      {chunk(filteredIcons, 3).map((row, rowIndex) => (
        <View key={rowIndex} style={styles.iconRow}>
          {row.map((icon, iconIndex) => (
            <IconWrapper
              key={iconIndex}
              navigation={navigation}
              icon={icon}
            />
          ))}
        </View>
      ))}
      <Menu menuItems={menuItems} navigation={navigation} />
    </ScrollView>
  );
}

function IconView({ navigation }){
  return(
    <View homebackground >
      <Text style={styles.textStyle} > JOOOO WASSUP </Text>
      <Button
      title="Back Home"
      onPress={()=> navigation.navigate('HomeScreen')}
      ></Button>
      <Menu menuItems={menuItems} navigation={navigation} />
    </View>
  )
}


function HomeScreen({ navigation }) {
  return (
    <View style={styles.homebackground}>
      
      <Menu menuItems={menuItems} navigation={navigation} />
    
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="IconView" component={IconView} />
        <Stack.Screen name="ScollView" component={ScollView} />
        <Stack.Screen name="ConversationStarter" component={ConversationStarter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homebackground:{
    backgroundColor: 'blue',
    flex: 1,
  },
  iconstyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    fontSize:60,
    color: '#fff'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom: 10,
    width: 100, // adjust the size of the icon container here
    height: 100,  
    
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  ViewStyle:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle:{
    fontSize: 50,
    fontWeight: 800,
  },
  searchBar: {
    backgroundColor: 'white',
    borderWidth: 0, // Remove the border
    borderTopWidth: 0, // Remove the top border
    borderBottomWidth: 0, // Remove the bottom border
  },
  inputContainer: {
    backgroundColor: '#e0e0e0',
  },
  input: {
    fontSize: 16,
  },
});


