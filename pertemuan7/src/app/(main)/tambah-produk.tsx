import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { Field, palette, PrimaryButton, Screen } from '../../components/StoreUI';
import { useApp } from '../../providers/AppProvider';

export default function AddProductScreen() {
  const { addProduct } = useApp();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  function handleSave() {
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);
    if (!name.trim() || !category.trim() || !price.trim() || !stock.trim()) {
      setError('Semua kolom wajib diisi.');
      return;
    }
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0 || !Number.isInteger(parsedStock) || parsedStock < 0) {
      setError('Masukkan harga lebih dari 0 dan stok berupa angka 0 atau lebih.');
      return;
    }
    addProduct({
      name: name.trim(),
      category: category.trim(),
      price: parsedPrice,
      stock: parsedStock,
    });
    Alert.alert('Produk tersimpan', `${name.trim()} berhasil ditambahkan ke daftar produk.`);
    setName('');
    setCategory('');
    setPrice('');
    setStock('');
    setError('');
    router.push('/(main)/pencarian');
  }

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Lengkapi informasi produkmu.</Text>
        <Text style={styles.description}>
          Produk akan langsung muncul di katalog dan dapat dicari.
        </Text>
        <Field label="Nama produk" placeholder="Contoh: Kopi Susu" value={name} onChangeText={setName} />
        <Field label="Kategori" placeholder="Contoh: Minuman" value={category} onChangeText={setCategory} />
        <Field
          label="Harga jual (Rp)"
          placeholder="Contoh: 18000"
          keyboardType="number-pad"
          value={price}
          onChangeText={setPrice}
        />
        <Field
          label="Jumlah stok"
          placeholder="Contoh: 20"
          keyboardType="number-pad"
          value={stock}
          onChangeText={setStock}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton title="Simpan Produk" onPress={handleSave} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 19, paddingBottom: 32 },
  heading: { color: palette.ink, fontSize: 18, fontWeight: '800' },
  description: { color: palette.muted, fontSize: 13, lineHeight: 19, marginTop: 7, marginBottom: 23 },
  error: { color: '#B42318', fontSize: 12, marginBottom: 14, marginTop: -4 },
});
