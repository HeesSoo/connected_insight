"use client";

import { useEffect, useState } from "react";
import { useInput } from "@/hooks/hooks";
import ContactLeft from "../_component/contact_left";
import Input from "../_component/Input";
import Textarea from "../_component/Textarea";
import Button from "@/components/Button";
import Upload from "@/public/svgs/upload.svg";

const inputRequiredClass = "after:content-['*'] after:text-brand-primary after:ml-1 after:absolute ";

const Sales: React.FC = () => {
    const name = useInput("");
    const email = useInput("");
    const contact = useInput("");
    const site = useInput("");
    const content = useInput("");
    const privacy = useInput(false);

    const isFormComplete = name.value && email.value && contact.value && content.value && privacy.value;
    const fileAccept =
        "application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/jpeg, image/png";

    return (
        <div className="flex w-[1440px] mx-auto pt-[80px] pb-[160px] justify-between gap-[137px]">
            <ContactLeft />
            <div>
                <h4 className="text-titleSmall text-brand-primary font-semibold">Contact Information</h4>
                <hr className="mt-2 mb-4 bg-gray-200" />
                <div className="grid grid-cols-2 gap-x-[15px] gap-y-[24px] w-[591px]">
                    <Input {...name} label="이름" type="text" data-name="name" data-required={true} isRequired={true} />
                    <Input {...email} label="이메일" type="text" data-name="email" data-required={true} isRequired={true} />
                    <Input {...contact} label="연락처" type="text" data-name="contact" data-required={true} isRequired={true} />
                    <Input {...site} label="사이트 주소" type="text" />
                    <Textarea {...content} label="문의 내용" data-name="content" data-required={true} isRequired={true} className="col-span-2" />
                </div>
                <div className="mt-[24px]">
                    <div className="flex items-center gap-4">
                        <label htmlFor="file" className="flex gap-1 text-base font-semibold text-gray-900 align-center">
                            파일첨부
                            <Upload width={24} height={24} />
                        </label>
                        <input type="file" id="file" accept={fileAccept} className="w-0 h-0" />
                        <div className="flex items-center gap-2">
                            <span className="text-small text-gray-400">참고 문서를 업로드해 주세요. (최대 50MB) pdf, ppt, word, excel, jpg, png</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between align-center mt-[111px]">
                    <div className="flex gap-2 align-center">
                        <input type="checkbox" id="privacy" value={privacy.value} onChange={privacy.onChange} className="w-[24px] h-[24px]" />
                        <label htmlFor="privacy" className="flex align-center text-small">
                            <span className="text-small text-brand-primary underline underline-offset-4">개인정보 보호정책</span>에 동의합니다.
                        </label>
                    </div>
                    <Button
                        label="제출"
                        disabled={!isFormComplete}
                        className="flex align-center justify-center w-[124px] h-[48px] :disabled:bg-gray-200 :disabled:text-gray-400"
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sales;
