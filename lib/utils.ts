import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple English to Urdu dictionary
const urduDictionary: Record<string, string> = {
  "blog": "بلاگ",
  "social": "سماجی",
  "media": "میڈیا",
  "growth": "ترقی",
  "services": "سروسز",
  "such": "جیسے",
  "as": "جیسے",
  "facebook": "فیس بک",
  "twitter": "ٹوئٹر",
  "reddit": "ریڈٹ",
  "changed": "بدل دیا",
  "internet": "انٹرنیٹ",
  // Add more words as needed
};

export async function translateToUrdu(text: string): Promise<string> {
  try {
    const res = await axios.post('http://localhost:5000/translate', {
      q: text,
      source: 'en',
      target: 'ur',
      format: 'text'
    }, {
      headers: { 'accept': 'application/json' }
    });
    if (typeof res.data === 'string') return res.data;
    if (res.data.translatedText) return res.data.translatedText;
    if (res.data.data && Array.isArray(res.data.data.translations) && res.data.data.translations[0]?.translatedText) {
      return res.data.data.translations[0].translatedText;
    }
    return 'Translation failed';
  } catch (error) {
    console.error('Translation error:', error);
    return 'Translation failed';
  }
}

export function simulateSummary(text: string): string {
  // Extract the first 2 sentences, or up to 300 chars if less
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  let summary = '';
  for (let i = 0; i < sentences.length && summary.length < 300; i++) {
    summary += sentences[i];
  }
  if (!summary) summary = text.slice(0, 300);
  return summary.trim();
}