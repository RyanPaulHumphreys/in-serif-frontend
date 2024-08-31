'use client';

import { Text, Image, MantineSize } from '@mantine/core';
import { useEffect, useState } from 'react';
import { theme } from '@/theme';
import GetAnimatedStringFrame from './Animations/AnimatedString';

type LogoTextProps = {
    size?: string;
    includeCursor? : boolean;
    cursorSize? : number;
};
export function LogoText(props : LogoTextProps) {
    return (
    <>
        <Text fw={650} ff={theme.other?.brandingFontFamily ?? 'heading'} size={props.size} ta="center">In Serif</Text>
        {props.includeCursor ? <Image src="/cursor-blink.gif" height={props.cursorSize ?? 32} /> : null}
    </>
    );
}

export function LogoTextWithAnimation() {
    const [animatedString, setAnimatedString] = useState('thoughts');
    const [t, setTime] = useState(0);
    const startingString = 'thoughts';
    const targetString = 'experience';
    const animateString = () => {
        setAnimatedString(GetAnimatedStringFrame(startingString, targetString, t));
        console.log(`String: ${animatedString}, t=${t}`);
    };

    const updateTime = () => {
        setTimeout(() => {
        if (animatedString !== targetString) { setTime(t + 1); }
            updateTime();
        }, 250);
    };

    useEffect(animateString, [t]);
    if (t === 0) updateTime();
    return (
        <Text size="massive" ff="text" ta="center">your {animatedString}, </Text>
    );
}
