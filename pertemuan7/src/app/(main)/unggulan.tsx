import { ScrollView, StyleSheet, Text } from 'react-native';
import { EmptyState, palette, ProductCard, Screen } from '../../components/StoreUI';
import { useApp } from '../../providers/AppProvider';

export default function FeaturedScreen() {
  const { products } = useApp();
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Favorit pelanggan</Text>
        <Text style={styles.description}>Produk pilihan yang paling sering dicari.</Text>
        {featuredProducts.length ? (
          featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <EmptyState
            icon="☆"
            title="Belum ada produk unggulan"
            detail="Produk unggulan akan tampil di halaman ini."
          />
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingTop: 20 },
  heading: { color: palette.ink, fontSize: 18, fontWeight: '800' },
  description: { color: palette.muted, fontSize: 13, marginTop: 6, marginBottom: 19 },
});
