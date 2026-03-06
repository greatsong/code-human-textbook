import { useState, useMemo } from 'react';
import { sensors, categories, portTypes, type Category, type PortType, type Sensor } from '../../data/sensors';

const difficultyLabel = (d: 1 | 2 | 3) =>
  d === 1 ? '입문' : d === 2 ? '중급' : '고급';

const difficultyDots = (d: 1 | 2 | 3) => (
  <span className="difficulty-dots" aria-label={`난이도 ${difficultyLabel(d)}`}>
    {[1, 2, 3].map((i) => (
      <span key={i} className={i <= d ? 'filled' : 'empty'}>●</span>
    ))}
  </span>
);

const categoryColor: Record<Category, string> = {
  '환경': 'badge-mint',
  '소리/진동': 'badge-coral',
  '빛/색상': 'badge-yellow',
  '거리/움직임': 'badge-mint',
  '신체': 'badge-coral',
  '입력': 'badge-slate',
  '출력': 'badge-yellow',
};

const portColor: Record<PortType, string> = {
  '아날로그': 'badge-yellow',
  '디지털': 'badge-slate',
  'I2C': 'badge-mint',
  'UART': 'badge-coral',
  'PWM': 'badge-coral',
};

interface SensorCardProps {
  sensor: Sensor;
  onSelect?: (id: string) => void;
}

function SensorCard({ sensor, onSelect }: SensorCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(sensor.id)}
      className="sensor-catalog-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1rem',
        borderRadius: '0.75rem',
        border: '1px solid rgba(78, 205, 196, 0.2)',
        background: 'rgba(78, 205, 196, 0.03)',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#4ECDC4';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(78,205,196,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(78, 205, 196, 0.2)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* 헤더: 이름 + 난이도 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ fontSize: '1.05rem' }}>{sensor.name}</strong>
        {difficultyDots(sensor.difficulty)}
      </div>

      {/* 모델명 */}
      <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{sensor.model}</span>

      {/* 배지들 */}
      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
        <span className={`badge ${categoryColor[sensor.category]}`}>{sensor.category}</span>
        <span className={`badge ${portColor[sensor.portType]}`}>{sensor.portType}</span>
      </div>

      {/* 설명 */}
      <p style={{ fontSize: '0.85rem', margin: 0, opacity: 0.8, lineHeight: 1.5 }}>
        {sensor.description}
      </p>

      {/* 사용 차시 */}
      {sensor.usedInLessons && sensor.usedInLessons.length > 0 && (
        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
          {sensor.usedInLessons.map((lesson) => (
            <span
              key={lesson}
              style={{
                fontSize: '0.7rem',
                padding: '0.125rem 0.375rem',
                borderRadius: '9999px',
                background: 'rgba(255, 107, 107, 0.12)',
                color: '#FF6B6B',
              }}
            >
              {lesson}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

interface SensorCatalogProps {
  onSelectSensor?: (id: string) => void;
}

export default function SensorCatalog({ onSelectSensor }: SensorCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | '전체'>('전체');
  const [selectedPort, setSelectedPort] = useState<PortType | '전체'>('전체');
  const [selectedDifficulty, setSelectedDifficulty] = useState<1 | 2 | 3 | 0>(0);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return sensors.filter((s) => {
      if (selectedCategory !== '전체' && s.category !== selectedCategory) return false;
      if (selectedPort !== '전체' && s.portType !== selectedPort) return false;
      if (selectedDifficulty !== 0 && s.difficulty !== selectedDifficulty) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.model.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, selectedPort, selectedDifficulty, search]);

  const filterBtnBase: React.CSSProperties = {
    padding: '0.25rem 0.625rem',
    borderRadius: '9999px',
    border: '1px solid rgba(78,205,196,0.3)',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '0.8rem',
    transition: 'all 0.2s',
  };

  const filterBtnActive: React.CSSProperties = {
    ...filterBtnBase,
    background: '#4ECDC4',
    color: '#000',
    borderColor: '#4ECDC4',
    fontWeight: 600,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* 검색 */}
      <input
        type="text"
        placeholder="센서 이름, 모델명으로 검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(78,205,196,0.3)',
          background: 'rgba(78,205,196,0.05)',
          fontSize: '0.9rem',
          outline: 'none',
          width: '100%',
          maxWidth: '24rem',
          color: 'inherit',
        }}
      />

      {/* 카테고리 필터 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, marginRight: '0.25rem' }}>카테고리</span>
        {(['전체', ...categories] as const).map((cat) => (
          <button
            type="button"
            key={cat}
            style={selectedCategory === cat ? filterBtnActive : filterBtnBase}
            onClick={() => setSelectedCategory(cat as Category | '전체')}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 포트 타입 필터 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, marginRight: '0.25rem' }}>포트</span>
        {(['전체', ...portTypes] as const).map((port) => (
          <button
            type="button"
            key={port}
            style={selectedPort === port ? filterBtnActive : filterBtnBase}
            onClick={() => setSelectedPort(port as PortType | '전체')}
          >
            {port}
          </button>
        ))}
      </div>

      {/* 난이도 필터 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, marginRight: '0.25rem' }}>난이도</span>
        {([0, 1, 2, 3] as const).map((d) => (
          <button
            type="button"
            key={d}
            style={selectedDifficulty === d ? filterBtnActive : filterBtnBase}
            onClick={() => setSelectedDifficulty(d)}
          >
            {d === 0 ? '전체' : difficultyLabel(d as 1 | 2 | 3)}
          </button>
        ))}
      </div>

      {/* 결과 수 */}
      <p style={{ fontSize: '0.85rem', opacity: 0.7, margin: 0 }}>
        {filtered.length}종 센서 표시 중 (전체 {sensors.length}종)
      </p>

      {/* 카드 그리드 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {filtered.map((sensor) => (
          <SensorCard key={sensor.id} sensor={sensor} onSelect={onSelectSensor} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', opacity: 0.5, padding: '2rem 0' }}>
          조건에 맞는 센서가 없습니다.
        </p>
      )}
    </div>
  );
}
