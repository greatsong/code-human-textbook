// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://greatsong.github.io',
  base: '/ai-physical-computing',
  server: { port: 4008 },
  integrations: [
    starlight({
      title: 'AI 피지컬 컴퓨팅',
      description: '센서+바이브코딩+대시보드+머신러닝 인터랙티브 웹 교재',
      defaultLocale: 'root',
      locales: {
        root: { label: '한국어', lang: 'ko' },
      },
      sidebar: [
        {
          label: '시작 가이드',
          items: [
            { label: '장비와 소프트웨어 준비', slug: 'guide/setup' },
            { label: '네트워크 이해하기', slug: 'guide/network' },
            { label: 'Wi-Fi 설정 가이드', slug: 'guide/wifi-setup' },
          ],
        },
        {
          label: '코스 A: 15차시 수업',
          items: [
            {
              label: '1막: 센서와 친해지기',
              items: [
                { label: '1차시: 센서로 세상 읽기', slug: 'course-a/act1/lesson-01' },
                { label: '2차시: 빛을 숫자로', slug: 'course-a/act1/lesson-02' },
                { label: '3차시: 자동 기록 시스템', slug: 'course-a/act1/lesson-03' },
                { label: '4차시: 첫 번째 대시보드', slug: 'course-a/act1/lesson-04' },
              ],
            },
            {
              label: '2막: 바이브 코딩으로 확장',
              items: [
                { label: '5차시: AI에게 코드 시키기', slug: 'course-a/act2/lesson-05' },
                { label: '6차시: 환경 모니터링 대시보드', slug: 'course-a/act2/lesson-06' },
                { label: '7차시: 내 몸의 데이터', slug: 'course-a/act2/lesson-07' },
                { label: '8차시: 스마트 알림 시스템', slug: 'course-a/act2/lesson-08' },
                { label: '9차시: 데이터 정리와 시각화', slug: 'course-a/act2/lesson-09' },
                { label: '10차시: AI 데이터 분석', slug: 'course-a/act2/lesson-10' },
              ],
            },
            {
              label: '3막: 대시보드와 머신러닝',
              items: [
                { label: '11차시: 팀 프로젝트 설계', slug: 'course-a/act3/lesson-11' },
                { label: '12차시: 실시간 대시보드 제작', slug: 'course-a/act3/lesson-12' },
                { label: '13차시: 센서 데이터로 ML 입문', slug: 'course-a/act3/lesson-13' },
                { label: '14차시: 발표와 피드백', slug: 'course-a/act3/lesson-14' },
                { label: '15차시: 되돌아보기와 다음 단계', slug: 'course-a/act3/lesson-15' },
              ],
            },
            { label: '코스 B로의 다리', slug: 'course-a/bridge' },
          ],
        },
        {
          label: '프로젝트: Wi-Fi 모니터',
          items: [
            { label: '1차시: 첫 웹서버', slug: 'projects/wifi-monitor/w01' },
            { label: '2차시: 실시간 대시보드', slug: 'projects/wifi-monitor/w02' },
            { label: '3차시: 차트 시각화', slug: 'projects/wifi-monitor/w03' },
            { label: '4차시: 신호 지도', slug: 'projects/wifi-monitor/w04' },
            { label: '5차시: 나만의 기능', slug: 'projects/wifi-monitor/w05' },
            { label: '6차시: 완성과 발표', slug: 'projects/wifi-monitor/w06' },
          ],
        },
        {
          label: '코스 B: 프로젝트',
          items: [
            { label: '코스 B 소개', slug: 'course-b/intro' },
            { label: 'Lv.1 탐험가', slug: 'course-b/lv1' },
            { label: 'Lv.2 발명가', slug: 'course-b/lv2' },
            { label: 'Lv.3 연구자', slug: 'course-b/lv3' },
            { label: 'Lv.4+ 마스터', slug: 'course-b/lv4' },
          ],
        },
        {
          label: '인피컴 프로젝트 수업',
          items: [
            {
              label: '센서와 출력 기초',
              items: [
                { label: '1차시: MQ2 가스 센서', slug: 'inpicom/week01' },
                { label: '2차시: RGB LED Stick', slug: 'inpicom/week02' },
                { label: '3차시: 전자담배 검출기', slug: 'inpicom/week03' },
                { label: '4차시: 미니 기상 스테이션', slug: 'inpicom/week04' },
              ],
            },
            {
              label: '센서 조합과 시스템',
              items: [
                { label: '5차시: 스마트 복도 조명', slug: 'inpicom/week05' },
                { label: '6차시: 음성 제어 무드등', slug: 'inpicom/week06' },
                { label: '7차시: CO2 환기 알리미', slug: 'inpicom/week07' },
                { label: '8차시: 절전형 가스 경보기', slug: 'inpicom/week08' },
              ],
            },
            {
              label: '심화 통합 프로젝트',
              items: [
                { label: '9차시: 온도 시각화 조명', slug: 'inpicom/week09' },
                { label: '10차시: 고도 측정기', slug: 'inpicom/week10' },
                { label: '11차시: 교실 환경 대시보드', slug: 'inpicom/week11' },
                { label: '12차시: 전자담배 검출 풀버전', slug: 'inpicom/week12' },
                { label: '13차시: 음성 제어 모니터', slug: 'inpicom/week13' },
              ],
            },
          ],
        },
        {
          label: '부록',
          items: [
            { label: '센서 도감', slug: 'appendix/sensor-catalog' },
            { label: '코드 레퍼런스', slug: 'appendix/code-reference' },
            { label: '트러블슈팅', slug: 'appendix/troubleshooting' },
            { label: '용어 사전', slug: 'appendix/glossary' },
          ],
        },
      ],
      head: [
        {
          tag: 'script',
          attrs: { src: '/ai-physical-computing/scripts/image-zoom.js', defer: true },
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
