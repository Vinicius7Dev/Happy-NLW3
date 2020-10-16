import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../services/api';

import mapMarker from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';

interface OrpanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanageMap() {
    const navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<OrpanageProps[]>([]);

    useFocusEffect(() => {
      api.get('/orphanages').then(
        response => setOrphanages(response.data)
      ).catch(
        error => console.log(error)
      );
    });

    function handleNavigateOrphanageDetails(id: number) {
      navigation.navigate('OrphanageDetails', { id });
    }

    function handleNavigateCreateOrphanage() {
      navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                latitude: -20.5269245,
                longitude: -47.3795325,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
                }}
            >
                {
                  orphanages.map(orphanage => (
                    <Marker
                      key={orphanage.id}
                      icon={mapMarker}
                      calloutAnchor={{
                          x: 2.7,
                          y: 0.8
                      }}
                      coordinate={{
                          latitude: orphanage.latitude,
                          longitude: orphanage.longitude
                      }}
                    >
                      <Callout tooltip onPress={() => handleNavigateOrphanageDetails(orphanage.id)}>
                          <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>{ orphanage.name }</Text>
                          </View>
                      </Callout>
                    </Marker>
                  ))
                }
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{ orphanages.length } orfanatos encontrados</Text>

                <RectButton style={styles.createOrphanageButton} onPress={handleNavigateCreateOrphanage}>
                  <Feather name="plus" size={20} color="#FFFFFF" />
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
      elevation: 3
    },
  
    calloutText: {
      color: '#0089A5',
      fontFamily: 'Nunito_700Bold',
      fontSize: 14
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
      elevation: 3,
      
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
  
    footerText: {
      color: '#8FA7B3',
      fontFamily: 'Nunito_700Bold'
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15C3D6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  