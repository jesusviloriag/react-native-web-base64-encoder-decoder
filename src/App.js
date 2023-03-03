/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState }  from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Clipboard
} from 'react-native';

import {placeHolderImage} from './Images';

import {loadImage} from './ImageUtils';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [image, setImage] = useState(placeHolderImage);
  const [base64Image, setBase64Image] = useState("");
  const [base64field, setBase64Field] = useState("");

  const backgroundStyle = {
    backgroundColor: 'white',
  };

  const selectImage = () => {
    loadImage({ mediaType: 'photo', includeBase64: true }, imageSelected);
  }

  const imageSelected = (response) => {
    if (response && response.assets && response.assets.length > 0) {

      let prefix = "";
      if(!response.assets[0].base64.includes("data:image/")) {
        prefix = "data:image/jpg;base64,";
      }

      setImage(prefix + response.assets[0].base64);
      setBase64Image(response.assets[0].base64);
      setBase64Field(prefix + response.assets[0].base64.substring(0, 1000) + "...");
    }
  }

  const base64Pasted = (newText) => {
    if(newText) {
      let prefix = "";
      setBase64Field(newText);
      if(!base64field.includes("data:image/")) {
        prefix = "data:image/jpg;base64,";
      }
      setImage(newText + "");
    }
  }

  const copyImage = () => {
    Clipboard.setString(base64Image);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          padding: 15
        }}>
        <TouchableOpacity
          onPress={() => { selectImage() }}>
          <Image source={{uri:image}} style={{
            height: 300,
            width: '100%',
            resizeMode: 'contain',
            borderWidth: 2,
            borderColor: '#c7c7c7',
            backgroundColor: '#e9eef1',
            borderRadius: 10,
            marginBottom: 15
          }}/>
        </TouchableOpacity>
        <TextInput
          style={{
            height: 240, 
            width: '100%',
            borderWidth: 2,
            borderColor: '#c7c7c7',
            borderRadius: 10,
            marginBottom: 15,
            paddingVertical: 5,
            paddingHorizontal: 15,
            flexWrap: "wrap",
            overflow: "scroll"
          }}
          autoCorrect={false}
          numberOfLines={20}
          multiline={true}
          value={base64field}
          onChangeText={base64Pasted}
          placeholder="Upload image or paste here your Base64 code, my dude"
        />
        <TouchableOpacity 
            style={{ 
              height: 30, 
              width: '100%', 
              backgroundColor: '#2d3963', 
              borderRadius: 10,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => { copyImage() }}>
              <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold'}}>COPY TO CLIPBOARD</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
