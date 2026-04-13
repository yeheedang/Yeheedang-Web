"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import {
    COLOR_WALNUT,
    COLOR_WALNUT_LIGHT,
    COLOR_YEHI_GREY,
    COLOR_INK,
    COLOR_HANJI_WARM,
    SPACE_2,
    SPACE_3,
    SPACE_6,
    SPACE_8,
    SPACE_10,
    SPACE_12,
    SPACE_16,
    SPACE_20,
    RADIUS_MD,
    RADIUS_LG,
    BREAKPOINT_MOBILE,
    BREAKPOINT_TABLET,
} from "@/styles/tokens";
import { FONT_DISPLAY, FONT_BODY, FONT_ACCENT } from "@/styles/typography";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 3fr 2fr;
    align-items: center;
    padding: ${SPACE_12} clamp(${SPACE_16}, 8vw, ${SPACE_20});

    @media (max-width: ${BREAKPOINT_TABLET}px) {
        grid-template-columns: 1fr;
        overflow-y: auto;
        padding: 80px ${SPACE_8} ${SPACE_8};
        align-content: center;
    }
`;

const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${SPACE_6};
    animation: ${fadeIn} 600ms ease 100ms both;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

const EyebrowText = styled.span`
    font-family: ${FONT_ACCENT};
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${COLOR_WALNUT};
`;

const Heading = styled.h2`
    font-family: ${FONT_DISPLAY};
    font-size: clamp(1.8rem, 3.5vw, 2.5rem);
    font-weight: 300;
    letter-spacing: -0.01em;
    color: ${COLOR_INK};
    margin: 0;
`;

const InfoGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${SPACE_3};
`;

const OrderButton = styled.a`
    display: flex;
    max-width: 100px;
    aspect-ratio: 3/1;
    align-items: center;
    text-align: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #ebcbcb;
    color: #595959;
    border: none;
    box-shadow: 0 1px 2px 0px;
    text-decoration: none;
`;

const InfoLabel = styled.dt`
    font-family: ${FONT_ACCENT};
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${COLOR_WALNUT_LIGHT};
`;

const InfoValue = styled.dd`
    font-family: ${FONT_BODY};
    font-size: 0.9rem;
    line-height: 1.7;
    color: ${COLOR_YEHI_GREY};
    margin: 0;
`;

const InfoList = styled.dl`
    display: flex;
    flex-direction: column;
    gap: ${SPACE_6};
`;

const HoursTable = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: ${SPACE_2} ${SPACE_6};
`;

const HoursDay = styled.span`
    font-family: ${FONT_BODY};
    font-size: 0.8rem;
    color: ${COLOR_YEHI_GREY};
`;

const HoursTime = styled.span`
    font-family: ${FONT_BODY};
    font-size: 0.8rem;
    color: ${COLOR_INK};
`;

const MapColumn = styled.div`
    animation: ${fadeIn} 700ms ease 250ms both;
    border-radius: ${RADIUS_LG};
    overflow: hidden;
    border: 1px solid rgba(235, 203, 203, 0.4);
    background: ${COLOR_HANJI_WARM};
    margin-right: ${SPACE_8};

    @media (max-width: ${BREAKPOINT_TABLET}px) {
        display: none;
    }

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

const MapImage = styled(Image)`
    width: 100% !important;
    height: auto !important;
    display: block;
`;

export function ContactSection() {
    return (
        <Section>
            <InfoColumn>
                <EyebrowText>Visit Us</EyebrowText>
                <Heading>오시는 길</Heading>

                <InfoList>
                    <InfoGroup>
                        <InfoLabel>주소</InfoLabel>
                        <InfoValue>
                            서울특별시 강북구 미아동 오폐산로 37길 22 1층
                        </InfoValue>
                    </InfoGroup>

                    <InfoGroup>
                        <InfoLabel>영업시간</InfoLabel>
                        <InfoValue>
                            <HoursTable>
                                <HoursDay>월 — 토</HoursDay>
                                <HoursTime>10:00 — 19:30</HoursTime>
                                <HoursDay>일요일</HoursDay>
                                <HoursTime>정기 휴무</HoursTime>
                            </HoursTable>
                        </InfoValue>
                    </InfoGroup>

                    <InfoGroup>
                        <InfoLabel>연락처</InfoLabel>
                        <InfoValue>[대표번호] 010 - 4927 - 9788</InfoValue>
                    </InfoGroup>

                    <InfoGroup>
                        <InfoLabel>교통</InfoLabel>
                        <InfoValue>
                            지하철 4호선 미아사거리역 1번 출구
                            <br />
                            도보 5분
                        </InfoValue>

                        <OrderButton
                            href="https://naver.me/FBeewGHi"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            주문 하기
                        </OrderButton>
                    </InfoGroup>
                </InfoList>
            </InfoColumn>

            <MapColumn>
                <MapImage src="/yeheedang map.jpg" alt="예히당 오시는 길 지도" width={600} height={450} />
            </MapColumn>
        </Section>
    );
}
