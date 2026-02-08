'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart3, Users, ShoppingCart, TrendingUp, Plus, Trash2, Edit2, Search, Tag, Zap,
  X, Check, AlertCircle, Calendar, DollarSign, Filter, Download, Eye, EyeOff, Folder
} from 'lucide-react'
import Link from 'next/link'
import { ServicesManagement } from '@/components/admin/services-management'
import { CategoriesManagement } from '@/components/admin/categories-management'
import { PromosManagement } from '@/components/admin/promos-management'
import { OffersManagement } from '@/components/admin/offers-management'

// ==================== INTERFACES ====================
interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  sales: number
  image?: string
  description: string
  active: boolean
}

interface Category {
  id: string
  name: string
  description: string
  color: string
  icon: string
  productCount: number
  active: boolean
}

interface Promo {
  id: string
  title: string
  discount: number
  type: 'percentage' | 'fixed'
  endDate: string
  applicableTo: 'all' | 'product' | 'category'
  targetId?: string
  active: boolean
  startDate: string
}

interface SpecialOffer {
  id: string
  name: string
  description: string
  condition: string
  priority: 'high' | 'medium' | 'low'
  expiresAt: string
  isLimited: boolean
  limitedQuantity?: number
  active: boolean
}

// ==================== MOCK DATA ====================
const mockProducts: Product[] = [
  { id: '1', name: 'Netflix Premium', price: 15.99, category: 'vault', stock: 1000, sales: 450, description: '4K Ultra HD', active: true },
  { id: '2', name: 'Spotify Premium', price: 12.99, category: 'vault', stock: 800, sales: 320, description: 'Ad-free music', active: true },
  { id: '3', name: 'Ooredoo 10GB', price: 19.99, category: 'telecom', stock: 500, sales: 280, description: 'Internet bundle', active: true },
  { id: '4', name: 'Free Fire 520', price: 9.99, category: 'gaming', stock: 2000, sales: 890, description: 'Gaming credits', active: true },
  { id: '5', name: 'Canva Pro', price: 14.99, category: 'business', stock: 300, sales: 150, description: 'Design tool', active: false },
]

const mockCategories: Category[] = [
  { id: 'vault', name: 'The Vault', description: 'Streaming', color: 'from-[#0066CC] to-[#4A90E2]', icon: '🎬', productCount: 6, active: true },
  { id: 'telecom', name: 'Telecom Hub', description: 'Internet & Top-ups', color: 'from-[#2ECC71] to-[#27AE60]', icon: '📱', productCount: 6, active: true },
  { id: 'gaming', name: 'Gaming Corner', description: 'Gaming Credits', color: 'from-[#FF6B35] to-[#FF4500]', icon: '🎮', productCount: 6, active: true },
  { id: 'business', name: 'Business Suite', description: 'Business Tools', color: 'from-[#5B4A9F] to-[#0066CC]', icon: '💼', productCount: 6, active: true },
]

const mockPromos: Promo[] = [
  { id: '1', title: 'Netflix 50% Off', discount: 50, type: 'percentage', endDate: '2024-02-28', applicableTo: 'product', targetId: '1', active: true, startDate: '2024-02-01' },
  { id: '2', title: 'Gaming 30% Off', discount: 30, type: 'percentage', endDate: '2024-02-15', applicableTo: 'category', targetId: 'gaming', active: true, startDate: '2024-02-01' },
  { id: '3', title: 'Flat 5 TND Off', discount: 5, type: 'fixed', endDate: '2024-03-01', applicableTo: 'all', active: false, startDate: '2024-02-15' },
]

const mockOffers: SpecialOffer[] = [
  { id: '1', name: 'Bundle Deal', description: 'Buy 2 Get 1 Free', condition: 'Minimum 2 products', priority: 'high', expiresAt: '2024-02-28', isLimited: true, limitedQuantity: 100, active: true },
  { id: '2', name: 'First Purchase', description: '20% off for new users', condition: 'New customers only', priority: 'medium', expiresAt: '2024-03-15', isLimited: false, active: true },
]

// ==================== ADMIN DASHBOARD ====================
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'promos' | 'offers'>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [showProductModal, setShowProductModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showPromoModal, setShowPromoModal] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  // ==================== OVERVIEW TAB ====================
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value="12,450 TND"
          change="+12.5%"
          icon={<DollarSign className="w-6 h-6" />}
          trend="up"
        />
        <KPICard
          title="Active Products"
          value="24"
          change="+3"
          icon={<ShoppingCart className="w-6 h-6" />}
          trend="up"
        />
        <KPICard
          title="Active Promos"
          value="7"
          change="+2"
          icon={<Tag className="w-6 h-6" />}
          trend="up"
        />
        <KPICard
          title="Total Categories"
          value="4"
          change="0"
          icon={<Folder className="w-6 h-6" />}
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{product.price} TND</p>
                    <p className="text-sm text-muted-foreground">{product.stock} in stock</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCategories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm font-medium text-foreground">{cat.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{cat.productCount} products</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // ==================== PRODUCTS/SERVICES TAB ====================
  const renderProducts = () => (
    <ServicesManagement />
  )

  // ==================== CATEGORIES TAB ====================
  const renderCategories = () => (
    <CategoriesManagement />
  )

  // ==================== PROMOS TAB ====================
  const renderPromos = () => (
    <PromosManagement />
  )

  // ==================== OFFERS TAB ====================
  const renderOffers = () => (
    <OffersManagement />
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-16 bg-background/95 backdrop-blur z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your platform with advanced controls</p>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" /> Export Report
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="border-b border-border sticky top-28 bg-background/95 backdrop-blur z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto">
          {['overview', 'products', 'categories', 'promos', 'offers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-b-primary text-primary'
                  : 'border-b-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'categories' && renderCategories()}
        {activeTab === 'promos' && renderPromos()}
        {activeTab === 'offers' && renderOffers()}
      </main>
    </div>
  )
}

// ==================== KPI CARD COMPONENT ====================
function KPICard({ title, value, change, icon, trend }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
            <p className={`text-xs mt-2 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground'}`}>
              {change}
            </p>
          </div>
          <div className="text-primary opacity-20">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
