import { Redirect } from 'expo-router';
import { useAppSelector } from '@/libs/redux/store/hooks';
import { useEffect } from 'react';

export default function Index() {
  
  const isSignedIn = useAppSelector(v => v.auth.isSignedIn);

  if (!isSignedIn) return <Redirect href="/(auth)/login" />;
  return <Redirect href="/(tabs)/home" />;
}