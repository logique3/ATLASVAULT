'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { PROMOS_DATABASE, SERVICES_DATABASE, CATEGORIES_DATABASE } from '@/lib/services-db';

interface Promo {
  id: string;
  title: string;
  discount: number;
  type: 'percentage' | 'fixed';
  startDate: string;
  endDate: string;
  applicableTo: 'all' | 'product' | 'category';
  targetId?: string;
  active: boolean;
}

interface PromoFormData {
  title: string;
  discount: string;
  type: 'percentage' | 'fixed';
  startDate: string;
  endDate: string;
  applicableTo: 'all' | 'product' | 'category';
  targetId?: string;
  active: boolean;
}

export function PromosManagement() {
  const [promos, setPromos] = useState<Promo[]>(Object.values(PROMOS_DATABASE));
  const [showModal, setShowModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);
  const [formData, setFormData] = useState<PromoFormData>({
    title: '',
    discount: '',
    type: 'percentage',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    applicableTo: 'all',
    active: true,
  });

  const handleOpenModal = (promo?: Promo) => {
    if (promo) {
      setEditingPromo(promo);
      setFormData({
        title: promo.title,
        discount: promo.discount.toString(),
        type: promo.type,
        startDate: promo.startDate,
        endDate: promo.endDate,
        applicableTo: promo.applicableTo,
        targetId: promo.targetId,
        active: promo.active,
      });
    } else {
      setEditingPromo(null);
      setFormData({
        title: '',
        discount: '',
        type: 'percentage',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        applicableTo: 'all',
        active: true,
      });
    }
    setShowModal(true);
  };

  const handleSavePromo = () => {
    if (!formData.title || !formData.discount) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingPromo) {
      setPromos(promos.map(p =>
        p.id === editingPromo.id
          ? {
              ...p,
              title: formData.title,
              discount: parseFloat(formData.discount),
              type: formData.type,
              startDate: formData.startDate,
              endDate: formData.endDate,
              applicableTo: formData.applicableTo,
              targetId: formData.targetId,
              active: formData.active,
            }
          : p
      ));
    } else {
      const newPromo: Promo = {
        id: `promo-${Date.now()}`,
        title: formData.title,
        discount: parseFloat(formData.discount),
        type: formData.type,
        startDate: formData.startDate,
        endDate: formData.endDate,
        applicableTo: formData.applicableTo,
        targetId: formData.targetId,
        active: formData.active,
      };
      setPromos([...promos, newPromo]);
    }

    setShowModal(false);
  };

  const handleDeletePromo = (id: string) => {
    if (confirm('Are you sure you want to delete this promo?')) {
      setPromos(promos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => handleOpenModal()} className="gap-2">
        <Plus className="w-4 h-4" /> Create Promo
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promos.map((promo) => (
          <Card key={promo.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{promo.title}</CardTitle>
                  <CardDescription className="text-lg text-primary font-semibold mt-1">
                    {promo.type === 'percentage' ? `${promo.discount}%` : `${promo.discount} TND`} OFF
                  </CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${promo.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
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
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleOpenModal(promo)}
                >
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeletePromo(promo.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Promo Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPromo ? 'Edit Promotion' : 'Create New Promotion'}</DialogTitle>
            <DialogDescription>
              {editingPromo ? 'Update promotion details' : 'Create a new discount promotion'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Promotion Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Netflix 50% Off"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Amount *</Label>
                <Input
                  id="discount"
                  type="number"
                  step="0.01"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  placeholder="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Discount Type *</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed (TND)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicableTo">Applicable To *</Label>
              <Select value={formData.applicableTo} onValueChange={(value: any) => setFormData({ ...formData, applicableTo: value, targetId: undefined })}>
                <SelectTrigger id="applicableTo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="product">Specific Product</SelectItem>
                  <SelectItem value="category">Specific Category</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.applicableTo === 'product' && (
              <div className="space-y-2">
                <Label htmlFor="targetId">Select Product</Label>
                <Select value={formData.targetId || ''} onValueChange={(value) => setFormData({ ...formData, targetId: value })}>
                  <SelectTrigger id="targetId">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(SERVICES_DATABASE).map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.applicableTo === 'category' && (
              <div className="space-y-2">
                <Label htmlFor="categoryId">Select Category</Label>
                <Select value={formData.targetId || ''} onValueChange={(value) => setFormData({ ...formData, targetId: value })}>
                  <SelectTrigger id="categoryId">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(CATEGORIES_DATABASE).map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              />
              <span className="text-sm font-medium">Active</span>
            </label>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePromo}>
                {editingPromo ? 'Update Promo' : 'Create Promo'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
