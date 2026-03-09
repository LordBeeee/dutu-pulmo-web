// function CalendarSection() {
//     return (
//         <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
//             <div className="flex items-center space-x-2 mb-6">
//                 <span className="material-icons text-primary">calendar_today</span>
//                 <h4 className="font-bold">Chọn ngày khám</h4>
//             </div>

//             <div className="max-w-md mx-auto">
//                 <div className="flex items-center justify-between mb-6 px-4">
//                     <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
//                         <span className="material-icons">chevron_left</span>
//                     </button>
//                     <span className="font-bold text-primary">Tháng 01 - 2026</span>
//                     <button className="p-2 bg-primary text-white rounded-lg">
//                         <span className="material-icons">chevron_right</span>
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-7 text-center text-xs mb-4">
//                     <div className="text-slate-400 py-2">CN</div>
//                     <div className="text-slate-400 py-2">T2</div>
//                     <div className="text-slate-400 py-2">T3</div>
//                     <div className="text-slate-400 py-2">T4</div>
//                     <div className="text-slate-400 py-2">T5</div>
//                     <div className="text-slate-400 py-2">T6</div>
//                     <div className="text-slate-400 py-2">T7</div>

//                     <div className="py-3 text-slate-300"></div>
//                     <div className="py-3 text-slate-300"></div>
//                     <div className="py-3 text-slate-300"></div>
//                     <div className="py-3 text-slate-300"></div>

//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">1</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">2</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">3</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">4</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">5</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">6</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">7</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">8</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">9</div>

//                     <div className="py-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 cursor-not-allowed">
//                         10
//                         <br />
//                         <span className="text-[8px]">Hết lịch</span>
//                     </div>

//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">11</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">12</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">13</div>

//                     <div className="py-3 bg-primary text-white rounded-lg font-medium shadow-md shadow-primary/20">
//                         28
//                         <br />
//                         <span className="text-[8px]">Đang chọn</span>
//                     </div>

//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">15</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">16</div>
//                     <div className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium">17</div>
//                 </div>

//                 <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
//                     <div className="flex items-center space-x-2">
//                         <div className="w-3 h-3 rounded-full bg-primary"></div>
//                         <span className="text-[10px] text-slate-500">Ngày có thể đặt lịch khám</span>
//                     </div>

//                     <div className="flex items-center space-x-2">
//                         <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200"></div>
//                         <span className="text-[10px] text-slate-500">Ngày không thể đặt lịch khám</span>
//                     </div>

//                     <div className="flex items-center space-x-2">
//                         <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                         <span className="text-[10px] text-slate-500">Ngày nghỉ lễ</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
        
//     );
// }

// export default CalendarSection;

import { useEffect, useMemo, useState } from "react";

interface TimeSlotSummaryItem {
    date: string; // YYYY-MM-DD
    count: number;
    hasAvailability: boolean;
}

interface CalendarSectionProps {
    doctorId: string;
    selectedDate: string | null;
    onSelectDate: (date: string) => void;
}

function CalendarSection({
    doctorId,
    selectedDate,
    onSelectDate,
}: CalendarSectionProps) {
    const [summaryData, setSummaryData] = useState<TimeSlotSummaryItem[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const today = useMemo(() => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now;
    }, []);

    const oneMonthLater = useMemo(() => {
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return nextMonth;
    }, [today]);

    useEffect(() => {
        if (!doctorId) return;

        const from = formatDate(today);
        const to = formatDate(oneMonthLater);

        fetch(
            `https://dutu-pulmo-be.onrender.com/public/doctors/${doctorId}/time-slots/summary?from=${from}&to=${to}`
        )
            .then((res) => {
                if (!res.ok) throw new Error("Không lấy được dữ liệu lịch khám");
                return res.json();
            })
            .then((data) => {
                setSummaryData(data.data || []);
            })
            .catch((error) => {
                console.error("Lỗi lấy summary time slots:", error);
            });
    }, [doctorId, today, oneMonthLater]);

    const summaryMap = useMemo(() => {
        const map = new Map<string, TimeSlotSummaryItem>();
        summaryData.forEach((item) => {
            map.set(item.date, item);
        });
        return map;
    }, [summaryData]);

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    ).getDay();

    const monthLabel = `Tháng ${String(currentMonth.getMonth() + 1).padStart(2, "0")} - ${currentMonth.getFullYear()}`;

    const canGoPrev = !isSameMonth(currentMonth, today);
    const canGoNext = currentMonth < new Date(oneMonthLater.getFullYear(), oneMonthLater.getMonth(), 1);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
                <span className="material-icons text-primary">calendar_today</span>
                <h4 className="font-bold">Chọn ngày khám</h4>
            </div>

            <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6 px-4">
                    <button
                        type="button"
                        disabled={!canGoPrev}
                        onClick={() =>
                            setCurrentMonth(
                                new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth() - 1,
                                    1
                                )
                            )
                        }
                        className={`p-2 rounded-lg ${
                            canGoPrev
                                ? "hover:bg-slate-100 dark:hover:bg-slate-800"
                                : "opacity-40 cursor-not-allowed"
                        }`}
                    >
                        <span className="material-icons">chevron_left</span>
                    </button>

                    <span className="font-bold text-primary">{monthLabel}</span>

                    <button
                        type="button"
                        disabled={!canGoNext}
                        onClick={() =>
                            setCurrentMonth(
                                new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth() + 1,
                                    1
                                )
                            )
                        }
                        className={`p-2 rounded-lg ${
                            canGoNext
                                ? "bg-primary text-white"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                    >
                        <span className="material-icons">chevron_right</span>
                    </button>
                </div>

                <div className="grid grid-cols-7 text-center text-xs mb-4">
                    {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                        <div key={day} className="text-slate-400 py-2">
                            {day}
                        </div>
                    ))}

                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                        <div key={`empty-${index}`} className="py-3 text-slate-300"></div>
                    ))}

                    {/* {daysInMonth.map((day) => {
                        const dateObj = new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth(),
                            day
                        );
                        dateObj.setHours(0, 0, 0, 0);

                        const dateStr = formatDate(dateObj);
                        const item = summaryMap.get(dateStr);

                        const isPast = dateObj < today;
                        const isOutOfRange = dateObj > oneMonthLater;
                        const isSelected = selectedDate === dateStr;
                        const isAvailable = item?.count && item.count > 0;
                        const isFull = item && item.count === 0;

                        if (isPast || isOutOfRange) {
                            return (
                                <div
                                    key={dateStr}
                                    className="py-3 rounded-lg text-slate-300 cursor-not-allowed"
                                >
                                    {day}
                                </div>
                            );
                        }

                        if (isSelected) {
                            return (
                                <button
                                    key={dateStr}
                                    type="button"
                                    onClick={() => onSelectDate(dateStr)}
                                    className="py-3 bg-primary text-white rounded-lg font-medium shadow-md shadow-primary/20"
                                >
                                    {day}
                                    <br />
                                    <span className="text-[8px]">Đang chọn</span>
                                </button>
                            );
                        }

                        if (isFull) {
                            return (
                                <div
                                    key={dateStr}
                                    className="py-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                                >
                                    {day}
                                    <br />
                                    <span className="text-[8px]">Hết lịch</span>
                                </div>
                            );
                        }

                        if (isAvailable) {
                            return (
                                <button
                                    key={dateStr}
                                    type="button"
                                    onClick={() => onSelectDate(dateStr)}
                                    className="py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium"
                                >
                                    {day}
                                </button>
                            );
                        }

                        return (
                            <div
                                key={dateStr}
                                className="py-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                            >
                                {day}
                            </div>
                        );
                    })} */}
                    {daysInMonth.map((day) => {
                        const dateObj = new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth(),
                            day
                        );
                        dateObj.setHours(0, 0, 0, 0);

                        const dateStr = formatDate(dateObj);
                        const item = summaryMap.get(dateStr);

                        const isPast = dateObj < today;
                        const isOutOfRange = dateObj > oneMonthLater;
                        const isSelected = selectedDate === dateStr;
                        const count = item?.count ?? 0;
                        const isAvailable = count > 0;
                        const isFull = !!item && count === 0;

                        if (isPast || isOutOfRange) {
                            return (
                                <div
                                    key={dateStr}
                                    className="py-3 rounded-lg text-slate-300 cursor-not-allowed"
                                >
                                    {day}
                                </div>
                            );
                        }

                        if (isSelected) {
                            return (
                                <button
                                    key={dateStr}
                                    type="button"
                                    onClick={() => onSelectDate(dateStr)}
                                    className="py-3 rounded-lg bg-primary text-white font-medium shadow-md shadow-primary/20"
                                >
                                    <div>{day}</div>
                                    <div className="text-[8px] mt-1">Đang chọn</div>
                                </button>
                            );
                        }

                        if (isFull) {
                            return (
                                <div
                                    key={dateStr}
                                    className="py-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                                >
                                    <div>{day}</div>
                                    <div className="text-[8px] mt-1">Hết lịch</div>
                                </div>
                            );
                        }

                        if (isAvailable) {
                            return (
                                <button
                                    key={dateStr}
                                    type="button"
                                    onClick={() => onSelectDate(dateStr)}
                                    className="py-3 rounded-lg bg-blue-50 text-primary font-medium hover:opacity-90 transition"
                                >
                                    <div>{day}</div>
                                    <div className="text-[8px] mt-1">Còn {count} slot</div>
                                </button>
                            );
                        }

                        return (
                            <div
                                key={dateStr}
                                className="py-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                            >
                                <div>{day}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-[10px] text-slate-500">
                            Ngày có thể đặt lịch khám
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200"></div>
                        <span className="text-[10px] text-slate-500">
                            Ngày không thể đặt lịch khám
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-[10px] text-slate-500">Ngày nghỉ lễ</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getDaysInMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: totalDays }, (_, i) => i + 1);
}

function isSameMonth(date1: Date, date2: Date) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth()
    );
}

export default CalendarSection;