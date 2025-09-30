import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  ViewStyle,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

interface SEImagePickerProps {
  imageUris: string[];
  onImagesChange: (uris: string[]) => void;
  style?: ViewStyle;
  maxImages?: number;
}

const SEImagePicker: React.FC<SEImagePickerProps> = ({
  imageUris,
  onImagesChange,
  style,
  maxImages = 5,
}) => {
  const handleSelectImages = async () => {
    if (imageUris.length >= maxImages) {
      Alert.alert("Limite atingido", `Você só pode adicionar até ${maxImages} fotos.`);
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria para adicionar fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: maxImages - imageUris.length,
    });

    if (!result.canceled && result.assets) {
      const newUris = result.assets.map(asset => asset.uri);
      onImagesChange([...imageUris, ...newUris]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newUris = imageUris.filter((_, i) => i !== index);
    onImagesChange(newUris);
  };

  const handleRemoveAllImages = () => {
    Alert.alert(
      "Remover todas as fotos",
      "Tem certeza que deseja remover todas as fotos?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Remover",
          onPress: () => onImagesChange([]),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* Header com contador e botão de remover todas */}
      <View style={styles.header}>
        <Text style={styles.counterText}>
          Fotos ({imageUris.length}/{maxImages})
        </Text>
        {imageUris.length > 0 && (
          <TouchableOpacity onPress={handleRemoveAllImages}>
            <Text style={styles.removeAllText}>Remover todas</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Container principal */}
      <View style={styles.mainContainer}>
        {/* Botão para adicionar fotos - sempre visível */}
        <TouchableOpacity
          style={[
            styles.placeholderContainer,
            imageUris.length > 0 && styles.placeholderWithImages
          ]}
          onPress={handleSelectImages}
        >
          <Icon 
            name="control-point" 
            size={24} 
            color={imageUris.length > 0 ? "#88C9BF" : "#757575"} 
          />
          <Text style={[
            styles.placeholderText,
            imageUris.length > 0 && styles.placeholderTextWithImages
          ]}>
            {imageUris.length === 0 ? 'adicionar foto' : 'adicionar mais fotos'}
          </Text>
        </TouchableOpacity>

        {imageUris.length > 0 && (
          <ScrollView 
            horizontal 
            style={styles.imagesScrollView}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imagesContainer}
          >
            {imageUris.map((uri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <ImageBackground
                  source={{ uri }}
                  style={styles.imageBackground}
                  imageStyle={styles.image}
                >
                  <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => handleRemoveImage(index)}
                  >
                    <Icon name="close" size={18} color="#fff" />
                  </TouchableOpacity>
                </ImageBackground>
                <Text style={styles.imageNumber}>{index + 1}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Mensagem de instrução quando não há imagens */}
      {imageUris.length === 0 && (
        <Text style={styles.instructionText}>
          Toque para adicionar fotos do animal
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 128,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  counterText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#434343',
  },
  removeAllText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#FF6B6B',
    textDecorationLine: 'underline',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  placeholderContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#f1f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  placeholderWithImages: {
    backgroundColor: '#fff',
    borderColor: '#88C9BF',
  },
  placeholderText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#757575',
    marginTop: 6,
    textAlign: 'center',
  },
  placeholderTextWithImages: {
    color: '#88C9BF',
    fontSize: 10,
  },
  imagesScrollView: {
    flex: 1,
    maxHeight: 100,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
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
    margin: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 4,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageNumber: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'Roboto-Medium',
  },
  instructionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#bdbdbd',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default SEImagePicker;