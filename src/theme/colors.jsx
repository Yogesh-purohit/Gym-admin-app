export const palette = {
    // Primitives
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',

    // Grays (Slate)
    gray50: '#F8FAFC',
    gray100: '#F1F5F9',
    gray200: '#E2E8F0',
    gray300: '#CBD5E1',
    gray400: '#94A3B8',
    gray500: '#64748B',
    gray600: '#475569',
    gray700: '#334155',
    gray800: '#1E293B',
    gray900: '#0F172A',

    // Brand (Indigo)
    primary50: '#EEF2FF',
    primary100: '#E0E7FF',
    primary200: '#C7D2FE',
    primary300: '#A5B4FC',
    primary400: '#818CF8',
    primary500: '#6366F1',
    primary600: '#4F46E5',
    primary700: '#4338CA',
    primary800: '#3730A3',
    primary900: '#312E81',

    // Semantics
    success: '#10B981', // Emerald 500
    warning: '#F59E0B', // Amber 500
    error: '#EF4444',   // Red 500
    info: '#3B82F6',    // Blue 500
};

export const lightTheme = {
    background: {
        primary: palette.gray50,
        secondary: palette.white,
        tertiary: palette.gray100,
        modal: palette.white,
    },
    text: {
        primary: palette.gray900,
        secondary: palette.gray500,
        tertiary: palette.gray400,
        inverse: palette.white,
        link: palette.primary600,
    },
    border: {
        default: palette.gray200,
        focused: palette.primary500,
        subtle: palette.gray100,
    },
    action: {
        primary: palette.primary600,
        primaryPressed: palette.primary700,
        secondary: palette.white,
        secondaryPressed: palette.gray50,
        disabled: palette.gray300,
    },
    status: {
        success: palette.success,
        warning: palette.warning,
        error: palette.error,
        info: palette.info,
        successBg: '#ECFDF5',
        warningBg: '#FFFBEB',
        errorBg: '#FEF2F2',
        infoBg: '#EFF6FF',
    },
};

export const darkTheme = {
    background: {
        primary: palette.gray900,
        secondary: palette.gray800,
        tertiary: palette.gray700,
        modal: palette.gray800,
    },
    text: {
        primary: palette.gray50,
        secondary: palette.gray400,
        tertiary: palette.gray600,
        inverse: palette.white,
        link: palette.primary400,
    },
    border: {
        default: palette.gray700,
        focused: palette.primary400,
        subtle: palette.gray800,
    },
    action: {
        primary: palette.primary500,
        primaryPressed: palette.primary600,
        secondary: palette.gray800,
        secondaryPressed: palette.gray700,
        disabled: palette.gray600,
    },
    status: {
        success: palette.success,
        warning: palette.warning,
        error: palette.error,
        info: palette.info,
        successBg: '#064E3B',
        warningBg: '#78350F',
        errorBg: '#7F1D1D',
        infoBg: '#1E3A8A',
    },
};
