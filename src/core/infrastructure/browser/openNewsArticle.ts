import * as WebBrowser from 'expo-web-browser';

export async function openNewsArticle(url: string): Promise<void> {
  await WebBrowser.openBrowserAsync(url);
}
