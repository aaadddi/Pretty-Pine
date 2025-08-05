import html2canvas from 'html2canvas';
import { CanvasSettings } from '@/types/index';
import { exportSizes } from '@/utils/themes';

export const generateImage = async (element: HTMLElement): Promise<string> => {
  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2, // Higher resolution
    useCORS: true,
    allowTaint: true,
  });
  
  return canvas.toDataURL('image/png');
};

export const downloadImage = (dataUrl: string, filename: string = 'pretty-pine-export.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateSVG = async (element: HTMLElement): Promise<string> => {
  const rect = element.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(element);
  
  // Create SVG with proper dimensions
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}" viewBox="0 0 ${rect.width} ${rect.height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="${computedStyle.cssText}">
          ${element.innerHTML}
        </div>
      </foreignObject>
    </svg>
  `;
  
  return svg;
};

export const downloadSVG = (svgContent: string, filename: string = 'pretty-pine-export.svg') => {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (dataUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);
    
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

export const getCanvasStyle = (settings: CanvasSettings) => {
  const dimensions = exportSizes[settings.exportSize];
  const aspectRatio = dimensions.width / dimensions.height;
  
  return {
    aspectRatio: aspectRatio.toString(),
    maxWidth: '100%',
    maxHeight: '70vh',
  };
};