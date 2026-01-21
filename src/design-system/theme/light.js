import { palette } from '../tokens/colors';
import { spacing, radii, shadows, layout } from '../tokens/spacing';
import { typography } from '../tokens/typography';

export const lightTheme = {
    colors: {
        ...palette, // Include raw palette for direct access if needed
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
    },
    spacing,
    radii,
    shadows,
    layout,
    typography,
};
