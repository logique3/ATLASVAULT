'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';
import { SERVICES_DATABASE, CATEGORIES_DATABASE } from '@/lib/services-db';

interface Service {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
  active: boolean;
}

interface ServiceFormData {
  name: string;
  slug: string;
  price: string;
  category: string;
  description: string;
  inStock: boolean;
  active: boolean;
}

export function ServicesManagement() {
  const [services, setServices] = useState<Service[]>(
    Object.values(SERVICES_DATABASE).map(s => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      price: s.price,
      category: s.category,
      description: s.description,
      inStock: s.inStock,
      active: s.active,
    }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    slug: '',
    price: '',
    category: 'vault',
    description: '',
    inStock: true,
    active: true,
  });

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        slug: service.slug,
        price: service.price.toString(),
        category: service.category,
        description: service.description,
        inStock: service.inStock,
        active: service.active,
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        slug: '',
        price: '',
        category: 'vault',
        description: '',
        inStock: true,
        active: true,
      });
    }
    setShowModal(true);
  };

  const handleSaveService = () => {
    if (!formData.name || !formData.slug || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingService) {
      // Update existing service
      setServices(services.map(s =>
        s.id === editingService.id
          ? {
              ...s,
              name: formData.name,
              slug: formData.slug,
              price: parseFloat(formData.price),
              category: formData.category,
              description: formData.description,
              inStock: formData.inStock,
              active: formData.active,
            }
          : s
      ));
    } else {
      // Create new service
      const newService: Service = {
        id: Date.now().toString(),
        name: formData.name,
        slug: formData.slug,
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description,
        inStock: formData.inStock,
        active: formData.active,
      };
      setServices([...services, newService]);
    }

    setShowModal(false);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Service Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredServices.map((service) => (
              <tr key={service.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{service.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground capitalize">{service.category}</td>
                <td className="px-4 py-3 font-semibold text-primary">{service.price.toFixed(2)} TND</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${service.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {service.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenModal(service)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Service Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            <DialogDescription>
              {editingService ? 'Update service details' : 'Create a new digital service'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Netflix Premium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., netflix-premium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (TND) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="15.99"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(CATEGORIES_DATABASE).map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service description..."
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                />
                <span className="text-sm font-medium">In Stock</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <span className="text-sm font-medium">Active</span>
              </label>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveService}>
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
