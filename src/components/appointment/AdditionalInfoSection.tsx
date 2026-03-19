import { useCallback, useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

type AdditionalInfoSectionProps = {
  chiefComplaint: string;
  symptoms: string;
  patientNotes: string;
  onChiefComplaintChange: (value: string) => void;
  onSymptomsChange: (value: string) => void;
  onPatientNotesChange: (value: string) => void;
};

function AdditionalInfoSection({
  chiefComplaint,
  symptoms,
  patientNotes,
  onChiefComplaintChange,
  onSymptomsChange,
  onPatientNotesChange,
}: AdditionalInfoSectionProps) {
  const quillRef = useRef<ReactQuill | null>(null);

  const base64ImageCount = useMemo(
    () => (patientNotes.match(/data:image\//gi) ?? []).length,
    [patientNotes],
  );

  const symptomTags = useMemo(
    () =>
      symptoms
        .split(/[\n,]+/) 
        .map((item) => item.trim())
        .filter(Boolean),
    [symptoms],
  );

  const handleInsertImage = useCallback(() => {
    if (base64ImageCount >= 5) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const editor = quillRef.current?.getEditor();
        if (!editor) return;

        const currentCount = (
          editor.root.innerHTML.match(/data:image\//gi) ?? []
        ).length;
        if (currentCount >= 5) return;

        const range = editor.getSelection(true);
        const index = range?.index ?? editor.getLength();
        editor.insertEmbed(index, "image", reader.result as string, "user");
        editor.setSelection(index + 1, 0);
      };
      reader.readAsDataURL(file);
    };
  }, [base64ImageCount]);

  const quillModules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image"],
        ["clean"],
      ],
      handlers: {
        image: handleInsertImage,
      },
    }),
    [handleInsertImage],
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <span className="material-icons text-primary">info</span>
        <h4 className="font-bold">Thông tin bổ sung (không bắt buộc)</h4>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm dark:text-slate-400 font-semibold mb-2">
            Lý do khám
          </label>
          <input
            type="text"
            value={chiefComplaint}
            onChange={(event) => onChiefComplaintChange(event.target.value)}
            placeholder="Ví dụ: Đau ngực, ho kéo dài..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-sm dark:text-slate-400 font-semibold mb-2">
            Triệu chứng
          </label>
          <textarea
  rows={3}
  value={symptoms}
  onChange={(e) => onSymptomsChange(e.target.value)}
  placeholder="Nhập triệu chứng, ví dụ: ho, sốt, khó thở"
  className="
    w-full rounded-xl border border-slate-200
    px-4 py-3 text-sm
    focus:bg-white
    focus:outline-none
    focus:ring-2 focus:ring-primary/20
    focus:border-primary
    transition-all
  "
/>

          {symptomTags.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {symptomTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Ghi chú bệnh nhân
          </label>
          <div className="appointment-quill-wrapper rounded-lg border border-slate-200 overflow-hidden">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={patientNotes}
              onChange={onPatientNotesChange}
              modules={quillModules}
              placeholder="Nhập ghi chú chi tiết cho bác sĩ..."
            />
          </div>

          {base64ImageCount > 5 ? (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-700 mt-2">
              Giới hạn tối đa 5 ảnh mỗi lần đặt lịch.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfoSection;
