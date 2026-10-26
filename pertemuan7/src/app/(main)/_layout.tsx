import { createElement } from 'react';
import { Drawer } from 'expo-router/drawer';
import { Text, type ColorValue } from 'react-native';
import { palette } from '../../components/StoreUI';

function menuIcon(glyph: string) {
  return function MenuIcon({ color, size }: { color: ColorValue; size: number }) {
    return createElement(
      Text,
      { style: { color: color ?? palette.ink, fontSize: size - 1, fontWeight: '700', width: 24 } },
      glyph,
    );
  };
}

export default function MainLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: palette.ink,
        headerTitleStyle: { fontSize: 16, fontWeight: '700' },
        headerShadowVisible: false,
        drawerActiveTintColor: palette.green,
        drawerActiveBackgroundColor: palette.greenLight,
        drawerInactiveTintColor: '#737A72',
        drawerLabelStyle: { fontSize: 14, fontWeight: '600', marginLeft: -12 },
        drawerItemStyle: { borderRadius: 12, marginHorizontal: 12, marginVertical: 3 },
        drawerType: 'front',
        overlayColor: 'rgba(22, 35, 26, 0.28)',
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ title: 'KasirKu', drawerLabel: 'Home', drawerIcon: menuIcon('⌂') }}
      />
      <Drawer.Screen
        name="pencarian"
        options={{ title: 'Pencarian', drawerLabel: 'Pencarian', drawerIcon: menuIcon('⌕') }}
      />
      <Drawer.Screen
        name="tambah-produk"
        options={{ title: 'Tambah Produk', drawerLabel: 'Tambah Produk', drawerIcon: menuIcon('+') }}
      />
      <Drawer.Screen
        name="unggulan"
        options={{ title: 'Produk Unggulan', drawerLabel: 'Produk Unggulan', drawerIcon: menuIcon('★') }}
      />
      <Drawer.Screen
        name="profile"
        options={{ title: 'Profile', drawerLabel: 'Profile', drawerIcon: menuIcon('◉') }}
      />
    </Drawer>
  );
}
