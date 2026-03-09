// function AppointmentSteps() {
//     return (
//         <div className="bg-white dark:bg-slate-900 rounded-xl p-6 mb-8 border border-slate-200 dark:border-slate-800 shadow-sm">
//             <div className="flex items-center max-w-2xl mx-auto">
//                 <div className="flex flex-col items-center flex-1">
//                     <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mb-2 font-medium">
//                         1
//                     </div>
//                     <span className="text-xs font-medium text-primary">Chọn lịch khám</span>
//                 </div>

//                 <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-grow -mt-6"></div>

//                 <div className="flex flex-col items-center flex-1">
//                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-2 font-medium">
//                         2
//                     </div>
//                     <span className="text-xs font-medium text-slate-400">Xác nhận</span>
//                 </div>

//                 <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-grow -mt-6"></div>

//                 <div className="flex flex-col items-center flex-1">
//                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-2 font-medium">
//                         3
//                     </div>
//                     <span className="text-xs font-medium text-slate-400">Thanh toán</span>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AppointmentSteps;

interface AppointmentStepsProps {
    currentStep: 1 | 2 | 3;
}

function AppointmentSteps({ currentStep }: AppointmentStepsProps) {
    const getStepCircleClass = (step: number) => {
        if (step === currentStep) {
            return "bg-primary text-white";
        }

        if (step < currentStep) {
            return "bg-primary/10 text-primary border border-primary";
        }

        return "bg-slate-100 dark:bg-slate-800 text-slate-400";
    };

    const getStepTextClass = (step: number) => {
        if (step === currentStep) {
            return "text-primary";
        }

        if (step < currentStep) {
            return "text-primary";
        }

        return "text-slate-400";
    };

    const getLineClass = (step: number) => {
        return step < currentStep
            ? "bg-primary"
            : "bg-slate-200 dark:bg-slate-800";
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 mb-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center max-w-2xl mx-auto">
                <div className="flex flex-col items-center flex-1">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-medium ${getStepCircleClass(
                            1
                        )}`}
                    >
                        1
                    </div>
                    <span
                        className={`text-xs font-medium ${getStepTextClass(1)}`}
                    >
                        Chọn lịch khám
                    </span>
                </div>

                <div className={`h-[1px] flex-grow -mt-6 ${getLineClass(1)}`}></div>

                <div className="flex flex-col items-center flex-1">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-medium ${getStepCircleClass(
                            2
                        )}`}
                    >
                        2
                    </div>
                    <span
                        className={`text-xs font-medium ${getStepTextClass(2)}`}
                    >
                        Xác nhận
                    </span>
                </div>

                <div className={`h-[1px] flex-grow -mt-6 ${getLineClass(2)}`}></div>

                <div className="flex flex-col items-center flex-1">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-medium ${getStepCircleClass(
                            3
                        )}`}
                    >
                        3
                    </div>
                    <span
                        className={`text-xs font-medium ${getStepTextClass(3)}`}
                    >
                        Thanh toán
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AppointmentSteps;