import {Share} from 'react-native';

export async function shareNewsArticle(title: string, url: string): Promise<void> {
  await Share.share({
    message: `${title}\n${url}`,
    title,
  });
}
