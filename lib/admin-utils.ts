export const adminHelpers = {
  formatDate: (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  },

  calculateDiscount: (originalPrice: number, discountType: string, discountValue: number) => {
    if (discountType === 'percentage') {
      return originalPrice * (1 - discountValue / 100)
    }
    return originalPrice - discountValue
  },

  isPromoActive: (startDate: string, endDate: string) => {
    const today = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    return today >= start && today <= end
  },

  generateProductReport: (products: any[]) => {
    return {
      totalProducts: products.length,
      activeProducts: products.filter((p) => p.active).length,
      totalStock: products.reduce((sum, p) => sum + p.stock, 0),
      totalSales: products.reduce((sum, p) => sum + p.sales, 0),
      revenue: products.reduce((sum, p) => sum + p.price * p.sales, 0),
    }
  },

  bulkUpdateProducts: (productIds: string[], updates: any, allProducts: any[]) => {
    return allProducts.map((product) =>
      productIds.includes(product.id) ? { ...product, ...updates } : product
    )
  },
}
