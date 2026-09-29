import { Input, ListInput, Select, TagInput } from '@/components/ui'
import { COUNTRIES, LANGUAGES } from '@/constants/profile'

/** Шаг «Детали профиля»: страна, город, языки, образование, сертификаты */
export function DetailsFields({ values, errors, onChange }) {
  return (
    <div className="flex flex-col gap-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Страна"
          required
          value={values.country}
          onChange={(event) => onChange('country', event.target.value)}
          options={COUNTRIES}
          placeholder="Выберите страну"
          error={errors.country}
        />
        <Input
          label="Город"
          required
          value={values.city}
          onChange={(event) => onChange('city', event.target.value)}
          placeholder="Алматы"
          error={errors.city}
          autoComplete="address-level2"
        />
      </div>

      <TagInput
        label="Знание языков"
        required
        value={values.languages}
        onChange={(languages) => onChange('languages', languages)}
        suggestions={LANGUAGES}
        placeholder="Добавьте язык"
        error={errors.languages}
        max={8}
      />

      <ListInput
        label="Образование"
        value={values.education}
        onChange={(education) => onChange('education', education)}
        placeholder="Страна, учебное заведение, степень"
        addLabel="Добавить образование"
        hint="Например: Казахстан, КазНУ, Бакалавр"
      />

      <ListInput
        label="Сертификаты"
        value={values.certificates}
        onChange={(certificates) => onChange('certificates', certificates)}
        placeholder="Название, год получения"
        addLabel="Добавить сертификат"
      />
    </div>
  )
}
