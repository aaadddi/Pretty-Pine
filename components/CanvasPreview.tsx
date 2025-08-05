import { forwardRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CanvasSettings } from '@/types/index';
import { themes, fontFamilies } from '@/utils/themes';  
import { getCanvasStyle } from '@/utils/canvas';

interface CanvasPreviewProps {
  settings: CanvasSettings;
}

export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  ({ settings }, ref) => {
    const theme = themes.find(t => t.id === settings.theme);
    const canvasStyle = getCanvasStyle(settings);
    
    const getContentDisplay = () => {
      const baseStyles = {
        fontFamily: fontFamilies[settings.fontFamily],
        fontSize: `${settings.fontSize}px`,
        textAlign: settings.textAlign as 'left' | 'center' | 'right',
        color: theme?.textColor || '#000000',
        lineHeight: 1.6,
      };

      switch (settings.contentType) {
        case 'code':
          return (
            <SyntaxHighlighter
              language={settings.codeLanguage}
              style={theme?.id === 'dark' ? tomorrow : prism}
              customStyle={{
                background: 'transparent',
                padding: 0,
                margin: 0,
                fontSize: `${settings.fontSize}px`,
                fontFamily: fontFamilies['fira-code'],
                textAlign: settings.textAlign,
              }}
              codeTagProps={{
                style: {
                  fontFamily: fontFamilies['fira-code'],
                }
              }}
            >
              {settings.text || '// Your code here\nfunction hello() {\n  console.log("Hello, Pretty Pine!");\n}'}
            </SyntaxHighlighter>
          );

        case 'quote':
          return (
            <div style={baseStyles} className="space-y-4">
              <div className="text-4xl opacity-30 font-serif leading-none">"</div>
              <div style={{ fontFamily: fontFamilies.playfair, fontStyle: 'italic' }}>
                {settings.text || 'The best time to plant a tree was 20 years ago. The second best time is now.'}
              </div>
              <div className="text-sm opacity-70 mt-4">
                — Author Name
              </div>
            </div>
          );

        case 'social':
          return (
            <div style={baseStyles} className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  U
                </div>
                <div>
                  <div className="font-semibold text-sm">@username</div>
                  <div className="text-xs opacity-70">2 hours ago</div>
                </div>
              </div>
              <div>{settings.text || 'Just discovered Pretty Pine! 🌲 Perfect for creating stunning social media visuals from text. #design #prettypine'}</div>
              <div className="flex gap-4 text-sm opacity-70 mt-4">
                <span>💬 12</span>
                <span>🔄 5</span>
                <span>❤️ 23</span>
              </div>
            </div>
          );

        default:
          return (
            <div style={baseStyles}>
              {settings.text || 'Transform your ideas into beautiful images with Pretty Pine'}
            </div>
          );
      }
    };

    return (
      <div className="flex-1 p-6 bg-muted/30">
        <div className="flex items-center justify-center min-h-full">
          <div
            ref={ref}
            className="border border-border/20 shadow-lg rounded-lg overflow-hidden"
            style={{
              ...canvasStyle,
              background: theme?.background || '#ffffff',
              padding: `${settings.padding}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
            }}
          >
            <div className="w-full max-w-full overflow-hidden">
              {getContentDisplay()}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CanvasPreview.displayName = 'CanvasPreview';