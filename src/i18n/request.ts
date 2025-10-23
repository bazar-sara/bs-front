import { getRequestConfig } from 'next-intl/server';
import { glob } from 'glob';
import fs from 'fs/promises';

const messageCache: Record<string, Record<string, string>> = {};

export default getRequestConfig(async ({ locale = 'en' }) => {
  if (process.env.NODE_ENV === 'production' && messageCache[locale]) {
    return {
      locale,
      messages: messageCache[locale],
    };
  }

  const messages: Record<string, string> = {};

  const files = await glob(`src/app/**/i18n/${locale}.json`, {
    cwd: process.cwd(),
    absolute: true,
    nodir: true,
    ignore: 'node_modules/**',
  });

  files.sort();

  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf8');
      Object.assign(messages, JSON.parse(content));
    } catch (error) {
      console.error(`Error loading i18n file ${file}:`, error);
    }
  }

  if (process.env.NODE_ENV === 'production') {
    messageCache[locale] = messages;
  }

  return {
    locale,
    messages,
    onError(error) {
      console.log('Error in i18n request:', error);
      // if (error.code === 'MISSING_MESSAGE') {
      //   return;
      // }
    },
  };
});
