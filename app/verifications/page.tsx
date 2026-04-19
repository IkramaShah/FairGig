'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/app-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, CheckCircle, QrCode, FileText, Printer } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'

const certificateData = {
  verificationNumber: 'FG-2024-1142-KHI',
  issueDate: '24 Oct, 2024',
  statementPeriod: 'Q3 FY2024',
  period: '01 Jul, 2024 — 30 Sep, 2024',
  workerName: 'Ahmed Hassan',
  workerId: 'Verified Worker ID: 1142-FG-KHI',
  location: 'Karachi, Sindh — Pakistan',
  totalNetIncome: 'PKR 4,14,500',
  grossEarnings: 'PKR 4,59,000',
  platformFees: '-PKR 44,500',
  activities: [
    { name: 'Foodpanda Delivery', category: 'Food Delivery', tasks: '284 Deliveries', income: 'PKR 2,34,000', icon: '🍔' },
    { name: 'Careem Rides', category: 'Ride Hailing', tasks: '116 Trips', income: 'PKR 1,42,300', icon: '🚗' },
    { name: 'Daraz Last Mile', category: 'E-Commerce Delivery', tasks: '198 Packages', income: 'PKR 38,200', icon: '📦' },
  ],
}

export default function Verifications() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState('certificate')

  useEffect(() => {
    if (!loading && !user) router.replace('/login')
  }, [user, loading, router])

  if (loading || !user) return null

  const handlePrint = () => window.print()

  return (
    <AppLayout navbarTitle="Income Certificate" navbarSubtitle="INCOME VERIFICATION" searchPlaceholder="Certificates talash karein...">
      {/* Print-only styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white; }
        }
        .print-only { display: none; }
      `}</style>

      <div className="space-y-8">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-border no-print">
          {[
            { id: 'certificate', label: 'Income Certificate' },
            { id: 'history', label: 'Itihaas' },
            { id: 'tax', label: 'Tax Documents' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`pb-3 px-1 font-semibold text-sm ${
                selectedTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >{tab.label}</button>
          ))}
        </div>

        {selectedTab === 'certificate' && (
          <>
            {/* Actions */}
            <div className="flex items-center justify-between no-print">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Certified Income Statement</h1>
                <p className="text-sm text-muted-foreground">24 October, 2024 ko generate kiya gaya — platform activities ke liye</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handlePrint} className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Karein
                </Button>
                <Button onClick={handlePrint} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  PDF Export
                </Button>
              </div>
            </div>

            {/* ============ PRINTABLE CERTIFICATE ============ */}
            <div id="income-certificate" className="bg-white rounded-lg p-12 space-y-8 max-w-4xl mx-auto border border-border shadow-sm">
              {/* Official Badge */}
              <div className="flex items-center justify-center gap-2 pb-6 border-b-2 border-primary">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-widest">FairGig — Officially Certified</span>
              </div>

              {/* Title */}
              <div className="text-center space-y-2">
                <div className="text-5xl mb-2">🇵🇰</div>
                <h2 className="text-4xl font-bold text-foreground">
                  Income <span className="text-primary">Certificate</span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  Ref No: {certificateData.verificationNumber} • Issue Date: {certificateData.issueDate}
                </p>
              </div>

              {/* Worker Details */}
              <div className="grid grid-cols-2 gap-8 py-8 border-t border-b border-border">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Statement Issued To</p>
                  <p className="text-xl font-bold text-foreground">{user.full_name || certificateData.workerName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{certificateData.workerId}</p>
                  <p className="text-sm text-muted-foreground">{user.city ? `${user.city}, Pakistan` : certificateData.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Statement Period</p>
                  <p className="text-xl font-bold text-foreground">{certificateData.statementPeriod}</p>
                  <p className="text-sm text-muted-foreground mt-1">{certificateData.period}</p>
                  <p className="text-sm text-muted-foreground mt-2">Platform: Multi-Platform Worker</p>
                </div>
              </div>

              {/* Income Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 space-y-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Total Net Certified Income</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-green-700">{certificateData.totalNetIncome}</span>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-6 pt-6 border-t border-green-200">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Gross Earnings</p>
                    <p className="text-2xl font-bold text-foreground">{certificateData.grossEarnings}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Platform Fees</p>
                    <p className="text-2xl font-bold text-red-600">{certificateData.platformFees}</p>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">Activity Breakdown</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-4 pb-3 border-b border-border">
                    {['Platform', 'Category', 'Tasks Completed', 'Net Income'].map(h => (
                      <p key={h} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</p>
                    ))}
                  </div>
                  {certificateData.activities.map((activity, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-4 py-3 items-center border-b border-border/50">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{activity.icon}</span>
                        <p className="font-semibold text-foreground text-sm">{activity.name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.category}</p>
                      <p className="font-semibold text-foreground">{activity.tasks}</p>
                      <p className="font-bold text-green-700">{activity.income}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Declaration */}
              <div className="space-y-4 pt-8 border-t border-border bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <p className="text-sm font-bold text-primary uppercase tracking-wide">Statement Declaration</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  FairGig certifies that the above figures represent the actual verified income disbursed to the individual
                  named herein. All figures are in Pakistani Rupees (PKR). This document is cryptographically secured and
                  verifiable against the FairGig Public Ledger. Ye certificate makan maalik, banks, aur loan applications ke liye qabil-e-qabool hai.
                </p>
              </div>

              {/* Signature */}
              <div className="flex items-end justify-between pt-8">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">FairGig Platform</p>
                  <p className="text-xs text-muted-foreground">Pakistan Labour Advocacy Network</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-3xl font-bold text-primary italic">Amina</div>
                  <p className="text-sm font-semibold text-foreground">Amina Siddiqui</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Chief Verification Officer</p>
                </div>
              </div>
            </div>

            {/* QR + Physical Copy */}
            <div className="grid grid-cols-2 gap-6 no-print">
              <Card className="p-6 flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-24 h-24 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-semibold text-foreground mb-1">SCAN TO VERIFY</p>
                  <p className="text-xs text-muted-foreground">QR code se authenticity verify karein</p>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-foreground mb-3">Physical Copy Chahiye?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Aapke registered address par notarized hardcopy 5 business days mein pahunch sakti hai.
                </p>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Notarized Copy Ka Request Karein
                </Button>
              </Card>
            </div>
          </>
        )}

        {selectedTab === 'history' && (
          <Card className="p-8 text-center text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>Pehle ke certified statements yahan dikhenge</p>
          </Card>
        )}

        {selectedTab === 'tax' && (
          <Card className="p-8 text-center text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>Tax documents (FBR returns, etc.) yahan dikhenge</p>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
