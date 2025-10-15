/**
 * label: 라벨
 * value: 값
 * onChange: 값 변경 이벤트
 * placeholder: 플레이스홀더
 * type: 타입
 * isRequired: 필수 여부
 * isErr: 에러 여부
 * errMsg: 에러 메시지
 * disabled: 비활성화 여부
 * maxLength: 최대 길이
 * minLength: 최소 길이
 * onKeyDown: 키 다운 이벤트
 * onKeyUp: 키 업 이벤트
 * onFocus: 포커스 이벤트
 * onBlur: 블러 이벤트
 * onInput: 입력 이벤트
 */
interface PropsType {
    label?: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    isRequired?: boolean;
    isErr?: boolean;
    errMsg?: string;
    disabled?: boolean;
    maxLength?: number;
    minLength?: number;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onInput?: React.FormEventHandler<HTMLInputElement>;
    className?: string;
}

export default function Input({
    label = "",
    value,
    onChange,
    placeholder,
    isErr = false,
    errMsg,
    isRequired = false,
    disabled = false,
    maxLength,
    minLength,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    onInput,
    className,
}: PropsType) {
    return (
        <div className={`flex-1 relative col-span-full`}>
            {!value && label !== "" && (
                <div className="text-base text-g400 absolute top-[4px] left-[4px]">
                    {label}
                    {isRequired && <span className="text-base text-ePrimary ml-1">*</span>}
                </div>
            )}

            <div className={`w-full flex gap-2`}>
                <textarea
                    className={`flex-1 h-[160px] border-0 border-b border-g200 pl-[4px] pt-[4px] text-base ${className}`}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    // onKeyDown={onKeyDown}
                    // onKeyUp={onKeyUp}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // maxLength={maxLength}
                    // minLength={minLength}
                    // onInput={onInput}
                >
                    {value}
                </textarea>
            </div>
            {isErr && <div className="text-red text-xs mt-2">{errMsg}</div>}
        </div>
    );
}
