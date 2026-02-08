'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { OFFERS_DATABASE } from '@/lib/services-db';

interface Offer {
  id: string;
  name: string;
  description: string;
  condition: string;
  priority: 'high' | 'medium' | 'low';
  expiresAt: string;
  isLimited: boolean;
  limitedQuantity?: number;
  active: boolean;
}

interface OfferFormData {
  name: string;
  description: string;
  condition: string;
  priority: 'high' | 'medium' | 'low';
  expiresAt: string;
  isLimited: boolean;
  limitedQuantity: string;
  active: boolean;
}

export function OffersManagement() {
  const [offers, setOffers] = useState<Offer[]>(Object.values(OFFERS_DATABASE));
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState<OfferFormData>({
    name: '',
    description: '',
    condition: '',
    priority: 'medium',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isLimited: false,
    limitedQuantity: '',
    active: true,
  });

  const handleOpenModal = (offer?: Offer) => {
    if (offer) {
      setEditingOffer(offer);
      setFormData({
        name: offer.name,
        description: offer.description,
        condition: offer.condition,
        priority: offer.priority,
        expiresAt: offer.expiresAt,
        isLimited: offer.isLimited,
        limitedQuantity: offer.limitedQuantity?.toString() || '',
        active: offer.active,
      });
    } else {
      setEditingOffer(null);
      setFormData({
        name: '',
        description: '',
        condition: '',
        priority: 'medium',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isLimited: false,
        limitedQuantity: '',
        active: true,
      });
    }
    setShowModal(true);
  };

  const handleSaveOffer = () => {
    if (!formData.name || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingOffer) {
      setOffers(offers.map(o =>
        o.id === editingOffer.id
          ? {
              ...o,
              name: formData.name,
              description: formData.description,
              condition: formData.condition,
              priority: formData.priority,
              expiresAt: formData.expiresAt,
              isLimited: formData.isLimited,
              limitedQuantity: formData.isLimited ? parseInt(formData.limitedQuantity) : undefined,
              active: formData.active,
            }
          : o
      ));
    } else {
      const newOffer: Offer = {
        id: `offer-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        condition: formData.condition,
        priority: formData.priority,
        expiresAt: formData.expiresAt,
        isLimited: formData.isLimited,
        limitedQuantity: formData.isLimited ? parseInt(formData.limitedQuantity) : undefined,
        active: formData.active,
      };
      setOffers([...offers, newOffer]);
    }

    setShowModal(false);
  };

  const handleDeleteOffer = (id: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(o => o.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => handleOpenModal()} className="gap-2">
        <Plus className="w-4 h-4" /> Create Offer
      </Button>

      <div className="space-y-3">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{offer.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{offer.description}</p>
                  <div className="mt-3 space-y-1 text-sm">
                    <p>Condition: <span className="font-semibold text-foreground">{offer.condition}</span></p>
                    <p>Priority: <span className={`font-semibold ${offer.priority === 'high' ? 'text-red-600' : offer.priority === 'medium' ? 'text-orange-600' : 'text-green-600'}`}>{offer.priority}</span></p>
                    {offer.isLimited && <p>Limited to: <span className="font-semibold text-foreground">{offer.limitedQuantity} uses</span></p>}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${offer.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {offer.active ? 'Active' : 'Inactive'}
                  </span>
                  <p className="text-xs text-muted-foreground">Expires: {offer.expiresAt}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleOpenModal(offer)}
                >
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteOffer(offer.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Offer Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingOffer ? 'Edit Special Offer' : 'Create New Special Offer'}</DialogTitle>
            <DialogDescription>
              {editingOffer ? 'Update offer details' : 'Create a new special promotion offer'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Offer Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Bundle Deal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., Buy 2 Get 1 Free"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                placeholder="e.g., Minimum 2 products"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value: any) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiresAt">Expires At *</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isLimited}
                  onChange={(e) => setFormData({ ...formData, isLimited: e.target.checked, limitedQuantity: '' })}
                />
                <span className="text-sm font-medium">Limited Quantity</span>
              </label>

              {formData.isLimited && (
                <div className="space-y-2">
                  <Label htmlFor="limitedQuantity">Number of Uses</Label>
                  <Input
                    id="limitedQuantity"
                    type="number"
                    value={formData.limitedQuantity}
                    onChange={(e) => setFormData({ ...formData, limitedQuantity: e.target.value })}
                    placeholder="100"
                  />
                </div>
              )}
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
              <Button onClick={handleSaveOffer}>
                {editingOffer ? 'Update Offer' : 'Create Offer'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
