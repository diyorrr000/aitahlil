/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            "colors": {
                "on-primary-fixed-variant": "#434654",
                "on-secondary": "#00363a",
                "on-tertiary-fixed": "#001a42",
                "tertiary-container": "#000d28",
                "surface-container-highest": "#323537",
                "on-primary-container": "#777b8a",
                "surface-container-lowest": "#0b0f10",
                "surface-dim": "var(--surface)",
                "on-surface": "var(--on-surface)",
                "on-secondary-container": "#006a70",
                "on-error-container": "#ffdad6",
                "on-secondary-fixed-variant": "#004f54",
                "background": "var(--surface)",
                "outline": "#909096",
                "error": "#ffb4ab",
                "surface-bright": "var(--surface)",
                "inverse-primary": "#5a5e6d",
                "surface-tint": "#c3c6d7",
                "surface-variant": "var(--surface)",
                "on-tertiary-container": "#2c77eb",
                "on-tertiary": "#002e6a",
                "outline-variant": "#46464c",
                "on-tertiary-fixed-variant": "#004395",
                "secondary-fixed": "#74f5ff",
                "surface-container-low": "var(--surface)",
                "tertiary-fixed-dim": "#adc6ff",
                "on-primary": "#2c303d",
                "surface": "var(--surface)",
                "surface-container": "var(--surface)",
                "on-background": "var(--on-surface)",
                "secondary": "#ddfcff",
                "surface-container-high": "var(--surface)",
                "primary-container": "#0a0e1a",
                "primary": "#c3c6d7",
                "error-container": "#93000a",
                "on-error": "#690005",
                "primary-fixed": "#dfe2f3",
                "on-secondary-fixed": "#002022",
                "inverse-on-surface": "#2d3133",
                "secondary-fixed-dim": "#00dbe7",
                "secondary-container": "#00f1fe",
                "tertiary-fixed": "#d8e2ff",
                "primary-fixed-dim": "#c3c6d7",
                "inverse-surface": "#e0e3e5",
                "on-primary-fixed": "#171b28",
                "tertiary": "#adc6ff",
                "on-surface-variant": "var(--on-surface-variant)"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "spacing": {
                "unit": "8px",
                "container-padding-mobile": "20px",
                "container-padding-desktop": "48px",
                "gutter": "24px",
                "section-gap": "80px"
            },
            "fontFamily": {
                "body-lg": ["Geist"],
                "headline-lg": ["Space Grotesk"],
                "display-xl": ["Space Grotesk"],
                "body-md": ["Geist"],
                "headline-lg-mobile": ["Space Grotesk"],
                "label-sm": ["JetBrains Mono"]
            },
            "fontSize": {
                "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                "headline-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                "display-xl": ["64px", { "lineHeight": "72px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                "headline-lg-mobile": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "500" }]
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
