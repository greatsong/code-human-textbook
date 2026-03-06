import { sensors, type Sensor } from '../../data/sensors';

const difficultyLabel = (d: 1 | 2 | 3) =>
  d === 1 ? '입문' : d === 2 ? '중급' : '고급';

const difficultyDots = (d: 1 | 2 | 3) => (
  <span className="difficulty-dots" style={{ fontSize: '1.1rem' }}>
    {[1, 2, 3].map((i) => (
      <span key={i} className={i <= d ? 'filled' : 'empty'}>●</span>
    ))}
  </span>
);

interface SensorDetailProps {
  sensorId: string;
}

export default function SensorDetail({ sensorId }: SensorDetailProps) {
  const sensor = sensors.find((s) => s.id === sensorId);

  if (!sensor) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>
        센서를 찾을 수 없습니다: <code>{sensorId}</code>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 헤더 */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{sensor.name}</h2>
          {difficultyDots(sensor.difficulty)}
          <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>({difficultyLabel(sensor.difficulty)})</span>
        </div>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', opacity: 0.6 }}>
          {sensor.model}
        </p>
      </div>

      {/* 배지 */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span className="badge badge-mint">{sensor.category}</span>
        <span className="badge badge-slate">{sensor.portType}</span>
        {sensor.usedInLessons?.map((lesson) => (
          <span key={lesson} className="badge badge-coral">{lesson}</span>
        ))}
      </div>

      {/* 설명 */}
      <div className="question-box">
        <p style={{ margin: 0 }}>{sensor.description}</p>
      </div>

      {/* 측정 범위 */}
      {sensor.measureRange && (
        <InfoSection title="측정 범위">
          <code style={{ fontSize: '0.95rem' }}>{sensor.measureRange}</code>
        </InfoSection>
      )}

      {/* 연결 방법 */}
      <InfoSection title="연결 방법">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ margin: 0 }}>
            <strong>포트 타입:</strong> {sensor.portType}
          </p>
          <p style={{ margin: 0 }}>
            <strong>핀 연결:</strong> <code>{sensor.pinInfo}</code>
          </p>
          <PortGuide portType={sensor.portType} />
        </div>
      </InfoSection>

      {/* 코드 예시 */}
      <InfoSection title="MicroPython 코드 예시">
        <pre
          style={{
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '0.5rem',
            padding: '1rem',
            overflowX: 'auto',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            margin: 0,
            border: '1px solid rgba(78,205,196,0.15)',
          }}
        >
          <code>{sensor.codeSnippet}</code>
        </pre>
      </InfoSection>

      {/* 프로젝트 아이디어 */}
      <InfoSection title="프로젝트 아이디어">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '0.5rem',
          }}
        >
          {sensor.projectIdeas.map((idea, i) => (
            <div
              key={i}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                background: ideaColors[i % ideaColors.length].bg,
                borderLeft: `3px solid ${ideaColors[i % ideaColors.length].border}`,
              }}
            >
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{idea}</p>
            </div>
          ))}
        </div>
      </InfoSection>
    </div>
  );
}

// 정보 섹션 래퍼
function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          margin: '0 0 0.5rem',
          paddingBottom: '0.25rem',
          borderBottom: '2px solid rgba(78,205,196,0.2)',
          color: '#4ECDC4',
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

// 포트 타입별 연결 안내
function PortGuide({ portType }: { portType: string }) {
  const guides: Record<string, string> = {
    '아날로그': 'Grove 아날로그 포트에 연결합니다. Pico의 GP26(A0), GP27(A1), GP28(A2) 핀을 사용합니다.',
    '디지털': 'Grove 디지털 포트에 연결합니다. Pico의 GP16, GP17 등 디지털 핀을 사용합니다.',
    'I2C': 'Grove I2C 포트에 연결합니다. SDA(GP4)와 SCL(GP5)를 사용하며, 여러 I2C 센서를 동시에 연결할 수 있습니다.',
    'UART': 'Grove UART 포트에 연결합니다. TX(GP0)와 RX(GP1)를 사용합니다.',
    'PWM': 'Grove 디지털 포트에 연결하고 PWM 신호로 제어합니다. Pico의 모든 GPIO 핀이 PWM을 지원합니다.',
  };

  return (
    <div className="tip-box" style={{ fontSize: '0.85rem' }}>
      {guides[portType] || '해당 포트의 연결 방법을 확인하세요.'}
    </div>
  );
}

const ideaColors = [
  { bg: 'rgba(78, 205, 196, 0.08)', border: '#4ECDC4' },
  { bg: 'rgba(255, 107, 107, 0.08)', border: '#FF6B6B' },
  { bg: 'rgba(255, 230, 109, 0.08)', border: '#FFE66D' },
];
