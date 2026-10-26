import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Card,
  palette,
  ProductCard,
  Screen,
  SectionHeading,
  StatCard,
} from '../../components/StoreUI';
import { useApp } from '../../providers/AppProvider';

export default function HomeScreen() {
  const { username, products } = useApp();
  const recentProducts = products.slice(0, 3);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>Halo, {username || 'Admin'} 👋</Text>
        <Text style={styles.subtitle}>Semoga tokomu ramai hari ini.</Text>

        <Card style={styles.salesCard}>
          <View style={styles.salesTop}>
            <View>
              <Text style={styles.salesLabel}>Total penjualan hari ini</Text>
              <Text style={styles.salesValue}>Rp 2.450.000</Text>
            </View>
            <View style={styles.salesBadge}>
              <Text style={styles.salesBadgeText}>↗ 12,8%</Text>
            </View>
          </View>
          <View style={styles.chart}>
            {[34, 52, 41, 74, 56, 88, 64, 100, 72, 90, 58, 80].map((height, index) => (
              <View key={index} style={styles.barTrack}>
                <View
                  style={[
                    styles.bar,
                    { height: `${height}%` },
                    index === 7 && styles.activeBar,
                  ]}
                />
              </View>
            ))}
          </View>
          <View style={styles.chartLabels}>
            <Text style={styles.chartLabel}>08.00</Text>
            <Text style={styles.chartLabel}>12.00</Text>
            <Text style={styles.chartLabel}>16.00</Text>
            <Text style={styles.chartLabel}>20.00</Text>
          </View>
        </Card>

        <View style={styles.stats}>
          <StatCard label="Transaksi" value="125" icon="▣" />
          <StatCard label="Produk aktif" value={String(products.length)} icon="◈" tone="orange" />
          <StatCard label="Perlu restok" value="3" icon="!" />
        </View>

        <SectionHeading
          title="Produk terbaru"
          action="Lihat semua"
          onAction={() => router.push('/(main)/pencarian')}
        />
        {recentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 32 },
  greeting: { color: palette.ink, fontSize: 22, fontWeight: '800', letterSpacing: -0.3 },
  subtitle: { color: palette.muted, fontSize: 13, marginTop: 6, marginBottom: 19 },
  salesCard: { backgroundColor: palette.green, marginBottom: 15, padding: 18 },
  salesTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  salesLabel: { color: '#D8E4DA', fontSize: 12 },
  salesValue: { color: '#FFFFFF', fontSize: 25, fontWeight: '800', marginTop: 7 },
  salesBadge: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 9, paddingHorizontal: 9, paddingVertical: 6 },
  salesBadgeText: { color: '#E5F0E7', fontSize: 10, fontWeight: '700' },
  chart: { height: 70, flexDirection: 'row', alignItems: 'flex-end', gap: 7, marginTop: 20 },
  barTrack: { flex: 1, height: '100%', justifyContent: 'flex-end' },
  bar: { width: '100%', minHeight: 9, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.28)' },
  activeBar: { backgroundColor: '#E6B785' },
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  chartLabel: { color: '#D8E4DA', fontSize: 9 },
  stats: { flexDirection: 'row', gap: 10, marginBottom: 25 },
});
