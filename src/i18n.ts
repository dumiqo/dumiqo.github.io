export const languages = ['en', 'ru'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'en';

// Where a language lives in the URL: English keeps the root, Russian mirrors it under /ru/.
// Everything that builds a link goes through href(), so the scheme is decided in one place.
export const prefixOf = (lang: Lang) => (lang === defaultLang ? '' : `/${lang}`);
export const href = (lang: Lang, path = '/') => `${prefixOf(lang)}/${path.replace(/^\/+/, '')}`;
export const feedHref = (lang: Lang) => href(lang, 'rss.xml');

type Copy = {
  siteName: string;
  navWriting: string;
  navGithub: string;
  switchTo: string;
  footerRss: string;

  homeTitle: string;
  homeDescription: string;
  homeH1: string;
  homeLede: string;
  whatIDo: string;
  role: string;
  roleValue: string;
  systems: string;
  systemsLead: string;
  systemsLink: string;
  systemsTail: string;
  stack: string;
  currently: string;
  currentlyValue: string;
  readHire: string;
  writingLinkText: string;
  githubLinkText: string;
  latest: string;

  writingTitle: string;
  writingDescription: string;
  writingH1: string;
  writingLede: string;
  writingEmpty: string;

  postBack: string;
  postOnlyIn: string;
  partWord: string;
  seriesLabel: Record<string, string>;
  seriesMore: string;
  pillar: Record<'consensus' | 'design' | 'path' | 'ai', string>;

  feedTitle: string;
  feedDescription: string;
};

const en: Copy = {
  siteName: 'Konstantin Kim',
  navWriting: 'Writing',
  navGithub: 'GitHub',
  switchTo: 'Русский',
  footerRss: 'RSS',

  homeTitle: 'Konstantin Kim — backend engineer, distributed systems',
  homeDescription:
    'Backend engineer working on distributed systems: consensus and replication. A queue broker on a hand-written Raft core - on hold while I check what it actually guarantees.',
  homeH1: 'Backend engineer working on distributed systems — consensus and replication.',
  homeLede:
    'I wrote a queue broker around a hand-written Raft core. It is on hold while I check what it actually guarantees, and this is where I write down what breaks.',
  whatIDo: 'What I do',
  role: 'Role',
  roleValue: 'Backend engineer — services, storage, message flow.',
  systems: 'Systems',
  systemsLead:
    'Queue and message pipelines, transactional storage, service-to-service contracts. The side project with all the receipts is',
  systemsLink: 'raft-broker',
  systemsTail:
    ': a clustered queue broker whose consensus layer I write from the spec.',
  stack: 'Stack',
  currently: 'Currently',
  currentlyValue:
    'Raft core: leader election and log replication safety (§5.4) on deterministic test clocks. The project is on hold right now.',
  readHire: 'Read / hire',
  writingLinkText:
    'one request, many systems: fan-out, caching, capacity, consensus.',
  githubLinkText: 'raft-broker and the rest.',
  latest: 'Latest',

  writingTitle: 'Writing — Konstantin Kim',
  writingDescription:
    'One request, many systems: notes on fan-out, caching and invalidation, what capacity costs, and consensus when correctness cannot be traded away.',
  writingH1: 'Writing',
  writingLede:
    'One request, many systems. Every hard system I have worked on does the same trick: a single search becomes dozens of upstream calls, and the answer still has to look like one. Notes on fan-out, caching and invalidation, on what that capacity costs, and on consensus when correctness cannot be traded away.',
  writingEmpty: 'Nothing published yet.',

  postBack: '← all writing',
  postOnlyIn: 'No translation yet.',
  partWord: 'Part',
  // Series are slugs in frontmatter; a readable name belongs to the copy, not the data.
  seriesLabel: { '1000x-traffic': '1000x traffic' },
  seriesMore: 'More in this series',
  pillar: {
    consensus: 'consensus & replication',
    design: 'system design',
    path: 'the path',
    ai: 'AI in practice',
  },

  feedTitle: 'Konstantin Kim — writing',
  feedDescription: 'Consensus, replication, and building distributed systems by hand.',
};

const ru: Copy = {
  siteName: 'Константин Ким',
  navWriting: 'Тексты',
  navGithub: 'GitHub',
  switchTo: 'English',
  footerRss: 'RSS',

  homeTitle: 'Константин Ким — backend-инженер, распределённые системы',
  homeDescription:
    'Backend-инженер, распределённые системы: консенсус и репликация. Очередь сообщений с ядром Raft, написанным с нуля, — на паузе, пока я перепроверяю, что она гарантирует.',
  homeH1: 'Backend-инженер, распределённые системы — консенсус и репликация.',
  homeLede:
    'Написал очередь сообщений вокруг ядра Raft, написанного с нуля. Проект на паузе, пока я перепроверяю, что именно она гарантирует; здесь я записываю, что в ней ломается.',
  whatIDo: 'Чем я занимаюсь',
  role: 'Роль',
  roleValue: 'Backend-инженер: сервисы, хранение, поток сообщений.',
  systems: 'Системы',
  systemsLead:
    'Очереди и пайплайны сообщений, транзакционное хранение, контракты между сервисами. Пет-проект, по которому есть все доказательства, —',
  systemsLink: 'raft-broker',
  systemsTail:
    ': кластерная очередь, чей слой консенсуса я пишу по спецификации.',
  stack: 'Стек',
  currently: 'Сейчас',
  currentlyValue:
    'Ядро Raft: безопасность выборов лидера и репликации лога (§5.4) на детерминированных тестовых часах. Проект сейчас на паузе.',
  readHire: 'Читать / нанимать',
  writingLinkText:
    'один запрос - много систем: веер, кэш, ёмкость, консенсус.',
  githubLinkText: 'raft-broker и остальное.',
  latest: 'Последнее',

  writingTitle: 'Тексты — Константин Ким',
  writingDescription:
    'Один запрос - много систем: заметки про веер, кэш и инвалидацию, цену ёмкости и консенсус, когда корректностью торговать нельзя.',
  writingH1: 'Тексты',
  writingLede:
    'Один запрос - много систем. Каждая сложная система, с которой я работал, делает один и тот же фокус: один поиск превращается в десятки вызовов вверх, а ответ всё равно должен выглядеть как один. Заметки про веер, кэш и инвалидацию, про цену этой ёмкости и про консенсус, когда корректностью торговать нельзя.',
  writingEmpty: 'Пока ничего не опубликовано.',

  postBack: '← все тексты',
  postOnlyIn: 'Перевода пока нет.',
  partWord: 'Часть',
  seriesLabel: { '1000x-traffic': '1000x traffic' },
  seriesMore: 'Другие части серии',
  pillar: {
    consensus: 'консенсус и репликация',
    design: 'system design',
    path: 'как получен навык',
    ai: 'AI в практике',
  },

  feedTitle: 'Константин Ким — тексты',
  feedDescription: 'Консенсус, репликация и сборка распределённых систем руками.',
};

const copy: Record<Lang, Copy> = { en, ru };

export const t = (lang: Lang): Copy => copy[lang];

// Date shown next to a post: ISO for both languages on purpose — a machine date
// is unambiguous and does not drag in Intl locale data for one string.
export const shortDate = (date: Date) => date.toISOString().slice(0, 10);
