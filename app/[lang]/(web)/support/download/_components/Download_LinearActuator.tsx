"use client";

import Button from "@/components/Button";
import { DownloadIco } from "@/icons/icons";

const DownloadLinearActuator = () => {
    return (
        <div className="w-full flex justify-between pt-[80px]">
            <h3 className="text-g950 font-bold text-title ml-9">
                Linear Actuator
            </h3>
            <div className="w-[955px]">
                <li className="w-full flex justify-between items-center py-6 border-b border-g200">
                    <div>
                        <p className="text-g400 text-small mb-1">
                            25.11.23 Updated
                        </p>
                        <p className="text-g950 font-bold text-large">
                            Document Origin Name
                        </p>
                    </div>
                    <Button
                        size="medium"
                        btnType="primary"
                        label="Download"
                        icRight={<DownloadIco fill={"#ffffff"} />}
                        onClick={() => {}}
                    />
                </li>
                <li className="w-full flex justify-between items-center py-6 border-b border-g200">
                    <div>
                        <p className="text-g400 text-small mb-1">
                            25.11.23 Updated
                        </p>
                        <p className="text-g950 font-bold text-large">
                            Document Origin Name
                        </p>
                    </div>
                    <Button
                        size="medium"
                        btnType="primary"
                        label="Download"
                        icRight={<DownloadIco fill={"#ffffff"} />}
                        onClick={() => {}}
                    />
                </li>
                <li className="w-full flex justify-between items-center py-6 border-b border-g200">
                    <div>
                        <p className="text-g400 text-small mb-1">
                            25.11.23 Updated
                        </p>
                        <p className="text-g950 font-bold text-large">
                            Document Origin Name
                        </p>
                    </div>
                    <Button
                        size="medium"
                        btnType="primary"
                        label="Download"
                        icRight={<DownloadIco fill={"#ffffff"} />}
                        onClick={() => {}}
                    />
                </li>
                <li className="w-full flex justify-between items-center py-6 border-b border-g200">
                    <div>
                        <p className="text-g400 text-small mb-1">
                            25.11.23 Updated
                        </p>
                        <p className="text-g950 font-bold text-large">
                            Document Origin Name
                        </p>
                    </div>
                    <Button
                        size="medium"
                        btnType="primary"
                        label="Download"
                        icRight={<DownloadIco fill={"#ffffff"} />}
                        onClick={() => {}}
                    />
                </li>
            </div>
        </div>
    );
};

export default DownloadLinearActuator;
