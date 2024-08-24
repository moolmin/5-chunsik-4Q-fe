"use client"

import React, {  useEffect, useRef, useState } from 'react';
import { Button, Steps, message, theme } from 'antd';
import { useRouter } from 'next/navigation'
import styles from './page.module.css';
import First from './_components/first';
import Second from "./_components/second";
import Third from "./_components/third";

export default function Page() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const formRef = useRef<any>(null);
    const router = useRouter();

    // useEffect(() => {
    //     sessionStorage.clear();
    // }, []);

    // Function to move to the next step
    const next = () => {
        setCurrent(current + 1);
    };

    // Function to move to the previous step
    const prev = () => {
        setCurrent(current - 1);
    };

    // Define the steps array
    const steps = [
        {
            title: '정보입력',
            content: <First formRef={formRef} onSubmit={next} />,
            buttonText: '입력완료',
        },
        {
            title: '배경선택',
            content: <Second />,
            buttonText: '선택완료',
        },
        {
            title: 'QR 위치조정',
            content: <Third />,
            buttonText: '4Q 생성',
        },
    ];

    const handleButtonClick = () => {
        if (current === 0 && formRef.current) {
            formRef.current.submit();
        } else if (current < steps.length - 1) {
            next();
        } else {
            message.success('포큐 생성 완료!');
            // const storageKey = 'form_data'; 
    
            // if(sessionStorage.getItem(storageKey)) {
            //     sessionStorage.removeItem(storageKey);
            // }
            router.push('/4q-create/download');
        }
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        lineHeight: '550px',
        textAlign: 'center',
        color: token.colorPrimary,
        borderRadius: token.borderRadiusLG,
        marginTop: 20,
    };

    return (
        <div className={styles.container}>
            <Steps
                current={current}
                items={items}
                responsive={false}
                size='small'
                // className={styles.steps}
            />
            <div style={contentStyle} className={styles.contentContainer}>
                {steps[current].content}
            </div>
            <div className={styles.btnContainer}>
                {current < 2 && (
                    <Button
                        type="primary"
                        onClick={handleButtonClick}
                        className={styles.nextBtn}
                        style={{ height: '40px', width: '140px' }}
                    >
                        {steps[current].buttonText}
                    </Button>
                )}
                {current === 1 && (
                    <Button
                        type="text"
                        onClick={prev}
                        className={styles.prevBtn}
                    >
                        이전 단계로
                    </Button>
                )}
            </div>
        </div>
    );
}
