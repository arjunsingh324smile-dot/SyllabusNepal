import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function YearTrendBar({ data, color = '#DC2626' }) {
  if (!data) return null
  const chartData = Object.entries(data).map(([year, marks]) => ({ year, marks }))

  return (
    <div className="w-full h-32">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value) => [`${value} marks`, 'Expected']}
          />
          <Bar dataKey="marks" fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
