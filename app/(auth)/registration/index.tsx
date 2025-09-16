// ExpoSampleApp/app/(auth)/registration/index.tsx
import { userSignIn } from '@/libs/redux/slices/authSlice/thunks';
import { useAppDispatch, useAppSelector } from '@/libs/redux/store/hooks';
import { signUp } from '@/libs/supabase';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './_styles';

export default function RegistrationScreen() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const isSignedIn = useAppSelector((state) => state.auth.isSignedIn);

    useEffect(() => {
        if (isSignedIn) {
            router.replace('/');
        }
    }, [isSignedIn]);

    const handleRegistration = async () => {
        if (!name || !email || !password || !confirmPassword) return;
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        setIsLoading(true);
        try {
          const { user, error } = await signUp({
            email: email,
            password: password,
            metadata: { name: name }
          });

          // Handle the response
          if (error) {
            // Show error message to user
            alert(`Registration failed: ${error.message}`);
            console.error('Registration error:', error);
            return;
          }

          if (user) {
            console.log('User registered successfully:', user);
            dispatch(userSignIn({ email, password }));
          }

        } catch (error) {
            console.error('Registration failed:', error);
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const navigateToLogin = () => {
        router.push("/(auth)/login");
    }

    const isFormValid = name && email && password && confirmPassword && password === confirmPassword;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Registration</Text>
            <Text style={styles.subtitle}>Create your account to get started</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput 
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput 
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput 
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput 
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {password && confirmPassword && password !== confirmPassword && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}

            <TouchableOpacity 
              style={[styles.button, (!isFormValid || isLoading) && styles.buttonDisabled]}
              onPress={handleRegistration}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>

          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}