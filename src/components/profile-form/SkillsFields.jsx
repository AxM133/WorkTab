import { TagInput, Textarea } from '@/components/ui'
import { ABOUT_MIN_LENGTH, SKILL_SUGGESTIONS } from '@/constants/profile'

/** Шаг «Навыки и опыт»: инструменты / технологии и рассказ о себе */
export function SkillsFields({ values, errors, onChange }) {
  const aboutLength = values.about.trim().length

  return (
    <div className="flex flex-col gap-7">
      <TagInput
        label="Навыки и инструменты"
        required
        value={values.skills}
        onChange={(skills) => onChange('skills', skills)}
        suggestions={SKILL_SUGGESTIONS[values.categoryId] ?? []}
        placeholder="Добавьте навык"
        error={errors.skills}
        hint="Введите навык и нажмите Enter или выберите из популярных. Минимум 3"
      />

      <Textarea
        label="О себе"
        required
        value={values.about}
        onChange={(event) => onChange('about', event.target.value)}
        maxLength={1000}
        rows={7}
        placeholder="Сколько лет в профессии, с какими компаниями и проектами работали, чем можете быть полезны заказчику…"
        error={errors.about}
        hint={
          aboutLength < ABOUT_MIN_LENGTH
            ? `Ещё минимум ${ABOUT_MIN_LENGTH - aboutLength} символов`
            : 'Отлично! Подробное описание повышает доверие заказчиков'
        }
      />
    </div>
  )
}
