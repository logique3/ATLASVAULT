'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { CATEGORIES_DATABASE } from '@/lib/services-db';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  productCount: number;
  active: boolean;
}

interface CategoryFormData {
  name: string;
  description: string;
  icon: string;
  color: string;
  active: boolean;
}

export function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>(Object.values(CATEGORIES_DATABASE));
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    icon: '📦',
    color: 'from-[#0066CC] to-[#4A90E2]',
    active: true,
  });

  const colorOptions = [
    { name: 'Blue', value: 'from-[#0066CC] to-[#4A90E2]' },
    { name: 'Green', value: 'from-[#2ECC71] to-[#27AE60]' },
    { name: 'Orange', value: 'from-[#FF6B35] to-[#FF4500]' },
    { name: 'Purple', value: 'from-[#5B4A9F] to-[#0066CC]' },
    { name: 'Pink', value: 'from-[#FF1493] to-[#FF69B4]' },
    { name: 'Teal', value: 'from-[#17A2B8] to-[#20C997]' },
  ];

  const iconOptions = ['📱', '🎬', '🎮', '💼', '📦', '🛍️', '💻', '🎵', '🎤', '📺'];

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        icon: category.icon,
        color: category.color,
        active: category.active,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        icon: '📦',
        color: 'from-[#0066CC] to-[#4A90E2]',
        active: true,
      });
    }
    setShowModal(true);
  };

  const handleSaveCategory = () => {
    if (!formData.name) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingCategory) {
      setCategories(categories.map(c =>
        c.id === editingCategory.id
          ? {
              ...c,
              name: formData.name,
              description: formData.description,
              icon: formData.icon,
              color: formData.color,
              active: formData.active,
            }
          : c
      ));
    } else {
      const newCategory: Category = {
        id: formData.name.toLowerCase().replace(/\s+/g, '-'),
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
        color: formData.color,
        productCount: 0,
        active: formData.active,
      };
      setCategories([...categories, newCategory]);
    }

    setShowModal(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => handleOpenModal()} className="gap-2">
        <Plus className="w-4 h-4" /> Add Category
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="text-xs mt-1">{category.description}</CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${category.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {category.active ? 'Active' : 'Hidden'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">{category.productCount} products</div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleOpenModal(category)}
                >
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            <DialogDescription>
              {editingCategory ? 'Update category details' : 'Create a new product category'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Streaming Services"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Category description..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="grid grid-cols-5 gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`p-2 text-2xl border rounded-lg transition-all ${
                        formData.icon === icon
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <div className="space-y-2">
                  {colorOptions.map((color) => (
                    <label
                      key={color.value}
                      className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color.value}
                        checked={formData.color === color.value}
                        onChange={() => setFormData({ ...formData, color: color.value })}
                      />
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color.value}`} />
                      <span className="text-sm font-medium">{color.name}</span>
                    </label>
                  ))}
                </div>
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
              <Button onClick={handleSaveCategory}>
                {editingCategory ? 'Update Category' : 'Add Category'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
