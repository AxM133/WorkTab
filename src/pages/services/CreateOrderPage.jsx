// src/pages/services/CreateOrderPage.jsx

import { useRef, useState } from "react";

const categories = [
  "Дизайн",
  "Разработка",
  "Тексты и переводы",
  "Маркетинг",
  "SEO и оптимизация",
];

const subcategories = [
  "Web-дизайн",
  "UI/UX дизайн",
  "Мобильные приложения",
  "Брендинг",
  "Логотипы",
];

export function CreateOrderPage() {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    days: "14",
    budget: "250 000",
  });

  const [files, setFiles] = useState([]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    const validFiles = selectedFiles.filter(
      (file) => file.size <= 500 * 1024
    );

    setFiles((prev) => [...prev, ...validFiles].slice(0, 5));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const order = {
      ...form,
      files,
    };

    console.log("Новый заказ:", order);
  };

  return (
    <main className="min-h-screen bg-[#F8FBFD] px-5 py-12 text-[#18181C] lg:px-0">
      <div className="mx-auto max-w-[1180px]">
        <h1 className="text-[26px] font-bold tracking-[-0.5px]">
          Опубликуйте ваш заказ
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 max-w-[700px]"
        >
          {/* TITLE */}

          <div>
            <label className="mb-3 block text-sm font-semibold">
              Название
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              placeholder="Например: Нужно разработать дизайн сайта"
              className="h-12 w-full rounded-xl border border-[#E3E7EC] bg-white px-4 text-sm outline-none transition placeholder:text-[#B9B6D8] focus:border-[#20B879] focus:ring-4 focus:ring-[#20B879]/10"
              required
            />
          </div>

          {/* DESCRIPTION */}

          <div className="mt-7">
            <label className="mb-3 block text-sm font-semibold">
              Описание
            </label>

            <textarea
              value={form.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              placeholder="Кратко опишите свой заказ"
              rows={7}
              className="w-full resize-y rounded-xl border border-[#E3E7EC] bg-white px-4 py-4 text-sm outline-none transition placeholder:text-[#B9B6D8] focus:border-[#20B879] focus:ring-4 focus:ring-[#20B879]/10"
              required
            />
          </div>

          {/* CATEGORY */}

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-3 block text-sm font-semibold">
                Категория
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  updateField("category", e.target.value)
                }
                className="h-12 w-full rounded-xl border border-[#E3E7EC] bg-white px-4 text-sm text-[#55565E] outline-none transition focus:border-[#20B879] focus:ring-4 focus:ring-[#20B879]/10"
                required
              >
                <option value="">Выберите категорию</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold">
                Подкатегория
              </label>

              <select
                value={form.subcategory}
                onChange={(e) =>
                  updateField("subcategory", e.target.value)
                }
                className="h-12 w-full rounded-xl border border-[#E3E7EC] bg-white px-4 text-sm text-[#55565E] outline-none transition focus:border-[#20B879] focus:ring-4 focus:ring-[#20B879]/10"
                required
              >
                <option value="">Выберите подкатегорию</option>

                {subcategories.map((subcategory) => (
                  <option
                    key={subcategory}
                    value={subcategory}
                  >
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DAYS */}

          <div className="mt-7">
            <label className="mb-3 block text-sm font-semibold">
              Срок выполнения работы в днях
            </label>

            <input
              type="number"
              min="1"
              value={form.days}
              onChange={(e) =>
                updateField("days", e.target.value)
              }
              className="h-12 w-full rounded-xl border border-[#E3E7EC] bg-white px-4 text-sm outline-none transition focus:border-[#20B879] focus:ring-4 focus:ring-[#20B879]/10"
              required
            />
          </div>

          {/* BUDGET */}

          <div className="mt-7">
            <label className="mb-3 block text-sm font-semibold">
              Бюджет в тенге
            </label>

            <input
              type="text"
              value={form.budget}
              onChange={(e) =>
                updateField("budget", e.target.value)
              }
              className="h-12 w-full rounded-xl border border-[#E3E7EC] bg-white px-4 text-sm outline-none transition focus:border-[#20B879] focus:ring-4 focus:ring-[#20B879]/10"
              required
            />
          </div>

          {/* FILES */}

          <div className="mt-8">
            <h2 className="mb-4 text-sm font-semibold">
              Документы
            </h2>

            <div className="rounded-2xl border border-[#E1E6EC] bg-white p-5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex min-h-[170px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#DCD7F6] bg-[#F7F4FF] px-5 transition hover:border-[#20B879] hover:bg-[#F3FFF9]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFAB55] text-white shadow-lg shadow-[#FFAB55]/20">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 16V4" />
                    <path d="m7 9 5-5 5 5" />
                    <path d="M5 20h14" />
                  </svg>
                </div>

                <span className="text-sm font-medium text-[#686873]">
                  Перетащите файл сюда
                </span>

                <span className="mt-1 text-xs text-[#A19DB5]">
                  или
                </span>

                <span className="mt-1 text-sm font-semibold text-[#FF9E48]">
                  выберите файл
                </span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".doc,.docx,.pdf,.png,.jpg,.jpeg"
                onChange={handleFiles}
                className="hidden"
              />

              <p className="mt-3 text-[10px] leading-4 text-[#9999A2]">
                Форматы: doc, docx, pdf, png, jpg, jpeg.
                Максимальный размер одного файла — 500 КБ.
              </p>

              {files.length > 0 && (
                <div className="mt-5 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between rounded-xl border border-[#E8EBEF] bg-[#FAFBFC] px-4 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EFEAFF] text-[#776FB0]">
                          📄
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-[#424249]">
                            {file.name}
                          </p>

                          <p className="mt-1 text-[10px] text-[#9999A2]">
                            {(file.size / 1024).toFixed(1)} КБ
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-3 text-xl text-[#9B9BA4] transition hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* BUTTONS */}

          <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-full bg-[#F0EDFF] px-12 py-3.5 text-sm font-semibold text-[#686481] transition hover:bg-[#E4DFFF]"
            >
              Назад
            </button>

            <button
              type="submit"
              className="rounded-full bg-[#20BD77] px-10 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(32,189,119,0.2)] transition hover:-translate-y-0.5 hover:bg-[#18AB6A]"
            >
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}