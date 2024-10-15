/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#9333EA'; // Morado vibrante para modo claro
const tintColorDark = '#6D28D9';  // Morado profundo para modo oscuro

export const Colors = {
  light: {
    text: '#11181C',           // Color del texto en modo claro
    background: '#FFFFFF',     // Fondo blanco para modo claro
    tint: tintColorLight,      // Color principal en modo claro
    icon: '#687076',           // Color de iconos en modo claro
    tabIconDefault: '#687076', // Iconos por defecto en modo claro
    tabIconSelected: tintColorLight, // Iconos seleccionados en modo claro
  },
  dark: {
    text: '#E4E4EB',           // Texto claro para mejor contraste en modo oscuro
    background: '#1f1f1f',     // Fondo oscuro principal
    tint: tintColorDark,       // Color principal morado para modo oscuro
    icon: '#A6A6B6',           // Color de iconos gris suave para modo oscuro
    tabIconDefault: '#A6A6B6', // Iconos por defecto en modo oscuro
    tabIconSelected: tintColorDark, // Iconos seleccionados en modo oscuro
  },

  primary: "#6D28D9",         // Morado profundo
  secondary: "#9333EA",       // Morado más vibrante para acentos o llamadas a la acción
  error: "#FF5E57",           // Rojo suave para errores
  success: "#10B981",         // Verde esmeralda para éxito

  table: {
    background: "#303030",
    header: "#3f3f3f",
    text: "#E4E4EB",
    border: "#4A4A60",
    alterBackground: "#000",
    true: "#10B981",
    false: "#FF5E57",
    
  }
};
