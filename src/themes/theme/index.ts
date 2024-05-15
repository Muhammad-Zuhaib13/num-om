// project import
import Default from './default';


// types
import { PaletteThemeProps } from 'types/theme';
import { PalettesProps } from '@ant-design/colors';
import { ThemeMode, PresetColor } from 'types/config';

// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

const Theme = (colors: PalettesProps, presetColor: PresetColor, mode: ThemeMode): PaletteThemeProps => {
  switch (presetColor) {
    // case 'theme1':
    //   return Theme1(colors, mode);
    // case 'theme2':
    //   return Theme2(colors, mode);
    // case 'theme3':
    //   return Theme3(colors, mode);
    // case 'theme4':
    //   return Theme4(colors, mode);
    // case 'theme5':
    //   return Theme5(colors, mode);
    // case 'theme6':
    //   return Theme6(colors, mode);
    // case 'theme7':
    //   return Theme7(colors, mode);
    // case 'theme8':
    //   return Theme8(colors, mode);
    default:
      return Default(colors);
  }
};

export default Theme;
