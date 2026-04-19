'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/app-layout'
import { Card } from '@/components/ui/card'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import { AlertTriangle, TrendingDown, Users, BarChart3, Shield, MapPin } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'

// Commission trend over months
const commissionData = [
  { month: 'May', foodpanda: 15, careem: 20, daraz: 12 },
  { month: 'Jun', foodpanda: 17, careem: 20, daraz: 14 },
  { month: 'Jul', foodpanda: 18, careem: 22, daraz: 14 },
  { month: 'Aug', foodpanda: 20, careem: 22, daraz: 16 },
  { month: 'Sep', foodpanda: 23, careem: 25, daraz: 18 },
  { month: 'Oct', foodpanda: 25, careem: 25, daraz: 18 },
]

// Income distribution by city
const cityIncomeData = [
  { city: 'Karachi', median: 42000, avg: 38500 },
  { city: 'Lahore', median: 38000, avg: 35200 },
  { city: 'Islamabad', median: 45000, avg: 41000 },
  { city: 'Rawalpindi', median: 32000, avg: 29800 },
  { city: 'Faisalabad', median: 28000, avg: 26400 },
  { city: 'Peshawar', median: 25000, avg: 23100 },
]

// Grievance categories
const grievanceCategories = [
  { name: 'Account Deactivation', value: 34, color: '#ef4444' },
  { name: 'Missing Payment', value: 28, color: '#f97316' },
  { name: 'Commission Hike', value: 22, color: '#eab308' },
  { name: 'App Issues', value: 10, color: '#3b82f6' },
  { name: 'Other', value: 6, color: '#6b7280' },
]

// Workers with >20% income drop (vulnerability flag)
const vulnerableWorkers = [
  { name: 'Muhammad Ali', city: 'Karachi', platform: 'Foodpanda', drop: -34, lastMonth: 'PKR 45,000', thisMonth: 'PKR 29,700' },
  { name: 'Hassan Raza', city: 'Lahore', platform: 'Careem', drop: -28, lastMonth: 'PKR 38,000', thisMonth: 'PKR 27,360' },
  { name: 'Bilal Ahmed', city: 'Rawalpindi', platform: 'Daraz', drop: -25, lastMonth: 'PKR 32,000', thisMonth: 'PKR 24,000' },
  { name: 'Tariq Mahmood', city: 'Faisalabad', platform: 'Bykea', drop: -22, lastMonth: 'PKR 28,000', thisMonth: 'PKR 21,840' },
  { name: 'Usman Khan', city: 'Peshawar', platform: 'Foodpanda', drop: -31, lastMonth: 'PKR 25,000', thisMonth: 'PKR 17,250' },
]

export default function AdvocatePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [grievanceCount, setGrievanceCount] = useState(0)
  const [workerCount, setWorkerCount] = useState(0)

  useEffect(() => {
    if (!loading && !user) { router.replace('/login'); return }
    if (user && user.role !== 'advocate' && user.role !== 'verifier') {
      router.replace('/dashboard')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    supabase.from('grievances').select('id', { count: 'exact', head: true }).then(({ count }) => {
      if (count) setGrievanceCount(count)
    })
    supabase.from('users').select('id', { count: 'exact', head: true }).eq('role', 'worker').then(({ count }) => {
      if (count) setWorkerCount(count)
    })
  }, [user])

  if (loading || !user) return null

  return (
    <AppLayout navbarTitle="Advocate Analytics" navbarSubtitle="AGGREGATED INSIGHTS" searchPlaceholder="Workers ya platforms talash karein...">
      <div className="space-y-8">

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6">
          <Card className="p-6 space-y-3 border-l-4 border-l-primary">
            <div className="flex items-center justify-between">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold text-green-600">+12% this month</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Active Workers</p>
              <p className="text-3xl font-bold text-foreground">{workerCount || 8}</p>
            </div>
          </Card>
          <Card className="p-6 space-y-3 border-l-4 border-l-red-500">
            <div className="flex items-center justify-between">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-xs font-semibold text-red-600">Urgent</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Open Grievances</p>
              <p className="text-3xl font-bold text-foreground">{grievanceCount || 1}</p>
            </div>
          </Card>
          <Card className="p-6 space-y-3 border-l-4 border-l-orange-500">
            <div className="flex items-center justify-between">
              <TrendingDown className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-semibold text-orange-600">⚠️ Flag</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Vulnerability Flags</p>
              <p className="text-3xl font-bold text-foreground">5</p>
            </div>
          </Card>
          <Card className="p-6 space-y-3 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Resolution Rate</p>
              <p className="text-3xl font-bold text-foreground">78%</p>
            </div>
          </Card>
        </div>

        {/* Commission Rate Trends */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">📈 Platform Commission Trends</h2>
            <p className="text-sm text-muted-foreground">Maahi commission rates across major Pakistani platforms (%)</p>
          </div>
          <Card className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={commissionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  formatter={(v: any) => [`${v}%`]}
                />
                <Legend />
                <Line type="monotone" dataKey="foodpanda" name="Foodpanda" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="careem" name="Careem" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="daraz" name="Daraz" stroke="#f97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* City Income + Grievance Categories */}
        <div className="grid grid-cols-2 gap-6">
          {/* City Income Distribution */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">🏙️ Shahar Waari Income Distribution</h2>
              <p className="text-sm text-muted-foreground">Monthly median income by city zone (PKR)</p>
            </div>
            <Card className="p-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={cityIncomeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis type="number" stroke="var(--color-muted-foreground)" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <YAxis dataKey="city" type="category" stroke="var(--color-muted-foreground)" width={70} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                    formatter={(v: any) => [`PKR ${Number(v).toLocaleString()}`]}
                  />
                  <Legend />
                  <Bar dataKey="median" name="Median" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="avg" name="Average" fill="#94a3b8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Grievance Categories */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">📊 Top Complaint Categories</h2>
              <p className="text-sm text-muted-foreground">Is hafte ki top grievance categories</p>
            </div>
            <Card className="p-6">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={grievanceCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {grievanceCategories.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`${v}%`, 'Share']} />
                  <Legend formatter={(value) => <span className="text-xs">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>

        {/* Vulnerability Flag Table — Workers with >20% income drop */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Vulnerability Flags — 20%+ Income Drop
            </h2>
            <p className="text-sm text-muted-foreground">Yeh workers pichle maah ke muqablay mein 20% se zyada income gir gayi — fori attention chahiye</p>
          </div>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-red-50 border-b border-red-200">
                  <tr>
                    {['Worker', 'Shehar', 'Platform', 'Last Month', 'This Month', 'Drop', 'Action'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {vulnerableWorkers.map((worker, idx) => (
                    <tr key={idx} className="hover:bg-red-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                            {worker.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-sm text-foreground">{worker.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-muted-foreground" />{worker.city}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{worker.platform}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{worker.lastMonth}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">{worker.thisMonth}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                          {worker.drop}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs font-semibold text-primary hover:underline">Review Karein</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Platform Rate Intelligence */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">⚡ Rate Intelligence — This Week</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { platform: 'Foodpanda', icon: '🍔', change: '+3%', color: 'text-red-600', bg: 'bg-red-50 border-red-200', detail: 'Lahore zone mein commission 22% se 25% ho gayi' },
              { platform: 'Careem', icon: '🚗', change: '0%', color: 'text-gray-600', bg: 'bg-gray-50 border-gray-200', detail: 'Koi tabdili nahi — stable' },
              { platform: 'Daraz', icon: '📦', change: '+2%', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', detail: 'Karachi South zone mein hike — riders preshaan' },
            ].map((item) => (
              <Card key={item.platform} className={`p-4 border ${item.bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-bold text-foreground">{item.platform}</span>
                  </div>
                  <span className={`text-lg font-bold ${item.color}`}>{item.change}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  )
}
