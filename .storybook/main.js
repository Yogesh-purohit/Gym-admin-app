/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: [
        "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
        "../src/theme/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-react-native-web"
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
};
export default config;
