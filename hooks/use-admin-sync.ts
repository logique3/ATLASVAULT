'use client';

import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface SyncResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export function useAdminSync() {
  const { toast } = useToast();

  // Services
  const fetchServices = useCallback(async (category?: string, activeOnly = false) => {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (activeOnly) params.append('active', 'true');

      const response = await fetch(`/api/services?${params.toString()}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch services');
      }

      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch services';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  const saveService = useCallback(async (service: any) => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to save service');
      }

      toast({
        title: 'Success',
        description: data.message || 'Service saved successfully',
      });

      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save service';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Categories
  const fetchCategories = useCallback(async (activeOnly = false) => {
    try {
      const params = new URLSearchParams();
      if (activeOnly) params.append('active', 'true');

      const response = await fetch(`/api/categories?${params.toString()}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch categories');
      }

      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch categories';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  const saveCategory = useCallback(async (category: any) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to save category');
      }

      toast({
        title: 'Success',
        description: data.message || 'Category saved successfully',
      });

      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save category';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Promos
  const fetchPromos = useCallback(async (activeOnly = false) => {
    try {
      const params = new URLSearchParams();
      if (activeOnly) params.append('active', 'true');

      const response = await fetch(`/api/promos?${params.toString()}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch promos');
      }

      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch promos';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  const savePromo = useCallback(async (promo: any) => {
    try {
      const response = await fetch('/api/promos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(promo),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to save promo');
      }

      toast({
        title: 'Success',
        description: data.message || 'Promotion saved successfully',
      });

      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save promo';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Offers
  const fetchOffers = useCallback(async (activeOnly = false) => {
    try {
      const params = new URLSearchParams();
      if (activeOnly) params.append('active', 'true');

      const response = await fetch(`/api/offers?${params.toString()}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch offers');
      }

      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch offers';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  const saveOffer = useCallback(async (offer: any) => {
    try {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to save offer');
      }

      toast({
        title: 'Success',
        description: data.message || 'Offer saved successfully',
      });

      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save offer';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  return {
    // Services
    fetchServices,
    saveService,
    // Categories
    fetchCategories,
    saveCategory,
    // Promos
    fetchPromos,
    savePromo,
    // Offers
    fetchOffers,
    saveOffer,
  };
}
