"use client";

import { useEffect, useState } from "react";
import { useInput } from "@/hooks/hooks";
import ContactLeft from "./_component/contact_left";
import Input from "./_component/Input";
import Textarea from "./_component/Textarea";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { UploadIco } from "@/icons/icons";

const Sales: React.FC = () => {
    const name = useInput("");
    const email = useInput("");
    const contact = useInput("");
    const site = useInput("");
    const content = useInput("");
    const [privacy, setPrivacy] = useState(false);

    const isFormComplete = name.value && email.value && contact.value && content.value && privacy;
    const fileAccept =
        "application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/jpeg, image/png";

    return (
        <div className="flex w-[1440px] mx-auto pt-[80px] pb-[160px] justify-between gap-[137px]">
            <ContactLeft />
            <div>
                <h4 className="text-titleSmall text-ePrimary font-semibold">Contact Information</h4>
                <hr className="mt-2 mb-4 bg-g200" />
                <div className="grid grid-cols-2 gap-x-[15px] gap-y-[24px] w-[591px]">
                    <Input {...name} label="이름" type="text" data-name="name" data-required={true} isRequired={true} />
                    <Input {...email} label="이메일" type="text" data-name="email" data-required={true} isRequired={true} />
                    <Input {...contact} label="연락처" type="text" data-name="contact" data-required={true} isRequired={true} />
                    <Input {...site} label="사이트 주소" type="text" />
                    <Textarea {...content} label="문의 내용" data-name="content" data-required={true} isRequired={true} className="col-span-2" />
                </div>
                <div className="mt-[24px]">
                    <div className="flex items-center gap-4">
                        <label htmlFor="file" className="flex gap-1 text-base font-semibold text-g900 align-center">
                            파일첨부
                            <UploadIco />
                        </label>
                        <input type="file" id="file" accept={fileAccept} className="w-0 h-0" />
                        <div className="flex items-center gap-2">
                            <span className="text-small text-g400">참고 문서를 업로드해 주세요. (최대 50MB) pdf, ppt, word, excel, jpg, png</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-[111px]">
                    <div className="flex gap-2 items-center">
                        <div className="rounded-[100%] flex items-center">
                            <Checkbox
                                checked={privacy}
                                indeterminate={false}
                                value="privacy"
                                onChange={(value, checked) => setPrivacy(checked)}
                                className="w-[24px] h-[24px] rounded-[25px] overflow-hidden"
                            />
                            <input type="checkbox" id="privacy" onChange={(checked) => setPrivacy(checked.target.checked)} className="w-[0px] h-[0px]" />
                        </div>
                        <label htmlFor="privacy" className="flex align-center text-small">
                            <span className="text-small text-ePrimary underline underline-offset-4">개인정보 보호정책</span>에 동의합니다.
                        </label>
                    </div>
                    <Button label="제출" disabled={!isFormComplete} className={`w-[124px]`} size="medium" btnType="secondary" onClick={() => {}} />
                </div>
            </div>
        </div>
    );
};

export default Sales;
