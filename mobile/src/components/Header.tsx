import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title: string;
    showCancel?: boolean;
}

export default function Header({ title, showCancel = true }: HeaderProps) {
    const navigation = useNavigation();

    function goBackToOrpanagesMap() {
        navigation.navigate('OrphanagesMap');
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15B6D6" />
            </BorderlessButton>
            
            <Text style={styles.title}>{ title }</Text>
            
            {
                showCancel ? (
                    <BorderlessButton onPress={goBackToOrpanagesMap}>
                        <Feather name="x" size={24} color="#FF669D" />
                    </BorderlessButton>
                ) : (
                    <View />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#F9FAF5',
        borderBottomWidth: 1,
        borderColor: '#DDE3FB',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        color: '#8FA7B3'
    }
})