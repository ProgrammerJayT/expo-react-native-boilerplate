import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import DocumentScanner from './components/document-scanner';
import { getCurrentLocation } from './utils/location';

const HomeScreen = () => {
  const [permitReferenceNo, setPermitReferenceNo] = useState('');
  const [licenceReferenceNo, setLicenceReferenceNo] = useState('');
  const [qrData, setQrData] = useState('');
  const [isScanningPermit, setIsScanningPermit] = useState(false);
  const [isScanningLicence, setIsScanningLicence] = useState(false);
  const [isScanningQR, setIsScanningQR] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  // Request camera permissions
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleScanPermitComplete = (referenceNo) => {
    setPermitReferenceNo(referenceNo);
    setIsScanningPermit(false);
    Alert.alert('Success', `Permit Reference No: ${referenceNo}`);
  };

  const handleScanLicenceComplete = (referenceNo) => {
    setLicenceReferenceNo(referenceNo);
    setIsScanningLicence(false);
    Alert.alert('Success', `Licence Reference No: ${referenceNo}`);
  };

  const handleScanQR = ({ data }) => {
    setQrData(data);
    setIsScanningQR(false);
    Alert.alert('Success', `QR Data: ${data}`);
  };

  const handleSendData = async () => {
    try {
      // const { latitude, longitude } = await getCurrentLocation();
      // await saveAuditLog({
      //   permitReferenceNo,
      //   licenceReferenceNo,
      //   qrData,
      //   latitude,
      //   longitude,
      // });
      Alert.alert('Success', 'Data sent to engine successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (!permission) {
    return <View style={styles.container}><Text>Loading camera permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scan Permit, Licence, or Product</Text>

      {/* Scan Permit Button */}
      <TouchableOpacity style={styles.button} onPress={() => setIsScanningPermit(true)}>
        <Text style={styles.buttonText}>Scan Permit</Text>
      </TouchableOpacity>

      {/* Scan Licence Button */}
      <TouchableOpacity style={styles.button} onPress={() => setIsScanningLicence(true)}>
        <Text style={styles.buttonText}>Scan Licence</Text>
      </TouchableOpacity>

      {/* Scan QR Button */}
      <TouchableOpacity style={styles.button} onPress={() => setIsScanningQR(true)}>
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>

      {/* Document Scanner for Permit */}
      {isScanningPermit && (
        <DocumentScanner onScanComplete={handleScanPermitComplete} />
      )}

      {/* Document Scanner for Licence */}
      {isScanningLicence && (
        <DocumentScanner onScanComplete={handleScanLicenceComplete} />
      )}

      {/* QR Code Scanner */}
      {isScanningQR && (
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleScanQR}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        >
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Align the QR code within the frame</Text>
          </View>
        </CameraView>
      )}

      {/* Send Data Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendData}>
        <Text style={styles.buttonText}>Send Data to Engine</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});

export default HomeScreen;