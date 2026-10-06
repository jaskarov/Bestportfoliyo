import { useEffect } from 'react';

export type Language = 'EN' | 'UZ' | 'RU';

type TranslationTable = Record<string, string>;

const UZ: TranslationTable = {
  'Open for product, AI, and SaaS work': 'Mahsulot, AI va SaaS loyihalari uchun ochiq',
  'Full-Stack Engineer • AI Automation Builder • Product Developer': 'Full-Stack muhandis • AI avtomatlashtirish • Mahsulot dasturchisi',
  'I design and build fast, scalable web products, internal tools, and AI-powered experiences that help businesses automate operations and turn ideas into real customer value.':
    'Biznes operatsiyalarini avtomatlashtiruvchi va g\'oyalarni real qiymatga aylantiruvchi tezkor, kengayuvchan veb-mahsulotlar va AI yechimlari yarataman.',
  '15-minute discovery call': '15 daqiqalik tanishuv qo\'ng\'irog\'i',
  'Book a free 15-minute discovery call': 'Bepul 15 daqiqalik tanishuv qo\'ng\'irog\'i band qiling',
  'Prefer to talk it through?': 'Batafsil gaplashishni ma\'qul ko\'rasizmi?',
  'Explore Work': 'Ishlarni ko\'rish',
  'Explore Masterworks': 'Loyihalarni ko\'rish',
  'Schedule Discovery Session': 'Uchrashuv belgilash',
  'Book 15-min Discovery Call': '15 daqiqalik qo\'ng\'iroq band qilish',
  'Book a 15-min Discovery Call': '15 daqiqalik qo\'ng\'iroq band qilish',
  'TASHKENT (UTC+5) • ARCHITECTING ENTERPRISE AI & SYSTEMS': 'TOSHKENT (UTC+5) • KORPORATIV AI VA TIZIMLAR ARXITEKTORI',
  ACTIVE: 'FAOL',
  'DRAG 3D ARTIFACT TO ROTATE': 'AYLANTIRISH UCHUN 3D ARTEFAKTNI SURING',
  'Multi-Agent Swarms': 'Ko\'p agentli tizimlar',
  'Fintech & Payments': 'Fintex va to\'lovlar',
  'Senior Full-Stack & AI Systems Architect': 'Senior Full-Stack va AI tizimlar arxitektori',
  'Engineering zero-compromise distributed architectures, high-throughput fintech pipelines, and autonomous AI swarms with extreme aesthetic precision.':
    'Murosasiz taqsimlangan arxitekturalar, yuqori yuklamali fintex quvurlari va avtonom AI agentlar to\'dasini yuksak estetik aniqlikda yarataman.',
  'Quest Map': 'Karyera xaritasi',
  Skills: 'Ko\'nikmalar',
  Process: 'Jarayon',
  Projects: 'Loyihalar',
  Reviews: 'Sharhlar',
  Contact: 'Aloqa',
  'Book a Call': 'Qo\'ng\'iroq band qilish',
  Book: 'Band qilish',
  'Mute interface sounds': 'Ovozni o\'chirish',
  'Enable interface sounds': 'Ovozni yoqish',
  'Available for new projects': 'Yangi loyihalar uchun ochiq',
  '2 slots left this month': 'Bu oyda 2 ta joy qoldi',
  'Senior Full-Stack & AI Engineer': 'Senior Full-Stack va AI muhandisi',
  'Architecting intelligent digital experiences at the intersection of cutting-edge web technologies and artificial intelligence.':
    'Ilg\'or veb-texnologiyalar va sun\'iy intellekt chorrahasida aqlli raqamli tizimlar yarataman.',
  'Independent Consultant / Product Engineering': 'Mustaqil maslahatchi / Mahsulot muhandisligi',
  'Building product-facing web applications, automation flows, and AI-enabled business tools that solve real operational bottlenecks for clients and startups.':
    'Mijozlar va startaplar uchun operatsion to\'siqlarni hal qiluvchi veb-ilovalar, avtomatlashtirish oqimlari va AI vositalarini yarataman.',
  'Digital Product Studio': 'Raqamli mahsulotlar studiyasi',
  'Delivered web platforms, dashboards, and internal tools using React, Node.js, and backend integrations for business and customer workflows.':
    'Biznes jarayonlari uchun React, Node.js va backend integratsiyalari asosida veb-platformalar, boshqaruv panellari va ichki vositalar yaratdim.',
  'University Studies': 'Universitet ta\'limi',
  'Focused on software engineering, algorithms, data structures, and modern application architecture with practical product implementation.':
    'Dasturiy injiniring, algoritmlar, ma\'lumotlar tuzilmalari va zamonaviy arxitekturalarni amaliy loyihalar bilan o\'rgandim.',
  'Career Journey': 'Karyera yo\'li',
  'My professional adventure through the realms of code and innovation':
    'Kod va innovatsiyalar olamidagi kasbiy faoliyatim',
  Arsenal: 'Arsenal',
  Tech: 'Texnologik',
  Stack: 'Stek',
  'Technologies I wield to craft digital excellence': 'Mukammal raqamli mahsulotlar yaratishda foydalanadigan texnologiyalarim',
  Frontend: 'Frontend',
  Backend: 'Backend',
  'AI & Tools': 'AI va vositalar',
  'Tools & Technologies': 'Vositalar va texnologiyalar',
  'Battle-Tested Methodology': 'Sinovdan o\'tgan metodologiya',
  '4-Stage Execution Framework': '4-Bosqichli Ish Jarayoni',
  'From initial concept to enterprise deployment — transparent, high-velocity engineering':
    'Boshlang\'ich g\'oyadan to to\'liq ishga tushirishgacha — shaffof va yuqori tezlikdagi muhandislik',
  'How I Deliver': 'Ish jarayoni',
  'Work Process': 'Ish jarayoni',
  'Discovery & Strategy': 'Tadqiqot va Strategiya',
  'Architecture & Contracts': 'Arxitektura va Shartnomalar',
  'AI & Full-Stack Engine': 'AI va Dasturlash',
  'Launch & Autonomous Scale': 'Ishga tushirish va Masshtab',
  'Proven Engineering Results': 'Isbotlangan muhandislik natijalari',
  'Client Outcomes': 'Mijozlar natijalari',
  'Numbers first — verified metrics and the leaders behind them':
    'Avval raqamlar — tasdiqlangan ko\'rsatkichlar va ularning ortidagi rahbarlar',
  'Uptime SLA in production': 'Ishlab chiqarishdagi mavjudlik (SLA)',
  'Average API response time': 'O\'rtacha API javob vaqti',
  'Projects delivered end-to-end': 'To\'liq topshirilgan loyihalar',
  'Client satisfaction rate': 'Mijozlar mamnuniyati',
  'Project Estimator': 'Loyihani baholash',
  'Budget Calculator': 'Byudjet kalkulyatori',
  'Get an instant estimate for your project scope': 'Loyiha hajmi bo\'yicha tezkor taxminiy narxni hisoblang',
  'Select Services': 'Xizmatlarni tanlang',
  'Frontend Development': 'Frontend ishlab chiqish',
  'Backend Development': 'Backend ishlab chiqish',
  'AI Integration': 'AI integratsiyasi',
  'Database Design': 'Ma\'lumotlar bazasi arxitekturasi',
  'API Development': 'API ishlab chiqish',
  'DevOps & Deployment': 'DevOps va bulutli joylashtirish',
  'Project Complexity': 'Loyiha murakkabligi',
  Simple: 'Oddiy',
  Medium: 'O\'rtacha',
  Complex: 'Murakkab',
  'Estimated Budget': 'Taxminiy byudjet',
  'Estimated Timeline': 'Taxminiy muddat',
  'Selected Services': 'Tanlangan xizmatlar',
  'Book Discovery Call': 'Qo\'ng\'iroq band qilish',
  'Send Inquiry': 'So\'rov yuborish',
  weeks: 'hafta',
  USD: 'AQSH dollari',
  'Let\'s Build Something Exceptional': 'Keling, ajoyib loyihani birga yaratamiz',
};

const RU: TranslationTable = {
  'Open for product, AI, and SaaS work': 'Открыт для продуктовых, AI и SaaS проектов',
  'Full-Stack Engineer • AI Automation Builder • Product Developer': 'Full-Stack инженер • Архитектор AI-систем • Разработчик продуктов',
  'I design and build fast, scalable web products, internal tools, and AI-powered experiences that help businesses automate operations and turn ideas into real customer value.':
    'Проектирую и создаю быстрые, масштабируемые веб-продукты, внутренние инструменты и решения на базе ИИ, автоматизирующие бизнес-процессы.',
  '15-minute discovery call': '15-минутный ознакомительный звонок',
  'Book a free 15-minute discovery call': 'Забронировать бесплатный 15-минутный звонок',
  'Prefer to talk it through?': 'Предпочитаете обсудить лично?',
  'Explore Work': 'Смотреть проекты',
  'Explore Masterworks': 'Исследовать проекты',
  'Schedule Discovery Session': 'Запланировать встречу',
  'Book 15-min Discovery Call': 'Забронировать 15-мин звонок',
  'Book a 15-min Discovery Call': 'Забронировать 15-мин звонок',
  'TASHKENT (UTC+5) • ARCHITECTING ENTERPRISE AI & SYSTEMS': 'ТАШКЕНТ (UTC+5) • АРХИТЕКТУРА КОРПОРАТИВНОГО ИИ И СИСТЕМ',
  ACTIVE: 'АКТИВЕН',
  'DRAG 3D ARTIFACT TO ROTATE': 'ВРАЩАЙТЕ 3D-АРТЕФАКТ МЫШЬЮ',
  'Multi-Agent Swarms': 'Мультиагентные системы',
  'Fintech & Payments': 'Финтех и платежи',
  'Senior Full-Stack & AI Systems Architect': 'Старший Full-Stack и архитектор AI-систем',
  'Engineering zero-compromise distributed architectures, high-throughput fintech pipelines, and autonomous AI swarms with extreme aesthetic precision.':
    'Проектирование бескомпромиссных распределенных архитектур, высоконагруженных финтех систем и автономных ИИ-агентов с высочайшей точностью.',
  'Quest Map': 'Карта карьеры',
  Skills: 'Навыки',
  Process: 'Процесс',
  Projects: 'Проекты',
  Reviews: 'Отзывы',
  Contact: 'Контакты',
  'Book a Call': 'Назначить звонок',
  Book: 'Записаться',
  'Mute interface sounds': 'Отключить звук',
  'Enable interface sounds': 'Включить звук',
  'Available for new projects': 'Доступен для новых проектов',
  '2 slots left this month': 'Осталось 2 слота на этот месяц',
  'Senior Full-Stack & AI Engineer': 'Старший Full-Stack и AI-инженер',
  'Architecting intelligent digital experiences at the intersection of cutting-edge web technologies and artificial intelligence.':
    'Создание интеллектуальных цифровых решений на стыке передовых веб-технологий и ИИ.',
  'Independent Consultant / Product Engineering': 'Независимый консультант / Разработка продуктов',
  'Building product-facing web applications, automation flows, and AI-enabled business tools that solve real operational bottlenecks for clients and startups.':
    'Разработка веб-приложений, автоматизации процессов и AI-инструментов, решающих реальные бизнес-задачи.',
  'Digital Product Studio': 'Студия цифровых продуктов',
  'Delivered web platforms, dashboards, and internal tools using React, Node.js, and backend integrations for business and customer workflows.':
    'Разработка веб-платформ, дашбордов и внутренних сервисов на React, Node.js и серверных интеграциях.',
  'University Studies': 'Университетское образование',
  'Focused on software engineering, algorithms, data structures, and modern application architecture with practical product implementation.':
    'Изучение программной инженерии, алгоритмов, структур данных и современных архитектурных паттернов.',
  'Career Journey': 'Карьерный путь',
  'My professional adventure through the realms of code and innovation':
    'Мой профессиональный путь в мире технологий и инноваций',
  Arsenal: 'Арсенал',
  Tech: 'Технологический',
  Stack: 'стек',
  'Technologies I wield to craft digital excellence': 'Технологии, с помощью которых я создаю качественные цифровые продукты',
  Frontend: 'Фронтенд',
  Backend: 'Бэкенд',
  'AI & Tools': 'ИИ и инструменты',
  'Tools & Technologies': 'Инструменты и технологии',
  'Battle-Tested Methodology': 'Проверенная методология',
  '4-Stage Execution Framework': '4-этапный процесс разработки',
  'From initial concept to enterprise deployment — transparent, high-velocity engineering':
    'От первоначальной концепции до корпоративного развертывания — прозрачная и быстрая разработка',
  'How I Deliver': 'Как я работаю',
  'Work Process': 'Рабочий процесс',
  'Discovery & Strategy': 'Исследование и стратегия',
  'Architecture & Contracts': 'Архитектура и контракты',
  'AI & Full-Stack Engine': 'ИИ и разработка',
  'Launch & Autonomous Scale': 'Запуск и масштабирование',
  'Proven Engineering Results': 'Доказанные результаты разработки',
  'Client Outcomes': 'Результаты клиентов',
  'Numbers first — verified metrics and the leaders behind them':
    'Сначала проверенные метрики, затем люди, стоящие за ними',
  'Uptime SLA in production': 'Доступность в продакшене (SLA)',
  'Average API response time': 'Среднее время ответа API',
  'Projects delivered end-to-end': 'Проектов сдано под ключ',
  'Client satisfaction rate': 'Удовлетворенность клиентов',
  'Project Estimator': 'Оценка проекта',
  'Budget Calculator': 'Калькулятор бюджета',
  'Get an instant estimate for your project scope': 'Получите мгновенную оценку стоимости и сроков вашего проекта',
  'Select Services': 'Выберите услуги',
  'Frontend Development': 'Frontend-разработка',
  'Backend Development': 'Backend-разработка',
  'AI Integration': 'Интеграция ИИ',
  'Database Design': 'Проектирование баз данных',
  'API Development': 'Разработка API',
  'DevOps & Deployment': 'DevOps и развертывание',
  'Project Complexity': 'Сложность проекта',
  Simple: 'Базовый',
  Medium: 'Оптимальный',
  Complex: 'Корпоративный',
  'Estimated Budget': 'Ориентировочный бюджет',
  'Estimated Timeline': 'Ориентировочный срок',
  'Selected Services': 'Выбранные услуги',
  'Book Discovery Call': 'Запланировать звонок',
  'Send Inquiry': 'Отправить заявку',
  weeks: 'нед.',
  USD: 'долларов',
  'Let\'s Build Something Exceptional': 'Давайте создадим выдающийся проект вместе',
};

const TABLES: Record<Exclude<Language, 'EN'>, TranslationTable> = { UZ, RU };

const reverseTables = {
  UZ: new Map(Object.entries(UZ).map(([eng, loc]) => [loc, eng])),
  RU: new Map(Object.entries(RU).map(([eng, loc]) => [loc, eng])),
};

const resolveEnglish = (value: string) => {
  if (value in UZ || value in RU) return value;
  return reverseTables.UZ.get(value) ?? reverseTables.RU.get(value) ?? value;
};

const translate = (value: string, language: Language) => {
  const english = resolveEnglish(value);
  if (language === 'EN') return english;
  return TABLES[language][english] ?? english;
};

const originalTextNodes = new WeakMap<Text, { prefix: string; raw: string; suffix: string }>();
const originalAttrNodes = new WeakMap<Element, Record<string, string>>();

export const AutoTranslator = ({ language }: { language: Language }) => {
  useEffect(() => {
    let applying = false;

    const shouldSkip = (element: Element | null) =>
      !element ||
      Boolean(element.closest('script, style, pre, code, textarea, [data-no-translate="true"]'));

    const translateTextNode = (node: Text) => {
      if (shouldSkip(node.parentElement)) return;
      const currentVal = node.nodeValue ?? '';

      let orig = originalTextNodes.get(node);
      if (!orig) {
        const match = currentVal.match(/^(\s*)(.*?)(\s*)$/s);
        if (!match || !match[2]) return;
        const english = resolveEnglish(match[2]);
        orig = { prefix: match[1], raw: english, suffix: match[3] };
        originalTextNodes.set(node, orig);
      }

      const next = `${orig.prefix}${language === 'EN' ? orig.raw : (TABLES[language][orig.raw] ?? orig.raw)}${orig.suffix}`;
      if (node.nodeValue !== next) {
        node.nodeValue = next;
      }
    };

    const translateAttributes = (element: Element) => {
      if (shouldSkip(element)) return;
      let map = originalAttrNodes.get(element);
      if (!map) {
        map = {};
        originalAttrNodes.set(element, map);
      }

      ['placeholder', 'title', 'aria-label'].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (!value) return;
        if (!map![attribute]) {
          map![attribute] = resolveEnglish(value);
        }
        const origEng = map![attribute];
        const next = language === 'EN' ? origEng : (TABLES[language][origEng] ?? origEng);
        if (value !== next) {
          element.setAttribute(attribute, next);
        }
      });
    };

    const walk = (root: Node) => {
      if (root.nodeType === Node.TEXT_NODE) {
        translateTextNode(root as Text);
        return;
      }
      if (root.nodeType !== Node.ELEMENT_NODE && root !== document.body) return;
      const element = root as Element;
      if (root !== document.body && shouldSkip(element)) return;
      if (root !== document.body) translateAttributes(element);

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
      let current = walker.nextNode();
      while (current) {
        if (current.nodeType === Node.TEXT_NODE) translateTextNode(current as Text);
        else translateAttributes(current as Element);
        current = walker.nextNode();
      }
    };

    applying = true;
    walk(document.body);
    applying = false;

    const observer = new MutationObserver((mutations) => {
      if (applying) return;
      applying = true;
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') walk(mutation.target);
        mutation.addedNodes.forEach(walk);
      });
      applying = false;
    });

    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  return null;
};

export const translateUI = translate;
