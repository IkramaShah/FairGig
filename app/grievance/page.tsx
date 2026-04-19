'use client'

import { AppLayout } from '@/components/app-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Filter, MessageSquare, ThumbsUp, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'

const grievances = [
  {
    id: 1,
    platform: 'FOODPANDA',
    status: 'ESCALATED',
    title: 'Lahore mein account deactivate kiya gaya bina kisi wajah ke — rating 4.9 thi',
    body: 'Subah uth kar dekha to account suspend tha. Wajah "Safety Concern" likhi thi lekin meri rating 4.9 hai aur koi complain nahi...',
    timestamp: '2 ghantay pehlay',
    likes: 312,
    comments: 24,
    avatars: [
      { initials: 'AK', color: 'bg-blue-500' },
      { initials: 'MR', color: 'bg-purple-500' },
      { initials: '+18', color: 'bg-gray-400' },
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 2,
    platform: 'CAREEM',
    status: 'JAARI HAI',
    title: 'Karachi mein 5-stop delivery ka PKR 1,200 payment gum — app crash ke baad',
    body: 'Baarish mein 5 jagah delivery ki. App crash ho gai aur akhari delivery ka confirmation nahi aaya. PKR 1,200 abhi tak nahi mila...',
    timestamp: '5 ghantay pehlay',
    likes: 189,
    comments: 51,
    avatars: [
      { initials: 'ZH', color: 'bg-indigo-500' },
      { initials: 'SA', color: 'bg-pink-500' },
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 3,
    platform: 'COLLECTIVE',
    status: 'RESOLVED',
    title: 'Lahore Delivery Workers ne FairGig ke zariye PKR 14 lakh back-pay hasil kiya',
    body: 'Yeh board sirf shikayat ke liye nahi — yahan insaaf milta hai. Dekhein kaise 45 drivers ne mil kar systemic tip theft ko expose kiya.',
    timestamp: 'Featured',
    likes: 0,
    comments: 0,
    isFeature: true,
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-r from-purple-600 to-blue-600',
  },
  {
    id: 4,
    platform: 'DARAZ',
    status: 'JAARI HAI',
    title: 'Commission rate 15% se 25% ho gayi — koi notification nahi diya gaya',
    body: 'Pichle hafte bina bataye commission rate badh gai. Ab PKR 3,000 kam milte hain per delivery. Rawalpindi zone mein sab riders...',
    timestamp: '1 din pehlay',
    likes: 445,
    comments: 67,
    avatars: [
      { initials: 'IK', color: 'bg-green-500' },
      { initials: 'FQ', color: 'bg-orange-500' },
      { initials: '+31', color: 'bg-gray-400' },
    ],
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
]

const stats = [
  { label: 'ACTIVE CASES', value: '2.4k' },
  { label: 'RESOLUTION RATE', value: '78%' },
  { label: 'AVG RESPONSE', value: '18 ghantay' },
]

export default function GrievanceBoard() {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = grievances.filter(g =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.platform.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AppLayout navbarTitle="Shikayat Board" showSearch={true} searchPlaceholder="Shikayat ya keywords talash karein...">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Shikayat <span className="text-primary">Board</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Pakistani gig workers ka ek muttahida platform — tajarbat share karein, insaaf maangein, aur collective advocacy se mazboot banein.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 flex items-center bg-secondary rounded-lg px-4 gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Shikayat ya keywords talash karein..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-3"
            />
          </div>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
            <Filter className="w-4 h-4" />
            FILTER
          </Button>
          <Button className="bg-primary text-primary-foreground">
            + Nai Shikayat
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            {filtered.map((grievance) => {
              if (grievance.isFeature) {
                return (
                  <div key={grievance.id} className={`${grievance.bgColor} rounded-lg p-6 text-white overflow-hidden relative border-l-4 border-white/30`}>
                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold px-3 py-1 rounded-full bg-white/20">COLLECTIVE ACTION</span>
                        <span className="text-sm font-bold px-3 py-1 rounded-full bg-white/20">RESOLVED</span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight">{grievance.title}</h3>
                      <p className="text-sm opacity-90">{grievance.body}</p>
                      <Button className="bg-white text-purple-600 hover:bg-white/90 mt-2">Pura Case Study Padhein</Button>
                    </div>
                  </div>
                )
              }
              return (
                <Card key={grievance.id} className="p-6 border-l-4 border-primary">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded text-xs font-bold flex items-center justify-center text-foreground">
                          {grievance.platform[0]}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground">{grievance.platform}</p>
                          <span className={`text-xs font-bold px-2 py-1 rounded mt-1 inline-block ${
                            grievance.status === 'ESCALATED' ? 'bg-red-100 text-red-700' :
                            grievance.status === 'JAARI HAI' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>{grievance.status}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{grievance.timestamp}</p>
                    </div>
                    <h3 className="text-base font-bold text-foreground">{grievance.title}</h3>
                    <p className="text-sm text-muted-foreground">{grievance.body}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-xs font-semibold">{grievance.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-xs font-semibold">{grievance.comments} Comments</span>
                        </button>
                      </div>
                      {grievance.avatars && (
                        <div className="flex items-center gap-1">
                          {grievance.avatars.map((avatar, idx) => (
                            <div key={idx} className={`w-6 h-6 ${avatar.color} rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-background`}>
                              {avatar.initials}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">Fori Madad</h3>
              <p className="text-sm text-muted-foreground">Legal advocacy ya moderators se rabta karein.</p>
            </div>
            <div className="space-y-3">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Legal Aid Helpline</p>
                    <p className="text-xs text-muted-foreground mt-1">24/7 DASTIYAB</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary rounded flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Moderator Chat</p>
                    <p className="text-xs text-muted-foreground mt-1">WAIT TIME: 5 MINUTE</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Templates & Forms</p>
                    <p className="text-xs text-muted-foreground mt-1">32 DOWNLOAD KE LIYE TAYYAR</p>
                  </div>
                </div>
              </Card>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Fori Review Ka Request Karein
              </Button>
            </div>

            <Card className="p-4 bg-secondary">
              <h4 className="font-bold text-foreground text-sm mb-3">Board Activity</h4>
              <div className="space-y-3">
                <div className="text-sm space-y-1">
                  <p className="text-foreground"><span className="font-semibold">@ali_rides_lhr</span> ne Foodpanda deactivation case hal kiya.</p>
                  <p className="text-xs text-muted-foreground">12 minute pehlay</p>
                </div>
                <div className="text-sm space-y-1 pt-3 border-t border-border">
                  <p className="text-foreground"><span className="font-semibold">New Alert:</span> Careem ne Karachi zone ki terms update ki.</p>
                  <p className="text-xs text-muted-foreground">45 minute pehlay</p>
                </div>
                <div className="text-sm space-y-1 pt-3 border-t border-border">
                  <p className="text-foreground"><span className="font-semibold">@hassan_daraz</span> ne naya thread shuru kiya: "Daraz commission drops ka hal"</p>
                  <p className="text-xs text-muted-foreground">1 ghanta pehlay</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">TRENDING TAGS</p>
                <div className="flex gap-2 flex-wrap">
                  {['#InsaafKaro', '#Deactivation', '#AppGlitch', '#Workers'].map(tag => (
                    <button key={tag} className="px-2 py-1 bg-background rounded text-xs font-semibold text-primary hover:bg-background/50 transition-colors">{tag}</button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
