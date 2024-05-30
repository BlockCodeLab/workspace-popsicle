import { pythonGenerator } from '@blockcode/workspace-blocks/app';

const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

pythonGenerator['color_picker'] = (block) => {
  // Colour picker.
  const { r, g, b } = hexToRgb(block.getFieldValue('COLOUR')) || { r: float('nan'), g: float('nan'), b: float('nan') };
  const code = `(${r}, ${g}, ${b})`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};
