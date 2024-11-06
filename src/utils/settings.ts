interface Settings {
  borderRadius?: number;
  frameWidth?: number;
  frameColor?: string;
  isCircle?: boolean;
  remember?: boolean;
}

const STORAGE_KEY = 'webp-converter-settings';

export function saveSettings(settings: Settings): void {
  if (settings.remember) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }
}

export function loadSettings(): Settings {
  try {
    const settings = localStorage.getItem(STORAGE_KEY);
    return settings ? JSON.parse(settings) : {};
  } catch {
    return {};
  }
}