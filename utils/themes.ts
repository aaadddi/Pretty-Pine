import { Theme, ExportDimensions } from '@/types';

export const themes: Theme[] = [
  {
    id: 'minimal',
    name: 'Minimal White',
    background: '#ffffff',
    textColor: '#1a1a1a',
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    background: '#1a1a1a',
    textColor: '#f5f5f5',
  },
  {
    id: 'gradient-sunset',
    name: 'Gradient Sunset',
    background: 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
    textColor: '#2c2c2c',
    gradient: true,
  },
  {
    id: 'nature',
    name: 'Nature Green',
    background: 'linear-gradient(135deg, #4ade80, #22d3ee)',
    textColor: '#1f2937',
    gradient: true,
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    textColor: '#ffffff',
    gradient: true,
  },
];

export const exportSizes: Record<string, ExportDimensions> = {
  square: { width: 1080, height: 1080, label: 'Square (1080x1080)' },
  twitter: { width: 1200, height: 675, label: 'Twitter (1200x675)' },
  'instagram-story': { width: 1080, height: 1920, label: 'Instagram Story (1080x1920)' },
};

export const fontFamilies = {
  inter: 'Inter, system-ui, sans-serif',
  'fira-code': '"Fira Code", Monaco, Consolas, monospace',
  playfair: '"Playfair Display", Georgia, serif',
};

export const codeLanguages = [
  'javascript',
  'typescript',
  'python',
  'java',
  'csharp',
  'cpp',
  'php',
  'ruby',
  'go',
  'rust',
  'html',
  'css',
  'json',
  'yaml',
  'sql',
  'bash',
];