import { signOut } from "@/libs/redux/slices/authSlice/thunks";
import { useAppDispatch, useAppSelector } from "@/libs/redux/store/hooks";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SettingsScreen() {

    const dispatch = useAppDispatch()
    const auth = useAppSelector((state) => state.auth);

    const handleSignOut =()=> {
        dispatch(signOut())
    }

    useEffect(() => {
        if (!auth.isSignedIn) {
            router.replace('/(auth)/login');
        }
    }, [auth.isSignedIn]);

    return (
        <View style={styles.container}>
            {auth.user && (
                <>
                    <Text>{auth.user.name}</Text>
                    <Text>{auth.user.email}</Text>
                </>
            )}
            <TouchableOpacity onPress={handleSignOut}>
                <Text style={styles.title}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
