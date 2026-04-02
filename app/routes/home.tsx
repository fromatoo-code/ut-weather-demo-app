import type { Route } from './+types/home';

import { Landing } from '@src/components/landing';
import i18n from '@src/utils/translation/i18n';

export function meta({}: Route.MetaArgs) {
  return [
    { title: i18n.t('meta.title') },
    { name: 'description', content: i18n.t('meta.description') },
  ];
}

export default function Home() {
  return <Landing />;
}
