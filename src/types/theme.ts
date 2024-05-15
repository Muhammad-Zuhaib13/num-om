/* eslint-disable */
// material-ui
import { SimplePaletteColorOptions } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';

// ==============================|| DEFAULT THEME - TYPES  ||============================== //

export interface ChartColors {
  main?: string;
  lightgreen: string;
  lightblue: string;
  lightred: string;
}
export type PaletteThemeProps = {
  primary: SimplePaletteColorOptions;
  secondary: SimplePaletteColorOptions;
  error: SimplePaletteColorOptions;
  warning: SimplePaletteColorOptions;
  info: SimplePaletteColorOptions;
  success: SimplePaletteColorOptions;
  grey: ColorPartial;
  chart?: ChartColors;
};

export type CustomShadowProps = {
  button: string;
  text: string;
  z1: string;
  primary: string;
  primaryButton: string;
  secondary: string;
  secondaryButton: string;
  error: string;
  errorButton: string;
  warning: string;
  warningButton: string;
  info: string;
  infoButton: string;
  success: string;
  successButton: string;
  grey: string;
  greyButton: string;
};
