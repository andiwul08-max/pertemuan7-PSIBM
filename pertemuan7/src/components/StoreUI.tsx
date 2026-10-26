import { PropsWithChildren, ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Product } from '../providers/AppProvider';

export const palette = {
  background: '#F7F7F3',
  card: '#FFFFFF',
  ink: '#202820',
  muted: '#858B82',
  green: '#315B46',
  greenLight: '#E7EFE8',
  line: '#E9EBE5',
  orange: '#D98D57',
};

export function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

export function Screen({ children }: PropsWithChildren) {
  return <View style={styles.screen}>{children}</View>;
}

export function SectionHeading({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={10}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Field({
  label,
  ...inputProps
}: TextInputProps & { label: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor="#A3A79F"
        style={styles.input}
        {...inputProps}
      />
    </View>
  );
}

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
    >
      <Text style={styles.primaryButtonText}>{title}</Text>
    </Pressable>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <View style={styles.productCard}>
      <View style={[styles.productIcon, { backgroundColor: product.color }]}>
        <Text style={styles.productEmoji}>{product.icon}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.productCategory}>{product.category}</Text>
        <Text style={styles.productPrice}>{formatRupiah(product.price)}</Text>
      </View>
      <Text style={styles.productStock}>{product.stock} stok</Text>
    </View>
  );
}

export function StatCard({
  label,
  value,
  icon,
  tone = 'green',
}: {
  label: string;
  value: string;
  icon: string;
  tone?: 'green' | 'orange';
}) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, tone === 'orange' && styles.orangeIcon]}>
        <Text style={[styles.statIconText, tone === 'orange' && styles.orangeText]}>
          {icon}
        </Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function EmptyState({
  icon,
  title,
  detail,
}: {
  icon: string;
  title: string;
  detail: string;
}) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>{icon}</Text>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDetail}>{detail}</Text>
    </View>
  );
}

export function Card({
  children,
  style,
}: PropsWithChildren<{ style?: object }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function LabeledValue({
  label,
  value,
  trailing,
}: {
  label: string;
  value: string;
  trailing?: ReactNode;
}) {
  return (
    <View style={styles.labeledValue}>
      <View>
        <Text style={styles.labeledLabel}>{label}</Text>
        <Text style={styles.labeledText}>{value}</Text>
      </View>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.background },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: { color: palette.ink, fontSize: 17, fontWeight: '700' },
  sectionAction: { color: palette.green, fontSize: 13, fontWeight: '700' },
  field: { gap: 8, marginBottom: 17 },
  fieldLabel: { color: palette.ink, fontSize: 13, fontWeight: '600' },
  input: {
    height: 52,
    backgroundColor: '#F9FAF7',
    borderColor: palette.line,
    borderWidth: 1,
    borderRadius: 14,
    color: palette.ink,
    fontSize: 14,
    paddingHorizontal: 15,
  },
  primaryButton: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.green,
    borderRadius: 15,
    paddingHorizontal: 18,
  },
  disabledButton: { opacity: 0.55 },
  pressedButton: { opacity: 0.85 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.card,
    borderRadius: 17,
    padding: 12,
    marginBottom: 11,
  },
  productIcon: {
    width: 58,
    height: 58,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: { fontSize: 27 },
  productInfo: { flex: 1, marginLeft: 12, marginRight: 7 },
  productName: { color: palette.ink, fontSize: 14, fontWeight: '700' },
  productCategory: { color: palette.muted, fontSize: 11, marginTop: 4 },
  productPrice: { color: palette.green, fontSize: 13, fontWeight: '700', marginTop: 7 },
  productStock: { color: palette.muted, fontSize: 10 },
  statCard: {
    flex: 1,
    minHeight: 122,
    backgroundColor: palette.card,
    borderRadius: 18,
    padding: 13,
  },
  statIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: palette.greenLight,
    marginBottom: 12,
  },
  orangeIcon: { backgroundColor: '#F9EDE2' },
  statIconText: { color: palette.green, fontSize: 16, fontWeight: '700' },
  orangeText: { color: palette.orange },
  statValue: { color: palette.ink, fontSize: 17, fontWeight: '800' },
  statLabel: { color: palette.muted, fontSize: 11, marginTop: 4 },
  emptyState: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 24 },
  emptyIcon: { fontSize: 36, marginBottom: 12 },
  emptyTitle: { color: palette.ink, fontSize: 16, fontWeight: '700' },
  emptyDetail: { color: palette.muted, fontSize: 13, textAlign: 'center', marginTop: 7 },
  card: { backgroundColor: palette.card, borderRadius: 18, padding: 17 },
  labeledValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomColor: palette.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  labeledLabel: { color: palette.muted, fontSize: 12, marginBottom: 5 },
  labeledText: { color: palette.ink, fontSize: 14, fontWeight: '600' },
});
