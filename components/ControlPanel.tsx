"use client"
import { useState } from 'react';
import { ChevronDown, Type, Code, Quote, MessageSquare, ChevronRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CanvasSettings, ContentType, FontFamily, ThemeType, ExportSize } from '@/types';
import { themes, codeLanguages } from '@/utils/themes';

interface ControlPanelProps {
  settings: CanvasSettings;
  onSettingsChange: (settings: Partial<CanvasSettings>) => void;
}

const contentTypeIcons = {
  text: Type,
  code: Code,
  quote: Quote,
  social: MessageSquare,
};

export const ControlPanel = ({ settings, onSettingsChange }: ControlPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({
    content: true,
    theme: true,
    typography: false,
    layout: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTextChange = (text: string) => {
    onSettingsChange({ text });
  };

  const handleContentTypeChange = (type: ContentType) => {
    onSettingsChange({ contentType: type });
  };

  const handleThemeChange = (theme: ThemeType) => {
    onSettingsChange({ theme });
  };

  const handleFontChange = (font: FontFamily) => {
    onSettingsChange({ fontFamily: font });
  };

  const handleFontSizeChange = (size: number[]) => {
    onSettingsChange({ fontSize: size[0] });
  };

  const handleLanguageChange = (language: string) => {
    onSettingsChange({ codeLanguage: language });
  };

  const handleExportSizeChange = (size: ExportSize) => {
    onSettingsChange({ exportSize: size });
  };

  const handlePaddingChange = (padding: number[]) => {
    onSettingsChange({ padding: padding[0] });
  };

  const handleAlignmentChange = (align: 'left' | 'center' | 'right') => {
    onSettingsChange({ textAlign: align });
  };

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-between p-0 h-auto"
        >
          <h2 className="text-lg font-semibold">Controls</h2>
          <ChevronDown className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isCollapsed ? 'h-0 overflow-hidden' : 'min-h-0'}`}>
        <div className="p-6 space-y-4">
          {/* Content Section */}
          <Collapsible open={openSections.content} onOpenChange={() => toggleSection('content')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-3 h-auto border border-border rounded-lg hover:bg-accent/50">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  <span className="font-medium">Content</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${openSections.content ? 'rotate-90' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-4 px-3">
              <div>
                <Label htmlFor="text-input">Text Content</Label>
                <Textarea
                  id="text-input"
                  placeholder="Transform your ideas into beautiful images with Pretty Pine"
                  value={settings.text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {settings.text.length} characters
                </p>
              </div>

              <div>
                <Label>Content Type</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(contentTypeIcons).map(([type, Icon]) => (
                    <Button
                      key={type}
                      variant={settings.contentType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleContentTypeChange(type as ContentType)}
                      className="justify-start"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {settings.contentType === 'code' && (
                <div>
                  <Label>Programming Language</Label>
                  <Select value={settings.codeLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {codeLanguages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Theme Section */}
          <Collapsible open={openSections.theme} onOpenChange={() => toggleSection('theme')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-3 h-auto border border-border rounded-lg hover:bg-accent/50">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-pine rounded"></div>
                  <span className="font-medium">Theme</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${openSections.theme ? 'rotate-90' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-2 px-3">
              {themes.map((theme) => (
                <Button
                  key={theme.id}
                  variant={settings.theme === theme.id ? "default" : "outline"}
                  onClick={() => handleThemeChange(theme.id)}
                  className="justify-start h-auto p-3 w-full"
                >
                  <div
                    className="w-4 h-4 rounded mr-3 border"
                    style={{ background: theme.background }}
                  />
                  {theme.name}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Typography Section */}
          <Collapsible open={openSections.typography} onOpenChange={() => toggleSection('typography')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-3 h-auto border border-border rounded-lg hover:bg-accent/50">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  <span className="font-medium">Typography</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${openSections.typography ? 'rotate-90' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-4 px-3">
              <div>
                <Label>Font Family</Label>
                <Select value={settings.fontFamily} onValueChange={handleFontChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter (Sans-serif)</SelectItem>
                    <SelectItem value="fira-code">Fira Code (Monospace)</SelectItem>
                    <SelectItem value="playfair">Playfair Display (Serif)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Font Size: {settings.fontSize}px</Label>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={handleFontSizeChange}
                  min={12}
                  max={48}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Text Alignment</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {(['left', 'center', 'right'] as const).map((align) => (
                    <Button
                      key={align}
                      variant={settings.textAlign === align ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAlignmentChange(align)}
                    >
                      {align.charAt(0).toUpperCase() + align.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Layout Section */}
          <Collapsible open={openSections.layout} onOpenChange={() => toggleSection('layout')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-3 h-auto border border-border rounded-lg hover:bg-accent/50">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current rounded"></div>
                  <span className="font-medium">Layout</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${openSections.layout ? 'rotate-90' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-4 px-3">
              <div>
                <Label>Padding: {settings.padding}px</Label>
                <Slider
                  value={[settings.padding]}
                  onValueChange={handlePaddingChange}
                  min={20}
                  max={100}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Export Size</Label>
                <Select value={settings.exportSize} onValueChange={handleExportSizeChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="square">Square (1080x1080)</SelectItem>
                    <SelectItem value="twitter">Twitter (1200x675)</SelectItem>
                    <SelectItem value="instagram-story">Instagram Story (1080x1920)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};