import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function ProgressDonut({ percent = 0, color = '#2563EB', size = 80 }) {
  const data = [
    { value: percent },
    { value: 100 - percent },
  ]

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.35}
            outerRadius={size * 0.48}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
          >
            <Cell fill={color} />
            <Cell fill="var(--bg-surface)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-txt-primary">{percent}%</span>
      </div>
    </div>
  )
}
