import { router } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Card,
  LabeledValue,
  palette,
  PrimaryButton,
  Screen,
} from '../../components/StoreUI';
import { useApp } from '../../providers/AppProvider';

export default function ProfileScreen() {
  const { username, signOut } = useApp();

  function handleSignOut() {
    Alert.alert('Keluar dari akun?', 'Kamu perlu masuk kembali untuk membuka dashboard.', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: () => {
          signOut();
          router.replace('/');
        },
      },
    ]);
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(username || 'A').charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{username || 'Admin Toko'}</Text>
          <Text style={styles.role}>Pemilik Toko · KasirKu</Text>
        </View>

        <Card style={styles.details}>
          <LabeledValue label="Nama toko" value="Kedai Senja" />
          <LabeledValue label="Username" value={username || 'admin'} />
          <LabeledValue label="Paket akun" value="KasirKu Basic" />
          <LabeledValue label="Bergabung sejak" value="Oktober 2026" />
        </Card>
        <View style={styles.logout}>
          <PrimaryButton title="Keluar dari akun" onPress={handleSignOut} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingTop: 25, paddingBottom: 32 },
  profileHeader: { alignItems: 'center', marginBottom: 25 },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 28,
    backgroundColor: palette.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: palette.green, fontSize: 32, fontWeight: '800' },
  name: { color: palette.ink, fontSize: 18, fontWeight: '800' },
  role: { color: palette.muted, fontSize: 12, marginTop: 5 },
  details: { paddingHorizontal: 16 },
  logout: { marginTop: 21 },
});
