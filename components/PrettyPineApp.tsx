"use client"
import { useState, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { Header } from '@/components/HeaderComponent';
import { ControlPanel } from '@/components/ControlPanel';
import { CanvasPreview } from '@/components/CanvasPreview';
import { CanvasSettings } from '@/types';
import { generateImage, generateSVG, downloadImage, downloadSVG, copyToClipboard } from '@/utils/canvas';

const defaultSettings: CanvasSettings = {
  contentType: 'text',
  text: 'Transform your ideas into beautiful images with Pretty Pine',
  theme: 'minimal',
  fontFamily: 'inter',
  fontSize: 24,
  codeLanguage: 'javascript',
  exportSize: 'square',
  padding: 40,
  textAlign: 'center',
};

export const PrettyPineApp = () => {
  const [settings, setSettings] = useState<CanvasSettings>(defaultSettings);
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleSettingsChange = (newSettings: Partial<CanvasSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleDownload = async () => {
    if (!canvasRef.current) {
      toast({
        title: "Error",
        description: "Canvas not found. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    try {
      const dataUrl = await generateImage(canvasRef.current);
      downloadImage(dataUrl, `pretty-pine-${Date.now()}.png`);
      toast({
        title: "Success!",
        description: "Image downloaded successfully.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadSVG = async () => {
    if (!canvasRef.current) {
      toast({
        title: "Error",
        description: "Canvas not found. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    try {
      const svgContent = await generateSVG(canvasRef.current);
      downloadSVG(svgContent, `pretty-pine-${Date.now()}.svg`);
      toast({
        title: "Success!",
        description: "SVG downloaded successfully.",
      });
    } catch (error) {
      console.error('SVG Export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to generate SVG. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    if (!canvasRef.current) {
      toast({
        title: "Error",
        description: "Canvas not found. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    try {
      const dataUrl = await generateImage(canvasRef.current);
      const success = await copyToClipboard(dataUrl);
      
      if (success) {
        toast({
          title: "Copied!",
          description: "Image copied to clipboard.",
        });
      } else {
        toast({
          title: "Copy Failed",
          description: "Failed to copy image. Your browser may not support this feature.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Copy error:', error);
      toast({
        title: "Copy Failed",
        description: "Failed to copy image to clipboard.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <Header
        onDownload={handleDownload}
        onDownloadSVG={handleDownloadSVG}
        onCopy={handleCopy}
        isExporting={isExporting}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <ControlPanel
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
        
        <CanvasPreview
          ref={canvasRef}
          settings={settings}
        />
      </div>
    </div>
  );
};