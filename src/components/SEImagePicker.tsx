import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

interface SEImagePickerProps {
  imageUri: string | null;
  onImageChange: (uri: string | null) => void;
  style?: ViewStyle;
}

const SEImagePicker: React.FC<SEImagePickerProps> = ({
  imageUri,
  onImageChange,
  style,
}) => {
  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria para adicionar uma foto.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      onImageChange(result.assets[0].uri);
    }
  };


  const handleRemoveImage = () => {
    onImageChange(null);
  };

  return (
    <View style={[styles.container, style]}>
      {imageUri ? (

        <ImageBackground
          source={{ uri: imageUri }}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <TouchableOpacity style={styles.deleteButton} onPress={handleRemoveImage}>
            <Icon name="delete" size={24} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>
      ) : (

        <TouchableOpacity
          style={styles.placeholderContainer}
          onPress={handleSelectImage}
        >
          <Icon name="control-point" size={24} color="#757575" />
          <Text style={styles.placeholderText}>adicionar foto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    width: 312,
    height: 128,
    borderRadius: 8,
    overflow: 'hidden', 
  },

  placeholderContainer: {
    flex: 1,
    backgroundColor: '#f1f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#757575',
    marginTop: 8,
  },

  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start', 
    alignItems: 'flex-end',      
  },
  image: {
    borderRadius: 8,
  },

  deleteButton: {
    margin: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    padding: 4,
    borderRadius: 16,
  },
});

export default SEImagePicker;