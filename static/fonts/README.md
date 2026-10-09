# Font File Directory

Please place the following font files in this directory:

## Chinese Font Files (Supports multiple weights and styles)

1. `LXGWBrightGB-Regular.ttf` - Chinese font regular style
2. `LXGWBrightGB-Italic.ttf` - Chinese font italic style
3. `LXGWBrightGB-Light.ttf` - Chinese font light style
4. `LXGWBrightGB-LightItalic.ttf` - Chinese font light italic style
5. `LXGWBrightGB-Medium.ttf` - Chinese font medium weight style
6. `LXGWBrightGB-MediumItalic.ttf` - Chinese font medium weight italic style

## Code Font Files

1. `CaskaydiaCoveNerdFont-Regular.ttf` - Code font file, used to display monospace code text
2. `CaskaydiaCoveNerdFont-Bold.ttf` - Code font bold style
3. `CaskaydiaCoveNerdFont-Italic.ttf` - Code font italic style
4. `CaskaydiaCoveNerdFont-Light.ttf` - Code font light style
5. `CaskaydiaCoveNerdFont-SemiBold.ttf` - Code font semi-bold style
6. `CaskaydiaCoveNerdFont-SemiLight.ttf` - Code font semi-light style
7. `CaskaydiaCoveNerdFont-ExtraLight.ttf` - Code font extra-light style
8. `CaskaydiaCoveNerdFont-BoldItalic.ttf` - Code font bold italic style
9. `CaskaydiaCoveNerdFont-SemiBoldItalic.ttf` - Code font semi-bold italic style
10. `CaskaydiaCoveNerdFont-LightItalic.ttf` - Code font light italic style
11. `CaskaydiaCoveNerdFont-SemiLightItalic.ttf` - Code font semi-light italic style
12. `CaskaydiaCoveNerdFont-ExtraLightItalic.ttf` - Code font extra-light italic style

## Font File Description

### Chinese Fonts
- **Regular**: Regular style, used for body content
- **Italic**: Italic style, used for emphasis or blockquotes
- **Light**: Light style, used for headers or lightweight content
- **LightItalic**: Light italic style
- **Medium**: Medium weight style, used for important headers
- **MediumItalic**: Medium weight italic style

### Code Fonts
- `CaskaydiaCoveNerdFont-Regular.tff`: Monospace font, specifically optimized for code display, will be prioritized for monospace text

## Usage Method

After placing the font files in this directory, the system will automatically:
1. Prioritize the `LXGWBrightGB` font family for LXGWBrightGB content (automatically selecting the corresponding variant based on CSS font-weight and font-style)
2. Prioritize the `CaskaydiaCoveNerdFont-Regular.tff` font for code content
3. Fall back to system default fonts if the font files do not exist

## Font Usage in CSS

The system automatically selects the corresponding font variant based on CSS properties:

```css
/* Regular style */
body {
  font-family: "LXGWBrightGB", sans-serif;
  font-weight: normal; /* Uses Regular */
  font-style: normal;
}

/* Italic style */
em, i {
  font-family: "LXGWBrightGB", sans-serif;
  font-weight: normal;
  font-style: italic; /* Uses Italic */
}

/* Light style */
.light-text {
  font-family: "LXGWBrightGB", sans-serif;
  font-weight: 300; /* Uses Light */
  font-style: normal;
}

/* Medium weight style */
.medium-text {
  font-family: "LXGWBrightGB", sans-serif;
  font-weight: 500; /* Uses Medium */
  font-style: normal;
}