import { palette } from '../tokens/colors';
import { spacing, radii, shadows, layout } from '../tokens/spacing';
import { typography } from '../tokens/typography';

export const darkTheme = {
    colors: {
        ...palette,
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
    },
    spacing,
    radii,
    shadows,
    layout,
    typography,
};
