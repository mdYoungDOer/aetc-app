import { createSupabaseClient } from './supabase/client';

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio?: string;
  image_url?: string;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
  // Legacy fields for backward compatibility
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  email?: string;
  phone?: string;
  is_featured?: boolean;
  is_active?: boolean;
  display_order?: number;
}

export class SpeakerService {
  private supabase = createSupabaseClient();

  async getSpeakers(options: {
    featured?: boolean;
    active?: boolean;
    limit?: number;
    orderBy?: 'order_index' | 'name' | 'created_at';
    orderDirection?: 'asc' | 'desc';
  } = {}): Promise<Speaker[]> {
    try {
      let query = this.supabase
        .from('speakers')
        .select('*');

      // Apply filters
      if (options.featured !== undefined) {
        query = query.eq('featured', options.featured);
      }

      // Note: No is_active filter since the column doesn't exist in the current table
      // All speakers in the table are considered active

      // Apply ordering
      const orderBy = options.orderBy || 'order_index';
      const orderDirection = options.orderDirection || 'asc';
      query = query.order(orderBy, { ascending: orderDirection === 'asc' });

      // Apply limit
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching speakers:', error);
        throw new Error('Failed to fetch speakers');
      }

      // Transform data to include legacy fields for backward compatibility
      return (data || []).map(speaker => ({
        ...speaker,
        is_featured: speaker.featured,
        is_active: true, // All speakers are considered active
        display_order: speaker.order_index,
        linkedin_url: speaker.social_links?.linkedin,
        twitter_url: speaker.social_links?.twitter,
        website_url: speaker.social_links?.website,
      }));
    } catch (error) {
      console.error('SpeakerService.getSpeakers error:', error);
      return [];
    }
  }

  async getFeaturedSpeakers(limit: number = 6): Promise<Speaker[]> {
    return this.getSpeakers({
      featured: true,
      active: true,
      limit,
      orderBy: 'order_index',
      orderDirection: 'asc',
    });
  }

  async getSpeakerById(id: string): Promise<Speaker | null> {
    try {
      const { data, error } = await this.supabase
        .from('speakers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching speaker:', error);
        return null;
      }

      if (!data) return null;

      // Transform data to include legacy fields for backward compatibility
      return {
        ...data,
        is_featured: data.featured,
        is_active: true, // All speakers are considered active
        display_order: data.order_index,
        linkedin_url: data.social_links?.linkedin,
        twitter_url: data.social_links?.twitter,
        website_url: data.social_links?.website,
      };
    } catch (error) {
      console.error('SpeakerService.getSpeakerById error:', error);
      return null;
    }
  }

  async createSpeaker(speakerData: Omit<Speaker, 'id' | 'created_at' | 'updated_at'>): Promise<Speaker | null> {
    try {
      const { data, error } = await this.supabase
        .from('speakers')
        .insert([speakerData])
        .select()
        .single();

      if (error) {
        console.error('Error creating speaker:', error);
        throw new Error('Failed to create speaker');
      }

      return data;
    } catch (error) {
      console.error('SpeakerService.createSpeaker error:', error);
      return null;
    }
  }

  async updateSpeaker(id: string, updates: Partial<Speaker>): Promise<Speaker | null> {
    try {
      const { data, error } = await this.supabase
        .from('speakers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating speaker:', error);
        throw new Error('Failed to update speaker');
      }

      return data;
    } catch (error) {
      console.error('SpeakerService.updateSpeaker error:', error);
      return null;
    }
  }

  async deleteSpeaker(id: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('speakers')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting speaker:', error);
        throw new Error('Failed to delete speaker');
      }

      return true;
    } catch (error) {
      console.error('SpeakerService.deleteSpeaker error:', error);
      return false;
    }
  }
}

export const speakerService = new SpeakerService();
