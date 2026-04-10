import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function WeightageDonut({ subjects = [], size = 120 }) {
  const colors = ['#DC2626', '#2563EB', '#059669', '#D97706', '#7C3AED', '#0D9488']
  const data = subjects.map((s) => ({ name: s.name, value: s.marks || 1 }))

  return (
    <div style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.3}
            outerRadius={size * 0.45}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
