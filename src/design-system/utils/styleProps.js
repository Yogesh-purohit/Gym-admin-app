// Map prop names to style property names and theme keys
const PROP_MAP = {
    // Layout
    flex: { styleProp: "flex" },
    direction: { styleProp: "flexDirection" },
    align: { styleProp: "alignItems" },
    justify: { styleProp: "justifyContent" },
    overflow: { styleProp: "overflow" },
    width: { styleProp: "width" },
    height: { styleProp: "height" },
    minHeight: { styleProp: "minHeight" },
    maxHeight: { styleProp: "maxHeight" },
    minWidth: { styleProp: "minWidth" },
    maxWidth: { styleProp: "maxWidth" },

    // Flex
    flexGrow: { styleProp: "flexGrow" },
    flexShrink: { styleProp: "flexShrink" },
    flexBasis: { styleProp: "flexBasis" },
    alignSelf: { styleProp: "alignSelf" },

    // Colors
    bgColor: { styleProp: "backgroundColor", themeKey: "colors" },
    backgroundColor: { styleProp: "backgroundColor", themeKey: "colors" },
    color: { styleProp: "color", themeKey: "colors" },
    borderColor: { styleProp: "borderColor", themeKey: "colors" },

    // Typography
    fontSize: { styleProp: "fontSize", themeKey: "typography.size" },
    fontWeight: { styleProp: "fontWeight", themeKey: "typography.weight" },
    lineHeight: { styleProp: "lineHeight", themeKey: "typography.lineHeight" },
    textAlign: { styleProp: "textAlign" },
    letterSpacing: { styleProp: "letterSpacing" },
    textDecorationLine: { styleProp: "textDecorationLine" },
    textTransform: { styleProp: "textTransform" },

    // Borders & Opacity
    borderWidth: { styleProp: "borderWidth" },
    borderTopWidth: { styleProp: "borderTopWidth" },
    borderBottomWidth: { styleProp: "borderBottomWidth" },
    borderLeftWidth: { styleProp: "borderLeftWidth" },
    borderRightWidth: { styleProp: "borderRightWidth" },
    opacity: { styleProp: "opacity" },
    radius: { styleProp: "borderRadius", themeKey: "radii" },
    borderTopLeftRadius: { styleProp: "borderTopLeftRadius", themeKey: "radii" },
    borderTopRightRadius: { styleProp: "borderTopRightRadius", themeKey: "radii" },
    borderBottomLeftRadius: { styleProp: "borderBottomLeftRadius", themeKey: "radii" },
    borderBottomRightRadius: { styleProp: "borderBottomRightRadius", themeKey: "radii" },

    // Positioning
    position: { styleProp: "position" },
    top: { styleProp: "top", themeKey: "spacing" },
    bottom: { styleProp: "bottom", themeKey: "spacing" },
    left: { styleProp: "left", themeKey: "spacing" },
    right: { styleProp: "right", themeKey: "spacing" },
    zIndex: { styleProp: "zIndex" },

    // Spacing (Padding)
    padding: { styleProp: "padding", themeKey: "spacing" },
    paddingHorizontal: { styleProp: "paddingHorizontal", themeKey: "spacing" },
    paddingVertical: { styleProp: "paddingVertical", themeKey: "spacing" },
    paddingTop: { styleProp: "paddingTop", themeKey: "spacing" },
    paddingBottom: { styleProp: "paddingBottom", themeKey: "spacing" },
    paddingLeft: { styleProp: "paddingLeft", themeKey: "spacing" },
    paddingRight: { styleProp: "paddingRight", themeKey: "spacing" },

    // Spacing (Margin)
    margin: { styleProp: "margin", themeKey: "spacing" },
    marginHorizontal: { styleProp: "marginHorizontal", themeKey: "spacing" },
    marginVertical: { styleProp: "marginVertical", themeKey: "spacing" },
    marginTop: { styleProp: "marginTop", themeKey: "spacing" },
    marginBottom: { styleProp: "marginBottom", themeKey: "spacing" },
    marginLeft: { styleProp: "marginLeft", themeKey: "spacing" },
    marginRight: { styleProp: "marginRight", themeKey: "spacing" },

    // Gap
    gap: { styleProp: "gap", themeKey: "spacing" },

    // Shadows
    shadowColor: { styleProp: "shadowColor", themeKey: "colors" },
    shadowOffset: { styleProp: "shadowOffset" },
    shadowOpacity: { styleProp: "shadowOpacity" },
    shadowRadius: { styleProp: "shadowRadius" },
    elevation: { styleProp: "elevation" },
};

export function buildStyle(props, theme) {
    const style = {};

    const getValue = (obj, path) => {
        if (!path || typeof path !== 'string') return undefined;
        return path.split('.').reduce((acc, part) => acc?.[part], obj);
    };

    // Handle special cases first or iterating through props
    for (const key in props) {
        const value = props[key];
        if (value == null) continue; // Skip null/undefined

        const config = PROP_MAP[key];
        if (config) {
            if (config.themeKey) {
                // Try to look up in theme, handle nested keys
                const themeData = config.themeKey.split('.').reduce((acc, part) => acc?.[part], theme);
                // First try direct lookup, then nested lookup, then fallback to raw value
                const themeValue = themeData?.[value] ?? getValue(themeData, value);
                style[config.styleProp] = themeValue ?? value;
            } else {
                style[config.styleProp] = value;
            }
        }
    }

    // Handle Special Cases
    if (props.wrap != null) {
        style.flexWrap = props.wrap ? "wrap" : "nowrap";
    }

    return style;
}
