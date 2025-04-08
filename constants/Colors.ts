/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#25D366'; // Verde WhatsApp
const tintColorDark = '#DCF8C6'; // Verde claro para modo escuro

export const Colors = {
  default: {
    defaultText: '#111B21', // Preto suave
    text: '#075E54', // Header ou ícones importantes
    button: '#075E54', // Verde WhatsApp
    border: '#C7D0D8', // Bordas e separadores
    card: '#F0F2F5', // Cartões e fundo de itens
    success: '#25D366', // Verde WhatsApp
    error: '#FF3B30', // Vermelho para erros
    background: '#ECE5DD', // Fundo típico do WhatsApp
    tint: tintColorLight, // Botões, destaques
    icon: '#075E54', // Header ou ícones importantes
    tabIconDefault: '#667781', // Ícone padrão inativo
    tabIconSelected: tintColorLight, // Ícone selecionado
  },
  dark: {
    text: '#ECEDEE', // Texto claro para fundo escuro
    background: '#121212', // Escuro padrão moderno
    tint: tintColorDark, // Cor de destaque no modo escuro
    icon: '#25D366', // Verde vibrante para ícones
    tabIconDefault: '#9BA1A6', // Ícone padrão inativo
    tabIconSelected: tintColorDark, // Ícone ativo
  },
};

