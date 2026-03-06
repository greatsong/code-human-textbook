// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://greatsong.github.io',
  base: '/code-human-textbook',
  server: { port: 4008 },
  integrations: [
    starlight({
      title: '일상에서 코드 인간',
      description: '센서+코딩+AI 인터랙티브 웹 교재',
      defaultLocale: 'root',
      locales: {
        root: { label: '한국어', lang: 'ko' },
      },
      sidebar: [
        {
          label: '시작 가이드',
          items: [
            { label: '장비와 소프트웨어 준비', slug: 'guide/setup' },
          ],
        },
        {
          label: '코스 A: 15차시',
          items: [
            {
              label: '1막: 눈뜨기',
              items: [
                { label: '1차시: 센서로 세상 읽기', slug: 'course-a/act1/lesson-01' },
                { label: '2차시: 첫 번째 코드', slug: 'course-a/act1/lesson-02' },
                { label: '3차시: 자동으로 기록하기', slug: 'course-a/act1/lesson-03' },
                { label: '4차시: 불편 지도 만들기', slug: 'course-a/act1/lesson-04' },
              ],
            },
            {
              label: '2막: 파고들기',
              items: [
                { label: '5차시: 교실 공기를 숫자로', slug: 'course-a/act2/lesson-05' },
                { label: '6차시: 소리의 지문', slug: 'course-a/act2/lesson-06' },
                { label: '7차시: 내 몸의 신호', slug: 'course-a/act2/lesson-07' },
                { label: '8차시: 거리를 재는 눈', slug: 'course-a/act2/lesson-08' },
                { label: '9차시: 데이터 다듬기', slug: 'course-a/act2/lesson-09' },
                { label: '10차시: AI에게 물어보기', slug: 'course-a/act2/lesson-10' },
              ],
            },
            {
              label: '3막: 보여주기',
              items: [
                { label: '11차시: 팀 질문 세우기', slug: 'course-a/act3/lesson-11' },
                { label: '12차시: 72시간 측정 프로젝트', slug: 'course-a/act3/lesson-12' },
                { label: '13차시: 데이터 시각화 제작', slug: 'course-a/act3/lesson-13' },
                { label: '14차시: 발표와 피드백', slug: 'course-a/act3/lesson-14' },
                { label: '15차시: 되돌아보기', slug: 'course-a/act3/lesson-15' },
              ],
            },
            { label: '코스 B로의 다리', slug: 'course-a/bridge' },
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
          label: '부록',
          items: [
            { label: '센서 도감', slug: 'appendix/sensor-catalog' },
            { label: '코드 레퍼런스', slug: 'appendix/code-reference' },
            { label: '트러블슈팅', slug: 'appendix/troubleshooting' },
            { label: '용어 사전', slug: 'appendix/glossary' },
          ],
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
