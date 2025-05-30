# Автоматическое исправление ESLint при сохранении

## Что настроено

1. **settings.json** - настройки VSCode для автоматического исправления
2. **.eslintrc** - обновлено правило `consistent-type-imports` с опцией `fixStyle`

## Как работает

При сохранении файлов (.ts, .tsx, .js, .jsx) ESLint автоматически:
- Исправляет импорты типов (добавляет `type` перед импортом)
- Применяет другие автоисправимые правила

## Пример

**До:**
```typescript
import { ComponentType } from 'react';
```

**После автосохранения:**
```typescript
import type { ComponentType } from 'react';
```

## Требования

- Расширение ESLint должно быть установлено в VSCode
- Файлы должны быть в TypeScript проекте 