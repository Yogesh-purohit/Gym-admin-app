import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from './index';

export default {
    title: 'Theme/Tokens',
    decorators: [
        (Story) => (
            <View style={{ flex: 1, padding: 16 }}>
                <Story />
            </View>
        ),
    ],
};

const Section = ({ title, children }) => {
    const { colors, typography, spacing } = useTheme();
    return (
        <View style={{ marginBottom: spacing.xl }}>
            <Text style={{
                fontSize: typography.size.l,
                fontWeight: 'bold',
                marginBottom: spacing.m,
                color: colors.text.secondary
            }}>
                {title}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.m }}>
                {children}
            </View>
        </View>
    );
};

const ColorSwatch = ({ name, color }) => {
    const { colors, typography, radii, spacing, shadows } = useTheme();
    return (
        <View style={{ marginBottom: spacing.m, marginRight: spacing.m }}>
            <View style={[{
                width: 80,
                height: 80,
                backgroundColor: color,
                borderRadius: radii.m,
                marginBottom: spacing.s,
                borderWidth: 1,
                borderColor: colors.border.default
            }, shadows.sm]} />
            <Text style={{ fontSize: typography.size.xs, color: colors.text.secondary }}>{name}</Text>
            <Text style={{ fontSize: typography.size.xs, color: colors.text.tertiary }}>{color}</Text>
        </View>
    );
};

export const Colors = () => {
    const { colors } = useTheme();

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
            <Section title="Background">
                {Object.entries(colors.background).map(([key, value]) => (
                    <ColorSwatch key={key} name={key} color={value} />
                ))}
            </Section>
            <Section title="Text">
                {Object.entries(colors.text).map(([key, value]) => (
                    <ColorSwatch key={key} name={key} color={value} />
                ))}
            </Section>
            <Section title="Action">
                {Object.entries(colors.action).map(([key, value]) => (
                    <ColorSwatch key={key} name={key} color={value} />
                ))}
            </Section>
            <Section title="Status">
                {Object.entries(colors.status).filter(([_, v]) => typeof v === 'string').map(([key, value]) => (
                    <ColorSwatch key={key} name={key} color={value} />
                ))}
            </Section>
            <Section title="Border">
                {Object.entries(colors.border).map(([key, value]) => (
                    <ColorSwatch key={key} name={key} color={value} />
                ))}
            </Section>
        </ScrollView>
    );
};

export const Spacing = () => {
    const { spacing, colors } = useTheme();
    return (
        <ScrollView>
            {Object.entries(spacing).map(([key, value]) => (
                <View key={key} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ width: 50, color: colors.text.primary }}>{key}</Text>
                    <View style={{ width: value, height: 20, backgroundColor: colors.action.primary }} />
                    <Text style={{ marginLeft: 8, color: colors.text.secondary }}>{value}px</Text>
                </View>
            ))}
        </ScrollView>
    );
};

export const Typography = () => {
    const { typography, colors } = useTheme();
    return (
        <ScrollView>
            <Section title="Font Sizes">
                {Object.entries(typography.size).map(([key, value]) => (
                    <Text key={key} style={{ fontSize: value, color: colors.text.primary, marginBottom: 8 }}>
                        {key}: The quick brown fox ({value}px)
                    </Text>
                ))}
            </Section>
            <Section title="Weights">
                <Text style={{ fontWeight: typography.weight.regular, fontSize: 16, color: colors.text.primary, marginBottom: 8 }}>Regular (400)</Text>
                <Text style={{ fontWeight: typography.weight.medium, fontSize: 16, color: colors.text.primary, marginBottom: 8 }}>Medium (500)</Text>
                <Text style={{ fontWeight: typography.weight.bold, fontSize: 16, color: colors.text.primary, marginBottom: 8 }}>Bold (700)</Text>
            </Section>
        </ScrollView>
    );
};
