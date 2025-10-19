"use client";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { useInput } from "@/hooks/hooks";
import { useTranslation } from "@/hooks/useTranslation";
import Upload from "@/public/svgs/upload.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ContactLeft from "./_component/contact_left";
import Input from "./_component/Input";
import Textarea from "./_component/Textarea";

const privacyPolicy = `
주식회사 아이온(이하 '회사')은 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.<br/>
제1조 (개인정보의 처리 목적)<br/>
회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.<br/>
지원 서비스 제공 및 관리: 홈페이지를 통한 제품/솔루션 문의, 기술 지원 요청, 서비스 관련 상담 등 지원 업무에 대한 본인 확인, 요청 사항 확인 및 처리, 처리 결과 통보, 원활한 의사소통 경로 확보를 목적으로 개인정보를 처리합니다.<br/>
민원사무 처리: 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등을 목적으로 개인정보를 처리합니다.<br/>
마케팅 및 광고에의 활용 (선택 사항): 회사의 신규 서비스(제품) 및 이벤트, 업데이트 등에 대한 정보 제공 (별도 동의 시에 한함)<br/>
제2조 (개인정보의 처리 및 보유 기간)<br/>
① 회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.<br/>
② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.<br/>
지원 서비스 (문의, 기술 지원 등) 관리: 문의/지원 요청 처리 완료 후 3년 (상담 기록 및 처리 결과 확인 등을 위한 보존 기간)<br/>
(단, 「전자상거래 등에서의 소비자보호에 관한 법률」 등 다른 법령에 따라 보존하여야 하는 경우에는 해당 법령의 기간을 따릅니다.)<br/>
제3조 (처리하는 개인정보 항목)<br/>
회사는 지원 서비스 제공 및 원활한 의사소통을 위해 다음의 개인정보 항목을 처리하고 있습니다.<br/>
필수 항목:<br/>
업체/기관 정보: 회사명, 소속 부서<br/>
담당자 정보: 이름, 연락처(전화번호 또는 휴대폰 번호), 이메일 주소, 직책<br/>
기타: 문의 내용<br/>
서비스 이용 과정에서 자동 생성될 수 있는 정보: 접속 IP 정보, 서비스 이용 기록 등<br/>
제4조 (개인정보의 제3자 제공)<br/>
회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.<br/>
(주의: 서비스 제공을 위해 외부에 개인정보를 제공할 계획이 있다면, 해당 내용(제공받는 자, 제공 목적, 제공 항목, 보유 및 이용 기간)을 구체적으로 명시하고 정보주체의 동의를 받아야 합니다. 제3자 제공이 없다면 이 조항은 "원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다." 등으로 명시합니다.)<br/>
제5조 (개인정보 처리 업무의 위탁)<br/>
회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.<br/>
(주의: 개인정보 처리 업무를 외부 업체에 위탁하는 경우가 있다면 아래 예시와 같이 기재해야 합니다. 예: 서버 관리, 시스템 유지보수 등 위탁이 없다면 이 조항은 삭제하거나 "회사는 개인정보 처리 업무를 위탁하지 않습니다." 등으로 명시합니다.)<br/>
위탁받는 자 (수탁업체)위탁하는 업무의 내용[수탁업체 명]웹사이트/시스템 유지보수 및 관리[수탁업체 명]고객 문의 응대 및 A/S 처리<br/>
회사는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행 목적 외 개인정보 처리 금지, 기술적·관리적 보호조치, 재위탁 제한, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.<br/>
제6조 (정보주체의 권리·의무 및 그 행사방법)<br/>
① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.<br/>
개인정보 열람 요구<br/>
오류 등이 있을 경우 정정 요구<br/>
삭제 요구<br/>
처리 정지 요구<br/>
② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 할 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.<br/>
제7조 (개인정보의 파기)<br/>
① 회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.<br/>
② 개인정보 파기의 절차 및 방법은 제6조의 내용을 따릅니다.<br/>
제8조 (개인정보의 안전성 확보조치)<br/>
회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다. (관리적, 기술적, 물리적 조치에 대한 간략한 설명)<br/>
제9조 (개인정보 보호책임자)<br/>
① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.<br/>
개인정보 보호책임자<br/>
성명: [성명 기재]<br/>
직책: [직책 기재]<br/>
연락처: 전화 [전화번호], 이메일 [이메일 주소]<br/>
② 정보주체는 회사의 서비스(또는 사업)을 이용하면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해 구제 등에 관한 사항을 개인정보 보호책임자 및 담당 부서로 문의할 수 있습니다.<br/>
제10조 (권익침해 구제방법)<br/>
(제10조는 기존 내용과 동일하게 외부 신고 기관 안내를 유지합니다.)<br/>
제11조 (개인정보 처리방침 변경)<br/>
① 이 개인정보 처리방침은 **[시행일 기재, 예: 2025년 10월 18일]**부터 적용됩니다.<br/>
② 이 개인정보 처리방침의 개정(변경) 시에는 웹사이트 공지사항(또는 개별 공지)을 통하여 공지할 것입니다.
`;

const Sales: React.FC = () => {
    const { t } = useTranslation();

    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const name = useInput("");
    const email = useInput("");
    const contact = useInput("");
    const account = useInput("");
    const department = useInput("");
    const position = useInput("");
    const site = useInput("");
    const content = useInput("");
    const [privacy, setPrivacy] = useState(false);

    const [file, setFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const isFormComplete = !!(name.value && email.value && contact.value && account.value && content.value && privacy);

    const fileAccept =
        "application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/jpeg, image/png";

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setFile(f);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        setMessage(null);

        if (!isFormComplete) {
            setMessage("필수 항목을 모두 입력하고 개인정보 보호정책에 동의해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("email", email.value);
        formData.append("contact", contact.value);
        // optional fields (API에 맞춰 key명 사용)
        formData.append("account", account.value); // 회사명(없으면 빈 문자열)
        formData.append("department", department.value || "");
        formData.append("position", position.value || "");
        formData.append("site_url", site.value || "");
        formData.append("content", content.value);
        if (file) formData.append("file", file);

        try {
            setSubmitting(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contactus`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 201) {
                alert("문의가 정상적으로 접수되었습니다.");
                router.push("/");
            } else {
                setMessage("전송 중 오류가 발생했습니다.");
            }
        } catch (err) {
            console.error(err);
            setMessage("전송 중 오류가 발생했습니다.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex w-[1440px] mx-auto pt-[80px] pb-[160px] justify-between gap-[137px]">
            <ContactLeft />
            <div>
                <h4 className="text-titleSmall text-ePrimary font-semibold">Contact Information</h4>
                <hr className="mt-2 mb-4 bg-g200" />
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-x-[15px] gap-y-[24px] w-[591px]">
                        <Input {...name} label={t["contact-name"]} type="text" data-name="name" data-required={true} isRequired={true} />
                        <Input {...email} label={t["contact-email"]} type="text" data-name="email" data-required={true} isRequired={true} />
                        <Input {...contact} label={t["contact-contact"]} type="text" data-name="contact" data-required={true} isRequired={true} />
                        <Input {...account} label={t["contact-account"]} type="text" data-name="account" data-required={true} isRequired={true} />
                        <Input {...department} label={t["contact-department"]} type="text" data-name="department" data-required={false} isRequired={false} />
                        <Input {...position} label={t["contact-position"]} type="text" data-name="position" data-required={false} isRequired={false} />
                    </div>

                    <div className="mt-[15px] flex flex-col gap-[15px]">
                        <Input {...site} label={t["contact-site-url"]} type="text" />
                        <Textarea {...content} label={t["contact-content"]} data-name="content" data-required={true} isRequired={true} className="col-span-2" />
                    </div>

                    <div className="mt-[24px]">
                        <div className="flex items-center gap-4">
                            <label htmlFor="file" className="flex gap-1 text-base font-semibold text-g900 align-center cursor-pointer">
                                {t["contact-file-attach"]}
                                <Upload width={24} height={24} />
                            </label>
                            <input type="file" id="file" accept={fileAccept} className="w-0 h-0" onChange={onChangeFile} />
                            <div className="flex items-center gap-2">
                                <span className="text-small text-g400">{t["contact-file-guide"]}</span>
                            </div>
                        </div>
                        {file && (
                            <div className="mt-2 text-small text-g600">
                                {t["contact-file-attach"]}: {file.name}
                            </div>
                        )}
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

                            {/* render localized "common" with clickable policy label injected into {0} */}
                            <label htmlFor="privacy" className="flex align-center text-small">
                                {(() => {
                                    const common = t["common"] || "{0}에 동의합니다.";
                                    const parts = common.split("{0}");
                                    // left part, policy clickable element, right part
                                    return (
                                        <>
                                            <span>{parts[0]}</span>
                                            <span
                                                role="button"
                                                tabIndex={0}
                                                className="text-small text-ePrimary underline underline-offset-4 cursor-pointer mx-1"
                                                onMouseDown={(e) => {
                                                    // prevent label from toggling the checkbox on mousedown
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setIsModalOpen(true);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setIsModalOpen(true);
                                                    }
                                                }}
                                            >
                                                {t["contact-privacy-policy"]}
                                            </span>
                                            <span>{parts[1]}</span>
                                        </>
                                    );
                                })()}
                            </label>
                        </div>
                        <div>
                            <Button
                                label={submitting ? "전송중..." : t["contact-submit-success"]}
                                disabled={!isFormComplete || submitting}
                                className={`w-[124px]`}
                                size="medium"
                                btnType="secondary"
                                onClick={() => handleSubmit()}
                            />
                        </div>
                    </div>
                    {message && <div className="mt-4 text-small text-g600">{message}</div>}
                </form>
            </div>

            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-[876px] h-[640px] p-12 flex flex-col">
                        <div className="w-full flex justify-end">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={() => setIsModalOpen(false)}>
                                <path
                                    d="M18.0008 19.5814L10.3912 27.1913C10.1835 27.3988 9.92238 27.505 9.60788 27.51C9.29363 27.5148 9.02775 27.4085 8.81025 27.1913C8.593 26.9738 8.48438 26.7103 8.48438 26.4008C8.48438 26.0913 8.593 25.8278 8.81025 25.6103L16.4201 18.0008L8.81025 10.3913C8.60275 10.1835 8.4965 9.92238 8.4915 9.60788C8.48675 9.29363 8.593 9.02775 8.81025 8.81025C9.02775 8.593 9.29125 8.48438 9.60075 8.48438C9.91025 8.48438 10.1737 8.593 10.3912 8.81025L18.0008 16.4201L25.6103 8.81025C25.818 8.60275 26.0791 8.4965 26.3936 8.4915C26.7079 8.48675 26.9738 8.593 27.1913 8.81025C27.4085 9.02775 27.5171 9.29125 27.5171 9.60075C27.5171 9.91025 27.4085 10.1738 27.1913 10.3913L19.5814 18.0008L27.1913 25.6103C27.3988 25.818 27.505 26.0791 27.51 26.3936C27.5148 26.7079 27.4085 26.9738 27.1913 27.1913C26.9738 27.4085 26.7103 27.5171 26.4008 27.5171C26.0913 27.5171 25.8278 27.4085 25.6103 27.1913L18.0008 19.5814Z"
                                    fill="#161616"
                                />
                            </svg>
                        </div>

                        <div className="my-6 pb-6 border-b border-g200 w-full text-2xl leading-9 tracking-[-0.2px] font-bold">주식회사 아이온 개인정보 처리방침</div>

                        <div className="flex-1 w-full bg-g50 overflow-y-auto p-5 text-small leading-5 text-g600 font-normal" dangerouslySetInnerHTML={{ __html: privacyPolicy }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sales;
