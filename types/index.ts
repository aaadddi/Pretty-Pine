export type ContentType = 'text' | 'code' | 'quote' | 'social';

export type ThemeType = 'minimal' | 'dark' | 'gradient-sunset' | 'nature' | 'ocean';

export type FontFamily = 'inter' | 'fira-code' | 'playfair';

export type ExportSize = 'square' | 'twitter' | 'instagram-story';

export interface Theme {
  id: ThemeType;
  name: string;
  background: string;
  textColor: string;
  accentColor?: string;
  gradient?: boolean;
}

export interface CanvasSettings {
  contentType: ContentType;
  text: string;
  theme: ThemeType;
  fontFamily: FontFamily;
  fontSize: number;
  codeLanguage: string;
  exportSize: ExportSize;
  padding: number;
  textAlign: 'left' | 'center' | 'right';
}

export interface ExportDimensions {
  width: number;
  height: number;
  label: string;
}