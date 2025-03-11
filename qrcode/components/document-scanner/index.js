import React, { useState, useRef, useEffect } from 'react'; // Add useEffect
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { extractReferenceNo } from '../../utils/ocr';


const DocumentScanner = ({ onScanComplete  }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [facing, setFacing] = useState('back');
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }// Empty dependency array ensures this runs only once after mount

  const takePicture = async () => {
    console.log("cameraRef.current", cameraRef.current)
    // if (!cameraRef.current && !isScanning) {
        
      setIsScanning(true);
      
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      console.log("photo", photo)
      try {
        
        const referenceNo = await extractReferenceNo(photo.uri);
        
        if (referenceNo) {
          onScanComplete(referenceNo);
        } else {
          Alert.alert('Error', 'Reference No not found in the document.');
        }
      } catch (error) {
        Alert.alert('Error', 'OCR failed: ' + error.message);
      } finally {
        setIsScanning(false);
      }
    // }
  };

  if (hasPermission === null) {
    // return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }

  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      

      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <TouchableOpacity style={styles.captureButton} onPress={takePicture} disabled={isScanning}>
        <Text style={styles.captureButtonText}>{isScanning ? 'Scanning...' : 'Capture'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
  },
  captureButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 30,
    margin: 20,
    alignItems: 'center',
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DocumentScanner;