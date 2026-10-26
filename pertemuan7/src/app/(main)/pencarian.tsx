import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { EmptyState, palette, ProductCard, Screen } from '../../components/StoreUI';
import { useApp } from '../../providers/AppProvider';

export default function SearchScreen() {
  const { products } = useApp();
  const [query, setQuery] = useState('');
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        `${product.name} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [products, query],
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.searchBox}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Cari nama atau kategori produk"
            placeholderTextColor="#959B92"
            style={styles.searchInput}
            returnKeyType="search"
          />
          <Text style={styles.searchIcon}>⌕</Text>
        </View>
        {filteredProducts.length ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <EmptyState
            icon="⌕"
            title="Produk tidak ditemukan"
            detail="Coba kata kunci lain atau tambahkan produk baru."
          />
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingTop: 14 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 17,
  },
  searchInput: { flex: 1, height: 52, color: palette.ink, fontSize: 13 },
  searchIcon: { color: palette.green, fontSize: 24, fontWeight: '700' },
});
