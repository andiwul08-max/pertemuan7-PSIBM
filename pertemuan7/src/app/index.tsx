import { useState } from 'react';
import { router } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Field, palette, PrimaryButton } from '../components/StoreUI';
import { useApp } from '../providers/AppProvider';

export default function LoginScreen() {
  const { signIn } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setError('Username dan password wajib diisi.');
      return;
    }
    signIn(username.trim());
    router.replace('/(main)');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.brandRow}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>K</Text>
            </View>
            <View>
              <Text style={styles.brandName}>kasirku</Text>
              <Text style={styles.brandTag}>SMART STORE MANAGER</Text>
            </View>
          </View>

          <View style={styles.welcome}>
            <Text style={styles.eyebrow}>SELAMAT DATANG</Text>
            <Text style={styles.title}>Kelola tokomu,{'\n'}lebih mudah.</Text>
            <Text style={styles.description}>
              Masuk untuk mulai mengelola produk dan penjualan tokomu hari ini.
            </Text>
          </View>

          <View style={styles.form}>
            <Field
              label="Username"
              placeholder="Masukkan username"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              value={username}
              onChangeText={(value) => {
                setUsername(value);
                setError('');
              }}
            />
            <Field
              label="Password"
              placeholder="Masukkan password"
              secureTextEntry
              returnKeyType="done"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError('');
              }}
              onSubmitEditing={handleLogin}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton title="Masuk ke Dashboard  →" onPress={handleLogin} />
            <Text style={styles.demoHint}>Demo: isi username dan password apa saja</Text>
          </View>
          <Text style={styles.footer}>Sederhana untukmu, hebat untuk bisnismu.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  content: { width: '100%', maxWidth: 480, alignSelf: 'center', padding: 27, paddingVertical: 34 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 52 },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: palette.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: '#FFFFFF', fontSize: 26, fontWeight: '800' },
  brandName: { color: palette.ink, fontSize: 18, fontWeight: '800', letterSpacing: 0.2 },
  brandTag: { color: palette.muted, fontSize: 8, fontWeight: '700', letterSpacing: 1.5, marginTop: 2 },
  welcome: { marginBottom: 28 },
  eyebrow: { color: palette.orange, fontSize: 10, fontWeight: '800', letterSpacing: 2, marginBottom: 13 },
  title: { color: palette.ink, fontSize: 34, fontWeight: '800', lineHeight: 41, letterSpacing: -0.8 },
  description: { color: palette.muted, fontSize: 14, lineHeight: 21, marginTop: 12, maxWidth: 320 },
  form: { marginTop: 5 },
  error: { color: '#B42318', fontSize: 12, marginTop: -7, marginBottom: 14 },
  demoHint: { color: palette.muted, fontSize: 11, textAlign: 'center', marginTop: 14 },
  footer: { color: palette.muted, fontSize: 11, textAlign: 'center', marginTop: 35 },
});
