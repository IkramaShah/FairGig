'use client'

import { AppLayout } from '@/components/app-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Upload, Plus, Zap, MapPin, Clock, Banknote, Camera } from 'lucide-react'
import { useState } from 'react'

const growthData = [
  { month: 'Aug', value: 32000 },
  { month: 'Sep', value: 38000 },
  { month: 'Oct', value: 35000 },
  { month: 'Nov', value: 45000 },
  { month: 'Dec', value: 52000 },
]

const earningsHistory = [
  {
    id: 1,
    platform: 'Foodpanda',
    date: 'Oct 24, 2024',
    duration: '4h 12m',
    amount: 'PKR 3,240',
    status: 'Verified',
    statusColor: 'green',
    icon: '🍔',
  },
  {
    id: 2,
    platform: 'Careem',
    date: 'Oct 23, 2024',
    duration: '6h 45m',
    amount: 'PKR 5,850',
    status: 'Jaari Hai',
    statusColor: 'blue',
    icon: '🚗',
  },
  {
    id: 3,
    platform: 'Daraz',
    date: 'Oct 22, 2024',
    duration: '3h 00m',
    amount: 'PKR 2,100',
    status: 'Verified',
    statusColor: 'green',
    icon: '📦',
  },
  {
    id: 4,
    platform: 'Bykea',
    date: 'Oct 21, 2024',
    duration: '5h 30m',
    amount: 'PKR 4,200',
    status: 'Pending',
    statusColor: 'yellow',
    icon: '🛵',
  },
]

const platforms = [
  { name: 'FOODPANDA', icon: '🍔' },
  { name: 'CAREEM', icon: '🚗' },
  { name: 'DARAZ', icon: '📦' },
  { name: 'BYKEA', icon: '🛵' },
  { name: 'UPWORK', icon: '💻' },
  { name: 'FIVERR', icon: '⭐' },
]

export default function ShiftLogs() {
  const [activeDate, setActiveDate] = useState('')
  const [activeHours, setActiveHours] = useState('0')

  return (
    <AppLayout navbarTitle="Kamaai Logger" navbarSubtitle="SHIFT LOGS" searchPlaceholder="Logs mein talash karein...">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Apni shifts track karein, puri kamaai paiye, aur digital saboot mehfooz rakhein.
          </p>
          <div className="flex gap-3 mt-4">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
              <Upload className="w-4 h-4 mr-2" />
              CSV Upload
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nai Entry
            </Button>
          </div>
        </div>

        {/* Chart + Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Kamaai Ka Andaza</p>
                  <h3 className="text-3xl font-bold text-foreground">Growth Forecast</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Aapki activity ke mutabiq, is maah{' '}
                <span className="font-bold text-foreground">PKR 34,000 zyada</span> kamaai ka imkan hai.
              </p>
            </div>
            <Card className="p-6">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                    formatter={(v: any) => [`PKR ${Number(v).toLocaleString()}`, 'Kamaai']}
                  />
                  <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-4 bg-secondary border-0">
              <div className="flex items-center gap-2 mb-2"><MapPin className="w-5 h-5 text-primary" /></div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Hafta Waari Gross</p>
              <p className="text-2xl font-bold text-foreground">PKR 23,400</p>
            </Card>
            <Card className="p-4 bg-secondary border-0">
              <div className="flex items-center gap-2 mb-2"><Clock className="w-5 h-5 text-primary" /></div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Kaam Ke Ghantay</p>
              <p className="text-2xl font-bold text-foreground">34.2h</p>
            </Card>
            <Card className="p-4 bg-secondary border-0">
              <div className="flex items-center gap-2 mb-2"><Banknote className="w-5 h-5 text-primary" /></div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Ghantay Ki Amdani</p>
              <p className="text-2xl font-bold text-foreground">PKR 684/hr</p>
            </Card>

            <Card className="p-4 bg-primary text-primary-foreground">
              <div className="flex items-center justify-between mb-3"><Zap className="w-6 h-6" /></div>
              <h3 className="font-bold text-lg mb-1">Quick Log</h3>
              <p className="text-sm opacity-90 mb-4">Abhi shift darj karein</p>
              <div className="space-y-3">
                <input
                  type="date"
                  value={activeDate}
                  onChange={(e) => setActiveDate(e.target.value)}
                  className="w-full px-3 py-2 bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded border border-primary-foreground/30 text-sm"
                />
                <input
                  type="number"
                  value={activeHours}
                  onChange={(e) => setActiveHours(e.target.value)}
                  placeholder="Ghantay darj karein"
                  className="w-full px-3 py-2 bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded border border-primary-foreground/30 text-sm"
                />
              </div>
              <Button className="w-full mt-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Shift Darj Karein
              </Button>
            </Card>
          </div>
        </div>

        {/* Earnings History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Kamaai Ka Itihaas</h2>
            <a href="#" className="text-primary font-semibold text-sm hover:underline">Sab Dekhein</a>
          </div>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    {['Platform', 'Taareekh', 'Muddat', 'Raqam', 'Status'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {earningsHistory.map((entry) => (
                    <tr key={entry.id} className="hover:bg-secondary transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-sm">{entry.icon}</div>
                          <span className="font-medium text-foreground">{entry.platform}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{entry.date}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{entry.duration}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{entry.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          entry.statusColor === 'green' ? 'bg-green-100 text-green-700' :
                          entry.statusColor === 'blue' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{entry.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Platforms + Evidence */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Pakistani Platforms</h3>
            <div className="grid grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <Card key={platform.name} className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-3xl mb-2">{platform.icon}</p>
                  <p className="text-xs font-semibold text-foreground">{platform.name}</p>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Screenshot Saboot</h3>
            <Card className="p-8 border-2 border-dashed border-border flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors">
              <Camera className="w-8 h-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">Screenshot yahan drop karein</p>
              <p className="text-xs text-muted-foreground mt-1">Foodpanda, Careem, Daraz, Bykea</p>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
