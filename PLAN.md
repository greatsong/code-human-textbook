# "일상에서 코드 인간" 인터랙티브 웹 교재 프로젝트 계획서

> 마지막 업데이트: 2026-03-06

## 프로젝트 개요

센서+코딩+AI 교육 커리큘럼 "일상에서 코드 인간"의 인터랙티브 웹 교재.
GitHub Pages로 배포되는 정적 사이트.

- **대상**: 중고등학생 (실제 난이도는 초심자, 표현은 성숙하게)
- **하드웨어**: Raspberry Pi Pico WH + Grove Shield + Grove 센서 32종
- **핵심 가치**: 하드웨어 공포 최소화, 재미, 성취감, 낮은 인지 부하

## 기술 스택

| 구분 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | Astro 5 + Starlight | 90% 정적 + 10% 인터랙티브 (Islands Architecture) |
| 인터랙티브 | React 19 (islands) | 가상 배선, 센서 슬라이더, 퀴즈 등 |
| 스타일링 | Tailwind CSS 4 | 유틸리티 기반, 빠른 반응형 |
| 애니메이션 | Framer Motion | 센서 연결 피드백, 단계 전환 |
| 코드 에디터 | Shiki (Starlight 내장) | MicroPython 하이라이팅 |
| 배포 | GitHub Pages + Actions | 무료, 자동화 |
| 개발 서버 포트 | 4008 | greatsong-project 포트 레지스트리 기준 |

## 디자인 톤

- **색상**: 화이트 배경 + 민트(#4ECDC4, 코스A) / 코랄(#FF6B6B, 코스B) 악센트
- **폰트**: Pretendard (본문) + JetBrains Mono (코드)
- **톤**: 해요/하세요체, 전문 용어를 숨기지 않되 바로 설명
- **아이콘**: 라인 아이콘 (Lucide), 실물 사진 + SVG 다이어그램
- **에러**: 빨간색 금지, 노란색 + 구체적 해결 가이드

## 교재 구조

```
/                           <- 랜딩 페이지 (코스 선택)
/guide/                     <- 시작 가이드 (장비 세팅, 소프트웨어 설치)

/course-a/                  <- 코스 A 인트로
/course-a/act1/             <- 1막 "눈뜨기" (4차시)
  lesson-01/  센서로 세상 읽기       온습도(DHT20)
  lesson-02/  첫 번째 코드           빛(Light Sensor)
  lesson-03/  자동으로 기록하기       온습도(DHT20)
  lesson-04/  불편 지도 만들기       온습도+빛
/course-a/act2/             <- 2막 "파고들기" (6차시)
  lesson-05/  교실 공기를 숫자로     CO2(SCD41)
  lesson-06/  소리의 지문            소리(Sound)
  lesson-07/  내 몸의 신호           심박(Pulse)
  lesson-08/  거리를 재는 눈         초음파(Ultrasonic)
  lesson-09/  데이터 다듬기          (소프트웨어)
  lesson-10/  AI에게 물어보기        (AI 도구)
/course-a/act3/             <- 3막 "보여주기" (5차시)
  lesson-11/  팀 질문 세우기         자유 선택
  lesson-12/  72시간 측정 프로젝트   자유 선택
  lesson-13/  데이터 시각화 제작     (소프트웨어)
  lesson-14/  발표와 피드백          -
  lesson-15/  되돌아보기             -
/course-a/bridge/           <- 코스 B로의 연결 페이지

/course-b/                  <- 코스 B 인트로
/course-b/lv1/              <- Lv.1 탐험가 (3h, 단일 센서)
/course-b/lv2/              <- Lv.2 발명가 (3h, 복합 센서+조건)
/course-b/lv3/              <- Lv.3 연구자 (3h, 가설-측정-검증)
/course-b/lv4/              <- Lv.4+ 마스터 (3h, 다중 센서+AI)

/appendix/                  <- 부록
/appendix/sensor-catalog/   <- 센서 도감 (32종)
/appendix/code-reference/   <- 코드 레퍼런스
/appendix/troubleshooting/  <- 트러블슈팅 FAQ
/appendix/glossary/         <- 용어 사전
```

## 차시 페이지 8섹션 템플릿

모든 차시 페이지는 아래 8섹션으로 구성:

1. **헤더**: 차시 번호, 제목, "오늘의 질문", 소요시간, 센서, 난이도
2. **준비물**: 부품 카드(사진+이름) + 인터랙티브 SVG 연결 다이어그램
3. **단계별 활동**: Step별 아코디언, 시간 배분, 팁/생각해보기/미션
4. **코드 예시**: 구문 강조 + 복사 버튼 + 줄별 해설 토글 (기본/도전 탭)
5. **와우 모먼트**: 핵심 개념의 시각적 흐름 다이어그램
6. **데이터/통계 활동**: 해당 차시만 (5,7,9,10차시 등)
7. **마무리**: 오늘 배운 것 + 다음 차시 미리보기
8. **체크리스트**: localStorage 저장, 달성도 프로그레스 바

## 인터랙티브 컴포넌트 우선순위

| 우선순위 | 컴포넌트 | 기능 |
|---------|---------|------|
| P0 | GroveShieldMap | SVG 포트맵 + 포트 타입 색상 코딩 + 호버 정보 |
| P0 | VirtualWiring | 드래그&드롭 센서-포트 연결 시뮬레이션 |
| P0 | CodeBlock | 구문 강조 + 복사 + 줄별 해설 토글 |
| P1 | SensorValueSlider | 범위 슬라이더로 측정값 의미 탐색 |
| P1 | QuizChecklist | 차시별 체크리스트 (localStorage) |
| P1 | SensorCatalogCard | 필터/검색 가능한 센서 카드 그리드 |
| P2 | OutputSimulator | LED/부저 가상 출력 시각화 |
| P2 | DataFlowDiagram | 물리량-센서-ADC-숫자-코드 흐름 애니메이션 |
| P2 | ProgressTracker | 전체 진행률 + 센서 여권 |

## 센서 목록 (32종, Grove 형식)

### 환경 (8종)
1. 온습도 DHT20 (I2C, 입문)
2. CO2 SCD41 (I2C, 중급)
3. 기압 BMP280 (I2C, 입문)
4. 미세먼지 HM3301 (I2C, 중급)
5. 자외선 GUVA-S12D (아날로그, 입문)
6. 토양수분 Moisture (아날로그, 입문)
7. 수질 TDS (아날로그, 중급)
8. 가스 Multichannel Gas v2 (I2C, 고급)

### 소리/진동 (3종)
9. 소리 Sound Sensor (아날로그, 입문)
10. 진동 Vibration (디지털, 입문)
11. 피에조 진동 모터 Vibration Motor (디지털, 입문)

### 빛/색상 (4종)
12. 빛 Light Sensor v1.2 (아날로그, 입문)
13. 디지털 빛 TSL2591 (I2C, 중급)
14. 색상 TCS34725 (I2C, 중급)
15. 적외선 수신 IR Receiver (디지털, 입문)

### 거리/위치/움직임 (6종)
16. 초음파 Ultrasonic Ranger v2 (디지털, 입문)
17. ToF VL53L0X (I2C, 중급)
18. PIR Motion Sensor (디지털, 입문)
19. 3축 가속도 ADXL345 (I2C, 중급)
20. 자이로+가속도 MPU6050 (I2C, 고급)
21. GPS Air530 (UART, 고급)

### 신체 (3종)
22. 심박 Pulse Sensor (아날로그, 중급)
23. GSR 피부전도 (아날로그, 중급)
24. 체온 비접촉 MLX90614 (I2C, 중급)

### 입력 장치 (4종)
25. 버튼 Button (디지털, 입문)
26. 로터리 앵글 Rotary Angle (아날로그, 입문)
27. 조이스틱 Thumb Joystick (아날로그, 입문)
28. 터치 Touch Sensor (디지털, 입문)

### 출력 장치 (4종)
29. LED 바 LED Bar v2 (디지털, 입문)
30. OLED 디스플레이 SSD1306 (I2C, 중급)
31. 부저 Buzzer (디지털, 입문)
32. 서보 모터 Servo (PWM, 입문)

## 코스 A↔B 연결 전략

- **브리지 페이지**: 코스 A 15차시 완료 후 자동 노출, 코스 B 추천 시작점 안내
- **조건부 안내 박스**: 코스 B 각 레벨 상단에 "코스 A 이수자" / "처음인 학생" 분기
- **양방향 배지 참조**: 민트 배지(코스 A), 코랄 배지(코스 B), 슬레이트 배지(센서 도감)

## 구현 순서

1. Astro + Starlight 프로젝트 초기 세팅 + 디렉토리 구조
2. GitHub Pages 배포 파이프라인 (GitHub Actions)
3. 핵심 인터랙티브 컴포넌트 (GroveShieldMap, VirtualWiring, CodeBlock)
4. 센서 도감 32종 카탈로그 페이지
5. 1차시 "센서로 세상 읽기" 풀 페이지 제작
6. 랜딩 페이지 + 시작 가이드
7. 나머지 차시 콘텐츠 순차 제작
