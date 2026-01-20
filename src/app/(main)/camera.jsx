import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [facing, setFacing] = useState('back');
    const router = useRouter();
    const { colors, spacing } = useTheme();
    const insets = useSafeAreaInsets();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background.primary, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: colors.text.primary, marginBottom: spacing.m }}>Camera access is required</Text>
                <TouchableOpacity onPress={requestPermission} style={{ padding: spacing.m, backgroundColor: colors.action.primary, borderRadius: 8 }}>
                    <Text style={{ color: colors.text.inverse }}>Grant Permission</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.back()} style={{ marginTop: spacing.l }}>
                    <Text style={{ color: colors.text.link }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePhoto = async () => {
        if (!cameraRef.current) return;
        try {
            const photo = await cameraRef.current.takePictureAsync();
            console.log('Photo taken:', photo.uri);
            // In a real app, you would pass this URI back to the previous screen or save it
            router.back();
        } catch (e) {
            console.error(e);
        }
    };

    const toggleFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={[styles.controlsContainer, { paddingBottom: insets.bottom + 20 }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
                        <View style={styles.captureInner} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleFacing} style={styles.iconButton}>
                        <Ionicons name="camera-reverse" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
    },
    controlsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingTop: 20,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    iconButton: {
        padding: 10,
    }
});
