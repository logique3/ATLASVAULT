'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart3, Users, ShoppingCart, TrendingUp, Plus, Trash2, Edit2, Search, Tag, Zap,
  X, Check, AlertCircle, Calendar, DollarSign, Filter, Download, Eye, EyeOff, Folder
} from 'lucide-react'
import Link from 'next/link'

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

  // ==================== PRODUCTS TAB ====================
  const renderProducts = () => (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>
        <Button onClick={() => { setEditingItem(null); setShowProductModal(true) }} className="gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
        {selectedProducts.size > 0 && (
          <Button variant="destructive" className="gap-2">
            <Trash2 className="w-4 h-4" /> Delete ({selectedProducts.size})
          </Button>
        )}
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Sales</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockProducts.map((product) => (
              <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedProducts.has(product.id)}
                    onChange={(e) => {
                      const newSet = new Set(selectedProducts)
                      if (e.target.checked) newSet.add(product.id)
                      else newSet.delete(product.id)
                      setSelectedProducts(newSet)
                    }}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-foreground">{product.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground capitalize">{product.category}</td>
                <td className="px-4 py-3 font-semibold text-primary">{product.price} TND</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">{product.sales}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {product.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => { setEditingItem(product); setShowProductModal(true) }}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  // ==================== CATEGORIES TAB ====================
  const renderCategories = () => (
    <div className="space-y-4">
      <Button onClick={() => { setEditingItem(null); setShowCategoryModal(true) }} className="gap-2">
        <Plus className="w-4 h-4" /> Add Category
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockCategories.map((cat) => (
          <Card key={cat.id} className={`border-l-4 border-l-primary hover:shadow-lg transition-shadow`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <CardTitle className="text-lg">{cat.name}</CardTitle>
                  <CardDescription>{cat.description}</CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cat.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {cat.active ? 'Active' : 'Hidden'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">{cat.productCount} products</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => { setEditingItem(cat); setShowCategoryModal(true) }}>
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="ghost">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  // ==================== PROMOS TAB ====================
  const renderPromos = () => (
    <div className="space-y-4">
      <Button onClick={() => { setEditingItem(null); setShowPromoModal(true) }} className="gap-2">
        <Plus className="w-4 h-4" /> Create Promo
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPromos.map((promo) => (
          <Card key={promo.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{promo.title}</CardTitle>
                  <CardDescription className="text-lg text-primary font-semibold mt-1">
                    {promo.type === 'percentage' ? `${promo.discount}%` : `${promo.discount} TND`} OFF
                  </CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${promo.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {promo.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p>Applicable to: <span className="font-semibold text-foreground capitalize">{promo.applicableTo}</span></p>
                <p>Start: <span className="font-semibold text-foreground">{promo.startDate}</span></p>
                <p>End: <span className="font-semibold text-foreground">{promo.endDate}</span></p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => { setEditingItem(promo); setShowPromoModal(true) }}>
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="ghost">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  // ==================== OFFERS TAB ====================
  const renderOffers = () => (
    <div className="space-y-4">
      <Button onClick={() => { setEditingItem(null); setShowOfferModal(true) }} className="gap-2">
        <Plus className="w-4 h-4" /> Create Offer
      </Button>

      <div className="space-y-3">
        {mockOffers.map((offer) => (
          <Card key={offer.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{offer.name}</h3>
                  <p className="text-muted-foreground">{offer.description}</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <p>Condition: <span className="font-semibold text-foreground">{offer.condition}</span></p>
                    <p>Priority: <span className={`font-semibold ${offer.priority === 'high' ? 'text-red-600' : offer.priority === 'medium' ? 'text-orange-600' : 'text-green-600'}`}>{offer.priority}</span></p>
                    {offer.isLimited && <p>Limited to: <span className="font-semibold text-foreground">{offer.limitedQuantity} uses</span></p>}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${offer.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {offer.active ? 'Active' : 'Inactive'}
                  </span>
                  <p className="text-xs text-muted-foreground">Expires: {offer.expiresAt}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => { setEditingItem(offer); setShowOfferModal(true) }}>
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="ghost">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
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
