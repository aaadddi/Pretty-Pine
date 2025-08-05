import { Download, Copy, TreePine, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onDownload: () => void;
  onDownloadSVG: () => void;
  onCopy: () => void;
  isExporting: boolean;
}

export const Header = ({ onDownload, onDownloadSVG, onCopy, isExporting }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-pine rounded-lg flex items-center justify-center">
          <TreePine className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Pretty Pine</h1>
          <p className="text-sm text-muted-foreground">Transform text into beautiful images</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          onClick={onCopy}
          variant="outline"
          size="sm"
          disabled={isExporting}
          className="hover:bg-pine-subtle transition-colors"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Button
          onClick={onDownloadSVG}
          variant="outline"
          size="sm"
          disabled={isExporting}
          className="hover:bg-pine-subtle transition-colors"
        >
          <FileImage className="w-4 h-4 mr-2" />
          SVG
        </Button>
        <Button
          onClick={onDownload}
          size="sm"
          disabled={isExporting}
          className="bg-primary hover:bg-primary-hover transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'PNG'}
        </Button>
      </div>
    </header>
  );
};