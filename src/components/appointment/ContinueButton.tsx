// function ContinueButton() {
//     return (
//         <div className="pt-4">
//             <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all transform hover:scale-[1.01] active:scale-[0.99]">
//                 Tiếp tục
//             </button>
//         </div>
//     );
// }

// export default ContinueButton;
interface ContinueButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

function ContinueButton({ onClick, disabled = false }: ContinueButtonProps) {
    return (
        <div className="pt-4">
            {/* <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className={`w-full text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all transform ${
                    disabled
                        ? "bg-slate-300 cursor-not-allowed"
                        : "bg-primary hover:bg-blue-600 hover:scale-[1.01] active:scale-[0.99]"
                }`}
            >
                Tiếp tục
            </button> */}
            <button 
            type="button"
            onClick={onClick}
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all transform hover:scale-[1.01] active:scale-[0.99]">
                Tiếp tục
            </button>
        </div>
    );
}

export default ContinueButton;